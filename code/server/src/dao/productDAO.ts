import { ProductNotFoundError, WrongParameterError, SellingDateError, LowProductStockError, ProductSoldError } from "../errors/productError";
import { Product } from "../components/product";
import db from "../db/db";
import { param } from "express-validator";
/**
 * A class that implements the interaction with the database for all product-related operations.
 * You are free to implement any method you need here, as long as the requirements are satisfied.
 */
class ProductDAO {
  registerProducts(
    model: string,
    category: string,
    quantity: number,
    details: string | null,
    sellingPrice: number,
    arrivalDate: string | null
  ): Promise<boolean> {
    console.log("Entro nel products: ", [
      model,
      category,
      quantity,
      details,
      sellingPrice,
      arrivalDate,
    ]);
    return new Promise<boolean>((resolve, reject) => {
      try {
        const sql =
          "INSERT INTO product(model, category, quantity, details, sellingPrice, arrivalDate) VALUES(?, ?, ?, ?, ?, ?)";
        db.run(
          sql,
          [model, category, quantity, details, sellingPrice, arrivalDate],
          (err: Error | null) => {
            if (err) {
              console.log("errore qui");
              reject(err);
              return;
            }
            resolve(true);
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }
  changeProductQuantity(
    model: string,
    newQuantity: number,
    changeDate: string
  ): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      try {
        let oldArrivalDate: string
        const sql =
          "SELECT model, category, quantity, details, sellingPrice, arrivalDate FROM product WHERE model = ?";
        db.get(sql, [model], (err: Error | null, row: Product) => {
          if (err) {
            reject(err);
            return;
          }
          if (!row) {
            reject(new ProductNotFoundError());
            return;
          }
          if (changeDate==null || changeDate==""){
            changeDate = row.arrivalDate
          }
          let finalQt= newQuantity + row.quantity
          const sql =
            "UPDATE product SET quantity = ?, arrivalDate = ? WHERE model = ?";
          db.run(sql, [finalQt, changeDate, model], (err) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(newQuantity);
          });
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  sellProduct(
    model: string,
    quantity: number,
    sellingDate: string
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        const sql =
          "SELECT model, category, quantity, details, sellingPrice, arrivalDate FROM product WHERE model = ?";
        db.get(sql, [model], (err: Error | null, row: Product) => {
          if (err) {
            reject(err);
            return;
          }
          if (!row) {
            reject(new ProductNotFoundError());
            return;
          }
          let sellingDateDt = new Date(sellingDate)
          if(sellingDateDt>new Date()){
            reject(new SellingDateError());
            return;
          }
          if(sellingDateDt<new Date(row.arrivalDate)){
            reject(new SellingDateError());
            return;
          }
          if(row.quantity==0){
            reject(new ProductSoldError());
            return;
          }
          if(row.quantity<quantity){
            reject(new LowProductStockError());
            return;
          }
          const sql =
            "UPDATE product SET quantity = ?, sellingDate = ? WHERE model = ?";
          db.run(sql, [row.quantity - quantity, sellingDate, model], (err) => {
            if (err) {
              reject(err);
              return;
            }
            resolve();
          });
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  getProducts(
    grouping: string | null,
    category: string | null,
    model: string | null
  ): Promise<Product[]> {
    return new Promise<Product[]>((resolve, reject) => {
      try {
        console.log("grouping, category, model: ",grouping,category,model)
        let query: string
        let parameter: string[]
        switch(grouping){
          case undefined:
            query ="SELECT model, category, quantity, details, sellingPrice, arrivalDate FROM product";
            parameter = []
            break;
          
          case 'category':
            if(model != undefined || category == undefined){
                reject(new WrongParameterError())
                return
            }
            query ="SELECT model, category, quantity, details, sellingPrice, arrivalDate FROM product WHERE category = ?";
            parameter = [category]
            break
          
          case 'model':
            if(!model || !!category){
                reject(new WrongParameterError())
                return
            }
            query ="SELECT model, category, quantity, details, sellingPrice, arrivalDate FROM product WHERE model = ?";
            parameter = [model]
            break
          default:
              reject(new WrongParameterError());
              return;
        }

        db.all(query, parameter, (err: Error | null, rows: Product[]) => {
          if (err) {
            console.log("Errore");
            reject(err);
            return;
          }
          if (!rows) {
            console.log("Non trovato prodotto");
            reject(new ProductNotFoundError());
            return;
          }
          console.log("ho i prodotti: ", rows);
          const products = rows.map(
            (row) =>
              new Product(
                row.model,
                row.category,
                row.quantity,
                row.details,
                row.sellingPrice,
                row.arrivalDate
              )
          );
          resolve(products);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  getAvailableProducts(
    grouping: string | null,
    category: string | null,
    model: string | null
  ): Promise<Product[]> {
    return new Promise<Product[]>((resolve, reject) => {
      try {
        // const sql =
        // "SELECT model, category, quantity, details, sellingPrice, arrivalDate FROM product WHERE quantity > 0 AND (category = ? OR model = ?)";
        let sql: string
        let parameters: string[];
        console.log("call to available products - grouping, category, model:" + grouping + ", " + category + ", " + model)
        switch(grouping){
          case undefined:
            sql ="SELECT model, category, quantity, details, sellingPrice, arrivalDate FROM product WHERE quantity > 0";
            parameters = []
            break;
          
          case 'category':
            if(model != undefined || category == undefined){
                reject(new WrongParameterError())
                return
            }
            sql ="SELECT model, category, quantity, details, sellingPrice, arrivalDate FROM product WHERE quantity > 0 AND category = ?";
            parameters = [category]
            break
          
          case 'model':
            if(model==undefined || category!=undefined){
                reject(new WrongParameterError())
                return
            }
            sql ="SELECT model, category, quantity, details, sellingPrice, arrivalDate FROM product WHERE quantity > 0 AND model = ?";
            parameters = [model]
            break
          default:
              reject(new WrongParameterError());
              return;
        }


        db.all(sql, parameters, (err: Error | null, rows: Product[]) => {
          if (err) {
            reject(err);
            return;
          }
          if (!rows) {
            reject(new ProductNotFoundError());
            return;
          }
          const products = rows.map(
            (row) =>
              new Product(
                row.model,
                row.category,
                row.quantity,
                row.details,
                row.sellingPrice,
                row.arrivalDate
              )
          );
          resolve(products);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  deleteAllProducts(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const sql = "DELETE FROM product";
      db.run(sql, [], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }
  deleteProduct(model: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const sql = "SELECT * FROM product WHERE model = ?";
      db.get(sql, [model], (err: Error | null, row: any) => {
        if (err) {
          reject(err);
          return;
        } else if (!row) {
          reject(new ProductNotFoundError());
          return;
        } else {
          const sql = "DELETE FROM product WHERE model = ?";
          db.run(sql, [model], (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(true);
            }
          });
        }
      });
    });
  }
}

export default ProductDAO;

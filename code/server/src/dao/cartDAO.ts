import db from "../db/db"
import { User, Role } from "../components/user"
import { Cart, ProductInCart } from "../components/cart"
import { ProductNotFoundError, EmptyProductStockError, LowProductStockError } from "../errors/productError"
import { CartNotFoundError, EmptyCartError } from "../errors/cartError"
/**
 * A class that implements the interaction with the database for all cart-related operations.
 * You are free to implement any method you need here, as long as the requirements are satisfied.
 */
class CartDAO {

        getCurrentCart(user: User): Promise<Cart> {
            return new Promise<Cart>( (resolve,reject ) => {
                try{
                    const sql = "SELECT product.model, product_in_cart.quantity, category, sellingPrice, total FROM product_in_cart, cart, product WHERE product_in_cart.cart_id = cart.id AND cart.paid = 'false' AND cart.username = ? AND product.model = product_in_cart.model"
                    db.all(sql, [user.username], (err: Error | null, rows: any[]) => {
                        if (err) {
                            reject(err)
                            return
                        }
                        let price: number
                        if (!rows || rows.length == 0) {
                          price = 0  
                        }else{
                            price = rows[0].total
                        }
                        const products: ProductInCart[] = rows.map(row =>new ProductInCart (
                            row.model,
                            row.quantity,
                            row.category,
                            row.sellingPrice
                          ));
                        const cart = new Cart(user.username,false,null,price, products)
                        resolve(cart)                        
                    })
                }catch(err){
                    reject(err)
                }
            })
        }

        addProduct(user: User, product: string): Promise<boolean>{
            return new Promise<boolean> ( (resolve,reject )=> {
                try {
                    const sql = "SELECT category, quantity, sellingPrice FROM product WHERE model = ?"
                    db.get(sql, [product], (err: Error | null, row: any) => {
                        if (err) {
                            reject(err)
                            return
                        }
                        if (!row) {
                            reject(new ProductNotFoundError())
                            return
                        }
                        if (row.quantity == 0){
                            reject(new EmptyProductStockError())
                        }
                        let selling_price = row.sellingPrice
                        const sql = "SELECT c.id as cartId, COUNT(pic.model) as productCount FROM cart c LEFT JOIN product_in_cart pic ON c.id = pic.cart_id AND pic.model = ? WHERE c.username = ? AND c.paid = 'false' GROUP BY c.id ORDER BY c.id;"
                        db.get(sql, [product,user.username], (err: Error | null, row: any) => {
                            if(err){
                                reject(err)
                                return
                            }
                            if(!row){//no unpaid cart
                                const cart_insert = "INSERT INTO cart(payment_date,paid,total,username) VALUES('null','false',?,?)"
                                db.run(cart_insert, [selling_price,user.username], function (err) {
                                    if (err) {
                                        reject(err);
                                    } 
                                    const lastCart = this.lastID
                                    const sql = "INSERT INTO product_in_cart(cart_id,model,quantity) VALUES(?,?,1)"
                                    db.run(sql, [lastCart,product], function (err) {
                                        if(err){
                                            reject(err)
                                            return
                                        }
                                        resolve(true)
                                        return
                                    })
                                }) 
                            }else{// cart found, have to updated
                                let cartId = row.cartId
                                if(row.productCount == 0){// not in cart
                                    const sql = "INSERT INTO product_in_cart(cart_id,model,quantity) VALUES(?,?,1)"
                                    db.run(sql, [cartId,product], function (err) {
                                        if(err){
                                            reject(err)
                                            return
                                        }
                                        const sql = "UPDATE cart SET total = total + ? WHERE id = ?"
                                        db.run(sql, [selling_price,cartId], function (err) {
                                            if(err){
                                                reject(err)
                                                return
                                            }
                                            resolve(true)
                                            return
                                        })
                                        
                                    })
                                }else{ //already in cart
                                    const sql = "UPDATE product_in_cart SET quantity = quantity + 1 WHERE id = ? AND model = ?"
                                    db.run(sql, [cartId,product], function (err) {
                                        if(err){
                                            reject(err)
                                            return
                                        }
                                        const sql = "UPDATE cart SET total = total + ? WHERE id = ?"
                                        db.run(sql, [selling_price,cartId], function (err) {
                                            if(err){
                                                reject(err)
                                                return
                                            }
                                            resolve(true)
                                            return
                                        })
                                        
                                    }) 
                                }
                            }
                        })
                        
                    })
                } catch (error) {
                    reject(error)
                }
            })
        }

        checkoutCart(user: User): Promise<Boolean> {
            return new Promise<Boolean>( (resolve,reject) => {
                try{
                console.log("entro in checkoutoooooooooooooooooooooooooooo")
                const sql = "SELECT id FROM cart WHERE username = ? AND paid = 'false'"
                db.get(sql, [user.username], (err: Error | null, row: any) => {
                    if(err){
                        reject(err)
                        return
                    }
                    if(!row ){
                        reject(new CartNotFoundError())
                        return
                    }
                    const sql = "SELECT p.model, pic.quantity as quantityInCart, p.quantity as stock FROM cart c, product_in_cart pic, product p WHERE c.id = pic.cart_id AND p.model = pic.model"
                    db.all(sql, [], (err: Error | null, result: any[]) => {
                    if(err) {
                        reject(err)
                        return
                    }
                    if(!result || result.length === 0){
                        reject(new EmptyCartError())
                        return
                    }
                    result.forEach(product => {
                        if(product.stock == 0){
                            reject(new EmptyProductStockError())
                            return 
                        }
                        if(product.quantityInCart > product.stock){
                            reject(new LowProductStockError())
                            return
                        }
                    })
                    const sql = "UPDATE cart SET paid = 'true', payment_date = ? WHERE username = ?"
                    const today = new Date().setHours(0,0,0,0)
                    db.run(sql, [today,user.username], function (err) {
                        if(err){
                            reject(err)
                            return
                        }
                        resolve(true)
                    })
                    })
                })
                } catch(err){

                }
            })
        }
}

export default CartDAO
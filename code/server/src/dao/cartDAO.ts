import db from "../db/db"
import { User, Role } from "../components/user"
import { Cart, ProductInCart } from "../components/cart"
import { ProductNotFoundError, EmptyProductStockError, LowProductStockError } from "../errors/productError"
import { CartNotFoundError, EmptyCartError, ProductNotInCartError } from "../errors/cartError"
import { BlockList } from "net"
import { rejects } from "assert"
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
                    console.log("product to add: ",product)
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
                        console.log("product to add found in the db")
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
                                console.log("cart found in the db")
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
                                    console.log("product already in cart")
                                    const sql = "UPDATE product_in_cart SET quantity = quantity + 1 WHERE cart_id = ? AND model = ?"
                                    db.run(sql, [cartId,product], function (err) {
                                        if(err){
                                            console.log("error increasing already in cart: ",err)
                                            reject(err)
                                            return
                                        }
                                        const sql = "UPDATE cart SET total = total + ? WHERE id = ?"
                                        db.run(sql, [selling_price,cartId], function (err) {
                                            if(err){
                                                console.log("error increasing the total of cart: ",err)
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
                console.log("entro in checkout")
                const sql = "SELECT id FROM cart WHERE username = ? AND paid = 'false'"
                db.get(sql, [user.username], (err: Error | null, cart: any) => {
                    if(err){
                        reject(err)
                        return
                    }
                    if(!cart ){
                        reject(new CartNotFoundError())
                        return
                    }
                    console.log("id cart trovato")
                    const sql = "SELECT p.model, pic.quantity as quantityInCart, p.quantity as stock FROM cart c, product_in_cart pic, product p WHERE c.id = pic.cart_id AND p.model = pic.model AND c.id = ?"
                    db.all(sql, [cart.id],  (err: Error | null, result: any[]) => {
                    if(err) {
                        reject(err)
                        return
                    }
                    if(!result || result.length === 0){
                        reject(new EmptyCartError())
                        return
                    }
                    console.log("product found in cart: ",result)
                    for(const product of result){
                        if(product.stock == 0){
                            reject(new EmptyProductStockError())
                            return 
                        }
                        if(product.quantityInCart > product.stock){
                            console.log("error low products stockerror")
                           
                            reject(new LowProductStockError())
                            return
                        }
                    }
                    
                    const sql = "UPDATE cart SET paid = 'true', payment_date = ? WHERE username = ?"
                    const today = new Date().toLocaleDateString()
                    db.run(sql, [today,user.username], async (err) => {
                        if(err){
                            reject(err)
                            return
                        }
                        console.log("prdocut to changes: ",result)
                        result.forEach(async product => {
                            await this.decreaseAfterPurchase(product.model, product.quantityInCart).then().catch( err => {
                                reject(err)
                                return
                            })
                        })
                        resolve(true)
                    })
                    })
                })
                } catch(err){

                }
            })
        }

        private decreaseAfterPurchase(model: string, number_paid: number): Promise<Boolean>{
            return new Promise<Boolean>( (resolve,reject) =>{
                console.log("stock: ",model,"decreased by:",number_paid)
                const sql = "UPDATE product SET quantity = quantity - ? WHERE model = ?"
                db.run(sql, [number_paid,model], function (err) {
                    if(err){
                        reject(err)
                        return
                    }
                    resolve(true)
                })
                
            } )
        }

        getCustomerCart(user: User): Promise<Cart[]>{
            return new Promise<Cart[]>( (resolve,reject) => {
                const sql = "SELECT pic.cart_id, c.payment_date, pic.model, pic.quantity, category, p.sellingPrice, total FROM cart c, product_in_cart pic, product p WHERE c.id = pic.cart_id AND c.username = ? AND paid = 'true' AND p.model = pic.model "
                try{
                    db.all(sql, [user.username], (err: Error | null, rows: any[]) => {
                        if (err) {
                            
                            reject(err)
                            return
                        }
                        if (!rows || rows.length == 0) {
                            resolve([])
                            return
                        }
                        //console.log("query superata: ",rows)
                        const total_cart: Cart[] = []
                        let inside_cart: ProductInCart[] = []
                        let currentCart: Cart | null = null;
                        let previous_id = rows[0].cart_id // first statement
                        currentCart = new Cart(user.username, true, rows[0].payment_date, rows[0].total,inside_cart)
                        for(let [index,line] of rows.entries()){
                            if(line.cart_id !== previous_id ){
                                total_cart.push(currentCart)
                                inside_cart = []
                                currentCart = new Cart(user.username, true, line.payment_date, line.total,inside_cart)
                            }
                            currentCart.products.push(new ProductInCart(line.model,line.quantity,line.category,line.sellingPrice))
                            if(index == rows.length - 1){
                                total_cart.push(currentCart)
                            }
                            previous_id = line.cart_id
                        }
                        
                        resolve(total_cart)
                    })
                }catch(err){
                    reject(err)
                }
            })
        }

        getAllCarts(): Promise<Cart[]> {
            return new Promise<Cart[]> ( (resolve,reject) => {
                const sql = "SELECT pic.cart_id, c.username, c.payment_date, pic.model, pic.quantity, category, p.sellingPrice, total FROM cart c, product_in_cart pic, product p WHERE c.id = pic.cart_id AND p.model = pic.model "
                try{
                    db.all(sql, [], (err: Error | null, rows: any[]) => {
                        if (err) {
                            
                            reject(err)
                            return
                        }
                        if (!rows || rows.length == 0) {
                            resolve([])
                            return
                        }
                        //console.log("query superata: ",rows)
                        const total_cart: Cart[] = []
                        let inside_cart: ProductInCart[] = []
                        let currentCart: Cart | null = null;
                        let previous_id = rows[0].cart_id // first statement
                        currentCart = new Cart(rows[0].username, true, rows[0].payment_date, rows[0].total,inside_cart)
                        
                        for(let [index,line] of rows.entries()){
                            if(line.cart_id !== previous_id ){
                                total_cart.push(currentCart)
                                inside_cart = []
                                currentCart = new Cart(line.username, true, line.payment_date, line.total,inside_cart)
                            }
                            currentCart.products.push(new ProductInCart(line.model,line.quantity,line.category,line.sellingPrice))
                            if(index == rows.length - 1){
                                total_cart.push(currentCart)
                            }
                            previous_id = line.cart_id
                            
                        }
                        console.log(total_cart)
                        resolve(total_cart)
                    })
                }catch(err){
                    reject(err)
                }
            })
        }

        removeProductFromCart(user: User, product: string): Promise<Boolean>{
            return new Promise<Boolean> ( (resolve,reject) => {
                try{
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
                    let price = row.sellingPrice
                    const sql = "SELECT c.id, pic.model, pic.quantity, p.sellingPrice, COUNT(c.paid) as paidCheck, COUNT(pic.model) as productsNumber FROM product p, cart c, product_in_cart pic WHERE pic.cart_id = c.id AND p.model = pic.model AND c.username = ? AND paid = 'false'"
                    db.all(sql, [user.username], (err: Error | null, result: any[]) => {
                        if (err) {
                            reject(err)
                            return
                        }
                        if(!result[0].paidCheck || result[0].productsNumber == 0){
                            reject(new CartNotFoundError())
                            return
                        }
                        let quantity: number
                        for(let [index,line] of result.entries()){
                            if(line.model === product){
                                quantity = line.quantity
                                break
                            }
                            if(index == result.length - 1){
                                reject(new ProductNotInCartError())
                            }
                        }
                        let cart_id = result[0].id
                        if(quantity > 1){
                            const sql = "UPDATE product_in_cart SET quantity = quantity - 1 WHERE cart_id = ? AND model = ?"
                            db.run(sql, [cart_id,product], function (err) {
                                if(err){
                                    reject(err)
                                    return
                                }
                                const sql = "UPDATE cart SET total = total - ? WHERE id = ?"
                                db.run(sql, [price,cart_id], function (err) {
                                    if(err){
                                        reject(err)
                                        return
                                    }
                                    resolve(true)
                                })
                            
                            })
                        }else{
                            const sql = "DELETE FROM product_in_cart WHERE cart_id = ? AND model = ?"
                            db.run(sql, [cart_id,product], function (err) {
                                if(err){
                                    reject(err)
                                    return
                                }
                                const sql = "UPDATE cart SET total = total - ? WHERE id = ?"
                                db.run(sql, [price,cart_id], function (err) {
                                    if(err){
                                        reject(err)
                                        return
                                    }
                                    resolve(true)
                                })
                            
                            })
                        }
                    })
                })
            }catch(err){
                reject(err)
            }
            })
        }


        clearUserCart(user: User): Promise<Boolean>{
            return new Promise( (resolve,reject) => {
                try{
                    const sql = "DELETE FROM cart WHERE username = ? AND paid = 'false'"
                    db.run(sql, [user.username], function(err)  {
                    if(err){
                        reject(err)
                        return
                    }
                    if(!this.changes){
                        reject(new CartNotFoundError())
                        return
                    }
                    const cart_insert = "INSERT INTO cart(payment_date,paid,total,username) VALUES('null','false',0,?)"
                    db.run(cart_insert, [user.username], function (err) {
                        if (err) {
                            reject(err);
                        } 
                    })
                })
                }catch(err){

                }
            })
        }
}

export default CartDAO

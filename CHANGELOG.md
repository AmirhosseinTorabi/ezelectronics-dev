# EZElectronics - Changelog

## V2.0 - 14/05/2024

### Additions

#### Users

- A new role has been added: Admin. Admin users have specific privileges and access to their set of operations. Unless otherwise stated, admins do not have access to the functionalities of other roles (e.g. an Admin cannot create their own cart)
- Users can now change their personal information (name, surname, and the new available attributes address and date of birth). It is not possible to change username, password, or role. Users can call the new API PATCH `ezelectronics/users/:username` to change their information. The username in the request must match that of the logged user, and no user role can edit the information of other users.

#### Product reviews

A new concept has been added: Product reviews. Users can leave a review for a product they have purchased and can see the reviews assigned to a product before purchasing it

### Changes from V1.0

#### Product handling

Product handling has been changed: products no longer have a unique code that identifies a specific instance of a product (with the V1 implementation a specific `iPhone 13` would have one code, while another would have a second code). Products are now considered as a single entity with a varying quantity, with the model being the new identifier. The following APIs have been affected:

- POST `ezelectronics/products`: the API has been changed to now receive a set of products of a specified quantity to insert in the database
- POST `ezelectronics/products/arrivals`: the behavior of this API has been moved to POST `ezelectronics/products`; this API has been deleted as a consequence
- PATCH `ezelectronics/products/:code`: the API used to mark a specific product instance as sold. Its behavior has been moved to the new API PATCH `ezelectronics/products/:model/sell`, which can reduce the available quantity of a product in stock.
- PATCH `ezelectronics/products/:model`: this new API is used to increase the available quantity of a product in stock by a specified amount.
- GET `ezelectronics/products/:code`: this API has been deleted, as there is no information about a specific product instance
- GET `ezelectronics/products/`, `ezelectronics/products/category/:category`, `ezelectronics/products/model/:model`: the three APIs used to get product lists have been changed and simplified. There are now two GET APIs that return all products (GET `ezelectronics/products`) or all products with an available quantity higher than 0 (GET `ezelectronics/products/available`). Filtering by category or model is possible through optional query parameters for both routes
- DELETE `ezelectronics/products/:code`: this API has been changed to `ezelectronics/products/:model`. It is now used to delete information on a model (removing it from the stock with its entire quantity), instead of deleting a single product instance.

#### User roles

User APIs were incorrectly written in the `API.md` document as not having any sort of access credentials. This mistake has been rectified, and access constraints have been defined. The following APIs have been affected:

- GET `ezelectronics/users`: this route can now only be called by users with an Admin role
- GET `ezelectronics/users/role/:role`: this route can now only be called by users with an Admin role
- GET `ezelectronics/users/:username`: this route returns correct information if the requested username matches the one of the calling user or if the calling user is an Admin
- DELETE `ezelectronics/users/:username`: this route now only allows users to delete their personal information or, if the calling user is an Admin, to delete any non-Admin user. Admins can only be deleted by themselves.

#### Delete APIs

The various DELETE APIs, which were defined for testing purposes, did not have any access constraint specified; this meant, however, that anyone, including not logged users, could call them and erase data from the application. These APIs have been changed so that users need to be either an Admin or a Manager (depending on the route) to call them. A new internal function has been defined for cleaning up the test database in place of these APIs.

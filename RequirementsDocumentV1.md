# Requirements Document - current EZElectronics

Date: 24/04/2024

Version: V1 - description of EZElectronics in CURRENT form (as received by teachers)

| Version number |                                            Change                                             |
| :------------: | :-------------------------------------------------------------------------------------------: |
|      1.0       | Added stakeholders, Functional Requirements, Non Functional Requirements and Use Case diagram |
|      1.1       |                          Added Use Cases, Glossary and System Design                          |
|      1.2       |                         Added Deployment diagram and some corrections                         |

# Contents

- [Requirements Document - current EZElectronics](#requirements-document---current-ezelectronics)
- [Contents](#contents)
- [Informal description](#informal-description)
- [Stakeholders](#stakeholders)
- [Context Diagram and interfaces](#context-diagram-and-interfaces)
  - [Context Diagram](#context-diagram)
  - [Interfaces](#interfaces)
- [Stories and personas](#stories-and-personas)
- [Functional and non functional requirements](#functional-and-non-functional-requirements)
  - [Functional Requirements](#functional-requirements)
  - [Non Functional Requirements](#non-functional-requirements)
- [Use case diagram and use cases](#use-case-diagram-and-use-cases)
  - [Use case diagram](#use-case-diagram)
    - [Use Case1 Registration](#use-case1-uc1-registration)
    - [Use Case2 Login](#use-case-2-uc2-login)
    - [Use Case3 Logout](#use-case-3-uc3-logout)
    - [Use Case 4 Session](#use-case-4-uc4-session)
    - [Use case 5 List](#use-case-5-uc5-list-all-users)
    - [Use case 6 Delete User](#use-case-6-uc6-delete-user)
    - [Use case 7 Search Users](#use-case-7-uc7-search-users)
    - [Use Case 8 New Product](#use-case-8-uc8-new-product)
    - [Use Case 9 Insert new stocks](#use-case-9-uc9-insert-new-stocks)
    - [Use Case 10 Mark as sold](#use-case-10-uc10-mark-as-sold)
    - [Use Case 11 Delete Product](#use-case-11-uc11-delete-product)
    - [Use case 12 Search Product](#use-case-12-uc12-search-product)
    - [Use Case 13 Add Product to the Cart](#use-case-13-uc13-add-product-to-the-cart)
    - [Use Case 14 Remove Product from the Cart](#use-case-14-uc14-remove-product-from-the-cart)
    - [Use Case 15 Pay Car](#use-case-15-uc15-pay-cart)
    - [Use Case 16 Delete Cart](#use-case-16-uc16-delete-cart)
    - [Use case 17 Carts History](#use-case-17-uc17-carts-history)
- [Glossary](#glossary)
- [System Design](#system-design)
- [Deployment Diagram](#deployment-diagram)

# Informal description

EZElectronics (read EaSy Electronics) is a software application designed to help managers of electronics stores to manage their products and offer them to customers through a dedicated website. Managers can assess the available products, record new ones, and confirm purchases. Customers can see available products, add them to a cart and see the history of their past purchases.

# Stakeholders

| Stakeholder name |                           Description                            |
| :--------------: | :--------------------------------------------------------------: |
|       User       | The customer buying or the manager selling electronic components |
|    Developers    |          Develop all technical aspects of the software           |

# Context Diagram and interfaces

## Context Diagram

![Context diagram](V1-Images/Context_diagram.jpg)

## Interfaces

| Actor |                    Logical Interface                     | Physical Interface |
| :---: | :------------------------------------------------------: | :----------------: |
| User  | GUI (to be defined) cart management + product management |  Smart phone / PC  |

# Stories and personas

### Persona 1 (P1): CUSTOMER, female, 22 y.o., student. <br>

Interacts with the application through a web browser on her phone. <br>
Story: wants to buy some electronics stuff for her Arduino project.

### Persona 2 (P2): MANAGER, male, 30 y.o., worker. <br>

Interacts with the application through a web browser on his laptop. <br>
Story: has opened a new electronics company and wants to sell their stocks throught the platform

### Persona 3 (P3): MANAGER, female, 47 y.o, worker. <br>

Interacts with the application through a web browser on his desktop computer. <br>
Story: wants to perform a market analysis to buy the best component for the quality-price ratio.

### Persona 4 (P4): CUSTOMER, male, 27 y.o., not worker. <br>

Interacts with the application through a web browser on his desktop computer. <br>
Story: wants to buy the cheapest components hoping to resell them at higher prices on other platforms.

# Functional and non functional requirements

## Functional Requirements

| ID      |                               Description                                |
| ------- | :----------------------------------------------------------------------: |
| **FR1** |                       **Authentication Managment**                       |
| FR1.1   |                               Registration                               |
| FR1.2   |                                  Login                                   |
| FR1.3   |                                  Logout                                  |
| FR1.4   |                                 Session                                  |
|         |                                                                          |
| **FR2** |                           **Cart Management**                            |
| FR2.1   |                               Add product                                |
| FR2.2   |                              Delete product                              |
| FR2.3   |                         Calculation of the price                         |
| FR2.4   |                              Marks as sold                               |
| FR2.5   |                      History of previous purchases                       |
|         |                                                                          |
| **FR3** |                          **Product Management**                          |
| FR3.1   |                           Create a new product                           |
| FR3.2   |       Registers the arrival of a set of products of the same model       |
| FR3.3   |                         Marks a product as sold                          |
| FR3.4   | Search for products based on one of their properties or receive them all |
| FR3.5   |       Delete products based on one of their properties or them all       |
|         |                                                                          |
| **FR4** |                           **Users Management**                           |
| FR4.1   |                            Get all the users                             |
| FR4.2   |                  Search user based on its username/role                  |
| FR4.3   |                               Delete User                                |
|         |                                                                          |

## Non Functional Requirements

|  ID  | Type (efficiency, reliability, ..) |                                                   Description                                                   |     Refers to      |
| :--: | :--------------------------------: | :-------------------------------------------------------------------------------------------------------------: | :----------------: |
| NFR1 |              Security              | Legislative requirements of the country in which the application will be used. Only authorized users can access | FR1, FR2, FR3, FR4 |
| NFR2 |            Availability            |                                     Maximum server downtime 0.01% per year                                      | FR1, FR2, FR3, FR4 |
| NFR3 |            Portability             |                                Independent from the OS, only Web Browser needed                                 | FR1, FR2, FR3, FR4 |
| NFR4 |             Usability              |                               No training required for use, have to be intuitive                                | FR1, FR2, FR3, FR4 |
| NFR5 |             Efficiency             |                            All functions should be completed in less than 2 seconds                             | FR1, FR2, FR3, FR4 |

# Use case diagram and use cases

## Use case diagram

![Context diagram](V1-Images/UseCase_diagram.jpg)

### Use Case1, UC1: Registration

| User                            |                                      |
| ------------------------------- | :----------------------------------- |
| Precondition                    | User has a valid username            |
| Post condition                  | Account is created                   |
| Nominal Scenario                | Scenario 1.1 and 1.2                 |
| Variants                        | -                                    |
| Exceptions                      | - Username is already registered<br> |
| Post condition (exception case) | Account not created                  |

| Scenario 1.1   |                                                                                 |
| -------------- | :------------------------------------------------------------------------------ |
| Precondition   | User has a valid username                                                       |
| Post condition | Account is created                                                              |
| # Step         | Description                                                                     |
| 1              | User asks to sign up                                                            |
| 2              | System asks for username and checks if it has already been used by another user |
| 3              | System asks for password and checks if it is not empty                          |
| 4              | System created account                                                          |

| Scenario 1.2   |                                                                                 |
| -------------- | :------------------------------------------------------------------------------ |
| Precondition   | User has a valid username                                                       |
| Post condition | Account is not created                                                          |
| # Step         | Description                                                                     |
| 1              | User asks to sign up                                                            |
| 2              | System asks for username and checks if it has already been used by another user |
| 3              | Username already existed                                                        |
| 4              | System not create the account, error 409 shown                                  |

### Use Case 2, UC2: Login

| User                            |                           |
| ------------------------------- | :------------------------ |
| Precondition                    | User must have an account |
| Post condition                  | User is authenticated     |
| Nominal Scenario                | Scenario 2.1 and 2.2      |
| Variants                        | -                         |
| Exceptions                      | - Wrong credentials<br>   |
| Post condition (exception case) | User not authenticated    |

| Scenario 2.1   |                                                    |
| -------------- | :------------------------------------------------- |
| Precondition   | User must have an account                          |
| Post condition | User is authorized                                 |
| # Step         | Description                                        |
| 1              | User asks to login                                 |
| 2              | System asks username and password                  |
| 3              | User enters username and password                  |
| 4              | System checks if username and password are correct |
| 5              | User is logged in                                  |

| Scenario 2.2   |                                                    |
| -------------- | :------------------------------------------------- |
| Precondition   | User must have an account                          |
| Post condition | User is authorized                                 |
| # Step         | Description                                        |
| 1              | User asks to login                                 |
| 2              | System asks username and password                  |
| 3              | User enters username and password                  |
| 4              | System checks if username and password are correct |
| 5              | Credentials are incorrect, User is not logged in   |

### Use Case 3, UC3: Logout

| User             |                                  |
| ---------------- | :------------------------------: |
| Precondition     | User is logged id and authorized |
| Post condition   |        User is logged out        |
| Nominal Scenario |           Scenario 3.1           |
| Variants         |                                  |
| Exceptions       |                                  |

| Scenario 3.1   |      (Nominal)      |
| -------------- | :-----------------: |
| Precondition   |  User is logged in  |
| Post condition | User is logged out  |
| Step#          |     Description     |
| 1              | User asks to logout |
| 2              | User is logged out  |

### Use Case 4, UC4: Session

| User             |                                  |
| ---------------- | :------------------------------: |
| Precondition     | User is logged id and authorized |
| Post condition   |  User information are retrieved  |
| Nominal Scenario |           Scenario 4.1           |
| Variants         |                                  |
| Exceptions       |                                  |

| Scenario 4.1   |                   (Nominal)                    |
| -------------- | :--------------------------------------------: |
| Precondition   |               User is logged in                |
| Post condition |         User information are retrieved         |
| Step#          |                  Description                   |
| 1              |        User ask to refresh the Web page        |
| 2              | System checks if the User is already logged in |
| 3              |         User information are retrieved         |

### Use case 5, UC5 List all Users

| User             |                           |
| ---------------- | :-----------------------: |
| Precondition     |           None            |
| Post condition   | list of Users is returned |
| Nominal Scenario |            5.1            |
| Variants         |                           |
| Exceptions       |                           |

| Scenario 5.1   |                                                   |
| -------------- | :-----------------------------------------------: |
| Precondition   |          Corresponding web page is open           |
| Post condition |              list of users is shown               |
| Step#          |                    Description                    |
| 1              | User clicks on the button which get all the users |
| 2              |             list of users is returned             |

### Use case 6, UC6 Delete User

| Actors Involved                 |                 User                 |
| ------------------------------- | :----------------------------------: |
| Precondition                    |                 None                 |
| Post condition                  |           User is deleted            |
| Nominal Scenario                |               6.1, 6.2               |
| Variants                        |                                      |
| Exceptions                      |       -Username does not exist       |
| Post condition (exception case) | User not deletes, error is sent back |

| Scenario 6.1   |                                    |
| -------------- | :--------------------------------: |
| Precondition   |                None                |
| Post condition |          User is deleted           |
| Step#          |            Description             |
| 1              |  A Request to the System is sent   |
| 2              | System cheks if the username exist |
| 3              |            User Delete             |

| Scenario 6.2   |                                             |
| -------------- | :-----------------------------------------: |
| Precondition   |                    None                     |
| Post condition |               User is deleted               |
| Step#          |                 Description                 |
| 1              |       A Request to the System is sent       |
| 2              |     System cheks if the username exist      |
| 3              | Username does not exist, error is sent back |

### Use case 7, UC7 Search Users

| User                            |                                                    |
| ------------------------------- | :------------------------------------------------: |
| Precondition                    |                        None                        |
| Post condition                  |      User are found base on role or username       |
| Nominal Scenario                |                 7.1, 7.2, 7.3, 7.4                 |
| Variants                        |                                                    |
| Exceptions                      | -Username does not exist <br> -Role does not exist |
| Post condition (exception case) |        User not deletes, error is sent back        |

| Scenario 7.1   |                                                       |
| -------------- | :---------------------------------------------------: |
| Precondition   |                         None                          |
| Post condition |          Users are found base on their role           |
| Step#          |                      Description                      |
| 1              | User clicks on the button which get the Users by role |
| 2              |           System cheks if the role is valid           |
| 3              |               Users found are retrived                |

| Scenario 7.2   |                                                           |
| -------------- | :-------------------------------------------------------: |
| Precondition   |                           None                            |
| Post condition |            User is found base on its username             |
| Step#          |                        Description                        |
| 1              | User clicks on the button which get the Users by username |
| 2              |            System cheks if the username exist             |
| 3              |                  User found are retrived                  |

| Scenario 7.3   |                                                           |
| -------------- | :-------------------------------------------------------: |
| Precondition   |                           None                            |
| Post condition |                     User is not found                     |
| Step#          |                        Description                        |
| 1              | User clicks on the button which get the Users by username |
| 2              |            System cheks if the username exist             |
| 3              |                    Username not found                     |
| 3              |                     Message is shown                      |

| Scenario 7.4   |                                                       |
| -------------- | :---------------------------------------------------: |
| Precondition   |                         None                          |
| Post condition |             unsuccessful search for users             |
| Step#          |                      Description                      |
| 1              | User clicks on the button which get the Users by role |
| 2              |           System cheks if the role is valid           |
| 3              |                   Role is not valid                   |
| 3              |                   Message is shown                    |

### Use Case 8, UC8: New Product

| User                            |                                                                                          |
| ------------------------------- | :--------------------------------------------------------------------------------------- |
| Precondition                    | User must be logged as a Manager                                                         |
| Post condition                  | New product is inserted                                                                  |
| Nominal Scenario                | Scenario 8.1, 8.2 and 8.3                                                                |
| Variants                        | -                                                                                        |
| Exceptions                      | - Product code already exist<br> - Arrival date of the product is after the current date |
| Post condition (exception case) | Product not inserted                                                                     |

| Scenario 8.1   |                                                                   |
| -------------- | :---------------------------------------------------------------- |
| Precondition   | Manager must be logged in                                         |
| Post condition | New Product in inserted in the System                             |
| # Step         | Description                                                       |
| 1              | User asks to insert a new product                                 |
| 2              | System asks for all the fields, such as "Code" and "Arrival Date" |
| 3              | User inserts all the fields                                       |
| 4              | System checks if all the inputs are valid, if so...               |
| 5              | A new product is inserted into the System                         |

| Scenario 8.2   |                                                                   |
| -------------- | :---------------------------------------------------------------- |
| Precondition   | Manager must be logged in                                         |
| Post condition | New Product is NOT inserted into the System                       |
| # Step         | Description                                                       |
| 1              | User asks to insert a new product                                 |
| 2              | System asks for all the fields, such as "Code" and "Arrival Date" |
| 3              | User inserts all the fields                                       |
| 4              | System checks if all the inputs are valid                         |
| 5              | Code already exists                                               |
| 6              | A error message is shown                                          |
| 7              | A new product is NOT inserted into the System                     |

| Scenario 8.3   |                                                                   |
| -------------- | :---------------------------------------------------------------- |
| Precondition   | Manager must be logged in                                         |
| Post condition | New Product is NOT inserted into the System                       |
| # Step         | Description                                                       |
| 1              | User asks to insert a new product                                 |
| 2              | System asks for all the fields, such as "Code" and "Arrival Date" |
| 3              | User inserts all the fields                                       |
| 4              | System checks if all the inputs are valid                         |
| 5              | Arrival date is not valid                                         |
| 6              | A error message is shown                                          |
| 7              | A new product is NOT inserted into the System                     |

### Use Case 9, UC9: Insert new stocks

| User                            |                                                         |
| ------------------------------- | :------------------------------------------------------ |
| Precondition                    | Manager must be logged in                               |
| Post condition                  | New stocks are inserted into the System                 |
| Nominal Scenario                | Scenario 9.1 and 9.2                                    |
| Variants                        | -                                                       |
| Exceptions                      | - Arrival date of the stocks are after the current date |
| Post condition (exception case) | Stock not inserted                                      |

| Scenario 9.1   |                                                     |
| -------------- | :-------------------------------------------------- |
| Precondition   | Manager must be logged in                           |
| Post condition | New stocks are inserted into the System             |
| # Step         | Description                                         |
| 1              | User asks to insert a new product                   |
| 2              | System asks for all the fields, such "Arrival Date" |
| 3              | User inserts all the fields                         |
| 4              | System checks if all the inputs are valid, if so... |
| 5              | New stocks are inserted                             |

| Scenario 9.2   |                                                        |
| -------------- | :----------------------------------------------------- |
| Precondition   | Manager must be logged in                              |
| Post condition | New stocks are NOT inserted into the System            |
| # Step         | Description                                            |
| 1              | User asks to insert a new product                      |
| 2              | System asks for all the fields, such as "Arrival Date" |
| 3              | User inserts all the fields                            |
| 4              | System checks if all the inputs are valid              |
| 5              | Arrival date is not valid                              |
| 6              | A error message is shown                               |
| 7              | A new product is NOT inserted into the System          |

### Use Case 10, UC10: Mark as sold

| User                            |                                                         |
| ------------------------------- | :------------------------------------------------------ |
| Precondition                    | Manager must be logged in                               |
| Post condition                  | New stocks are inserted into the System                 |
| Nominal Scenario                | Scenario 10.1, 10.2, 10.3, 10.4                         |
| Variants                        | -                                                       |
| Exceptions                      | - Arrival date of the stocks are after the current date |
| Post condition (exception case) | Stock not inserted                                      |

| Scenario 10.1  |                                                                   |
| -------------- | :---------------------------------------------------------------- |
| Precondition   | Manager must be logged in                                         |
| Post condition | A product is marked as sold                                       |
| # Step         | Description                                                       |
| 1              | Users ask to confirm an order                                     |
| 2              | System asks for all the fields, such as "Code" and "Selling Date" |
| 3              | User inserts all the fields                                       |
| 4              | System checks if all the inputs are valid, if so...               |
| 5              | Product is marked as sold                                         |

| Scenario 10.2  |                                                        |
| -------------- | :----------------------------------------------------- |
| Precondition   | Manager must be logged in                              |
| Post condition | New stocks are NOT inserted into the System            |
| # Step         | Description                                            |
| 1              | User asks to insert a new product                      |
| 2              | System asks for all the fields, such as "Selling Date" |
| 3              | User inserts all the fields                            |
| 4              | System checks if all the inputs are valid              |
| 5              | Selling date is not valid                              |
| 6              | A error message is shown                               |
| 7              | Product is NOT marked as sold                          |

| Scenario 10.3  |                                                |
| -------------- | :--------------------------------------------- |
| Precondition   | Manager must be logged in                      |
| Post condition | New stocks are inserted into the System        |
| # Step         | Description                                    |
| 1              | User asks to insert a new product              |
| 2              | System asks for all the fields, such as "Code" |
| 3              | User inserts all the fields                    |
| 4              | System checks if all the inputs are valid      |
| 5              | Code is not valid                              |
| 6              | A error message is shown                       |
| 7              | Product is NOT marked as sold                  |

| Scenario 10.4  |                                           |
| -------------- | :---------------------------------------- |
| Precondition   | Manager must be logged in                 |
| Post condition | New stocks are inserted into the System   |
| # Step         | Description                               |
| 1              | User asks to insert a new product         |
| 2              | System asks for all the fields            |
| 3              | User inserts all the fields               |
| 4              | System checks if all the inputs are valid |
| 5              | Product already marked as "Sold"          |
| 6              | A error message is shown                  |
| 7              | Product is NOT marked as sold             |

### Use Case 11, UC11: Delete Product

| User                            |                                          |
| ------------------------------- | :--------------------------------------- |
| Precondition                    | Manager must be logged in                |
| Post condition                  | Product is deleted from the database     |
| Nominal Scenario                | Scenario 11.1, 11.2                      |
| Variants                        | -                                        |
| Exceptions                      | - Code does not exist                    |
| Post condition (exception case) | Product is NOT deleted from the database |

| Scenario 11.1  |                                     |
| -------------- | :---------------------------------- |
| Precondition   | Manager must be logged in           |
| Post condition | A product is marked as sold         |
| # Step         | Description                         |
| 1              | Users ask to delete a product       |
| 2              | System asks for "Code"              |
| 3              | User inserts it                     |
| 4              | System checks if is valid, if so... |
| 5              | Product is deleted                  |

| Scenario 11.2  |                                          |
| -------------- | :--------------------------------------- |
| Precondition   | Manager must be logged in                |
| Post condition | Product is NOT deleted from the database |
| # Step         | Description                              |
| 1              | Users ask to delete a product            |
| 2              | System asks for "Code"                   |
| 3              | User inserts it                          |
| 4              | System checks if the input is valid      |
| 5              | Code is not valid                        |
| 6              | A error message is shown                 |
| 7              | Product is NOT deleted                   |

### Use case 12, UC12 Search Product

| User                            |                                                                                     |
| ------------------------------- | :---------------------------------------------------------------------------------: |
| Precondition                    |                               User must be logged in                                |
| Post condition                  |                     Products are found base on their properties                     |
| Nominal Scenario                |                                  12.1, 12.2, 12.3                                   |
| Variants                        |                                                                                     |
| Exceptions                      | -Code does not exist <br> -Model does not exist <br> - System gets incorrect inputs |
| Post condition (exception case) |                                  Product not found                                  |

| Scenario 12.1  |                                                                                           |
| -------------- | :---------------------------------------------------------------------------------------: |
| Precondition   |                                  User must be logged in                                   |
| Post condition |                                    Successfull search                                     |
| Step#          |                                        Description                                        |
| 1              | User clicks on the button to search, based on the properties to search of to get them all |
| 2              |                     System cheks if the inputs are correct, if so...                      |
| 3              |                                    Successfull search                                     |

| Scenario 12.1  |                                                                                           |
| -------------- | :---------------------------------------------------------------------------------------: |
| Precondition   |                                  User must be logged in                                   |
| Post condition |                                    Successfull search                                     |
| Step#          |                                        Description                                        |
| 1              | User clicks on the button to search, based on the properties to search of to get them all |
| 2              |                          System cheks if the inputs are correct                           |
| 3              |                                     Incorrect inputs                                      |
| 4              |                                   Unsuccessfull search                                    |

### Use Case 13, UC13: Add Product to the Cart

| User                            |                                     |
| ------------------------------- | :---------------------------------- |
| Precondition                    | User must be logged as Customer     |
| Post condition                  | New product is inserted to the Cart |
| Nominal Scenario                | Scenario 13.1, 13.2                 |
| Variants                        | -                                   |
| Exceptions                      | - Product not valid                 |
| Post condition (exception case) | Product not inserted                |

| Scenario 13.1  |                                                 |
| -------------- | :---------------------------------------------- |
| Precondition   | User must be logged as Customer                 |
| Post condition | New product is inserted to the Cart             |
| # Step         | Description                                     |
| 1              | User asks to insert a new product to the cart   |
| 2              | System checks if the product is valid, if so... |
| 3              | A new product is inserted into the Cart         |

| Scenario 13.2  |                                           |
| -------------- | :---------------------------------------- |
| Precondition   | User must be logged as Customer           |
| Post condition | New Product is NOT inserted into the Cart |
| # Step         | Description                               |
| 1              | User asks to insert a new product         |
| 2              | System checks if the product is valid     |
| 3              | Product code not valid                    |
| 4              | A error message is shown                  |

### Use Case 14, UC14: Remove Product from the Cart

| User                            |                                             |
| ------------------------------- | :------------------------------------------ |
| Precondition                    | User must be logged as Customer             |
| Post condition                  | Product is removed from the Cart            |
| Nominal Scenario                | Scenario 14.1 and 14.2                      |
| Variants                        | -                                           |
| Exceptions                      | - Product not valid <br> - User has no Cart |
| Post condition (exception case) | Operation aborted                           |

| Scenario 14.1  |                                                 |
| -------------- | :---------------------------------------------- |
| Precondition   | User must be logged as Customer                 |
| Post condition | Product is removed from the Cart                |
| # Step         | Description                                     |
| 1              | User asks to remove a product                   |
| 2              | System checks if the product is valid, if so... |
| 3              | Product removed                                 |

| Scenario 14.2  |                                       |
| -------------- | :------------------------------------ |
| Precondition   | User must be logged as Customer       |
| Post condition | Operation aborted                     |
| # Step         | Description                           |
| 1              | User asks to remove a product         |
| 2              | System checks if the product is valid |
| 3              | Product not valid                     |
| 4              | Operation aborted                     |

### Use Case 15, UC15: Pay Cart

| User                            |                                   |
| ------------------------------- | :-------------------------------- |
| Precondition                    | User must be logged as Customer   |
| Post condition                  | Cart is payed                     |
| Nominal Scenario                | Scenario 15.1 and 15.2            |
| Variants                        | -                                 |
| Exceptions                      | - User has no cart or it is empty |
| Post condition (exception case) | Operation cancelled               |

| Scenario 15.1  |                                                        |
| -------------- | :----------------------------------------------------- |
| Precondition   | User must be logged as Customer                        |
| Post condition | Cart is payed                                          |
| # Step         | Description                                            |
| 1              | Users ask to pay its Cart                              |
| 2              | System checks if the Cart exists and that is not empty |
| 3              | Valid Cart                                             |
| 4              | Cart is payed                                          |

| Scenario 15.2  |                                                        |
| -------------- | :----------------------------------------------------- |
| Precondition   | User must be logged as Customer                        |
| Post condition | New stocks are NOT inserted into the System            |
| # Step         | Description                                            |
| 1              | Users ask to pay its Cart                              |
| 2              | System checks if the Cart exists and that is not empty |
| 3              | Not valid Cart                                         |
| 4              | Operation cancelled                                    |

### Use Case 16, UC16: Delete Cart

| User                            |                                   |
| ------------------------------- | :-------------------------------- |
| Precondition                    | User must be logged as Customer   |
| Post condition                  | Cart is deleted from the database |
| Nominal Scenario                | Scenario 16.1                     |
| Variants                        | -                                 |
| Exceptions                      |                                   |
| Post condition (exception case) |                                   |

| Scenario 16.1  |                                 |
| -------------- | :------------------------------ |
| Precondition   | User must be logged as Customer |
| Post condition | Cart is deleted                 |
| # Step         | Description                     |
| 1              | Users ask to delete the Cart    |
| 2              | System checks the Cart          |
| 3              | Valid Cart                      |
| 4              | Cart Deleted                    |

### Use case 17, UC17 Carts history

| User                            |                                 |
| ------------------------------- | :------------------------------ |
| Precondition                    | User must be logged as Customer |
| Post condition                  | Sold Cart history is shown      |
| Nominal Scenario                | Scenario 17.1                   |
| Variants                        | -                               |
| Exceptions                      |                                 |
| Post condition (exception case) |                                 |

| Scenario 17.1  |                                                                  |
| -------------- | :--------------------------------------------------------------- |
| Precondition   | User must be logged as Customer                                  |
| Post condition | Sold Cart history is shown                                       |
| # Step         | Description                                                      |
| 1              | Users press the button to view the history of previous purchases |
| 2              | History shown                                                    |

# Glossary

![Context diagram](V1-Images/Glossary.jpg)

# System Design

![Context diagram](V1-Images/System_design.jpg)

# Deployment Diagram

![Context diagram](V1-Images/DeploymentDiagram.jpg)

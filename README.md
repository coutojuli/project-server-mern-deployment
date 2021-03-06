## Name           :  Rankit Goyal
## Student Number :  N01351517
#  💻 How to run te Project?
    cd server
    nodemon index.js
    or
    node index.js

##   What's in index.js?    
    Database connection
    All Routes
    Server implementation running at port 5000

##   How to run and test with Postman 
    -> run project     
    -> Port number will be 5000
    -> Check console :Server running message shoule be consoled 
  
##  ADMIN ROUTES    

    [✓]  Admin registration requires unique Business Number
    [✓]  Admn Login just requires Email and Password
    [✓]  Generates Auth-Token
    [✓]  Admin can reset password without doing Login using business number and Email as credentials 
    [✓]  Admin can active and deactive the Users.

    Routes used for admin access:
   -> https://mernproject-app.herokuapp.com/restaurant/admin/register
   
   -> https://mernproject-app.herokuapp.com/restaurant/admin/login
   
   -> https://mernproject-app.herokuapp.com/restaurant/admin/reset-password
   
   -> https://mernproject-app.herokuapp.com/restaurant/admin/status


##  USER ROUTES
    [✓]  User registration requires unique Question and Answer
    [✓]  User Login just requires Email and Password
    [✓]  Generates Auth-Token
    [✓]  User can also reset password without doing Login using the Security question and answer that are requested and verified during New Password.
    [✓]  User can post/ask the Questions.
    [✓]  User can also Edit the Profile Details like Security Question, Security Answer,Password but not the Email.
    

    Routes used for Users access:
   -> https://mernproject-app.herokuapp.com/restaurant/user/register
   
   -> https://mernproject-app.herokuapp.com/restaurant/user/login
   
   -> https://mernproject-app.herokuapp.com/restaurant/user/edit-profile
   
   -> https://mernproject-app.herokuapp.com/restaurant/user/reset-password
   
   -> https://mernproject-app.herokuapp.com/restaurant/user/profile

##  FAQ ROUTES
   -> https://mernproject-app.herokuapp.com/restaurant/user/faq 


## Implementation 

    [✓] ADMIN MODULE
    [✓] USER MODULE
    [✓] FAQ MODULE
    
    [✓] Passwords Encryption Hash password
    [✓] Validations on all Fields 
    [✓] Unable to register with already registered Email
    
    [✓] Creating and assigning JWT Tokens 
    [✓] Using Middleware
    [✓] Authorization to Private Routes
    

## Name : Juliana Claussen
## Student Number: N0134898
## Assignment name: Project

ID values provided as an example. To execute those APIS first insert a cart, inventory item, or menu item and execute read all, read details, update, and delete.

## Tasks
- [x] Order Module: 
  - [x] 1. Cart API created to handle cart CRUD actions.
  - [x] Read all: https://mernproject-app.herokuapp.com/api/cart - GET
    - [x] Read details: https://mernproject-app.herokuapp.com/api/cart/605646eb4a739473ecb699d9 - GET
    - [x] Delete cart: https://mernproject-app.herokuapp.com/api/cart - DELETE
        -> header : x-auth-token ; body { "id":"60600cc045b48321cc9049d4"}
    - [x] Update cart: https://mernproject-app.herokuapp.com/api/cart- PUT
        ->header : x-auth-token ; body 
        {
            "id": "607263621ed14e4bb06bf306",            
            "items": [{
                    "item" : "Eggs Benedict",
                    "quantity" : "5",
                    "price": "69.5"
            },
            {
                    "item" : "Mountain Breakfast",
                    "quantity" : "3",
                    "price": "47.85"
            },
            {
                    "item" : "French Toast",
                    "quantity" : "2",
                    "price": "20.9"
            },
            {
                    "item" : "Expresso",
                    "quantity" : "2",
                    "price": "6.00"
            }
            ],
                "totalPrice": "123.35"
            }

    - [x] Insert cart: https://mernproject-app.herokuapp.com/api/cart - POST
        ->header : x-auth-token ; body 
        {
            "items": [{
                    "item" : "Eggs Benedict",
                    "quantity" : "5",
                    "price": "69.5"
            },
            {
                    "item" : "Mountain Breakfast",
                    "quantity" : "3",
                    "price": "47.85"
            },
            {
                    "item" : "French Toast",
                    "quantity" : "2",
                    "price": "20.9"
            },
            {
                    "item" : "Expresso",
                    "quantity" : "2",
                    "price": "6.00"
            }
            ],
                "totalPrice": "123.35"
        }

  - [x] 2. Menu API created to handle CRUD menu actions.
    - [x] Read all: https://mernproject-app.herokuapp.com/api/menu - GET
    - [x] Read details: https://mernproject-app.herokuapp.com/api/menu/605539452cab7f618078d7a9 - GET
    - [x] Delete menu item: https://mernproject-app.herokuapp.com/api/menu - DELETE
        -> header : x-auth-token ; body { "id":"60600cc045b48321cc9049d4"}
    - [x] Update menu item : https://mernproject-app.herokuapp.com/api/menu- PUT
        ->header : x-auth-token ; body {"id": "60553a4f2cab7f618078d7b5","name": "Carrot Cake","description": "None","category": "deserts","price": "6.45","img": "None","ingredients": "Carrot Cake(1)"}
    - [x] Insert menu item: https://mernproject-app.herokuapp.com/api/menu - POST
        ->header : x-auth-token ; body {"name": "Chocolate Milkshake","price": "6.25","category": "drinks","description": "None","img": "None","ingredients": "Chocolate Milkshake(1)"}

- [x] Inventory Module: 
 - [x] 1. Inventory API created to handle Inventoru CRUD actions.
    - [x] Read all: https://mernproject-app.herokuapp.com/api/inventory - GET
    - [x] Read details: https://mernproject-app.herokuapp.com/api/inventory/60600cc045b48321cc9049d4 - GET
    - [x] Delete inventory item: https://mernproject-app.herokuapp.com/api/inventory - DELETE
        -> header : x-auth-token ; body { "id":"60600cc045b48321cc9049d4"}
    - [x] Update Inventory item : https://mernproject-app.herokuapp.com/api/inventory - PUT
        ->header : x-auth-token ; body {"id": "606179e52c24193ce4595e72","name": "Beyond Meat","quantity": "10","status": "Available"}
    - [x] Insert Inventory item: https://mernproject-app.herokuapp.com/api/inventory - POST
        ->header : x-auth-token ; body {"name": "Banana Split","quantity": "50","status": "Available"}

## Learning Curve and challengers
Creating the cart API and its front-end was a challenge for this project. Merging the server side was also a challenge due to the differences in middleware and user models.

#
##  Name : Navdeep Singh
## Student Number: N01352563

## Tasks
- [x] added Employee model for the employee module which we will use in the employee module
- [x] added salary slip model for the employee module
- [x] added the employee route to implement the get, put, delete and post methods with validation
- [x] added the salary slip route for the employees to view their own salary slips
- [x] planning to implement these routes in sync with the admin model to have a hierarchy of admins, employees and users

#
##  Name : Mohit Sharma

## Tasks
- [x] Created Home page for the project.
- [x] Created a page named About us where the information about the restaurant has been provided.
- [x] Created a checkout page for payments.

 Routes used for user access:
   -> http://localhost:5000/resturant/checkout
   
   -> http://localhost:5000//resturant/home

   -> http://localhost:5000//resturant/about

#
##  Name : Lovish Gulati
## Student Number: N01350980

## Tasks
- [x] Added contact us page for users to get in touch in case of any query.
- [x] Added Admin's contact us page where admin can look at all the messages and details of the sender.
- [x] Added Reserve table page for users to reserve table in advance.


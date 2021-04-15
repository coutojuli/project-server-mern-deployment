const express = require('express');
const app = express();
const mongooose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Importing Routes
const registerRoute = require('./routes/userRoutes/register');
const loginRoute = require('./routes/userRoutes/login');
const profileRoute = require('./routes/userRoutes/profile');
const passwordRoute = require('./routes/userRoutes/resetPassword');
const editRoute = require('./routes/userRoutes/edit-profile');
const faq = require('./routes/faqRoute/faq');

const employee = require('./routes/employeeRoute');
const salarySlip = require('./routes/salarySlipRoute');


// Importing Admin Routes
const adminRegisterRoute = require('./routes/adminRoutes/adminRegister');
const adminLoginRoute = require('./routes/adminRoutes/adminLogin');
const adminPasswordRoute = require('./routes/adminRoutes/adminResetPassword');
const adminStatusRoute = require('./routes/adminRoutes/adminUserStatus');




const MenuRoute = require('./routes/MenuRoute');
const CartRoute = require('./routes/CartRoute');
const InventoryRoute = require('./routes/InventoryRoute');
const SalarySlip = require('./model/SalarySlip');

const HomeRoute = require('./routes/homeRoutes');
const CheckoutRoute = require('./routes/checkoutRoutes');

const ContactRoute = require('./routes/contactRoutes');
const ReserveRoute = require('./routes/reserveRoutes');


// Helps to load the Env files
dotenv.config();

// Connecting to Database
mongooose.connect(
    process.env.DB_CONNECT,
    {
         useCreateIndex      : true,
         useUnifiedTopology  : true,
         useNewUrlParser     : true,   
         useFindAndModify    : false,       
    },() => {    console.log('Connected to Database');
});


// Middleware
app.use(express.json());
app.use(cors());

// Route Middleware 
app.use('/restaurant/user/',registerRoute);    // Register

app.use('/restaurant/user/',loginRoute);       // Login

app.use('/restaurant/user/',profileRoute);     // Profile

app.use('/restaurant/user/',passwordRoute);    // Reset Password

app.use('/restaurant/user/',editRoute);        // Edit Profile 

app.use('/restaurant/user/',faq);              // FAQ 

app.use('/restaurant/employee/',employee);      //employee

app.use('/restaurant/employee/',salarySlip);    //salarySlip
 

app.use('/api/menu', MenuRoute);                // Menu

app.use('/api/cart', CartRoute);                // Cart

app.use('/api/inventory', InventoryRoute);              // Inventory


app.use('/restaurant/admin/',adminRegisterRoute) ;      // ADMiN Register

app.use('/restaurant/admin/',adminLoginRoute);          // ADMiN Login

app.use('/restaurant/admin/',adminPasswordRoute);       // ADMiN Reset Password

app.use('/restaurant/admin/',adminStatusRoute);       // ADMiN Status


app.use('/resturant/home', HomeRoute);                // Home

app.use('/resturant/checkout', CheckoutRoute); // checkout

app.use('/resturant/contact', ContactRoute);               

app.use('/resturant/reserve', ReserveRoute);

//app.use('/resturant/adminContact', AdminContactRoute);



// Server Call
// app.listen(5000, () =>{
//     console.log("Server up and running at port 5000...Happy Coding !!");
// })

app.listen(process.env.PORT || 5000);
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mySqlPool = require('./config/db');
const ejs = require('ejs');
const path = require('path');
const { getallproducts } = require('./Controllers/productController');
const { getallcategory } = require('./Controllers/categoryController');
const template_path = path.join(__dirname, "/views");


//initialize express
dotenv.config();
const app = express();
app.use(express.json());
//routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/category',require('./routes/categoryRoutes'));

//middleware
app.set('view engine', 'ejs');
app.set("views",template_path);
app.use(morgan("dev"));

//port
const PORT = process.env.PORT || 8000;

//conditionally Listen
mySqlPool.query('Select 1').then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}/api/products`);
    });  
})


app.get('/products',getallproducts,getallcategory, async (req,res) => {
    res.render("product",{ data: req.data, category: req.categorydata, totalProductsCount: req.totalProductsCount})
})

app.get('/category',getallcategory,async(req,res) => {
    res.render("category",{category: req.categorydata})
})
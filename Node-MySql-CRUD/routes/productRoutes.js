const express = require('express');
const { getallproducts,getproductbyId,createproduct ,updateproduct, deleteproduct} = require('../Controllers/productController.js');
const { getallcategory } = require('../Controllers/categoryController.js');
const router = express.Router()

//routes

//get all
router.get('/getall/:pageno', getallproducts, getallcategory, async (req,res) => {
    res.render("product",{ data: req.data, category: req.categorydata, totalProductsCount: req.totalProductsCount})
});

//get by id
router.get('/get/:id',getproductbyId);

router.post('/create', createproduct);

router.put('/update/:id', updateproduct);

//delete product
router.delete('/delete/:id',deleteproduct);

module.exports = router;
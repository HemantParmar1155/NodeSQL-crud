const express = require('express');
const { getallcategory, getcategorybyId,createcategory, update, deletecategory } = require('../Controllers/categoryController');
const categoryrouter = express.Router();

categoryrouter.get('/getall',getallcategory);

categoryrouter.get('/getcategorybyId/:id',getcategorybyId);

categoryrouter.post('/createcategory',createcategory);

categoryrouter.put('/update/:id',update);
categoryrouter.delete('/deletecategory/:id',deletecategory);

module.exports = categoryrouter;
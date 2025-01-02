const db = require("../config/db");

const getallproducts = async (req,res,next) => {
     try {
        const pageno = req?.params?.pageno || 1;
        const pagesize = 10
        const [dataCount] = await db.query(" SELECT count(*) as totcount FROM product join category on category.categoryid = product.categoryid");
        
        
        const [data] = await db.query(" SELECT product.*, category.categoryname  FROM product join category on category.categoryid = product.categoryid LIMIT ? OFFSET ? ", [pagesize, (pageno - 1) * pagesize]);
        if(!data.length) {
            // return res.status(404).send({
            //     success: false,
            //     message: "No records found"
            // })
            req.data = []
        }
        // res.status(200).send({
        //     sucess: true,
        //     message: "All products records",
        //     totalProducts: data.length,
        //     data
        // })
        req.data = data
        req.totalProductsCount = Math.round(dataCount[0].totcount/pagesize)
        next();
     } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error
        })
     }
}

//get Product by id
const getproductbyId = async (req,res) => {
    try {
        const productid = req.params.id;
        if(!productid) {
            res.status(404).send({
                success: false,
                message: "No such product ID found"
            })
        }
        const data = await db.query(' SELECT * FROM product WHERE productid = ? ',[productid]);
        if(!data) {
            res.status(404).send({
                success: false,
                message: "NO such Products found"
            })
        }
        res.status(200).send({
            success: true,
            productDetails: data[0]
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getproductbyid API",
            error
        })
     }
}

//create product
const createproduct = async (req,res) => {
    try {
        const { productname,categoryid } = req.body;
        if( !productname || !categoryid ) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields"
            })
        }
        const [checkdata] = await db.query("SELECT * FROM product WHERE LOWER(productname) = LOWER(?)",[productname])
        if(checkdata.length) {
            return res.status(404).send({
                success: false,
                message: "Already productname exist"
            })
        }
        const data = await db.query("INSERT INTO product (productname,categoryid) VALUES (?,?)",[productname,categoryid])
        if(!data) {
            return res.status(404).send({
                success: false,
                message: "Something went wrong"
            })
        }
        res.status(200).send({
            success:true,
            message: "New product added to database successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error
        })
        
    }
}

//update product
const updateproduct = async (req,res) => {
    try {
        const productid = req.params.id;
        if(!productid) {
            return res.status(404).send({
                success: false,
                message: "No such productid found"
            })
        } 
        const { productname,categoryname} = req.body;
        const [checkdata] = await db.query("SELECT * FROM product WHERE LOWER(productname) = LOWER(?)",[productname])
        // console.log(checkdata)
        if(checkdata.length) {
            return res.status(404).send({
                success: false,
                message: "Already productname exist"
            })
        }
        const [data] = await db.query("UPDATE product SET productname = ?, categoryid = ? WHERE productid = ?" ,[productname,categoryname, productid])
        if(!data) {
            return res.status(404).send({
                success: false,
                message: "Error in Update data"
            })
        }
        res.status(200).send({
            success: true,
            message: "product updated succcessfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "INternal server error",
            error
            }
        )
    }
}

//delete product
const deleteproduct = async (req,res) => {
    try {
        const productid = req.params.id;
        if(!productid) {
            return res.status(404).send({
                success: false,
                message: "No such productid found"
            })
        } 
        const checkdata = await db.query("SELECT * FROM product WHERE productid = ?",[productid])
        if(!checkdata[0].length) {
            return res.status(404).send({
                success: false,
                message: "productid does not exist"
            })
        }
        await db.query("DELETE FROM product WHERE productid = ?" ,[productid])
        res.status(200).send({
            success: true,
            message: "product deleted succcessfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "INternal server error",
            error
            }
        )
    }
}
module.exports = {getallproducts,getproductbyId,createproduct,updateproduct,deleteproduct}
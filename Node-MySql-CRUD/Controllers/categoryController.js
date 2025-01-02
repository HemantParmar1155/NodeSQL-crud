const db = require("../config/db");

const getallcategory = async (req,res,next) => {
     try {
        const [categorydata] = await db.query(" SELECT * FROM category ");
        if(!categorydata) {
            // return res.status(404).send({
            //     success: false,
            //     message: "No records found"
            // })
            req.categorydata = [];  
        }
        // res.status(200).send({
        //     sucess: true,
        //     message: "All category records",
        //     totalcategorys: data[0].length,
        //     data: data[0]
        // })
        req.categorydata = categorydata;
        next()
     } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getallcategory API",
            error
        })
     }
}

//get category by id
const getcategorybyId = async (req,res) => {
    try {
        const categoryid = req.params.id;
        
        if(!categoryid || categoryid === 0) {
            res.status(404).send({
                success: false,
                message: "No such category ID found"
            })
        }
        const [data] = await db.query(' SELECT * FROM category WHERE categoryid = ? ',[categoryid]);
        if(!data.length) {
            res.status(404).send({
                success: false,
                message: "NO such categorys found"
            })
        }
        res.status(200).send({
            success: true,
            categoryDetails: data[0]
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getcategorybyid API",
            error
        })
     }
}

//create category
const createcategory = async (req,res) => {
    try {
    const {categoryname}  = req.body;
        if(!categoryname ) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields"
            })
        }
        const checkdata = await db.query("SELECT * FROM category WHERE LOWER(categoryname) = LOWER(?)",[categoryname])
        if(!checkdata.length) {
            return res.status(404).send({
                success: false,
                message: "Already categoryname exist"
            })
        }
        const data = await db.query("INSERT INTO category (categoryname) VALUES (?)",[categoryname])
        if(!data) {
            return res.status(404).send({
                success: false,
                message: "Error in Insert Query"
            })
        }
        res.status(200).send({
            success:true,
            message: "New category added to database successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in createcategory API",
            error
        })
        
    }
}

//update category
const update = async (req,res) => {
    try {
        const categoryid = req.params.id;
        if(!categoryid) {
            return res.status(404).send({
                success: false,
                message: "No such categoryid found"
            })
        } 
        const { categoryname} = req.body;
        const [checkdata] = await db.query("SELECT * FROM category WHERE LOWER(categoryname) = LOWER(?)",[categoryname])
        console.log(checkdata)
        if(checkdata.length) {
            return res.status(404).send({
                success: false,
                message: "Already categoryname exist"
            })
        }
        const [data] = await db.query("UPDATE category SET  categoryname = ? WHERE categoryid = ?", [categoryname,categoryid])
        if(!data) {
            return res.status(404).send({
                success: false,
                message: "Error in Update data"
            })
        }
        res.status(200).send({
            success: true,
            message: "category updated succcessfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updatecategory API",
            error
            }
        )
    }
}

//deletecategpry
const deletecategory = async (req,res) => {
    try {
        const categoryid = req.params.id;
        if(!categoryid) {
            return res.status(404).send({
                success: false,
                message: "No such categoryid found"
            })
        }
        const [data] = await db.query("DELETE FROM category WHERE categoryid = ?", [categoryid]);
        if (!data || data.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No such category found",
            });
        }        
        res.status(200).send({
            success: true,
            message: "category deleted succcessfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in deletecategory API",
            error
            }
        )
    }
}
module.exports = {getallcategory,getcategorybyId,createcategory, deletecategory,update}
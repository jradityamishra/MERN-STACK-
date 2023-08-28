import categoryModel from "../models/categoryModel.js"
import slugify from "slugify"

//category controller



export const createCategoryController=async(req,resp)=>{
    try {
        const { name } = req.body;
        if (!name) {
          return resp.status(401).send({ message: "Name is required" });
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
          return resp.status(200).send({
            success: false,
            message: "Category Already Exisits",
          });
        }
        const category = await new categoryModel({
          name,
          slug: slugify(name),
        }).save();
        resp.status(201).send({
          success: true,
          message: "new category created",
          category,
        });
      } catch (error) {
        console.log(error);
        resp.status(500).send({
          success: false,
          errro,
          message: "Errro in Category",
        });
      }
}

//UPDATE CATEGORY

export const updateCategoryController=async(req,resp)=>{
    try{
        const {name}=req.body
        const {id}=req.params
        const category=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        resp.status(200).send({
            success:true,
            message:"category update sucessfull",
            category,
        })
    }catch(error){
        console.log(error)
        resp.status(500).send({
            success:false,
            message:"Error in update category"
        })
    }
}

//get all category

export const CategoryController=async(req,resp)=>{
    try{
        const category=await categoryModel.find({})
        resp.status(200).send({
            success:true,
            message:'sucessfully we get category',
            category
        })
    }catch(error){
        console.log(error)
    resp.status(500).send({
        success:false,
        message:'Error in get all data'
    })}
}

//GET SINGLE DATA

export const singleCategoryController=async(req,resp)=>{
    try{
        const {slug}=req.params
        const singlecategory=await categoryModel.findOne({slug})
        resp.status(200).send({
            success:true,
            message:'successfully we get single category',
            singlecategory
        })
    }catch(error){
        console.log(error)
    resp.status(500).send({
        success:false,
        message:'error in getting single data',
        error
    })}
}

//delete category

export const deleteCategoryController=async(req,resp)=>{
    try{
        const {id}=req.params;
        await categoryModel.findByIdAndDelete(id)
        resp.status(200).send({
            success:true,
            message:'successfully delete category',
            
        })
    }catch(error){
        console.log(error)
        resp.status(500).send({
            success:false,
            message:'error in deleting data',
            error
        }) }
}
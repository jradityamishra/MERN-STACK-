import slugify from "slugify"
import productModel from "../models/productModel.js"
import fs from 'fs'
import { isValidObjectId } from "mongoose"

export const createProductController = async (req, resp) => {
    try {
        const { name, description, slug, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        //validation
        switch (true) {
            case !name:
                return resp.status(500).send({ message: "Name is required!" })
            case !description:
                return resp.status(500).send({ message: "Description is required!" })
            case !price:
                return resp.status(500).send({ message: "price is required!" })

            case !category:
                return resp.status(500).send({ message: "category is required!" })
            case !quantity:
                return resp.status(500).send({ message: "quantity is required!" })
            // case !shipping:
            //     return resp.status(500).send({ message: "shipping is required!" })
            case !photo && photo.size > 1000000: //1 mb sa jayada nhi hona chahiya
                return resp.status(500).send({ message: "photo is required! and less than 1 mb" })
        }
        const product = new productModel({ ...req.fields, slug: slugify(name) }) //jitna v req aa raha hai usko ... sa la lega
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        resp.status(201).send({
            sucess: true,
            message: "product created successfully",
            product
        })
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "error in creating product",
            error
        })
    }
}

//get all products

export const getProductController = async (req, resp) => {
    try {
        const products = await productModel
            .find({})
            .populate('category')
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 }) //initial time pa photo nhi chahiya
        //limit 12 ka kar diya hai and sort karenga jaisa jaisa create hoga                            
        resp.status(200).send({
            success: true,
            message: "AllProduct we get",
            products
        });
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "error in getting product",
            error: error.message
        })
    }
}

//get single product

export const getSingleProductController = async (req, resp) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category")
        resp.status(200).send({
            success: true,
            message: "Single product fetch",
            product
        });
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "error in getting single product",
            error: error.message
        })
    }
}

//get photo
export const getPhotoProductController = async (req, resp) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo")
        if (product.photo.data) {
            resp.set('content-type', product.photo.contentType)
            return resp.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "error in photo",
            error: error.message
        })
    }

}

//delete product

export const deleteProductController = async (req, resp) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        resp.status(200).send({
            success: true,
            message: "product deleted",

        });
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "error in deleting product",
            error: error.message
        })
    }
}

//update product
export const updateProductController = async (req, resp) => {
    try {
        const { name, description,slug, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        //validation
        switch (true) {
            case !name:
                return resp.status(500).send({ message: "Name is required!" })
            case !description:
                return resp.status(500).send({ message: "Description is required!" })
            case !price:
                return resp.status(500).send({ message: "price is required!" })

            case !category:
                return resp.status(500).send({ message: "category is required!" })
            case !quantity:
                return resp.status(500).send({ message: "quantity is required!" })
            // case !shipping:
            //     return resp.status(500).send({ message: "shipping is required!" })
            case photo && photo.size > 1000000: //1 mb sa jayada nhi hona chahiya
            return resp.status(500).send({ message: "photo is required! and less than 1 mb" })
        }
        const product = await productModel.findByIdAndUpdate(req.params.pid,
            { ...req.fields,slug: slugify(name) }, { new: true })
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save();
        resp.status(200).send({
            success: true,
            message: "product updated",
            product

        });

    } catch (error) {
        console.log(error)
        // console.log(pid)

        resp.status(500).send({
            success: false,
            message: "error in updating product",
            error: error.message
           
        })
    }
}

//FILTER CONTROLLER

export const productFilterController=async(req,resp)=>{
     try{
        const {checked,radio}=req.body;
        let args={}
        if(checked.length>0)args.category=args.checked;
        if(radio.length)args.price={$gte:radio[0],$lte:radio[1]}
        const products= await productModel.find(args);
        resp.status(200).send({
            success:true,
            products,
        })
     }catch(error){
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "error in filtering product",
            error
           
        })
    }
}

//SERACH PRODUCT
export const searchController=async(req,resp)=>{
    try{
        const {keyword}=req.params
        const products=await productModel.find({
            $or:[
                {name:{$regex:keyword,$options:'i'}},
                {description:{$regex:keyword,$options:'i'}}
            ]
        }).select("-photo");
        resp.json(products)
    }catch(error){
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "error in searching product",
            error
           
        })}
}

//get related product

export const relatedproductController=async(req,resp)=>{
    try{
        const {pid,cid}=req.params
        const products=await productModel.find({
            category:cid,
            _id:{$ne:pid}//iss id ko include nhi karna hai
        }).select("-photo").limit(3).populate("category")
        resp.status(200).send({
            success:true,
            products,
        })
    }catch(error)
    {console.log(error)
        resp.status(500).send({
            success: false,
            message: "error in getting related product",
            error
           
        })
    }
}
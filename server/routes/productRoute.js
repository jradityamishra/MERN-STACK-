import express from 'express'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js'
import { createProductController,
         getProductController,
         getSingleProductController
        ,getPhotoProductController,
        deleteProductController,
        updateProductController} from "../controller/productController.js"
import formidable from "express-formidable"

const router=express.Router()

//create Route
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)

//get Products
router.get('/get-product',getProductController)

//single product
router.get('/get-product/:slug',getSingleProductController)

//get Photo
router.get('/get-photo/:pid',getPhotoProductController)

//product delete
router.get('/product-delete/:pid',deleteProductController)

//update product
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)

export default router
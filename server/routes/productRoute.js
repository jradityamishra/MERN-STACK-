import express from 'express'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js'
import { createProductController,
         getProductController,
         getSingleProductController
        ,getPhotoProductController,
        deleteProductController,
        updateProductController,
        productFilterController,
        searchController,
        relatedproductController} from "../controller/productController.js"
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
router.delete('/product-delete/:pid',deleteProductController)

//update product
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)

//filter products
router.post('/product-filters',productFilterController)

//search product
router.get('/search/:keyword',searchController)

//similar product
router.get("/related-product/:pid/:cid",relatedproductController)

export default router
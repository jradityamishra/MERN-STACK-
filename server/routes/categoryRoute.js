import express from 'express';
import { isAdmin, requireSignIn } from './../middleware/authMiddleware.js';
import {createCategoryController,
        updateCategoryController,
        CategoryController,
        singleCategoryController,
        deleteCategoryController} from "../controller/categoryController.js"
const router=express.Router();

//routes

//CREATE CATEGORY
router.post('/create-category',createCategoryController)

//UPDATE CATEGORY
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

//GET ALL CATEGORY
router.get('/category',CategoryController)

//SINGLE CATEGORY 
router.get('/single-category/:slug',singleCategoryController)

//DELETE CATEGORY
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)

export default router 
import  express  from "express";
import  {registerController,loginController,testController,forgotpasswordController} from "../controller/authController.js"
import {requireSignIn,isAdmin} from "../middleware/authMiddleware.js"
//router object
const router=express.Router()


//routing


//REGISTER || METHOD POST
router.post("/register",registerController)
//LOGIN ||METHOD POST
router.post("/login",loginController);
//Forgot password||POST
router.post("/forgot-password",forgotpasswordController);

//protected routes
router.get("/user-auth",requireSignIn,(req,resp)=>{
resp.status(200).send({ok:true});
})




export default router

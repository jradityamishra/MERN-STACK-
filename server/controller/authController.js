import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, resp) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validation
    if (!name) {
      return resp.send({ message: "name is required" });
    }
    if (!email) {
      return resp.send({ message: "eamil is required" });
    }
    if (!password) {
      return resp.send({ message: "password is required" });
    }
    if (!phone) {
      return resp.send({ message: "Phone no is required" });
    }
    if (!address) {
      return resp.send({ message: "address is required" });
    }
    if (!answer) {
      return resp.send({ message: "answer is required" });
    }

    //check user
    const existuser = await userModel.findOne({ email });
    //existing user
    if (existuser) {
      return resp.status(200).send({
        sucess: false,
        message: "already Register please login",
      });
    }

    //register user
    const hassedpassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      answer,
      password: hassedpassword,
    }).save();
    resp.status(200).send({
      sucess: true,
      message: "user register sucessfully",
      user,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      sucess: false,
      message: "Error in registeration",
      error,
    });
  }
};

//LOGIN

export const loginController = async (req, resp) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return resp.status(404).send({
        success: false,
        message: "invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return resp.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return resp.status(200).send({
        sucess: false,
        message: "Invalid Password!",
      });
    }
    //create token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    resp.status(200).send({
        sucess:true,
        message:"login sucesssfully",
        user:{
            name:user.name,
            email:user.email,
            phone:user.phone,
            address:user.address,
            role:user.role,
        },
        token
    })
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      sucess: false,
      message: "Error in login",
      error,
    });
  }
};

//FORGOT PASSWORD
export const forgotpasswordController=async(req,resp)=>{
  try {
    const {email,answer,newPassword}=req.body
    if(!email){
      resp.status(400).send({message:'Email is require'})
    }
    if(!answer){
      resp.status(400).send({message:'answer is require'})
    }
    if(!newPassword){
      resp.status(400).send({message:'newPassword is require'})
    }
    //check email and answer if coreect than change pass
    const user=await userModel.findOne({email,answer});
    //validation
    if(!user){
     return resp.status(401).send({sucess:false,message:'invalid Email or Answer!'})
    }
    const hashed=await hashPassword(newPassword)
    await userModel.findByIdAndUpdate(user._id,{password:hashed})
    resp.status(200).send({
      sucess:true,
      message:"change password successfully"
    })
  }catch(error){
    console.log(error)
  resp.status(500).send({
    sucess:false,
    message:'Error in forgot password',
    error
  })}
}
//token testing

export const testController=async(req,resp)=>{
resp.send("protected route")
}
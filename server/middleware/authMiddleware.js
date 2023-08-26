import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//protected routes
export const requireSignIn = async (req, resp, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    ); //VERIFY USE FOR COMPARE TOKEN
   req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin access

export const isAdmin = async (req, resp, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return resp.status(401).send({ 
        sucess:false,
        message: "you are not admin" });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    resp.status(401).send({
      sucess:false,
      error,
      message:"Error is admin middleware"
    })
  }
};

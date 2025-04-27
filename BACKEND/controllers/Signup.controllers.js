
import mongoose from "mongoose";
import User from "../models/user.models.js";



export const Signup = async(name,email,password,phoneNumber,role,address)=>{
    try {

        const existingUser = await User.findOne({
            email:email
        })
        
        if(existingUser)
        {
             return {status:'failed', message:'User already exists'}
        }

        const user = new User({
            name:name,
            email:email,
            password:password,
            phone:phoneNumber,
            address:address,
            role:role || 'patient',
           
        })

        await user.save()

        console.log("User created successfully")

        return {status:'success', message:'User registered successfully'}



    }
    catch (error) {
        console.error(error)
        return {status:'failed', message:'Error registering user'}
    }



}

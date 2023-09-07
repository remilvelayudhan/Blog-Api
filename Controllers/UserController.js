
const bcrypt = require('bcrypt');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

require('dotenv').config();

const userRegister = async (req, res) => {
    const {username, email,password} =req.body;
    console.log(req.body);
    try{
        const user = await User.create({username, email, password});
        res.status(201).json({data:user,message:"User registered successfully"});

    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const userLogin = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"})
        }
        const token = jwt.sign({id:user._id}, process.env.JWT_SCERET_KEY);
        
        res.json({token:token,data:user,message:"User logged in successfully",});
    }catch(err){
        res.status(500).json({message:err.message})
    }
    
}

const transporter =nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS
    }
})

const sendOtp =async (req,res)=>{
    const {email} =req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    const mailOptions ={
        from:process.env.EMAIL,
        to:email,
        subject:'OTP for password reset',
        text:`Your otp is ${otp}`
    }
    try{
        transporter.sendMail(mailOptions,async (err,info)=>{
          if(err){
              return res.status(500).json({message:err.message})
          }else{
            const user = user.findOne({email});
            if(!user){
                return res.status(404).json({message:"User not found"})
            }
            user.otp = otp;
            await user.save();
            res.json({message:"Otp sent successfully"})
          }
        
        })

    }catch(err){
        res.status(500).json({message:err.message})

    }
}

const changePassword = async (req,res)=>{
    const {email,otp,newpassword} =req.body;
    try{
     const user = await user.findOne({email});
     if(!user){
         return res.status(404).json({message:"User not found"})
     }
     if(user.otp !== otp){
         return res.status(401).json({message:"Invalid otp"})
     }
     user.password = newpassword;
     await user.save();
     res.json({message:"Password changed successfully"})

    }catch(err){
        res.status(500).json({message:err.message})

    }
     
}

module.exports = {userRegister,userLogin,sendOtp}
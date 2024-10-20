import express from 'express';
import User from '../models/userModel.js';
import crypto from 'crypto';
import bcryptjs from 'bcryptjs';
const router = express.Router();

router.post('/register',async (req,res)=>{
    const {username,password} = req.body;
    if(!username){
        return res.status(400).json({message:"Username is required"});
    }
    if(!password){
        return res.status(400).json({message:"Password is required"});
    }
    console.log({username,password});
    const existingUser = await User.findOne({username});
    console.log(existingUser);
    if(existingUser){
        return res.status(400).json({message:"User already exists"});
    }
    const apiKey = crypto.randomBytes(20).toString('hex');
    try {
        const salt = await bcryptjs.genSalt(8);
        const hashedPass = await bcryptjs.hash(password,salt);
        const user = new User({username,password:hashedPass,apiKey});
        await user.save();
        res.status(200).json({apiKey});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
})

export default router;
/*
//register user : /api/user/register

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    try{
const {name, email, password} =req.body;
if(!name || !email || !password){
    return res.json({success: false, message: 'invalid credentials'});
}
const existingUser = await User.findOne({email})
if(existingUser)
    return res.json({success: false, messgae: 'user already exists'})
const hashedpassword = await bcrypt.hash(password, 10)
const user = await User.create({name, email, password: hashedpassword})
const token =jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

res.cookie('token', token, {
    hhtpOnly: true, //prevent js to access cookie
    secure: process.env.NODE_ENV ==='production', //use secure cookies in production
    sameSite: process.env.NODE_ENV ==='production' ? 'none' : 'strict', //csrf protection 
    maxAge: 7*24*60*60*1000, //cookie expiry date

})
return res.json({success: true, user: {email: user.email, name: user.name}})
    } 
    catch (error){
        console.log(error.message);
res.json({success: false, message: error.message});
    }
    
}



//login user : /api/user/login
export const login = async (req, res) => {
try{
    const {email, password} = req.body;
    if (!email || !password)
        return res.json({success: false, message: 'email and password are required'});
    const user = await User.findOne({email});

    if (!user){
        return res.json({success: false, message: 'invalid credentials'});
}
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch){
    return res.json({success: false, message: 'invalid credentials'});
}
const token =jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

res.cookie('token', token, {
    hhtpOnly: true, 
    secure: process.env.NODE_ENV ==='production', 
    sameSite: process.env.NODE_ENV ==='production' ? 'none' : 'strict', 
    maxAge: 7*24*60*60*1000, 

});
return res.json({success: true, user: {email: user.email, name: user.name}})
}
catch (error){
console.log(error.message);
res.json({success: false, message: error.message});
}
}

//check auth : api/user/is-auth

export const isAuth = async (req, res) => {
    try{
const { userId }  =   req.body;
const user =   await User.findById(userId).select("-password")
return res.json({success: true, user})

    }
    catch (error){
console.log(error.message);
res.json({success: false, message: error.message});
    }
}

//logout user: /api/user/logout
export const logout = async (req, res )=> {
    try{
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV ==='production',
            samesite: process.env.NODE_ENV ==='production' ? 'none' : 'strict',
        });
        return res.json({success: true, message: "logged out"})
    }
    catch(error){
console.log(error.message);
res.json({success: false, message: error.message});
    }
}
   */
  import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register user: /api/user/register
export const register = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.json({success: false, message: 'invalid credentials'});
        }
        
        const existingUser = await User.findOne({email});
        if(existingUser)
            return res.json({success: false, message: 'user already exists'}); // Fixed typo
            
        const hashedpassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashedpassword});
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true, // Fixed typo: was hhtpOnly
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7*24*60*60*1000,
        });
        
        return res.json({success: true, user: {email: user.email, name: user.name}});
    } 
    catch (error){
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// Login user: /api/user/login
export const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if (!email || !password)
            return res.json({success: false, message: 'email and password are required'});
            
        const user = await User.findOne({email});
        if (!user){
            return res.json({success: false, message: 'invalid credentials'});
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.json({success: false, message: 'invalid credentials'});
        }
        
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true, // Fixed typo: was hhtpOnly
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7*24*60*60*1000,
        });
        
        return res.json({success: true, user: {email: user.email, name: user.name}});
    }
    catch (error){
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// Check auth: api/user/is-auth
export const isAuth = async (req, res) => {
    try{
        // Get userId from req object (set by middleware), not req.body
        const userId = req.userId;
        const user = await User.findById(userId).select("-password");
        return res.json({success: true, user});
    }
    catch (error){
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// Logout user: /api/user/logout
export const logout = async (req, res) => {
    try{
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', 
        });
        return res.json({success: true, message: "logged out"});
    }
    catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}
 
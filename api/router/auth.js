const jwt=require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt =require('bcryptjs');
const authenticate=require("../middleware/authenticate");

require('../db/conn');
const User = require("../model/userSchema");


router.post('/api/register', async (req, res) => {
    try {
        const { name, email, phone, work, password, cpassword } = req.body;

        if (!name || !email || !phone || !work || !password || !cpassword) {
            return res.status(422).json({error: 'Please fill in all the fields properly'});
        }

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email already exists" });
        }
        else if(password !=cpassword){
            return res.status(422).json({error:"password are not matching"});
        }
        else{
            const user = new User({ name, email, phone, work, password, cpassword });
            //database me seave karne se pahle hashing
            await user.save();
            res.status(201).json({ message: "User registered successfully" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to register" });
    }
});
//login
router.post('/api/signin', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ error: "Please fill in all the fields" });
      }
  
      const userLogin = await User.findOne({email:email });
  
      if (!userLogin) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }
  
      const isMatch = await bcrypt.compare(password, userLogin.password);
  
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }
  
      const token = await userLogin.generateAuthToken();
  
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
         
      });
  
      res.json({ message: "User signed in successfully" });
    } catch (error) {
      console.error("Error during signin:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

router.get('/api/about',authenticate,async(req, res)=>{
  console.log("hello my About");
  res.send(req.rootUser);
})

router.get('/api/getdata', authenticate, async(req, res)=>{
    console.log("this is contact page")
    res.send(req.rootUser);
})

router.post('/api/contact',authenticate, async(req, res)=>{
  try {
    const {name, email, phone, message}=req.body;
    if(!name || !email || !phone ||!message){
      console.log("error in contact form");
      return res.json({error: "please filled the contact form"});
    }
    const userContact =await User.findOne({_id:req.UserID});
    if(userContact){
      const userMessage=await userContact.addMessage(name, email, phone, message);
      await userContact.save();
      res.status(201).json({message:"user Contact successfully"});
      console.log("message send")
    }
   
   
  } catch (error) {
    console.log(error)
  }
})
router.get('/api/logout', (req, res)=>{
 res.clearCookie('jwtoken',{path:'/'})
 res.status(200).send("user logout")
 console.log("logout successfully")
})
module.exports = router;


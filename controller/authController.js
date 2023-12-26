const { response } = require('express');
const { hashPassword, comparePassword } = require('../helper/authHelper');
const userModel = require('../models/user');

const JWT = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const registerController = async (req,res) =>{
    try {
        const {name,mobile,email,password}= req.body;
        if(!name){
            return res.send({error:'Name is Requires'});
        }
        if(!mobile){
            return res.send({error:'Mobile Number is Requires'});
        }
        if(!email){
            return res.send({error:'Email is Requires'});
        }
        if(!password){
            return res.send({error:'Password is Requires'});
        }

        //Checking For Existing User
        const ExistingUser = await userModel.findOne({email});
        if(ExistingUser){
            return res.status(200).send({
                sucess:true,
                message: 'Already Registered Please Login'
            })
        }

        //Hashing User Passwword
        const hashedPassword = await hashPassword(password);

        //Register User
        const user = await new userModel({name,mobile,email,password:hashedPassword}).save();

        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
          });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:'Error while Registering',
            error
        })
    }
}
const loginController= async (req, res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            res.status(403).send({
                success:false,
                message: 'Invalid Email or Password'
            })
        }
        //Check User
        const user = await userModel.findOne({email: email});
        if(!user){
            return res.status(403).send({
                success:false,
                message: 'Email is Not Registered'
            });
        }
        const match= await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                sucess:true,
                message: 'Invalid Password'
            })
        }
        //Token Generation
        const token = await JWT.sign({_id:user._id},JWT_SECRET,{
            expiresIn:'7d'
        });
        res.status(200).send({
            success:true,
            message: 'User Logged In Successfully',
            user:{
                name:user.name,
                mobile:user.mobile,
                email:user.email
            },
            token
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message:'Error while Login',
            error
        })
    }
}
module.exports = {registerController,loginController}
const { hashPassword } = require('../helper/authHelper');
const userModel = require('../models/user');

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
            message:'Error while registering',
            error
        })
    }
}

module.exports = {registerController}
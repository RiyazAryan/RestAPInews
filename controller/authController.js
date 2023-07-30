var jwt= require('jsonwebtoken');
var bcrypt=require('bcrypt');
var user=require('../models/users');
const Users = require('../models/users');
require("dotenv").config();

var signup=(req, res)=>{
    const user=new Users({
        fullName: req.body.fullName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,8),
        Preferences: req.body.Preferences,
    });
    user.save().then((data)=>
        {
            return res.status(200).send({
                "message":"User registered Successfully"
            });
        })
        .catch(err=>{
            return res.status(500).send({
                message:err
            });
        });
};

var signin=(req,res)=>{
    user.findOne({
        email:req.body.email
    }).then((user)=>{
        if(!user){
            return res.status(404).send({"message":"User not found"});
        }
        var passwordisValid= bcrypt.compareSync(req.body.password, user.password);
        if(!passwordisValid){
            return res.status(401).send({
                accessToken : null,
                message:"Invalid Password provided"
            });
        }
        var token=jwt.sign({
            id: user.id
        },process.env.API_SECRET,{
            expiresIn: 86400
        });
        return res.status(200).send({
            user:{
                id: user._id,
                email: user.email,
                fullName:user.fullName
            },
            message:"Login Successful",
            accessToken: token
        });
    }).catch(err=>{
        return res.status(500).send({
            message:err
        })
    });
};

module.exports={signup,signin};
const news = require("express").Router();
const bodyparser=require("body-parser");
const URLSearchParams= require("url-search-params");
const {newspromise} = require("../controller/promise");
const {verifyToken} = require("../middleware/authJWT");
User=require("../models/users");

news.use(bodyparser.json());
news.use(bodyparser.urlencoded({extended:true}));

let url="https://newsapi.org/v2/everything";
let url2="https://api.newscatcherapi.com/v2/latest_headlines?countries=US";

news.get('/news',verifyToken,(req,res)=>{
    if(!req.user && req.message==null)
    {
        res.status(403).send({
            message: 'Invalid JWT Token'
        });
    }
    else if(!req.user && req.message)
    {
        res.status(403).send({
            message: req.message
        });
    }
    let pref=req.user.Preferences;
    let payload='?q='+pref;
    let payload2='&topic='+pref;
    let config = {
        method : this.get,
        url: url+""+payload,
        headers: { 
          'x-api-key': '75a6c4589ba246068b769db6ae79bb7c'
        }
      };
      let config2 = {
        method : this.get,
        url: url2+""+payload2,
        headers: { 
          'x-api-key': 'EtL_LAtTobhYcX8WSFPm5uwezNlQP_RftxtbSV8Mris'
        }
      };
    let promise1=newspromise(config);
    let promise2=newspromise(config2);
    Promise.all([promise1,promise2]).then((values)=>{
        res.status(200).json(values);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({error: err});
    });
});

news.get('/',(req,res)=>{
    res.status(200).send("Welcome to Daily News, Please login/Sign up for Token");
})

news.get('/preferences',verifyToken,(req,res)=>{
    if(!req.user && req.message==null)
    {
        res.status(403).send({
            message: 'Invalid JWT Token'
        });
    }
    else if(!req.user && req.message)
    {
        res.status(403).send({
            message: req.message
        });
    }
    res.status(200).send({
        message: req.user.Preferences
    });
})

news.put('/preferences',verifyToken,(req,res)=>{
    if(!req.user && req.message==null)
    {
        res.status(403).send({
            message: 'Invalid JWT Token'
        });
    }
    else if(!req.user && req.message)
    {
        res.status(403).send({
            message: req.message
        });
    }
    console.log(req.body.preferences);
    User.findOneAndUpdate({
        _id:req.user.id},
        {Preferences:req.body.preferences},{new : false}).then((user)=>{
        res.status(200).send("message: Update Successful");
    }).catch(err=>{
        res.status(500).send("error:"+err);
    })
})
module.exports=news;
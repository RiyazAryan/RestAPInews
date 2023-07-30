const express=require('express');
const bodyparser=require('body-parser');
const router=require('express').Router();
const mongo=require('mongoose');
const app=express();
const {signup, signin}=require('../controller/authController');
const newsapi=require('../route/newsapi');


app.use(router);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

router.use(bodyparser.json());
router.use(bodyparser.urlencoded({extended:true}));

try{
mongo.connect("mongodb://localhost:27017/userdb",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
console.log("Database server started.");
}
catch(err){
    console.log('DB error unable to start the server');
}

app.listen(3000, err=>{
    if(!err)
    {
        console.log("Server started");
    }
    else{
        console.log("failed to start the server");
    }
})

router.post('/register', signup);

router.post('/signin',signin);

router.use('/',newsapi);
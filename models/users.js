const { default: mongoose } = require('mongoose');
var mongodb=require('mongoose');
schema=mongodb.Schema;

var userschema=new schema({
    fullName:{
        type:String,
        required:[true, 'Full name not provided']
    },

    email:{
        type:String,
        unique:[true,"Email aleady exists"],
        lowercase: true,
        trim: true,
        required:[true, 'Email not provided'],
        validate:{
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: "Email provided is incorrect"
        }
    },
    password:{
        type:String,
        requred: true
    },
    Preferences:{
        type: String,
        enum:['business','entertaiment','general','health','science','sports','technology'],
        required: true
    }
});

module.exports=mongoose.model("Users", userschema)
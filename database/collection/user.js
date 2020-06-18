const mongoose=require('../connect');

const user={
    name:String,
    email:String,
    password:String
};

const usermodel=mongoose.model('user',user);

module.exports=usermodel;

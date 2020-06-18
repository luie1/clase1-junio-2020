const User=require('../../database/collection/user');
const express=require('express');
const empty=require('is-empty');
const sha1=require('sha1');
const jwt=require('jsonwebtoken');
const router=express.Router();

router.get('/',(req,res)=>{
    User.find({}).exec((err,docs)=>{
      if(empty(docs)){
        res.json({message:'no existen usuarios'});
      }else{
        res.json(docs);
      }
    });
});

router.post('/',async(req,res)=>{
    console.log(req.body);
    req.body.password=sha1(req.body.password);
    let ins=new User(req.body);
    let result=await ins.save();
    res.json({
      message:'usuario insertado',
      result
    });
});

router.post('/login',(req,res)=>{
    User.findOne({email:req.body.email},(err,doc)=>{
      if(!empty(doc)){
        if(sha1(req.body.password)==doc.password){
          const token=jwt.sign({
            email:doc.email
          },process.env.JWT_KEY||'miclave',{
            expiresIn:"2h"
          });
          res.json({
            token
          });
        }else{
          res.json({message:'contraseña incorrecta'});
        }
      }else{
        res.json({message:'no existe el email'});
      }
    });
});

module.exports=router;

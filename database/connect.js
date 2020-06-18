const mongoose=require('mongoose');

mongoose.connect('mongodb://172.18.0.2:27017/clase1').then(()=>{
  console.log('success db');
}).catch(err=>{
  console.log(err);
});

module.exports=mongoose;

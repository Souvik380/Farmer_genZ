const mongoose = require('mongoose')

const buyerSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
    },

    phone:{
        type:Number,
        required:true
    },

    address:{
        type:String,
        required:true
    },

    state:{
        type:String,
        required:true
    },

    district:{
        type:String,
        required:true,
    },

    town:{
        type:String,
        required:true
    },

    pincode:{
        type:Number,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    password2:{
        type:String,
        required:true
    }
})

const BuyerModel=mongoose.model('BuyerModel',buyerSchema)
module.exports=BuyerModel
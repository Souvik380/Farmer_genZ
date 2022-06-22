const mongoose = require('mongoose')

const makeRequestCropSchema=mongoose.Schema({

    farmer_id:{
        type:String,
        required:true
    },

    cropName:{
        type:String,
        required:true,
    },

    season:{
        type:String,
        required:true,
    },

    sowDate:{
        type:String,
        required:true
    },

    harvestDate:{
        type:String,
        required:true
    },

    area:{
        type:String,
        required:true
    },

    production:{
        type:Number,
        required:true,
    },
})

const MakeRequestCropModel=mongoose.model('MakeRequestCropModel',makeRequestCropSchema)
module.exports=MakeRequestCropModel
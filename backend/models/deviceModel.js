const mongoose = require ("mongoose")

const devicesSchema=mongoose.Schema({
    deviceName : {
        type : String,
        required : true
    }, 
    quantity : {
        type : Number, // corrected here
        required : true
    },
    current_qty:{
        type : Number, // corrected here
        required : true
    },
    price : {
        type : String,
        required : true
    },
    color : {
        type : String,
        required : true
    }, 
    shopName : {
        type : String,
        required : true
    },
    modelNumber : {
        type : String,
        required : true
    },
    storage : {
        type : String,
        required : true
    },
    warrenty : {
        type : String,
        required : true
    },
    emiNumber : {
        type : String,
        required : true
    },
    purchaseDate : {
        type : String,
        required : true
    }, 
    expireDate : {
        type : String,
        required : true
    }           
   
});

module.exports = mongoose.model("devices",devicesSchema); 

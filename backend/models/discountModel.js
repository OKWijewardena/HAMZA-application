const mongoose = require("mongoose");

const discount = new mongoose.Schema({
    
    discountName : {
        type : String,
        required : true
    },
    rate : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    }       
});

const discountModel = mongoose.model("discount",discount);
module.exports = discountModel;
const mongoose = require("mongoose");

const installment = new mongoose.Schema({
    
    payment1 : {
        type : String,
        required : true
    },
    payment2 : {
        type : String,
        required : true
    }, 
    payment3 : {
        type : String,
        required : true
    }, 
    payment4 : {
        type : String,
        required : true
    }, 
    payment5 : {
        type : String,
        required : true
    },         
    payment6 : {
        type : String,
        required : true
    }, 
    payment7 : {
        type : String,
        required : true
    }, 
    payment8 : {
        type : String,
        required : true
    }, 
    payment9 : {
        type : String,
        required : true
    }, 
    payment10 : {
        type : String,
        required : true
    }, 
    payment11 : {
        type : String,
        required : true
    }, 
    payment12 : {
        type : String,
        required : true
    } 
});

const installmentModel = mongoose.model("installment",installment);
module.exports = installmentModel;
const mongoose = require("mongoose");

const selling = new mongoose.Schema({
    
    deviceName : {
        type : String,
        required : true
    }, 
    customerName : {
        type : String,
        required : true
    },
    civilID : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    months : {
        type : String,
        required : true
    }, 
    date : {
        type : String,
        required : true
    },
    advance : {
        type : String,
        required : true
    },
    customArray: {
        type: [
          {
            date: {
              type: String,
              required: true,
            },
            price: {
              type: String,
              required: true,
            },
            status: {
              type: String,
              required: true,
              default: 'unpaid', // Assuming default status is 'unpaid'
            },
          },
        ],
        required: true,
      },     
});

const sellingModel = mongoose.model("selling",selling);
module.exports = sellingModel;
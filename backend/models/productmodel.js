const mongoose = require ("mongoose")

const productSchema=mongoose.Schema({
    name:{
        type: String,
        required: [true,"please add the name"],
    },
    product_no:{
        type: Number,
        required: [true,"please add the product number"],
        unique: true,
        default: () => counter++,   
    },
    purchase_qty:{
        type: Number,
        required: [true,"please add the purchase quantity"],
    },
    balance_qty:{
        type: Number,
        required: [true,"please add the balance quantity"],
    }, 
    price:{
        type: Number,
        required: [true,"please add the price"],
    },
    color:{
        type: String,
        required: [true,"please add the color"],
    }, 
    condition_status:{
        type: String,
        required: [true,"please add the condition status"],
    }, 
    expiry_date:{
        type: Date,
        required: [true,"please add the expiry date"],
    }, 
    IME_No:{
        type: String,
        required: [true,"please add the IME Number"],
    },
    shop_name:{
        type: String,
        required: [true,"please add the shop name"],
    },
   
});

module.exports = mongoose.model("product",productSchema); 

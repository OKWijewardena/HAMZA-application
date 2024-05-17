const mongoose = require ("mongoose")
const PaymentSchema = mongoose.Schema({
    civilID: {
        type: String
    },
    customerName: {
        type: String
    },
    date: {
        type: Date
    },
    deviceName: {
        type: String
    },
    price: {
        type: Number
    }
});

module.exports = mongoose.model("payment", PaymentSchema);
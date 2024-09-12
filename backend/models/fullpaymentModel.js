const mongoose = require("mongoose");

const FullpaymentSchema = new mongoose.Schema({
  deviceName: {
    type: String,
    required: true,
  },
  emiNumber: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  civilID: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  imageName: {
    type: String,
    required: true,
  }
});

const Fullpayment = mongoose.model("Fullpayment", FullpaymentSchema);
module.exports = Fullpayment;

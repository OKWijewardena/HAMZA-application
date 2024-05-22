const asyncHandler = require("express-async-handler");
const Payment = require("../models/paymentmodel");

//@desc Get all payments
//@route Get /api/ payments
//@access public

const getPayments=asyncHandler(async(req, res) => {
const payments=await Payment.find();
    res.status(200).json(payments);
  });



//@desc create new payment
//@route post /api/ payment
//@access public
const createPayment = asyncHandler(async(req, res) => {
    console.log("the request body is", req.body);
    const {  customerName, civilID, deviceName, price,date} = req.body;
    if (!customerName|| !civilID || !deviceName ||!price||!date) {
        res.status(400);
        throw new Error("all fields are mandatory !");
    }
    const py = await Payment.create({
        
        customerName,
        civilID,
        deviceName,
        price,
        date
       
    })
  
    res.status(201).json(py);
  });
  
//@desc get by id
//@route get /api/ payment/id
//@access public

const getPaymentsByCivilId = asyncHandler(async(req, res) => {
  const civilId = req.params.civil_id;
  const payments = await Payment.find({ civilID: civilId });
  if (payments) {
      res.status(200).json(payments);
  } else {
      res.status(404);
      throw new Error('No payments found for this civil ID');
  }
});



  module.exports={getPayments,createPayment,getPaymentsByCivilId};
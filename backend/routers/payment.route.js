var express = require('express');
var router = express.Router();
const Payment = require("../models/Payment.model");

router.route("/addPayment").post((req, res) => {
    const customerName = req.body.customerName;
    const civilID = req.body.civilID;
    const deviceName = req.body.deviceName;
    const price = req.body.price;
    const date = req.body.date;

    const newAddPayment = new Payment({
        customerName,
      civilID,
      deviceName,
      price,
      date,
    });
  
    newAddPayment
      .save()
      .then(() => {
        res.json("New Payment Added");
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.route("/getPayment").get((req, res) => {
    Payment
      .find()
      .then((payment) => {
        res.json(payment);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.route("/updatePayment/:id").put(async (req, res) => {
    
    const { 
        customerName,
        civilID,
        deviceName,
        price,
        date, } = req.body;
  
    const UpdatePayment = {
        
        customerName,
        civilID,
        deviceName,
        price,
        date,
    };
  
    const update = await Payment
      .findOneAndUpdate({ _id: req.params.id }, UpdatePayment)
      .then(() => {
        res.status(200).send({ status: "Payment Updated" });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ status: "Error with updating", error: err.message });
      });
  });
  
  router.route("/deletePayment/:id").delete(async (req, res) => {
    let GNumber = req.params.PaymentID;
  
    Payment
      .findOneAndDelete({ _id: req.params.id })
      .then(() => {
        res.status(200).send({ status: "Payment Deleted" });
      })
  
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.route("/getOnePayment/:id").get(async (req, res) => {
  
    Payment
      .findOne({ _id: req.params.id })
      .then((payment) => res.send(payment))
  
      .catch((err) => {
        console.log(err);
      });
  });
module.exports = router;
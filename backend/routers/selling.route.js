var express = require('express');
var router = express.Router();
const Selling = require("../models/Selling.model");

router.route("/addSelling").post((req, res) => {
    const deviceName = req.body.deviceName;
    const customerName = req.body.customerName;
    const civilID = req.body.civilID;
    const price = req.body.price;
    const months = req.body.months;
    const date = req.body.date;
    const advance = req.body.advance;
    
    const customArray = [];


  for (let i = 0; i < months; i++) {
    const nextMonthDate = new Date(date);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + i); // Increment the month by i
    
    const formattedNextMonthDate = `${nextMonthDate.getFullYear()}-${String(nextMonthDate.getMonth() + 1).padStart(2, '0')}-${String(nextMonthDate.getDate()).padStart(2, '0')}`;
    const monthData = { 
      date: formattedNextMonthDate,
      price: String(price),
      status: 'unpaid' // Assuming default status is 'unpaid'
    };
    customArray.push(monthData);  // Push [date, price, status] array into customArray
  }

  
    const newAddSelling = new Selling({
      deviceName,
      customerName,
      civilID,
      price,
      months,
      date,
      advance,
      customArray
    });
  
    newAddSelling
      .save()
      .then(() => {
        res.json("New customer device purchased");
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.route("/getSelling").get((req, res) => {
    Selling
      .find()
      .then((selling) => {
        res.json(selling);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.route("/updateSelling/:id").put(async (req, res) => {
    
    const { 
      deviceName,
      customerName,
      price,
      months,
      date,
      advance } = req.body;
  
    const UpdateSelling = {
        
      deviceName,
      customerName,
      price,
      months,
      date,
      advance
    };
  
    const update = await Selling
      .findOneAndUpdate({ _id: req.params.id }, UpdateSelling)
      .then(() => {
        res.status(200).send({ status: "customer device purchase Updated" });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ status: "Error with updating", error: err.message });
      });
  });
  
  router.route("/deleteSelling/:id").delete(async (req, res) => {
    let GNumber = req.params.itemID;
  
    Selling
      .findOneAndDelete({ _id: req.params.id })
      .then(() => {
        res.status(200).send({ status: "customer device purchase Deleted" });
      })
  
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.route("/getOneSelling/:id").get(async (req, res) => {
  
    Selling
      .findOne({ _id: req.params.id })
      .then((selling) => res.send(selling))
  
      .catch((err) => {
        console.log(err);
      });
  });

  router.route("/paymentHistory").get(async (req, res) => {
    const civiID = req.body.civiID;
    const requestDate = new Date(req.body.date); // Parse the date from the body
    const paymentAmount = parseFloat(req.body.payment); // Parse the payment amount into a floating-point number
  
    try {
      const selling = await Selling.findOne({ civiID: civiID });
    
      if (!selling) {
        return res.status(404).json({ message: "No payment history found for the provided civiID" });
      }
  
      res.json(selling);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

module.exports = router;
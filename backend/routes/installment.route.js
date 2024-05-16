var express = require('express');
var router = express.Router();
const installment = require("../models/installment.model");

router.route("/addInstallment").post((req, res) => {
    const month = req.body.month;
    const price = req.body.price;
  
    const newAddInstallment = new installment({
      
        
    });
  
    newAddInstallment
      .save()
      .then(() => {
        res.json("New Installment");
      })
      .catch((err) => {
        console.log(err);
      });
  });
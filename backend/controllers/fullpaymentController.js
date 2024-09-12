const FullPayment = require("../models/fullpaymentModel");
const asyncHandler = require("express-async-handler");
// Controller to add a new FullPayment record
exports.addFullPayment = async (req, res) => {
    const { deviceName, emiNumber, customerName, civilID, price, discount, date, advance, imageName} = req.body;
    
    try {
        const newAddFullPayment = new FullPayment({
            deviceName,
            emiNumber,
            customerName,
            civilID,
            price,
            discount,
            date,
            advance,
            imageName,
          });
      await newAddFullPayment.save();
      res.json("device add to FullPayment successfully");
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

// Controller to get all FullPayment records
exports.getAllFullPayment = (req, res) => {
  FullPayment.find()
    .then((FullPaymentRecords) => {
      res.json(FullPaymentRecords);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error retrieving FullPayment records" });
    });
};

// Controller to update a FullPayment record
exports.updateFullPayment = async (req, res) => {
  const {
    deviceName,
    emiNumber,
    customerName,
    civilID,
    price,
    discount,
    date,
    advance,
    imageName,
  } = req.body;

  const updateFullPaymentRecord = {
    deviceName,
    emiNumber,
    customerName,
    civilID,
    price,
    discount,
    date,
    advance,
    imageName,
  };

  try {
    await FullPayment.findOneAndUpdate({ _id: req.params.id }, updateFullPaymentRecord);
    res.status(200).send({ status: "Customer device purchase record updated" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error with updating FullPayment record", error: err.message });
  }
};

// Controller to delete a FullPayment record
exports.deleteFullPayment = (req, res) => {
  FullPayment.findOneAndDelete({ _id: req.params.id })
    .then(() => {
      res.status(200).send({ status: "Customer device purchase record deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error deleting FullPayment record" });
    });
};

exports.getOneFullPayment = (req, res) => {
  FullPayment.find({ civilID: req.params.civilID })
    .then((FullPaymentRecord) => {
      res.json(FullPaymentRecord);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error retrieving FullPayment record" });
    });
};






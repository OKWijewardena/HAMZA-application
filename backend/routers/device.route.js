var express = require('express');
var router = express.Router();
const Device = require("../models/Device.model");

router.route("/addDevice").post((req, res) => {
    const deviceName = req.body.deviceName;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const color = req.body.color;
    const shopName = req.body.shopName;
    const modelNumber = req.body.modelNumber;
    const storage = req.body.storage;
    const warrenty = req.body.warrenty;
    const emiNumber = req.body.emiNumber;
    const purchaseDate = req.body.purchaseDate;
    const expireDate = req.body.expireDate;
  
    const newAddDevice = new Device({
      deviceName,
      quantity,
      price,
      color,
      shopName,
      modelNumber,
      storage,
      warrenty,
      emiNumber,
      purchaseDate,
      expireDate
    });
  
    newAddDevice
      .save()
      .then(() => {
        res.json("New Device Added");
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.route("/getDevice").get((req, res) => {
    Device
      .find()
      .then((device) => {
        res.json(device);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.route("/updateDevice/:id").put(async (req, res) => {
    
    const { 
        deviceName,
        quantity,
        price,
        color,
        shopName,
        modelNumber,
        storage,
        warrenty,
        emiNumber,
        purchaseDate,
        expireDate } = req.body;
  
    const UpdateDevice = {
        
        deviceName,
        quantity,
        price,
        color,
        shopName,
        modelNumber,
        storage,
        warrenty,
        emiNumber,
        purchaseDate,
        expireDate
    };
  
    const update = await Device
      .findOneAndUpdate({ _id: req.params.id }, UpdateDevice)
      .then(() => {
        res.status(200).send({ status: "Device Updated" });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ status: "Error with updating", error: err.message });
      });
  });
  
  router.route("/deleteDevice/:id").delete(async (req, res) => {
    let GNumber = req.params.itemID;
  
    Device
      .findOneAndDelete({ _id: req.params.id })
      .then(() => {
        res.status(200).send({ status: "Device Deleted" });
      })
  
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.route("/getOneDevice/:id").get(async (req, res) => {
  
    Device
      .findOne({ _id: req.params.id })
      .then((device) => res.send(device))
  
      .catch((err) => {
        console.log(err);
      });
  });
module.exports = router;
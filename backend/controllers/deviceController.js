const Device = require("../models/deviceModel");

exports.addDevice = async (req, res) => {
  try {
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
      expireDate
    } = req.body;

    const newDevice = new Device({
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

    await newDevice.save();

    res.json("New Device Added");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllDevices = async (req, res) => {
    try {
      const devices = await Device.find();
      res.json(devices);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  exports.updateDevice = async (req, res) => {
    try {
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
        expireDate
      } = req.body;
  
      const updatedDevice = {
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
  
      await Device.findByIdAndUpdate(req.params.id, updatedDevice);
      res.status(200).send({ status: "Device Updated" });
    } catch (err) {
      console.error(err);
      res.status(500).send({ status: "Error with updating", error: err.message });
    }
  };
  
  exports.deleteDevice = async (req, res) => {
    try {
      await Device.findByIdAndDelete(req.params.id);
      res.status(200).send({ status: "Device Deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  exports.getOneDevice = async (req, res) => {
    try {
      const device = await Device.findById(req.params.id);
      res.send(device);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

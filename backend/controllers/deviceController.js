const asyncHandler = require("express-async-handler");
const device= require("../models/deviceModel");

//@desc Get all device
//@route Get /api/ devices
//@access public

const getdevices=asyncHandler(async(req, res) => {
const devices=await device.find();
    res.status(200).json(devices);
  });

//@desc create new device
//@route post /api/ device
//@access public
const createdevices = asyncHandler(async(req, res) => {
  console.log("the request body is", req.body);
  const { color, deviceName, emiNumber, expireDate, modelNumber, price, purchaseDate, quantity, shopName, storage,warrenty} = req.body;
  if (!color || !deviceName || !emiNumber||!expireDate || !modelNumber || !price|| !purchaseDate || !quantity||!shopName || !storage || !warrenty) {
      res.status(400);
      throw new Error("all fields are mandatory !");
  }
  const device = await device.create({
    color, 
    deviceName,
    emiNumber, 
    expireDate,
    modelNumber,
    price, 
    purchaseDate,
    currentQty, 
    quantity, 
    shopName, 
    storage,
    warrenty
  })

  res.status(201).json(device);
});


//@desc Get new device
//@route put /api/ device /:id 
//@access public
const getdevice = asyncHandler(async(req, res) => {
  const deviceData = await device.findById(req.params.id);
  if(!deviceData){
    res.status(404);
    throw new Error("Contact not found");
  } 
  res.status(200).json(deviceData);
});



//@desc update device
//@route put /api/ device /:id 
//@access public
const updatedevice=asyncHandler(async(req, res) => {
  const  deviceupdate=await device.findById(req.params.id);
  if(!deviceupdate){
    res.status(404);
    throw new Error("Contact not found");
  }
  const  deviceupdated=await device.findByIdAndUpdate
  (req.params.id,
  req.body,{
  new:true,
  });

    res.status(200).json(deviceupdated);
  });


//@desc delete new device
//@route delete /api/ device /:id 
//@access public
const deletedevice = asyncHandler(async(req, res) => {
  const deviceDelete = await device.findById(req.params.id);
  if(!deviceDelete){
    res.status(404);
    throw new Error("Contact not found");
  }
  await device.deleteOne({ _id: req.params.id });
  res.status(201).json(device);
});


module.exports={getdevices,createdevices,getdevice,updatedevice,deletedevice};

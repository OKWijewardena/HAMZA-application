var express = require('express');const router = express.Router();
const deviceController = require("../controllers/deviceController");

// Route for adding a new device
router.post("/addDevice", deviceController.addDevice);
  
// Route for getting all devices
router.get("/getDevice", deviceController.getAllDevices);

// Route for updating a device
router.put("/updateDevice/:id", deviceController.updateDevice);

// Route for deleting a device
router.delete("/deleteDevice/:id", deviceController.deleteDevice);

// Route for getting a single device by ID
router.get("/getOneDevice/:id", deviceController.getOneDevice);

module.exports = router;

const express = require("express");
const router = express.Router();
const discountController = require("../controllers/discountController");

// Route for adding a new Discount
router.post("/addDiscount", discountController.addDiscount);

// Route for getting all Discounts
router.get("/getDiscount", discountController.getAllDiscount);

// Route for updating a Discount
router.put("/updateDiscount/:civilID", discountController.updateDiscount);

// Route for deleting a Discount
router.delete("/deleteDiscount/:id", discountController.deleteDiscount);

// Route for getting a single Discount by ID
router.post("/getOneDiscount", discountController.getOneDiscount);

module.exports = router;
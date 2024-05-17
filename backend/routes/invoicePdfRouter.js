const express = require('express');
const router = express.Router();
const { convertToPDF } = require("../controllers/invoicePdfController");



router.post("/convertPDF", convertToPDF);


module.exports = router;
 
const express =require ("express");
const {getPayments,createPayment}=require("../controllers/paymentController");
const router = express. Router();


router.route("/").get(getPayments).post(createPayment);;
//router.route("/:id").get(getInvoice);



module.exports=router;  
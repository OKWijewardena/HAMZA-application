const express =require ("express");
const {getPayments,createPayment,getPaymentsByCivilId}=require("../controllers/paymentController");
const router = express. Router();


router.route("/").get(getPayments).post(createPayment);
router.route("/:civil_id").get(getPaymentsByCivilId);
//router.route("/:id").get(getInvoice);



module.exports=router;  
const express =require ("express");
const {registerCustomer,getCustomer,updateCustomer,deleteCustomer}=require("../controllers/customerController");
const router = express.Router();



router.post("/register",registerCustomer);
router.route("/:email").get(getCustomer).put(updateCustomer).delete(deleteCustomer);
module.exports=router;
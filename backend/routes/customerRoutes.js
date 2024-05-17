const express =require ("express");
const {getusers,registerCustomer,getCustomer,updateCustomer,deleteCustomer}=require("../controllers/customerController");
const router = express.Router();


router.get('/', getusers);
router.post("/register",registerCustomer);
router.route("/:email").get(getCustomer).put(updateCustomer).delete(deleteCustomer);
module.exports=router;
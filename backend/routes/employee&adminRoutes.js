const express =require ("express");
const {registeremployeeandadmin,getEmployeeAdmin,updateEmployeeAdmin,deleteEmployeeAdmin}=require("../controllers/employee&adminController");
const router = express.Router();



router.post("/register",registeremployeeandadmin);
router.route("/:email").get(getEmployeeAdmin).put(updateEmployeeAdmin).delete(deleteEmployeeAdmin);
module.exports=router;
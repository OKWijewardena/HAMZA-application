const express = require ("express")
const router=express.Router();
const {getdevices,createdevices,getdevice,updatedevice,deletedevice}=require("../controllers/deviceController");


router.route("/").get(getdevices).post(createdevices);
router.route("/:id").get(getdevice).put(updatedevice). delete(deletedevice);;



module.exports=router;
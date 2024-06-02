const asyncHandler = require("express-async-handler");
const customerModel =require("../models/customerModel");
const bcrypt=require("bcryptjs");
const validator = require("validator");



//@desc  get customers
//@route get /api/ customers / 
//@access public
const getusers=asyncHandler(async(req, res) => {
    const customer=await customerModel.find();
        res.status(200).json(customer);
      });


//@desc register a customer
//@route post /api/ customer / register
//@access public

const registerCustomer=asyncHandler(async(req,res)=>{
   const{name,email,password,civil_id,nationality,area,block,street,building_no,mobile,whatsapp_no,telephone_no}=req.body;
   if(!name||!email||!password||!civil_id||!nationality||!area||!street||!building_no||!mobile||!whatsapp_no||!telephone_no)
   {
    res.status(400);
    throw new Error("All field are mendotory");
   }
   
    // Validate name
    if (!validator.isAlpha(name, 'en-US', {ignore: ' '})) {
        res.status(400);
        throw new Error("Name cannot have numbers");
    }

    // Validate email
    if (!validator.isEmail(email)) {
        res.status(400);
        throw new Error("Invalid email format");
    }

    // Validate nationality
    if (!validator.isAlpha(nationality, 'en-US')) {
        res.status(400);
        throw new Error("Nationality cannot have numbers");
    }

    // Validate mobile, whatsapp_no, and telephone_no
    if (!validator.isNumeric(mobile.toString()) || !validator.isNumeric(whatsapp_no.toString()) || !validator.isNumeric(telephone_no.toString())) {
        res.status(400);
        throw new Error("Phone numbers cannot have letters");
    }

   const customerAvailable=await customerModel.findOne({email});
   if(customerAvailable){
    res.status(400);
    throw new Error("users on mention email address already exist");
   }

   //has password
   const hashedPassword=await bcrypt.hash(password,10);
   //create new customer

   const customer = await customerModel.create({
    name,
    email,
    password:hashedPassword,
    civil_id,
    nationality,
    area,
    block,
    street,
    building_no,
    mobile,
    whatsapp_no,
    telephone_no
   });
   console.log("customer create success",customer)
   if(customer){
    res.status(201).json({id:customer.id,email:customer.email,civil_id:customer.civil_id,nationality:customer.nationality,area:customer.area,block:customer.block,street:customer.street,building_no:customer.building_no,mobile:customer.mobile,whatsapp_no:customer.whatsapp_no,telephone_no:customer.telephone_no})
   }else{
    res.status(400);
    throw new Error("data is not valid")
   }
});

  
//@desc get customer data
//@route get /api/customer/email
//@access public
const getCustomer=asyncHandler(async(req,res)=>{

const email=req.params.email; //get email from url parameters
console.log(`Searching for user with email: ${email}`);
const customerData = await customerModel.findOne({ email });


console.log(`Found user: ${JSON.stringify(customerData)}`);
if(!customerData){
    res.status(404);
    throw new Error("Customer email not found");
} 
    res.status(200).json(customerData);
});

//@desc get customer data
//@route get /api/customer/civil_id
//@access public
const getCivil_idCustomer =asyncHandler(async(req,res)=>{

    const civil_id=req.params.civil_id; //get email from url parameters
    console.log(`Searching for user with email: ${civil_id}`);
    const customerData = await customerModel.findOne({ civil_id });
    
    
    console.log(`Found user: ${JSON.stringify(customerData)}`);
    if(!customerData){
        res.status(404);
        throw new Error("Customer email not found");
    } 
        res.status(200).json(customerData);
    });
    


//@desc update customer data
//@route put /api/customer/email
//@access private 
const updateCustomer=asyncHandler(async(req,res)=>{
const email = req. params.email;// get email from URL parameters
if(!email){
    res.status(404);
    throw new Error("customer not found on mention email");
}
let updateData = req.body;

 // Validate name
 if (!validator.isAlpha(updateData.name, 'en-US', {ignore: ' '})) {
    res.status(400);
    throw new Error("Name cannot have numbers");
}

// Validate email
if (!validator.isEmail(updateData.email)) {
    res.status(400);
    throw new Error("Invalid email format");
}

// Validate nationality
if (!validator.isAlpha(updateData.nationality, 'en-US')) {
    res.status(400);
    throw new Error("Nationality cannot have numbers");
}

// Validate mobile, whatsapp_no, and telephone_no
if (!validator.isNumeric(updateData.mobile.toString()) || !validator.isNumeric(updateData.whatsapp_no.toString()) || !validator.isNumeric(updateData.telephone_no.toString())) {
    res.status(400);
    throw new Error("Phone numbers cannot have letters");
}
 // Check if password is being updated
 if (updateData.password) {
    // Hash the new password
    updateData.password = await bcrypt.hash(updateData.password, 10);
}
 // Find the customer and update their data
 const customerupdated = await customerModel.findOneAndUpdate(
    { email }, // find a document with this filter
    updateData, // document to insert when nothing was found
    { new: true, runValidators: true }, // options
);

if (!customerupdated) {
    res.status(404);
    throw new Error("Error updating user");
}

res.status(200).json(customerupdated); // return the updated user data
});

//@desc delete customer data
//@route delete /api/customer/email
//@access private
const deleteCustomer=asyncHandler(async(req,res)=>{
    const email = req.params.email; // get email from URL parameters
    if(!email){
        res.status(404);
        throw new Error("Contact not found");
    }

    // Find the user and delete their data
    const customerdeleted = await customerModel.findOneAndDelete({ email });

    if (!customerdeleted) {
        res.status(404);
        throw new Error("Error deleting user");
    }

    res.status(200).json({ message: "User deleted successfully" });
});

module.exports={registerCustomer,getCustomer,updateCustomer,deleteCustomer,getusers,getCivil_idCustomer};

      
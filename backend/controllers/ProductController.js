const asyncHandler = require("express-async-handler");
const product= require("../models/productmodel");
//@desc Get all login
//@route Get /api/ login
//@access public

const getProducts=asyncHandler(async(req, res) => {
const products=await product.find();
    res.status(200).json(products);
  });


//@desc create new login
//@route post /api/ login
//@access public
const createProduct = asyncHandler(async(req, res) => {
  console.log("the request body is", req.body);
  const { name, product_no, purchase_qty, balance_qty, price, color, condition_status, expiry_date, IME_No, shop_name } = req.body;
  if (!name || !product_no || !purchase_qty) {
      res.status(400);
      throw new Error("all fields are mandatory !");
  }
  const contact = await product.create({
      name,
      product_no,
      purchase_qty,
      balance_qty,
      price,
      color,
      condition_status,
      expiry_date,
      IME_No,
      shop_name
  })

  res.status(201).json(contact);
});


//@desc Get new login
//@route put /api/ login /:id 
//@access public
const getProduct = asyncHandler(async(req, res) => {
  const productData = await product.findById(req.params.id);
  if(!productData){
    res.status(404);
    throw new Error("Contact not found");
  } 
  res.status(200).json(productData);
});



//@desc update login
//@route put /api/ login /:id 
//@access public
const updateProduct=asyncHandler(async(req, res) => {
  const  Productupdate=await product.findById(req.params.id);
  if(!Productupdate){
    res.status(404);
    throw new Error("Contact not found");
  }
  const  Productupdated=await product.findByIdAndUpdate
  (req.params.id,
  req.body,{
  new:true,
  });

    res.status(200).json(Productupdated);
  });


//@desc delete new login
//@route delete /api/ login /:id 
//@access public
const deleteProduct = asyncHandler(async(req, res) => {
  const productDelete = await product.findById(req.params.id);
  if(!productDelete){
    res.status(404);
    throw new Error("Contact not found");
  }
  await product.deleteOne({ _id: req.params.id });
  res.status(201).json(product);
});


module.exports={getProducts,createProduct,getProduct,updateProduct,deleteProduct};

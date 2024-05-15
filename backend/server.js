const express = require("express");
const connectionDb = require("./config/dbconnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv=require("dotenv").config();





connectionDb();
const app=express();

//Assign into localhost ports
const PORT = process.env.PORT || 8000;





//app.use =middeleware
app.use(express.json());
app.use(errorHandler);
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/employee&admin",require("./routes/employee&adminRoutes"));
app.use("/api/customer",require("./routes/customerRoutes"));


//Run on port
app.listen(PORT, () => {
  console.log(`Server is up and running on port number : ${PORT}`);
});




const express = require("express");
const connectionDb = require("./config/dbconnection");
const errorHandler = require("./middleware/errorHandler");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv=require("dotenv").config();





connectionDb();
const app=express();

//Assign into localhost ports
const PORT = process.env.PORT || 8000;





//app.use =middeleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(errorHandler);
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/employee&admin",require("./routes/employee&adminRoutes"));
app.use("/api/customer",require("./routes/customerRoutes"));
app.use("/device",require("./routes/deviceRoutes"));
app.use("/selling",require("./routes/sellingRoutes"));
app.use("/payment",require("./routes/paymentRoutes"));


//Run on port
app.listen(PORT, () => {
  console.log(`Server is up and running on port number : ${PORT}`);
});




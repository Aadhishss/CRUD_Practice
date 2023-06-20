const express = require('express');
const errorHandler = require('./middleware/errorhandler');
// const { connect } = require('mongoose');
const dotenv= require("dotenv").config();
const connectDb=require("./config/dbConnection");
const validationToken = require('./middleware/validateTokenHandler');
 
connectDb();
const app= express();
const port= process.env.PORT || 6000

app.use(express.json());
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"))
app.use(errorHandler);
// app.use(validationToken)


app.listen(port,()=>{
    console.log('server running on port ', port)
});

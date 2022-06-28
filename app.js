const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const crudRoutes = require('./routes/crud');

const app = express();
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 8080;
mongoose.connect(MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true}) 
// Connection Events
mongoose.connection
.on('connected', () => console.log('connected to MongoDB'))
.on('error', (err) => console.log('Error with MongoDB: ' + err.message));
  
app.use(express.json());

app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(crudRoutes);

app.use((error, req, res, next) => {

    console.log(error);
    res.status(error.statusCode || 500).json({
        message: error.message,
        data: error.data
    });

});
app.listen(PORT, () => {
    console.log(`Express is listening on port: ${PORT}`)
});

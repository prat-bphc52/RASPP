const MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
const express = require('express');
const router= express.Router();     
const app=express();
const port = parseInt(process.env.PORT, 10) || 5000;

// replace the uri string with your connection string.
const uri = "mongodb+srv://tempuser:a1b2c3@raspp-db-ryxco.mongodb.net/CompanyA?retryWrites=true"
MongoClient.connect(uri, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   else{
   		console.log('Connected Successfully');
   }
});


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.listen(port,()=>{
  console.log('server running on port '+ port);
});


app.get('/register', (req, res, next)=>{
	var response = {status: 0};
	response.status = 1;
	res.send({response:response});
});

module.exports = app ;
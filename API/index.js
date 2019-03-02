var bodyParser = require('body-parser');
const express = require('express');
const router= express.Router();     
const app=express();
const mysql= require('mysql');
const port = parseInt(process.env.PORT, 10) || 5000;
var payments = require('./routes/payments/index');
//const payments = require('./payments/index');

//app.use(bodyParser.urlencoded({extended:false}));
//app.use(bodyParser.json());


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.listen(port,()=>{
  console.log('server running on port '+ port);
});


//mysql configuration
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "?6z79mzDLu",
  database: "knowener_cctest",
  port : "3306"
});

//connecting to the database
con.connect((err)=>{
  if(err){
      response.status = -1;
      console.log(err);
      res.send({response: response, message: err});
      con.end();
  }
  else{
    console.log("CONNECTION SUCCESSFUL");
  }
})

app.get("/payments/client_token", (reqout,resout)=>{
  var qs = require("querystring");
	var http = require("https");
console.log("===inside `payments/client_token`=====");
	var options = {
  		"method": "POST",
  		"hostname": "test.instamojo.com",
  		"port": null,
  		"path": "/oauth2/token/",
  		"headers": {
   		 "content-type": "application/x-www-form-urlencoded",
   		 "cache-control": "no-cache"
 	 }
	};

	var req = http.request(options, function (res) {
    console.log("===inside `payments/client_token http req`=====");
 	 var chunks = [];

 	 res.on("data", function (chunk) {
      chunks.push(chunk);
      console.log("======= chunk here ========")
 	 });
    
 	 res.on("end", function () {
  	  var body = Buffer.concat(chunks);
	body.access_token='test'+body.acess_token;
	var bodystr=body.toString();
	bodystr=bodystr.slice(0,18)+'test'+bodystr.slice(18);
	var key=bodystr.slice(18,bodystr.indexOf('"',18));
	console.log("AccessToken:"+key);
	resout.send(key);
  	  console.log("=====inside res.on(end)====" + body.toString());
 	 });
	});

	req.write(qs.stringify({ grant_type: 'client_credentials',
 	 client_id: 'test_7Lxslog3jwUOmMFG1tst8F2BLrExCSmiIRc',
  	client_secret: 'test_ypKoqw8d6WskJo9QWGELQwkbTg0HtIZdjHm4pJN9bd2sZSKDQLmUgqO42gAfPa8bqh6VUijK4VnABmY2xz6NSLOgKyTmqs0dzaYbTtFJAY9IHKV7p4jH9YmDbJO' }));
  req.end();
});

//fb-login
app.post("/fbreg",(req,res,next)=>{
  var response = {status:0};
  var search = "SELECT * FROM user where uID = '"+ req.body.uID + "'";
  var insert = "INSERT INTO user(uID, name, password, mobile, calls, paid) values('" + req.body.uID + "' ,'" + req.body.name + "' ,NULL,NULL, '" + 0 + " ' ,'" + 0 +"')";

  con.query(search, (err,result)=>{
    if(err){
      response.status = -1;
      console.log(err);
      res.send({response: response, message: err});
    }
    else{
      if(typeof(result[0])!=="undefined"){
          response.status = 1;
          res.send({response: response , user: result[0]});
        }
      else{
          con.query(insert,(err,result)=>{
              if(err){
                response.status = -1;
                console.log(err);
                res.send({response: response, message: err});
              }
              else{
                response.status = 1;
                res.send({response: response, user: req.body});
              }
            })
          }
        }
      })

});


//USER REGISTRATION 
app.post('/register', (req, res, next)=>{
var response = {status: 0};

var search = "SELECT * FROM user where uID ='"+ req.body.uID+"'";
var insert = "INSERT INTO user(uID, name, password, mobile, calls, paid) values('" + req.body.uID + "' ,'" + req.body.name + "' ,'" + req.body.password + "' ,'" + req.body.mobile + "' ,'0' ,'" + 0 +"')";

con.query(search, (error, result)=>{
  if(error){
  response.status = -1;
  console.log(error);
  res.send({response: response, message: error});
  }
  else{
    if(typeof(result[0])!=='undefined'){
      response.status = 0;
      console.log("USER ALREADY REGISTERED!");
      res.send({response:response});
    }
    else{
      con.query(insert, (error,result)=>{
        if(error){
          response.status = -1;
          console.log(error);
          res.send({response: response, message: error});
        }
        else{
          console.log("USER REGISTERED!");
          response.status = 1;
          res.send({response:response});
        }
      })
  }
}
})

});


//ADMIN LOGIN
app.get('/admin/login', (req, res, next)=>{
var response = {status: 0};

var search = "SELECT * FROM admin where uID ='"+ req.body.uID+"' and password = '" + req.body.password + "'";

con.query(search, (err, result)=>{
  if(err){
  response.status = -1;
  console.log(err);
  res.send({response: response, message: err});
  }
  else{
    if(typeof(result[0])!=='undefined'){
      response.status = 1;
      console.log("ADMIN FOUND!");
      res.send({response:response, user: result[0]});
    }
    else{
      response.status = 0;
      console.log("USER NOT REGISTERED!");
      res.send({response:response});
    }
}
})

});


//USER LOGIN
app.post('/login', (req, res, next)=>{
var response = {status: 0};
var search = "SELECT * FROM user where uID ='"+ req.body.uID+"' and password = '" + req.body.password + "'";

con.query(search, (err, result)=>{
  if(err){
  response.status = -1;
  console.log(err);
  res.send({response: response, message: err});
  }
  else{
    if(typeof(result[0])!=='undefined'){
      response.status = 1;
      console.log("USER FOUND!");
      res.send({response:response, user: result[0]});
    }
    else{
      response.status = 0;
      console.log("USER NOT REGISTERED!");
      res.send({response:response});
    }
}
})
});

app.post('/checkout',(req,res)=>{
  var uid = req.body.uid;
  var amount = req.body.amount;
  var paymentid = req.body.paymentid;
  var paymentid = req.body.paymentid;
  console.log('paymennt id= '+paymentid);
  
  var request = require('request');
  var mobile,name, status,user;
  // con.query("SELECT mobile FROM user where uid = "+uid,(err,result)=>{
  //   if(err){console.log(err)}
  //   else {
  //     mobile = result;
  //   }

  //}); 
  // con.query("SELECT name FROM user where uid = "+uid,(err,result)=>{
  //   if(err){console.log(err)}
  //   else {
  //     mobile = result;
  //   }

  // }); 
var headers = { 'X-Api-Key': 'test_b6d2c51bb6755d8b69ddf67d76d', 'X-Auth-Token': 'test_c3986de40823e80b5a69bb528ab'}
var payload = {
  //purpose: 'FIFA 16',
  amount: amount,
  //phone: mobile,
  //buyer_name: name,
  //redirect_url: 'http://www.example.com/redirect/',
  send_email: true,
  //webhook: 'http://www.example.com/webhook/',
  send_sms: true,
  //email: 'foo@example.com',
  allow_repeated_payments: false}
request.get(

  'https://test.instamojo.com/api/1.1/payments/'+paymentid+"/",
  {form: payload,  headers: headers}, function(error, response, body){
      console.log('body ='+ body );
      console.log('response = ' + response);
      if(!error && response.statusCode == 200)
          {console.log(body+'===body')}
          
          var json = JSON.parse(body);
          
          console.log(json.payment);   
          console.log(json.success); 
          console.log(json.success+json.payment.payment_id+json.payment.amount+json.payment);
      
      if(json.success == true && paymentid == json.payment.payment_id && amount == json.payment.amount /*&& body.payment.name == name*/) {
      var update_paid = "update user set paid = (paid + 1) where uID = '"  + uid + "'";
      con.query(update_paid, (err,result)=>{ 
              if(err){
                res.status = -1;
                console.log(err);
                res.send({response: response, message: err});
              }
              else{
                //res.status = 1;
                console.log(result+'updated paid');
                status = 1;
                //res.send({response: result, message: 'Updated `paid` column successfully.'})
              }
            })
            var update_calls = " update user SET calls = CASE WHEN  paid = 1 THEN 5 ELSE (calls + 1)  END  where uID = '"  + uid + "'";
                con.query(update_calls, (err ,result)=>{ 
                  if(err){
                    res.status = -1;
                    console.log(err);
                    res.send({response: response, message: err});
                  }
                  else{
                    //res.status = 1;
                   console.log(result+'updated calls');
                   status = 1; 
                   user = result;
                   //res.send({response: result, message: 'Updated `calls` column successfully.'})
		   res.send({response: "status:0", message: 'Updated `calls` column successfully.',user:result[0]});

               }
            }) 
    }
      
    else {
      console.log("Error ..." );
    }





})
if(status) {
  //res.send(user);
  console.log(user);

}
})

//CALL REQUEST
app.post('/call', (req, res, next)=>{
var response = {status: 0};
var date = new Date();
var current_hour = date.getHours();
if(current_hour <=10 || current_hour>=19){
	console.log("Can't place request at this time");
	res.send({response:response, message:"Between 11 am and 7pm only"});
	return;
}
var search = "SELECT * FROM user where uID ='"+ req.body.uID+"'";
var insert = "INSERT INTO calllog(uID, timestamp, mobile, status) values('" + req .body.uID + "' ,'" + req.body.timestamp + "' ,'" + req.body.mobile + "' ," + 0 +")";
//var update = "update user set mobile = '" + req.body.mobile + "' where uID='" + req.body.uID + "')";

if(typeof(req.body.uID)==="undefined"){
  response.status = -1;
  var err = "Call could not be requested as it came from an unknown user";
  res.send({response:response, message: err});
}
else{
 con.query(search, (err,result)=>{
  if(err){
    response.status = -1;
    console.log(err);
    res.send({response: response, message: err});
  }
  else{
    if(typeof(result[0])==="undefined"){
      response.status = 0;
      var msg = "USER NOT FOUND!";
      res.send({response: response, message: msg});
    }
    else{
      if(result[0].calls == 0){
        if(result[0].paid > 0){
          response.status = 0;
          res.send({response: response, message: "User already subscribed but 0 calls left"});
        }
        else{
          response.status = 0;
          res.send({response: response, message: "User not subscribed"});
        }
      }
        else{
          con.query(insert, (err,result)=>{
            if(err){
              response.status = -1;
              console.log(err);
              res.send({response: response, message: err})
            }
            else{
              /*con.query(update, (err,result)=>{
                if(err){
                  response.status = -1;
                  console.log(err);
                  res.send({response: response, message: err})
                }
                else{
                response.status = 1;
                }
              })*/
	      response.status=1;
              console.log("CALL REQUESTED!");
              res.send({response:response, message:"call requested!"});
            }
          })
        }

  }
}
})
}

});


//CALL CONFIRMATION
app.put("/calls/confirm", (req,response,next)=>{
var response={status:0};

var update_calls= "update user set calls =" + req.body.calls - 1 + "where uID = '"  + req.body.uID + "')";
var update_log= "update calllog set status =" + true + "where uID = '"  + req.body.uID +  "')";

  con.query(update_calls, (err,result)=>{ 
    if(err){
      response.status = -1;
      console.log(err);
      res.send({response: response, message: err});
    }
    else{
      response.status = 1;
      res.send({response:response, msg: "call confirmed"});
    }
  })
});
module.exports = app ;

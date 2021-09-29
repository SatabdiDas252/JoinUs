var express= require('express');
var mysql= require('mysql');
var bodyParser = require("body-parser");
var app= express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));


var connection= mysql.createConnection({
	host      :  'localhost',
	user      :  'root',
	database  :  'joinus'
});



app.get("/", function(req,res){
	
	var q = "SELECT COUNT(*) As count FROM users";
	connection.query(q, function(err,results){
		if (err) throw err;
		var count = results[0].count;
		//res.send("we have " +count+ " user in our db");
		res.render("home", {data: count});
	});				   
	
});


app.post("/register", function(req,res){
	
	var person={
		email : req.body.email
	}
	connection.query('INSERT INTO users SET ?', person, function(err, result) {
 if (err) throw err;
 res.redirect("/");
 });

	//console.log("POST REQUEST SENT TO /REGISTER email is "+req.body.email);
});

app.get("/joke", function(req,res){
	var joke="<strong>What do you call a dog that does magic tricks?</strong> A labracadabrador.";
	res.send(joke);
});
app.get("/random_num",function(req,res){
	var num=Math.floor(Math.random()*10)+1;
	res.send("Your lucky number is " + num);
});

app.listen(process.env.PORT || 3000 , process.env.IP, function(){
	console.log("Server is running on 3000!");
});
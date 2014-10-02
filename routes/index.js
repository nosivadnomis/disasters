var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection =  mysql.createConnection({
	host : "localhost",
	user : "root",
	password: "root",
	database: "disaster_prep",
	port: 3306
});

connection.connect(function(err) {
});

router.get('/countries.json', function(req, res, next){
	var sql = "SELECT DISTINCT country FROM disasters";
	connection.query(sql, function(err, results){
		if (err)
		{
			res.json(err);
		}
		else
		{
			res.json(results);
		}
	}) 
})

router.get('/disasters.json', function(req, res, next) {

	//Construct the SQL query
	var sql_start = "SELECT * FROM disasters WHERE country = '";
	var countryPick = req.query['countryPick'];
	var sql_end = "' ORDER by type, killed DESC";
	var sql = sql_start+countryPick+sql_end;
	//End of SQL query

	console.log('You selected ' + countryPick);
	console.log(sql);

	connection.query(sql, function(err, results) {
		if (err) 
		{
			res.json(err);
		}
		else
		{
			res.json(results);
		}
	});
});


router.get('/', function(req, res){
	res.render('index', {})
})

router.get('/maps', function(req, res){
	res.render('maps', {})
})

module.exports = router;

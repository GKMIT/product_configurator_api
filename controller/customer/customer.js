exports.add = function(req, res){
	var query="INSERT INTO `customers` (`sap_customer_id`, `name`, `email`) VALUES('"+req.body.sap_customer_id+"', '"+req.body.name+"', '"+req.body.email+"')";
	connection.query(query, function(err, quote) {
		if(err){
			console.log(err);
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			res.json({"statusCode": 200, "success":"true", "message": "customer addded successfully"});
		}
	});
}

exports.show = function(req, res){
	var query="SELECT * FROM `customers` ORDER BY `updated_at`";
	connection.query(query, function(err, customers) {
		if(err){
			console.log(err);
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			res.json({"statusCode": 200, "success":"true", "message": "", "customers":customers});
		}
	});
}
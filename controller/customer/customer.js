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
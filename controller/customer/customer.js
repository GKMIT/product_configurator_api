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

exports.showOne = function(req, res){
	var query="SELECT * FROM `customers` where `id` = "+req.params.cid+" limit 1";
	connection.query(query, function(err, customer) {
		if(err){
			console.log(err);
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			res.json({"statusCode": 200, "success":"true", "message": "", "customer":customer});
		}
	});
}

exports.edit = function(req, res){
	var query="UPDATE `customers` set `sap_customer_id` = '"+req.body.sap_customer_id+"', `name` = '"+req.body.customer_name+"', `email` = '"+req.body.customer_email+"' where id = '"+req.body.customer_id+"' ";
	connection.query(query, function(err, quote) {
		if(err){
			console.log(err);
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			res.json({"statusCode": 200, "success":"true", "name":req.body.customer_name , "message": "Customer information updated successfully"});
		}
	});
}
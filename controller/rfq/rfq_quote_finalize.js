exports.sales_quote_finalize_fetch_all = function(req, res){
	var query="SELECT `id`, `document_no`, `version_no`, `quote_creation_date` FROM `rfq` WHERE `created_by`='"+req.params.user_id+"' AND `rfq_status_id`='5'  ORDER BY `rfq`.`updated_at` desc";
	connection.query(query, function(err, rfq) {
		if(err){
			console.log(err);
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			res.json({"statusCode": 200, "success":"true", "message": "", "rfq":rfq});
		}
	});
}

exports.sales_quote_finalize_fetch_one = function(req, res){
	var query="SELECT `id`, `document_no`, `version_no`, `quote_creation_date`, `estimated_sales_price`, `probability_id` FROM `rfq` WHERE `created_by`='"+req.params.user_id+"' AND `rfq_status_id`='5'  ORDER BY `rfq`.`updated_at` desc";
	connection.query(query, function(err, rfq) {
		if(err){
			console.log(err);
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			connection.query("SELECT `id`, `name`, `value` FROM `probability`", function(err, probability) {
				if(err){
					console.log(err);
						res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					res.json({"statusCode": 200, "success":"true", "message": "", "rfq":rfq, "probability":probability});
				}
			});
		}
	});
}


exports.sales_quote_finalize_submit = function(req, res){
	var query="UPDATE `rfq` SET `quote_validity_date`='"+req.body.quote_validity_date+"', `quote_submission_date`=NOW(), `probability`='"+req.body.probability+"', `rfq_status_id`='"+req.body.rfq_status_id+"' WHERE `id`='"+req.body.rfq_id+"'";
	connection.query(query, function(err, rfq) {
		if(err){
			console.log(err);
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			res.json({"statusCode": 200, "success":"true", "message": "quote submitted successfully !"});
		}
	});
}
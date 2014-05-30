exports.sales_quote_followup_fetch_all = function(req, res){
	var query="SELECT `id`, `document_no`, `version_no`, `quote_submission_date`, `estimated_sales_price`, `quote_validity_date`, `probability_id` FROM `rfq` WHERE `rfq_status_id`='6' AND `created_by`='"+req.params.user_id+"'";
	connection.query(query, function(err, quote) {
		if(err){
			console.log(err);
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			res.json({"statusCode": 200, "success":"true", "message": "", "followup_quote":quote});
		}
	});
}

exports.sales_quote_followup_fetch_one = function(req, res){
	var query="SELECT `id`, `document_no`, `version_no`, `quote_submission_date`, `estimated_sales_price`, `quote_validity_date`, `probability_id`, `rfq_status_id` FROM `rfq` WHERE `rfq_status_id`='6' AND `created_by`='"+req.params.user_id+"' AND `id`='"+req.params.rfq_id+"'";
	connection.query(query, function(err, quote) {
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
					res.json({"statusCode": 200, "success":"true", "message": "", "quote":quote, "probability": probability});
				}
			});
		}
	});
}


exports.sales_quote_followup_update = function(req, res){
	var query="UPDATE `rfq` SET `quote_submission_date`='"+req.body.quote_submission_date+"', quote_validity_date='"+req.body.quote_validity_date+"', `probability_id`='"+req.body.probability+"', `rfq_status_id`='"+req.body.rfq_status_id+"' WHERE `id`='"+req.body.user_id+"'";
	connection.query(query, function(err, quote) {
		if(err){
			console.log(err);
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			res.json({"statusCode": 200, "success":"true", "message": "updated successfully"});
		}
	});
}
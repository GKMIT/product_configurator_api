exports.sales_quote_followup_fetch_all = function(req, res){
	// var query="SELECT `id`, `document_no`, `version_no`, `quote_submission_date`, `estimated_sales_price`, `quote_validity_date`, `probability_id` FROM `rfq` WHERE `rfq_status_id`='6' AND `created_by`='"+req.params.user_id+"'";
	// connection.query(query, function(err, quote) {
	// 	if(err){
	// 		console.log(err);
	// 			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
	// 	}
	// 	else{
	// 		res.json({"statusCode": 200, "success":"true", "message": "", "followup_quote":quote});
	// 	}
	// });
	connection.query("select * from `sales_hubs` where `head_id`='"+req.params.user_id+"' LIMIT 1", function(err, info){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			if(info.length>0){
				query="SELECT `id`, `document_no`, `version_no`, `quote_submission_date`, `estimated_sales_price`, `quote_validity_date`, `probability_id` FROM `rfq` WHERE `rfq_status_id`='6' AND `rfq`.`sales_hub_id`='"+info[0].id+"' ORDER BY rfq.updated_at desc";
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
			else{
				query="SELECT `id`, `document_no`, `version_no`, `quote_submission_date`, `estimated_sales_price`, `quote_validity_date`, `probability_id` FROM `rfq` WHERE `rfq_status_id`='6' AND (`created_by`='"+req.params.user_id+"' OR `sales_person_id`='"+req.params.user_id+"') ORDER BY `rfq`.`updated_at` desc";
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
		}
	});
}

exports.sales_quote_followup_fetch_one = function(req, res){
	var query="SELECT `id`, `document_no`, `version_no`, `quote_creation_date`, `quote_submission_date`, `estimated_sales_price`, `quote_validity_date`, `probability_id`, `rfq_status_id`, `sales_price` FROM `rfq` WHERE `rfq_status_id`='6' AND `id`='"+req.params.rfq_id+"'";
	connection.query(query, function(err, rfq) {
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			if(rfq.length>0){
				connection.query("SELECT `id`, `name`, `value` FROM `probability`", function(err, probability) {
					if(err){
						console.log(err);
							res.json({"statusCode": 500, "success":"false", "message": "internal error"});
					}
					else{
						connection.query("select sum(`minimum_sales_price`) as `minimum_sales_price` from `rfq_lines` where `rfq_id`='"+rfq[0].id+"'", function(err, rfq_lines){
							if(err){
								console.log(err);
								res.json({"statusCode": 500, "success":"false", "message": "internal error"});
							}
							else{
								rfq[0]["minimum_sales_price"]=rfq_lines[0].minimum_sales_price;
								res.json({"statusCode": 200, "success":"true", "message": "", "rfq":rfq, "probability": probability});
							}
						});
					}
				});
			}
			else{
				res.json({"statusCode": 200, "success":"true", "message": "", "rfq":rfq, "probability": [], "rejection_remarks": []});
			}
		}
	});
}


exports.sales_quote_followup_update = function(req, res){
	// console.log(req.body.quote_submission_date);
	var query="UPDATE `rfq` SET `quote_submission_date`='"+req.body.quote_submission_date+"', quote_validity_date='"+req.body.quote_validity_date+"', `probability_id`='"+req.body.probability+"', `rfq_status_id`='"+req.body.rfq_status_id+"' WHERE `id`='"+req.body.rfq_id+"'";
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
exports.sales_quote_finalize_fetch_all = function(req, res){
	connection.query("SELECT * FROM `organization_users` WHERE `id`='"+req.params.user_id+"' AND `sysadmin`='1'", function(err, admin){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			if(admin.length>0){
				query="SELECT `rfq`.`id`, `rfq`.`document_no`, `rfq`.`version_no`, `rfq`.`quote_creation_date`, `rfq`.`estimated_sales_price` FROM `rfq` WHERE `rfq_status_id`='5' ORDER BY `rfq`.`updated_at` desc";
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
				connection.query("select * from `sales_hubs` where `head_id`='"+req.params.user_id+"' LIMIT 1", function(err, info){
					if(err){
						console.log(err);
						res.json({"statusCode": 500, "success":"false", "message": "internal error"});
					}
					else{
						if(info.length>0){
							query="SELECT `rfq`.`id`, `rfq`.`document_no`, `rfq`.`version_no`, `rfq`.`quote_creation_date`, `rfq`.`estimated_sales_price` FROM `rfq` WHERE `rfq_status_id`='5' AND (`rfq`.`sales_hub_id`='"+info[0].id+"' OR `created_by`='"+req.params.user_id+"') ORDER BY rfq.updated_at desc";
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
							query="SELECT `rfq`.`id`, `rfq`.`document_no`, `rfq`.`version_no`, `rfq`.`quote_creation_date`, `rfq`.`estimated_sales_price` FROM `rfq` WHERE `rfq_status_id`='5' AND (`created_by`='"+req.params.user_id+"' OR `sales_person_id`='"+req.params.user_id+"') ORDER BY `rfq`.`updated_at` desc";
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
		}
	});
}

exports.sales_quote_finalize_fetch_one = function(req, res){
	var query="SELECT `rfq`.`id`, `rfq`.`document_no`, `rfq`.`version_no`, `rfq`.`quote_creation_date`, `rfq`.`estimated_sales_price`, `rfq`.`probability_id`, `rfq`.`quote_submission_date`, `rfq_lines_questions`.`rfq_questions_id`, `rfq_lines_questions`.`question_value` FROM `rfq`, `rfq_lines_questions` WHERE `rfq_status_id`='5' AND `rfq`.`id`='"+req.params.rfq_id+"' AND `rfq_lines_questions`.`rfq_id`='"+req.params.rfq_id+"' AND `rfq_lines_questions`.`rfq_questions_id`='1'  ORDER BY `rfq`.`updated_at` desc";
	connection.query(query, function(err, rfq) {
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			if(rfq.length>0){
				connection.query("select sum(`sales_price`) as `minimum_sales_price` from `rfq_lines` where `rfq_id`='"+rfq[0].id+"'", function(err, rfq_lines){
					if(err){
						console.log(err);
						res.json({"statusCode": 500, "success":"false", "message": "internal error"});
					}
					else{
						rfq[0]["minimum_sales_price"]=rfq_lines[0].minimum_sales_price;
						connection.query("SELECT `id`, `name` FROM `probability`", function(err, probability){
							if(err){
								console.log(err);
								res.json({"statusCode": 500, "success":"false", "message": "internal error"});
							}
							else{
								connection.query("SELECT `id`, `description` FROM `lost_remarks`", function(err, rejection_remarks){
									if(err)
									{
										console.log(err);
										res.json({"statusCode": 500, "success":"false", "message": "internal error"});
									}
									else{
										res.json({"statusCode": 200, "success":"true", "message": "", "rfq":rfq, "probability": probability, "rejection_remarks": rejection_remarks});
									}
								});
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

exports.sales_quote_finalize_submit = function(req, res){
	var query="UPDATE `rfq` SET `quote_validity_date`='"+req.body.quote_validity_date+"', `quote_submission_date`='"+req.body.quote_submission_date+"', `probability_id`='"+req.body.probability+"', `rfq_status_id`='"+req.body.rfq_status_id+"', `lost_remarks_id`='"+req.body.rejection_remarks_id+"', `sales_price`='"+req.body.sales_price+"', `won_gross_sale`='"+req.body.won_gross_sale+"' WHERE `id`='"+req.body.rfq_id+"'";
	connection.query(query, function(err, rfq) {
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			var update_query="UPDATE `rfq_lines_questions` SET `question_value`='"+req.body.rfq_questions_value+"' WHERE `rfq_id`='"+req.body.rfq_id+"' AND `rfq_questions_id`='"+req.body.rfq_questions_id+"'";
			connection.query(update_query, function(err, rfq){
				if(err){
					console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					res.json({"statusCode": 200, "success":"true", "message": "quote submitted successfully !"});
				}
			});
		}
	});
}
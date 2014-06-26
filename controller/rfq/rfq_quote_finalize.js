exports.sales_quote_finalize_fetch_all = function(req, res){
	connection.query("select * from `sales_hubs` where `head_id`='"+req.params.user_id+"' LIMIT 1", function(err, info){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			if(info.length>0){
				query="SELECT `rfq`.`id`, `rfq`.`document_no`, `rfq`.`version_no`, `rfq`.`quote_creation_date`, `rfq`.`estimated_sales_price` FROM `rfq` WHERE `rfq_status_id`='5' AND `rfq`.`sales_hub_id`='"+info[0].id+"' ORDER BY rfq.updated_at desc";
				connection.query(query, function(err, rfq) {
					if(err){
						console.log(err);
						res.json({"statusCode": 500, "success":"false", "message": "internal error"});
					}
					else{
						var j=0;
						for (var i = 0; i < rfq.length; i++) {
							connection.query("select sum(`minimum_sales_price`) as `minimum_sales_price` from `rfq_lines` where `rfq_id`='"+rfq[i].id+"'", function(err, rfq_lines){
								if(err){
									console.log(err);
									res.json({"statusCode": 500, "success":"false", "message": "internal error"});
								}
								else{
									rfq[j]["minimum_sales_price"]=rfq_lines[0].minimum_sales_price;
									j++;
									if(i==j){
										connection.query("SELECT `id`, `name` FROM `probability`", function(err, probability){
											if(err){
												console.log(err);
												res.json({"statusCode": 500, "success":"false", "message": "internal error"});
											}
											else{
												connection.query("SELECT `id`, `description` FROM `rejection_remarks`", function(err, rejection_remarks){
													if(err){
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
								}
							});
						};
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
						var j=0;
						for (var i = 0; i < rfq.length; i++) {
							connection.query("select sum(`minimum_sales_price`) as `minimum_sales_price` from `rfq_lines` where `rfq_id`='"+rfq[i].id+"'", function(err, rfq_lines){
								if(err){
									console.log(err);
									res.json({"statusCode": 500, "success":"false", "message": "internal error"});
								}
								else{
									rfq[j]["minimum_sales_price"]=rfq_lines[0].minimum_sales_price;
									j++;
									if(i==j){
										rfq[j]["minimum_sales_price"]=rfq_lines[0].minimum_sales_price;
									j++;
									if(i==j){
										connection.query("SELECT `id`, `name` FROM `probability`", function(err, probability){
											if(err){
												console.log(err);
												res.json({"statusCode": 500, "success":"false", "message": "internal error"});
											}
											else{
												connection.query("SELECT `id`, `description` FROM `rejection_remarks`", function(err, rejection_remarks){
													if(err){
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
									}
								}
							});
						};
					}
				});
			}
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
	var query="UPDATE `rfq` SET `quote_validity_date`='"+req.body.quote_validity_date+"', `quote_submission_date`=NOW(), `probability_id`='"+req.body.probability+"', `rfq_status_id`='"+req.body.rfq_status_id+"' WHERE `id`='"+req.body.rfq_id+"'";
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
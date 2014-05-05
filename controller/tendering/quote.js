exports.tendering_teams_quotes = function(req, res){
	var query="SELECT `rfq`.`id`, `rfq`.`document_no`, `rfq`.`version_no`, `rfq`.`date_rfq_in`, `rfq`.requested_quotation_date FROM `rfq`, `tendering_teams` WHERE `rfq_status_id`='4' AND `tendering_teams`.`id`=`rfq`.`tendering_teams_id` AND `tendering_teams`.`head_id`='"+req.params.user_id+"'  ORDER BY `rfq`.`updated_at` desc";
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


exports.tendering_fetch_particular_quote = function(req, res){
	var query="SELECT `rfq`.`id`, `rfq`.`document_no`, `rfq`.`version_no`, `rfq`.`rfq_status_id` FROM `rfq` WHERE `rfq_status_id`='4' AND `id`='"+req.params.rfq_id+"'";
	// console.log(query);
	connection.query(query, function(err, rfq) {
		if(err){
			console.log(err);
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			 // `r_lines`.`material_cost`, `r_lines`.`labour_cost`, `r_lines`.`no_of_labour_hours`, 

			connection.query("SELECT `r_lines`.`id`, `r_lines`.`product_lines_id`, `p_lines`.`name` as `product_lines_name`, `r_lines`.`plants_id`, `plants`.`name` as `plants_name`, `r_lines`.`number_of_units`,`r_lines`.`req_delivery_date`, EXTRACT(MONTH FROM req_delivery_date) as month, EXTRACT(YEAR FROM req_delivery_date) as year, `r_lines`.`sales_price`, `r_lines`.`confirmed_delivery_date`, `r_lines`.`product_designs_id` FROM `rfq_lines` `r_lines` LEFT JOIN `product_lines` `p_lines` ON `r_lines`.`product_lines_id`=`p_lines`.`id` LEFT JOIN `plants` ON `r_lines`.`plants_id`=`plants`.`id` LEFT JOIN `product_designs` ON `r_lines`.`product_designs_id`=`product_designs`.`id`  WHERE `rfq_id`='"+req.params.rfq_id+"'", function(err, rfq_lines) {
				if(err){
					console.log(err);
						res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					var merge = function() {
				    	var obj = {},
				        i = 0,
				        il = arguments.length,
				        key;
					    for (; i < il; i++) {
					        for (key in arguments[i]) {
					            if (arguments[i].hasOwnProperty(key)) {
					                obj[key] = arguments[i][key];
					            }
					        }
					    }
					    return obj;
					};
					var complete_rfq_lines=rfq_lines;
					var counter=0;
					var counter1=0;
					for (var i = 0; i < rfq_lines.length; i++) {
						connection.query("SELECT * FROM `rfq_lines_technical_specs` `rlts` LEFT JOIN `product_properties` `pp` ON `rlts`.`product_properties_id`=`pp`.id WHERE `rfq_lines_id`='"+rfq_lines[counter].id+"'", function(err, rfq_lines_technical_specs) {
							if(err){
								console.log(err);
									res.json({"statusCode": 500, "success":"false", "message": "internal error"});
							}
							else{
								// console.log(i);
								var temp=rfq_lines[counter].month/3;
								var quarter;
								if(temp<=1){
									quarter=1;
								}
								else if(temp>1 && temp<=2){
									quarter=2;
								}
								else if(temp>2 && temp<=3){
									quarter=3;
								}
								else{
									quarter=4;
								}
								console.log(counter1);
								// console.log(rfq_lines[counter].product_designs_id);
								console.log("counter is : "+counter);
								connection.query("SELECT * FROM `product_designs` LEFT JOIN `product_designs_costs` ON `product_designs`.id=`product_designs_costs`.`product_design_id` AND `product_designs_costs`.`quarter`='"+quarter+"' AND `product_designs_costs`.`year`='"+rfq_lines[counter1].year+"' WHERE `product_designs`.id='"+rfq_lines[counter1].product_designs_id+"'", function(err, product_design_detail) {
									if(err){
										console.log(err);
											res.json({"statusCode": 500, "success":"false", "message": "44internal error"});
									}
									else{
										console.log("counter is ===>  "+counter);
										complete_rfq_lines[counter]["rfq_lines_technical_specs"]=rfq_lines_technical_specs;
										complete_rfq_lines[counter]["product_design_detail"]=product_design_detail;
										counter++;
										if(counter==rfq_lines.length){
											res.json({"statusCode": 200, "success":"true", "message": "","rfq":rfq ,"rfq_lines":complete_rfq_lines});
										}
									}
								});
								counter1++;
							}
						});
					};
					
					
				}
			});
		}
	});
}

exports.tendering_fetch_product_design_detail = function(req, res){
	var query="SELECT `rfq_lines`.`id`, `rfq_lines`.`product_lines_id`, `product_lines`.`name` as `product_lines_name`, `rfq_lines`.`plants_id`, `plants`.`name` as `plants_name`, `rfq_lines`.`number_of_units`, `rfq_lines`.`req_delivery_date`, EXTRACT(MONTH FROM req_delivery_date) as month, EXTRACT(YEAR FROM req_delivery_date) as year FROM `rfq_lines` LEFT JOIN `product_lines` ON `rfq_lines`.`product_lines_id`=`product_lines`.`id` LEFT JOIN `plants` ON `rfq_lines`.`plants_id`=`plants`.`id` WHERE `rfq_lines`.`id`='"+req.params.rfq_lines_id+"' AND `rfq_id`='"+req.params.rfq_id+"'";
	connection.query(query, function(err, rfq_lines) {
		if(err){
			console.log(err);
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			var temp=rfq_lines[0].month/3;
			var quarter;
			if(temp<=1){
				quarter=1;
			}
			else if(temp>1 && temp<=2){
				quarter=2;
			}
			else if(temp>2 && temp<=3){
				quarter=3;
			}
			else{
				quarter=4;
			}
			connection.query("SELECT * FROM `product_designs` LEFT JOIN `product_designs_costs` ON `product_designs`.`id`=`product_designs_costs`.`product_design_id` AND `product_designs_costs`.`year`='"+rfq_lines[0].year+"' AND `product_designs_costs`.`quarter`='"+quarter+"'", function(err, product_designs) {
				if(err){
					console.log(err);
						res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					res.json({"statusCode": 200, "success":"true", "message": "", "rfq_lines":rfq_lines, "product_designs": product_designs});
				}
			});
		}
	});
}

exports.tendering_submit_rfq_lines = function(req, res){
	var query="UPDATE `rfq_lines` SET `product_designs_id`='"+req.body.product_designs_id+"', `confirmed_delivery_date`='"+req.body.confirmed_delivery_date+"', `rfq_line_status`='1' WHERE `id`='"+req.body.rfq_lines_id+"'";
	connection.query(query, function(err, info) {
		if(err){
			console.log(err);
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			connection.query("SELECT `id`, `design_number` FROM `product_designs` WHERE `id`='"+req.body.product_designs_id+"'", function(err, product_designs) {
				if(err){
					console.log(err);
						res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					res.json({"statusCode": 200, "success":"true", "message": "rfq_line submitted successfully", "product_designs": product_designs});
				}
			});
		}
	});
};

exports.tendering_submit_rfq_to_sales = function(req, res){
	var query="SELECT * FROM `rfq` INNER JOIN `rfq_lines` ON `rfq`.`id`=`rfq_lines`.`rfq_id` AND `rfq_lines`.`rfq_line_status`='0' WHERE `rfq`.`id`='"+req.body.rfq_id+"'";
	connection.query(query, function(err, rfq_lines) {
		if(err){
			console.log(err);
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			if(rfq_lines.length==0){
				connection.query("UPDATE `rfq` SET `rfq_status_id`='"+req.body.rfq_status_id+"' WHERE `id`='"+req.body.rfq_id+"'", function(err, product_designs) {
					if(err){
						console.log(err);
						res.json({"statusCode": 500, "success":"false", "message": "internal error"});
					}
					else{
						res.json({"statusCode": 200, "success":"true", "message": "submitted successfully !"});
					}
				});
			}
			else{
				res.json({"statusCode": 422, "success":"true", "message": "rfq_lines not complete"});
			}
		}
	});
};

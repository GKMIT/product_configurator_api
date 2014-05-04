exports.tendering_teams_quotes = function(req, res){
	var query="SELECT `rfq`.`id`, `rfq`.`document_no`, `rfq`.`version_no`, `rfq`.`date_rfq_in`, `rfq`.requested_quotation_date FROM `rfq` WHERE `rfq_status_id`='4' ORDER BY `rfq`.`updated_at` desc";
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
	var query="SELECT `rfq`.`id`, `rfq`.`document_no`, `rfq`.`version_no`, `rfq`.`rfq_status_id` FROM `rfq` WHERE `rfq_status_id`='4' where `id`='"+req.body.rfq_id+"'";
	connection.query(query, function(err, rfq) {
		if(err){
			console.log(err);
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			 // `r_lines`.`material_cost`, `r_lines`.`labour_cost`, `r_lines`.`no_of_labour_hours`, 
			connection.query("SELECT `r_lines`.`id`, `r_lines`.`product_lines_id`, `p_lines`.`name` as `product_lines_name`, `r_lines`.`plants_id`, `plants`.`name`, as `plants_name` `r_lines`.`number_of_units`, `r_lines`.`req_delivery_date`, `r_lines`.`sales_price`, `r_lines`.`confirmed_delivery_date`, `r_lines`.`product_designs_id`  FROM `rfq_lines` `r_lines`, LEFT JOIN `product_lines` `p_lines` ON `r_lines`.`product_lines_id`=`p_lines`.`id` LEFT JOIN `plants` ON `r_lines`.`plants_id`=`plants`.`id` LEFT JOIN `product_designs` ON `r_lines`.`product_designs_id`=`product_designs`.`id`  WHERE `rfq_id`='"+req.body.rfq_id+"'", function(err, rfq_lines) {
				if(err){
					console.log(err);
						res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					connection.query("SELECT FROM `rfq_lines_technical_specs` `rlts` LEFT JOIN `product_properties` `pp` ON `rlts`.`product_properties_id`=`pp`.id WHERE `rfq_lines_id`='"+rfq_lines[0].id+"'", function(err, rfq_lines_technical_specs) {
						if(err){
							console.log(err);
								res.json({"statusCode": 500, "success":"false", "message": "internal error"});
						}
						else{
							connection.query("SELECT * FROM `product_designs` LEFT JOIN `product_designs_costs` ON `product_designs`.id=`product_designs_costs`.`product_designs_id` WHERE quarter='"+4+"'", function(err, product_design_detail) {
								if(err){
									console.log(err);
										res.json({"statusCode": 500, "success":"false", "message": "internal error"});
								}
								else{
									res.json({"statusCode": 200, "success":"true", "message": "", "rfq":rfq, "rfq_lines":rfq_lines, "rfq_lines_technical_specs": rfq_lines_technical_specs, "product_design_detail":product_design_detail});
								}
							});
						}
					});
				}
			});
		}
	});
}
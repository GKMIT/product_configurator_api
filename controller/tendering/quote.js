exports.tendering_teams_quotes = function(req, res){
	var query="SELECT DISTINCT `rfq`.`id` , `rfq`.`document_no`,  `rfq`.`version_no`,  `rfq`.`date_rfq_in`,  `rfq`.`requested_quotation_date` FROM  `rfq` INNER JOIN  `organization_users` ON  `rfq`.`tendering_teams_id` =  `organization_users`.`tendering_teams_id` WHERE  `rfq`.`rfq_status_id` =  '4' AND `organization_users`.`id`='"+req.params.user_id+"' ORDER BY  `rfq`.`updated_at` DESC";

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
	var query="SELECT `rfq`.`id`, `rfq`.`document_no`, `rfq`.`version_no`, `rfq`.`rfq_status_id` FROM `rfq` WHERE `rfq_status_id`='4' AND `id`='"+req.params.rfq_id+"' LIMIT 1";
	connection.query(query, function(err, rfq) {
		if(err){
			console.log(err);
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			connection.query("SELECT `r_lines`.`id`, `r_lines`.`product_lines_id`, `p_lines`.`mandatory_properties`, `p_lines`.`name` as `product_lines_name`, `r_lines`.`plants_id`, `plants`.`name` as `plants_name`, `r_lines`.`number_of_units`,`r_lines`.`req_delivery_date`, EXTRACT(MONTH FROM req_delivery_date) as month, EXTRACT(YEAR FROM req_delivery_date) as year, `r_lines`.`sales_price`, `r_lines`.`confirmed_delivery_date`, `r_lines`.`product_designs_id` FROM `rfq_lines` `r_lines` LEFT JOIN `product_lines` `p_lines` ON `r_lines`.`product_lines_id`=`p_lines`.`id` LEFT JOIN `plants` ON `r_lines`.`plants_id`=`plants`.`id` LEFT JOIN `product_designs` ON `r_lines`.`product_designs_id`=`product_designs`.`id`  WHERE `rfq_id`='"+req.params.rfq_id+"'", function(err, rfq_lines) {
				if(err){
					console.log(err);
						res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					if(rfq_lines.length==0){
						res.json({"statusCode": 404, "success":"false", "message": "rfq line items not exist"});
					}
					var complete_rfq_lines=rfq_lines;
					var counter=0;
					var counter1=0;
					for (var i = 0; i < rfq_lines.length; i++) {
						connection.query("SELECT `rlts`.`id`, `rlts`.`rfq_lines_id`, `rlts`.`product_properties_id`, `rlts`.`value`, `rlts`.`remark`, `pp`.`property_name`, `pp`.`unit_of_measurement` FROM `rfq_lines_technical_specs` `rlts` LEFT JOIN `product_properties` `pp` ON `rlts`.`product_properties_id`=`pp`.id WHERE `rfq_lines_id`='"+rfq_lines[counter].id+"'", function(err, rfq_lines_technical_specs) {
							if(err){
								console.log(err);
									res.json({"statusCode": 500, "success":"false", "message": "internal error"});
							}
							else{
								var quarter=Math.ceil(rfq_lines[counter].month/3);
								connection.query("SELECT `product_designs`.`id` as `product_design_id`, `product_designs`.`product_lines_id`, `product_designs`.`material_code`, `product_designs`.`design_number`, `product_designs`.`design_variant`, `product_designs`.`design_version`, `product_designs_costs`.`id` as `product_designs_costs_id`, `product_designs_costs`.`year`, `product_designs_costs`.`quarter`, `product_designs_costs`.`currency`, `product_designs_costs`.`labor_cost`, `product_designs_costs`.`labor_hours`, `product_designs_costs`.`material_cost` FROM `product_designs` LEFT JOIN `product_designs_costs` ON `product_designs`.id=`product_designs_costs`.`product_design_id` AND `product_designs_costs`.`quarter`='"+quarter+"' AND `product_designs_costs`.`year`='"+rfq_lines[counter1].year+"' WHERE `product_designs`.id='"+rfq_lines[counter1].product_designs_id+"' LIMIT 1", function(err, product_design_detail) {
									if(err){
										console.log(err);
											res.json({"statusCode": 500, "success":"false", "message": "internal error"});
									}
									else{
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
	connection.query("SELECT `product_lines`.`id`, `product_lines`.`mandatory_properties`, `product_lines`.`equal_properties`, `product_lines`.`range_properties` FROM `product_lines` INNER JOIN `rfq_lines` ON `product_lines`.`id`=`rfq_lines`.`product_lines_id` WHERE `rfq_lines`.`id`='"+req.body.rfq_lines_id+"'", function(err, product_lines){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			if(product_lines.length==0){
				res.json({"statusCode":200, "success":"true", "message":"product_lines not found"});
			}
			else{
				// console.log(product_lines.length);
			// var quarter=Math.ceil(rfq_lines[0].month/3);
			equal_prop=product_lines[0].equal_properties;
			range_prop=product_lines[0].range_properties;
			var mandatory_prop=product_lines[0].mandatory_properties;
			var counter=0;
			var equal_tech_detail=new Array();
			var range_tech_detail=new Array();
			var equalfilterids="";
			var rangefilterids="";
			equal_query="";
			range_query="";

			var mandatoryfilter=new Array();
			var mandatory_prop_arr=mandatory_prop.split(",");
			for (var i = 0; i < req.body.properties.length; i++) {
				for (var j = 0; j < mandatory_prop_arr.length; j++) {
					if(req.body.properties[i].id==mandatory_prop_arr[j]){
						mandatoryfilter.push(req.body.properties[i].id);
					}
				};
				// counter++;
			};
			// if(counter==req.body.properties.length){
				// console.log(mandatoryfilter.length);
				// console.log(mandatory_prop_arr.length);
				if(mandatoryfilter.length!=mandatory_prop_arr.length)
				res.json({"statusCode":422, "success":"false", "message":"mandatory properties not incomplete"});
			// }


			// new array declare for the create equalfilter AND rangefilter id, value array
			var equalfilter=new Array();
			var rangefilter=new Array();
			var equal_prop_arr=equal_prop.split(",");
			var range_prop_arr=range_prop.split(",");
			for (var i = 0; i < req.body.properties.length; i++) {
				for (var j = 0; j < equal_prop_arr.length; j++) {
					if(req.body.properties[i].id==equal_prop_arr[j]){
						equalfilter.push(req.body.properties[i]);
						equalfilterids+=req.body.properties[i].id+",";
						equal_query="product_properties_id='"+req.body.properties[i].id+"' AND spec_value='"+req.body.properties[i].value+"' AND";
					}
				};
			};
			for (var i = 0; i < req.body.properties.length; i++) {
				for (var j = 0; j < range_prop_arr.length; j++) {
					if(req.body.properties[i].id==range_prop_arr[j]){
						rangefilter.push(req.body.properties[i]);
						rangefilterids+=req.body.properties[i].id+",";
						range_query="product_properties_id='"+req.body.properties[i].id+"' AND spec_value='"+req.body.properties[i].value+"' AND";
					}
				};
			};
			equalfilterids=equalfilterids.substring("", equalfilterids.length-1);
			rangefilterids=rangefilterids.substring("", rangefilterids.length-1);
			equal_query=equal_query.substring("", equal_query.length-3);
			range_query=range_query.substring("", range_query.length-3);
			// console.log(equal_query);
			// console.log(range_query);
			var query_1 = "SELECT distinct `pd`.`id` FROM `product_designs` `pd`, `product_designs_costs` `pdc`,`master_data` `md` WHERE `pd`.`design_version_number`>`md`.`last_relevant_design_version` AND `pdc`.`material_pricelist_reference`=`md`.`most_recent_pricelist_version`";
			var query_2 = "SELECT distinct `product_design_id` FROM `product_designs_technical_details` WHERE `product_design_id` IN ("+query_1+") AND "+equal_query;
			
			var query_3 = "SELECT distinct `product_design_id` FROM `product_designs_technical_details`	WHERE product_design_id IN ("+query_2+") AND "+range_query;
			
			var final_query = "SELECT distinct id FROM `product_designs` WHERE id IN ("+query_3+")";
			connection.query(final_query, function(err, product_designs){
				if(err){
					console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					if(product_designs.length==0){
						res.json({"statusCode":200, "success":"true", "message":"product designs not found", "product_designs":[]});
					}
					else{
						final_design_ids="";
						for (var i = 0; i < product_designs.length; i++) {
							final_design_ids+=product_designs[i].id+",";
						};
						final_design_ids=final_design_ids.substring("", final_design_ids.length-1);
						connection.query("SELECT `product_designs`.`id`, `product_designs`.`plants_id`, `plants`.`name` as `plant_name`, `product_designs`.`material_code`, `product_designs`.`design_version`, `product_designs`.`design_variant` FROM `product_designs` LEFT JOIN `plants` ON `product_designs`.`plants_id`=`plants`.`id` WHERE `product_designs`.`id` IN ("+final_design_ids+")", function(err, result){
							if(err){
								console.log(err);
								res.json({"statusCode": 500, "success":"false", "message": "internal error"});
							}
							else{
								if(result.length==0){
									res.json({"statusCode": 200, "success":"true", "message": "result not found", "product_designs": "[]"});
								}
								else{
									res.json({"statusCode": 200, "success":"true", "message": "", "product_designs": result});
								}
							}
						});
					}
					
				}
			});
			}
			
		}
	});
};

exports.tendering_fetch_particular_design = function(req, res){
	var query="SELECT `rfq_lines`.`id`, `rfq_lines`.`req_delivery_date`, EXTRACT(MONTH FROM req_delivery_date) as month, EXTRACT(YEAR FROM req_delivery_date) as year FROM `rfq_lines` WHERE `rfq_lines`.`id`='"+req.params.rfq_lines_id+"' LIMIT 1";
	connection.query(query, function(err, rfq_lines){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			if(rfq_lines.length==0){
				res.json({"statusCode": 200, "success":"false", "message": "rfq_lines item not found"});
			}
			else{
				var year=rfq_lines[0].year;
				var quarter=Math.ceil(rfq_lines[0].month/3);
				connection.query("SELECT `pd`.`id`, `pd`.`product_lines_id`, `pd`.`plants_id`, `pd`.`standard_for_country`, `pd`.`standard_for_customer`, `pd`.`material_code`, `pd`.`design_number`,  `pd`.`design_variant`, `pdc`.`id` AS  `product_design_costs_id`, `pdc`.`material_pricelist_reference`, `pdc`.`year`, `pdc`.`quarter`, `pdc`.`currency`, `pdc`.`labor_cost` ,  `pdc`.`labor_hours`, `pdc`.`material_cost`, `pdsp`.`minimum_price`, `pdsp`.`id` as `product_designs_sales_prices_id`, `pdsp`.`minimum_price`, `pdsp`.`minimum_price_for_country_id`, `pdsp`.`validity_date_from`, `pdsp`.`validity_date_to` FROM `product_designs` `pd` LEFT JOIN `product_designs_costs` `pdc` ON `pd`.`id`=`pdc`.`product_design_id` AND `pdc`.`year`='"+year+"' AND `pdc`.`quarter`='"+quarter+"' LEFT JOIN `product_designs_sales_prices` `pdsp` ON `pdsp`.`product_designs_id`='"+req.params.product_designs_id+"' WHERE `pd`.`id`='"+req.params.product_designs_id+"'", function(err, design) {
					if(err){
						console.log(err);
						res.json({"statusCode": 500, "success":"false", "message": "internal error"});
					}
					else{
						connection.query("SELECT `id`, `product_design_id`, `product_properties_id`, `spec_value`, `calculated_value`, `measured_value` FROM `product_designs_technical_details` WHERE `product_design_id`='"+req.params.product_designs_id+"'", function(err, design_technical_detail){
							if(err){
								res.json({"statusCode": 500, "success":"false", "message": "internal error"});
							}
							else{
								res.json({"statusCode": 200, "success":"true", "message": "", "design":design, "product_designs_technical_details": design_technical_detail});
							}
						});
					}
				});
			}
		}
	});
}

exports.tendering_submit_rfq_lines = function(req, res){
	var query="UPDATE `rfq_lines` SET `product_designs_id`='"+req.body.product_designs_id+"', `confirmed_delivery_date`='"+req.body.confirmed_delivery_date+"', `sales_price`='"+req.body.sales_price+"', `rfq_line_status`='2' WHERE `id`='"+req.body.rfq_lines_id+"' AND `rfq_id`='"+req.body.rfq_id+"'";
	connection.query(query, function(err, info) {
		if(err){
			console.log(err);
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			if(info.affectedRows>0){
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
			else{
				res.json({"statusCode": 400, "success":"true", "message": "rfq_line not submitted"});
			}
		}
	});
};

exports.tendering_submit_rfq_to_sales = function(req, res){
	var query="SELECT `rfq`.`id`, EXTRACT(MONTH FROM req_delivery_date) as month, EXTRACT(YEAR FROM req_delivery_date) as year, `rfq_lines`.`product_designs_id` FROM `rfq` INNER JOIN `rfq_lines` ON `rfq`.`id`=`rfq_lines`.`rfq_id` AND `rfq_lines`.`rfq_line_status`='2' WHERE `rfq`.`id`='"+req.body.rfq_id+"'";
	connection.query(query, function(err, rfq_lines) {
		if(err){
			console.log(err);
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			connection.query("select * from rfq_lines where rfq_id='"+req.body.rfq_id+"'", function(err, all_rfq_lines) {
				if(err){
					console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					if(rfq_lines.length==all_rfq_lines.length){
						connection.query("select SUM(`sales_price`) as `sales_price` from rfq_lines where rfq_id='"+req.body.rfq_id+"'", function(err, estimated_sales_price) {
							if(err){
								console.log(err);
								res.json({"statusCode": 500, "success":"false", "message": "internal error"});
							}
							else{
								connection.query("UPDATE `rfq` SET `estimated_sales_price`='"+estimated_sales_price[0].sales_price+"', `quote_creation_date`=NOW(), `rfq_status_id`='"+req.body.rfq_status_id+"' WHERE `id`='"+req.body.rfq_id+"'", function(err, product_designs) {
									if(err){
										console.log(err);
										res.json({"statusCode": 500, "success":"false", "message": "internal error"});
									}
									else{
										res.json({"statusCode": 200, "success":"true", "message": "submitted successfully !"});
									}
								});
							}
						});
					}
					else{
						res.json({"statusCode": 422, "success":"true", "message": "Please complete all rfq_line items"});
					}
				}
			});
		}
	});
};

exports.tendering_teams_quotes = function(req, res){
	// discuss and decide who will see the quotes tendering_team head as and member
	// var query="SELECT distinct `rfq`.`id`, `rfq`.`document_no`, `rfq`.`version_no`, `rfq`.`date_rfq_in`, `rfq`.requested_quotation_date FROM `rfq`, `tendering_teams` WHERE `rfq`.`rfq_status_id`='4' AND `tendering_teams`.`id`=`rfq`.`tendering_teams_id` AND (`tendering_teams`.`head_id`='"+req.params.user_id+"' OR `rfq`.`tendering_teams_members_id`='"+req.params.user_id+"') ORDER BY `rfq`.`updated_at` desc";
	// var query="SELECT distinct `rfq`.`id`, `rfq`.`document_no`, `rfq`.`version_no`, `rfq`.`date_rfq_in`, `rfq`.requested_quotation_date FROM `rfq` WHERE `rfq`.`rfq_status_id`='4' AND `rfq`.`tendering_teams_members_id`='"+req.params.user_id+"' ORDER BY `rfq`.`updated_at` desc";
	// console.log(query);
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
	var query="SELECT `rfq`.`id`, `rfq`.`document_no`, `rfq`.`version_no`, `rfq`.`rfq_status_id` FROM `rfq` WHERE `rfq_status_id`='4' AND `id`='"+req.params.rfq_id+"'";
	connection.query(query, function(err, rfq) {
		if(err){
			console.log(err);
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			// console.log(rfq);
			 // `r_lines`.`material_cost`, `r_lines`.`labour_cost`, `r_lines`.`no_of_labour_hours`, 
			connection.query("SELECT `r_lines`.`id`, `r_lines`.`product_lines_id`, `p_lines`.`mandatory_properties`, `p_lines`.`name` as `product_lines_name`, `r_lines`.`plants_id`, `plants`.`name` as `plants_name`, `r_lines`.`number_of_units`,`r_lines`.`req_delivery_date`, EXTRACT(MONTH FROM req_delivery_date) as month, EXTRACT(YEAR FROM req_delivery_date) as year, `r_lines`.`sales_price`, `r_lines`.`confirmed_delivery_date`, `r_lines`.`product_designs_id` FROM `rfq_lines` `r_lines` LEFT JOIN `product_lines` `p_lines` ON `r_lines`.`product_lines_id`=`p_lines`.`id` LEFT JOIN `plants` ON `r_lines`.`plants_id`=`plants`.`id` LEFT JOIN `product_designs` ON `r_lines`.`product_designs_id`=`product_designs`.`id`  WHERE `rfq_id`='"+req.params.rfq_id+"'", function(err, rfq_lines) {
				if(err){
					console.log(err);
						res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					// console.log(rfq_lines);
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
								// console.log(counter1);
								// console.log(rfq_lines[counter].product_designs_id);
								// console.log("counter is : "+counter);
								connection.query("SELECT * FROM `product_designs` LEFT JOIN `product_designs_costs` ON `product_designs`.id=`product_designs_costs`.`product_design_id` AND `product_designs_costs`.`quarter`='"+quarter+"' AND `product_designs_costs`.`year`='"+rfq_lines[counter1].year+"' WHERE `product_designs`.id='"+rfq_lines[counter1].product_designs_id+"'", function(err, product_design_detail) {
									if(err){
										console.log(err);
											res.json({"statusCode": 500, "success":"false", "message": "44internal error"});
									}
									else{
										// console.log("counter is ===>  "+counter);
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
	console.log(req.body);
	var query="SELECT `rfq_lines`.`id`, `rfq_lines`.`product_lines_id`, `product_lines`.`name` as `product_lines_name`, `rfq_lines`.`plants_id`, `plants`.`name` as `plants_name`, `rfq_lines`.`number_of_units`, `rfq_lines`.`req_delivery_date`, EXTRACT(MONTH FROM req_delivery_date) as month, EXTRACT(YEAR FROM req_delivery_date) as year FROM `rfq_lines` LEFT JOIN `product_lines` ON `rfq_lines`.`product_lines_id`=`product_lines`.`id` LEFT JOIN `plants` ON `rfq_lines`.`plants_id`=`plants`.`id` WHERE `rfq_lines`.`id`='"+req.body.rfq_lines_id+"' AND `rfq_id`='"+req.body.rfq_id+"'";
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
			var equal_prop="";
			var range_prop="";
			connection.query("SELECT `product_lines`.`id`, `product_lines`.`equal_properties`, `product_lines`.`range_properties` FROM `product_lines` INNER JOIN `rfq_lines` ON `product_lines`.`id`=`rfq_lines`.`product_lines_id` WHERE `rfq_lines`.`id`='"+req.body.rfq_lines_id+"'", function(err, product_lines){
				if(err){
					console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					equal_prop=product_lines[0].equal_properties;
					range_prop=product_lines[0].range_properties;
					var query_equal_part="";
					var query_range_part="";
					var counter=0;
					console.log(req.body.equalfilter[0].id);
					for (var i = 0; i < req.body.equalfilter.length; i++) {
						console.log(i);
						query_equal_part=query_equal_part+" "+req.body.equalfilter[i].id+" IN ("+equal_prop+") AND pdtd.product_properties_id='"+req.body.equalfilter[i].id+"' ";
						if(i<req.body.equalfilter.length){
							query_equal_part+="AND ";
						}
					};
					var j=0;
					for (j = 0; j < req.body.rangefilter.length; j++) {
						query_range_part=query_range_part+"AND "+req.body.rangefilter[j].id+" IN ("+range_prop+") AND pdtd.product_properties_id='"+req.body.rangefilter[j].value+"' ";
						// if(j<req.body.rangefilter.length){
						// 	query_range_part+="AND ";
						// }
						counter++;
					};
					if(counter==j){
						query="SELECT `pd`.`id` ,  `pd`.`product_lines_id` ,  `pd`.`plants_id` ,  `pd`.`standard_for_country` ,  `pd`.`standard_for_customer` , `pd`.`material_code` ,  `pd`.`design_number` ,  `pd`.`design_variant` ,  `pdc`.`id` AS  `product_design_costs_id` , `pdc`.`material_pricelist_reference` ,  `pdc`.`year` ,  `pdc`.`quarter` ,  `pdc`.`currency` ,  `pdc`.`labor_cost` ,  `pdc`.`labor_hours` , `pdc`.`material_cost`, `pdsp`.`minimum_price`, `pdsp`.`id` as `product_designs_sales_prices_id`, `pdsp`.`minimum_price`, `pdsp`.`minimum_price_for_country_id`, `pdsp`.`validity_date_from`, `pdsp`.`validity_date_to`, `pdtd`.`plus_tolerance`, `pdtd`.`product_properties_id`, `pdtd`.`minus_tolerance`, `pdtd`.`maximum_value`, `pdtd`.`minimum_value` FROM `product_designs` `pd`, `product_designs_technical_details` `pdtd` INNER JOIN `product_designs_costs` `pdc` ON `pd`.`id`=`pdc`.`product_design_id` AND `pdc`.`year`='"+rfq_lines[0].year+"' AND `pdc`.`quarter`='"+quarter+"' INNER JOIN `product_designs_sales_prices` `pdsp` ON `pdsp`.`product_designs_id`=`pd`.`id` INNER JOIN `master_data` `md` ON `pd`.`design_version_number>md.last_relevant_design_version` AND `pdc`.material_pricelist_reference=`md`.`most_recent_pricelist_version` WHERE "+query_equal_part+" "+query_range_part;
						console.log(query);
						connection.query(query, function(err, designs){
							if(err){
								console.log(err);
								res.json({"statusCode": 500, "success":"false", "message": "internal error"});
							}
							else{
								var design_detail=new array();
								var final_designs=new array();
								for (var i = 0; i < req.body.equalfilter.length; i++) {
									for (var j = 0; j < designs.length; j++) {
										if(req.body.equalfilter[i].id==designs[j].product_properties_id){
											// if()
											var prop_val=req.body.equalfilter[i].value;
											if(((prop_val+designs[j].plus_tolerance)>designs[j].maximum_value) && ((prop_val-designs[j].minus_tolerance)>designs[j].minimum_value)){
												design_detail.push(designs[j]);
											}

										}
									};
									if(i>=req.body.equalfilter){
										for (var i = 0; i < req.body.equalfilter.length; i++) {
											for (var j = 0; j < design_detail.length; j++) {
												if(req.body.equalfilter[i].id==design_detail[j].product_properties_id){
													// if()
													var prop_val=req.body.equalfilter[i].value;
													if(((prop_val+design_detail[j].plus_tolerance)=design_detail[j].maximum_value) && ((prop_val-design_detail[j].minus_tolerance)=design_detail[j].minimum_value)){
														final_designs.push(design_detail[j]);
													}

												}
											};
											if(i>=req.body.equalfilter){
												res.json({"statusCode": 200, "success":"true", "message": "", "rfq_lines":rfq_lines, "product_designs": design_detail});
											}
										};
									}
								};
							}
						});
					}
				}
			});

			// connection.query("SELECT `pd`.`id` ,  `pd`.`product_lines_id` ,  `pd`.`plants_id` ,  `pd`.`standard_for_country` ,  `pd`.`standard_for_customer` , `pd`.`material_code` ,  `pd`.`design_number` ,  `pd`.`design_variant` ,  `pdc`.`id` AS  `product_design_costs_id` , `pdc`.`material_pricelist_reference` ,  `pdc`.`year` ,  `pdc`.`quarter` ,  `pdc`.`currency` ,  `pdc`.`labor_cost` ,  `pdc`.`labor_hours` , `pdc`.`material_cost`, `pdsp`.`minimum_price`, `pdsp`.`id` as `product_designs_sales_prices_id`, `pdsp`.`minimum_price`, `pdsp`.`minimum_price_for_country_id`, `pdsp`.`validity_date_from`, `pdsp`.`validity_date_to` FROM `product_designs` `pd` INNER JOIN `product_designs_costs` `pdc` ON `pd`.`id`=`pdc`.`product_design_id` AND `pdc`.`year`='"+rfq_lines[0].year+"' AND `pdc`.`quarter`='"+quarter+"' INNER JOIN `product_designs_sales_prices` `pdsp` ON `pdsp`.`product_designs_id`=`pd`.`id`", function(err, product_designs) {
			// 	if(err){
			// 		console.log(err);
			// 			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			// 	}
			// 	else{
			// 		res.json({"statusCode": 200, "success":"true", "message": "", "rfq_lines":rfq_lines, "product_designs": product_designs});
			// 	}
			// });
		}
	});
}

exports.tendering_fetch_particular_design = function(req, res){
	connection.query("SELECT `pd`.`id`, `pd`.`product_lines_id`, `pd`.`plants_id`, `pd`.`standard_for_country`, `pd`.`standard_for_customer`, `pd`.`material_code`, `pd`.`design_number`,  `pd`.`design_variant`, `pdc`.`id` AS  `product_design_costs_id`, `pdc`.`material_pricelist_reference`, `pdc`.`year`, `pdc`.`quarter`, `pdc`.`currency`, `pdc`.`labor_cost` ,  `pdc`.`labor_hours`, `pdc`.`material_cost`, `pdsp`.`minimum_price`, `pdsp`.`id` as `product_designs_sales_prices_id`, `pdsp`.`minimum_price`, `pdsp`.`minimum_price_for_country_id`, `pdsp`.`validity_date_from`, `pdsp`.`validity_date_to` FROM `product_designs` `pd` LEFT JOIN `product_designs_costs` `pdc` ON `pd`.`id`=`pdc`.`product_design_id` AND `pdc`.`id`='"+req.params.product_designs_costs_id+"' LEFT JOIN `product_designs_sales_prices` `pdsp` ON `pdsp`.`product_designs_id`='"+req.params.product_designs_id+"' WHERE `pd`.`id`='"+req.params.product_designs_id+"'", function(err, design) {
		if(err){
			console.log(err);
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			connection.query("SELECT * FROM `product_designs_technical_details` WHERE `product_design_id`='"+req.params.product_designs_id+"'", function(err, design_technical_detail){
				if(err){
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					res.json({"statusCode": 200, "success":"true", "message": "", "design":design, "product_designs_technical_details": design_technical_detail});
				}
			});
			// res.json({"statusCode": 200, "success":"true", "message": "", "design":design});
		}
	});
}

exports.tendering_submit_rfq_lines = function(req, res){
	var query="UPDATE `rfq_lines` SET `product_designs_id`='"+req.body.product_designs_id+"', `confirmed_delivery_date`='"+req.body.confirmed_delivery_date+"', `sales_price`='"+req.body.sales_price+"', `rfq_line_status`='1' WHERE `id`='"+req.body.rfq_lines_id+"'";
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
	var query="SELECT `rfq`.`id`, EXTRACT(MONTH FROM req_delivery_date) as month, EXTRACT(YEAR FROM req_delivery_date) as year, `rfq_lines`.`product_designs_id` FROM `rfq` INNER JOIN `rfq_lines` ON `rfq`.`id`=`rfq_lines`.`rfq_id` AND `rfq_lines`.`rfq_line_status`='1' WHERE `rfq`.`id`='"+req.body.rfq_id+"'";
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
						// if(rfq_lines.length>0){
							var estimated_sales_price=0;
							var quarter=0;
							var counter=0;
							for (var i = 0; i < rfq_lines.length; i++) {
								connection.query("SELECT `id`, `minimum_price` FROM `product_designs_sales_prices` WHERE `product_designs_id`='"+rfq_lines[i].product_designs_id+"' ORDER BY `updated_at` desc", function(err, sales_price) {
								if(err){
									console.log(err);
									res.json({"statusCode": 500, "success":"false", "message": "internal error"});
								}
								else{
									estimated_sales_price+=sales_price[0];
									counter++;
									if(counter==rfq_lines.length){
										connection.query("UPDATE `rfq` SET `quote_creation_date`=NOW(), `rfq_status_id`='"+req.body.rfq_status_id+"' WHERE `id`='"+req.body.rfq_id+"'", function(err, product_designs) {
											if(err){
												console.log(err);
												res.json({"statusCode": 500, "success":"false", "message": "internal error"});
											}
											else{
												res.json({"statusCode": 200, "success":"true", "message": "submitted successfully !"});
											}
										});
									}
								}
							});
							};
							
						// }
						// else{
						// 	res.json({"statusCode": 422, "success":"true", "message": "rfq_lines not complete"});
						// }
					}
					else{
						res.json({"statusCode": 422, "success":"true", "message": "Please complete all rfq_line items"});
					}
				}
			});
			
		}
	});
};

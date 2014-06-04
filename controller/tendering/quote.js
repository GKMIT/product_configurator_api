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
			connection.query("SELECT `r_lines`.`id`, `r_lines`.`product_lines_id`, `p_lines`.`mandatory_properties`, `p_lines`.`name` as `product_lines_name`, `r_lines`.`plants_id`, `plants`.`name` as `plants_name`, `r_lines`.`number_of_units`,`r_lines`.`req_delivery_date`, EXTRACT(MONTH FROM req_delivery_date) as month, EXTRACT(YEAR FROM req_delivery_date) as year, `r_lines`.`sales_price`, `r_lines`.`confirmed_delivery_date`, `r_lines`.`product_designs_id`, `r_lines`.`minimum_sales_price`, `r_lines`.`rfq_lines_calculated_sales_price_id` FROM `rfq_lines` `r_lines` LEFT JOIN `product_lines` `p_lines` ON `r_lines`.`product_lines_id`=`p_lines`.`id` LEFT JOIN `plants` ON `r_lines`.`plants_id`=`plants`.`id` LEFT JOIN `product_designs` ON `r_lines`.`product_designs_id`=`product_designs`.`id`  WHERE `rfq_id`='"+req.params.rfq_id+"'", function(err, rfq_lines) {
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
					// var counter1=0;
					var counter2=0;
					connection.query("SELECT `id`, `name` FROM `complexities`", function(err, complexities){
						if(err){
							console.log(err);
							res.json({"statusCode": 500, "success":"false", "message": "internal error"});
						}
						else{
							connection.query("SELECT `id`, `name` FROM `product_types`", function(err, product_types){
								if(err){
									console.log(err);
									res.json({"statusCode": 500, "success":"false", "message": "internal error"});
								}
								else{
									for (var i = 0; i < rfq_lines.length; i++) {
									connection.query("SELECT `rlts`.`id`, `rlts`.`rfq_lines_id`, `rlts`.`product_properties_id`, `rlts`.`value`, `rlts`.`remark`, `pp`.`property_name`, `pp`.`unit_of_measurement`, `pp`.`data_type` FROM `rfq_lines_technical_specs` `rlts` LEFT JOIN `product_properties` `pp` ON `rlts`.`product_properties_id`=`pp`.id WHERE `rfq_lines_id`='"+rfq_lines[i].id+"'", function(err, rfq_lines_technical_specs) {
										if(err){
											console.log(err);
												res.json({"statusCode": 500, "success":"false", "message": "internal error"});
										}
										else{
											// , `product_designs`.`acc`
											var loopCounter=0;
											var quarter=Math.ceil(rfq_lines[counter].month/3);
											connection.query("SELECT `product_designs`.`id` as `product_design_id`, `product_designs`.`product_lines_id`, `product_designs`.`material_code`, `product_designs`.`design_number`, `product_designs`.`design_variant`, `product_designs`.`design_version`, `product_designs_costs`.`id` as `product_designs_costs_id`, `product_designs_costs`.`year`, `product_designs_costs`.`quarter`, `product_designs_costs`.`currency`, `product_designs_costs`.`labor_cost`, `product_designs_costs`.`labor_hours`, `product_designs_costs`.`material_cost` FROM `product_designs` LEFT JOIN `product_designs_costs` ON `product_designs`.id=`product_designs_costs`.`product_design_id` AND `product_designs_costs`.`quarter`='"+quarter+"' AND `product_designs_costs`.`year`='"+rfq_lines[counter].year+"' WHERE `product_designs`.id='"+rfq_lines[counter].product_designs_id+"' LIMIT 1", function(err, product_design_detail) {
												if(err){
													console.log(err);
														res.json({"statusCode": 500, "success":"false", "message": "internal error"});
												}
												else{
													complete_rfq_lines[counter2]["rfq_lines_technical_specs"]=rfq_lines_technical_specs;
													complete_rfq_lines[counter2]["product_design_detail"]=product_design_detail;
													counter2++;
													if(counter2==rfq_lines.length){
														res.json({"statusCode": 200, "success":"true", "message": "","rfq":rfq ,"rfq_lines":complete_rfq_lines, "complexities":complexities, "product_types": product_types});
													}
												}
												// counter1++;
											});
										counter++;
										}
									});
								};
								}
							});
						}
					});
					
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
				if(mandatoryfilter.length!=mandatory_prop_arr.length){
					res.json({"statusCode":422, "success":"false", "message":"mandatory properties not incomplete"});
				}
				else{
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
								equal_query+=" product_design_id IN ( SELECT product_design_id FROM product_designs_technical_details WHERE product_properties_id='"+req.body.properties[i].id+"' AND spec_value='"+req.body.properties[i].value+"') AND";
							}
						};
					};
					for (var i = 0; i < req.body.properties.length; i++) {
						for (var j = 0; j < range_prop_arr.length; j++) {
							if(req.body.properties[i].id==range_prop_arr[j]){
								rangefilter.push(req.body.properties[i]);
								rangefilterids+=req.body.properties[i].id+",";
								// range_query+=" product_design_id IN ( SELECT product_design_id FROM product_designs_technical_details WHERE product_properties_id='"+req.body.properties[i].id+"' AND spec_value='"+req.body.properties[i].value+"') AND";
								range_query+=" product_design_id IN ( SELECT product_design_id FROM product_designs_technical_details WHERE product_properties_id='"+req.body.properties[i].id+"' AND minimum_value <= '"+req.body.properties[i].value+"' AND maximum_value >= '"+req.body.properties[i].value+"' ) AND";
							}
						};
					};
					equalfilterids=equalfilterids.substring("", equalfilterids.length-1);
					rangefilterids=rangefilterids.substring("", rangefilterids.length-1);
					equal_query=equal_query.substring("", equal_query.length-3);
					range_query=range_query.substring("", range_query.length-3);
					var query_1 = "SELECT distinct `pd`.`id` FROM `product_designs` `pd`, `product_designs_costs` `pdc`,`master_data` `md` WHERE `pd`.`design_version_number`>`md`.`last_relevant_design_version` AND `pdc`.`material_pricelist_reference`=`md`.`most_recent_pricelist_version`";
					var query_2 = "SELECT distinct `product_design_id` FROM `product_designs_technical_details` WHERE `product_design_id` IN ("+query_1+") AND "+equal_query;
					var query_3 = "SELECT distinct `product_design_id` FROM `product_designs_technical_details`	WHERE product_design_id IN ("+query_2+") AND "+range_query;
					var final_query = "SELECT distinct id FROM `product_designs` WHERE id IN ("+query_2+")";
					if(rangefilter.length>0){
						final_query="SELECT distinct id FROM `product_designs` WHERE id IN ("+query_3+")";
					}
					
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
								connection.query("SELECT `product_designs`.`id`, `product_designs`.`plants_id`, `plants`.`name` as `plant_name`, `product_designs`.`material_code`, `product_designs`.`design_version`, `product_designs`.`design_variant`, `product_designs`.`accessories`, `product_designs`.`acc` FROM `product_designs` LEFT JOIN `plants` ON `product_designs`.`plants_id`=`plants`.`id` WHERE `product_designs`.`id` IN ("+final_design_ids+")", function(err, result){
									if(err){
										console.log(err);
										res.json({"statusCode": 500, "success":"false", "message": "internal error"});
									}
									else{
										if(result.length==0){
											res.json({"statusCode": 200, "success":"true", "message": "result not found", "product_designs": "[]"});
										}
										else{
											if(rangefilter.length>0){
												var result_design_ids="";
												for (var i = 0; i < product_designs.length; i++) {
													result_design_ids+=product_designs[i].id+",";
												};
												result_design_ids=result_design_ids.substring("", result_design_ids.length-1);

												query_1="SELECT `pdtd`.`product_design_id`, `pdtd`.`product_properties_id`, `pp`.`property_name`, `pp`.`unit_of_measurement`, `pdtd`.`spec_value`, `pdtd`.`plus_tolerance`, `pdtd`.`minus_tolerance` FROM `product_designs_technical_details` `pdtd`  INNER JOIN `product_properties` `pp` ON `pp`.`id`=`pdtd`.`product_properties_id` WHERE `pdtd`.`product_design_id` IN ("+result_design_ids+") AND "+	range_query +" AND `pdtd`.`product_properties_id` IN ("+rangefilterids+")";
												connection.query(query_1, function(err, range_result){
													if(err){
														console.log(err);
														res.json({"statusCode": 500, "success":"false", "message": "internal error"});
													}
													else{
														range_result_arr=new Array();
														var name="range_properties";
														
														var counter=0;
														for (var i = 0; i < result.length; i++) {
															for (var j = 0; j < range_result.length; j++) {
																if(result[counter].id==range_result[j].product_design_id){
																		range_result_arr.push({"property_name":range_result[j].property_name, "unit_of_measurement": range_result[j].unit_of_measurement, "spec_value":range_result[j].spec_value, "plus_tolerance": range_result[j].plus_tolerance, "minus_tolerance": range_result[j].minus_tolerance});
																}
															};
															result[counter][name]=range_result_arr;
															range_result_arr=[];
															counter++;
														};

														connection.query("SELECT distinct `id`, `property_name` FROM `product_properties` WHERE `product_properties`.`id` IN ("+rangefilterids+")", function(err, range_property_result){
															if(err){
																console.log(err);
																res.json({"statusCode": 500, "success":"false", "message": "internal error"});
															}
															else{
																res.json({"statusCode": 200, "success":"true", "message": "", "filter_properties": range_property_result, "product_designs": result});
															}
														});
													}
												});
											}
											else{
												for (var i = 0; i < result.length; i++) {
													result[i]["range_properties"]=[];
												};
												res.json({"statusCode": 200, "success":"true", "message": "",  "filter_properties":[], "product_designs": result});
											}
										}
									}
								});
							}
						}
					});
				}
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
				connection.query("SELECT `pd`.`id`, `pd`.`product_lines_id`, `pd`.`plants_id`, `pd`.`standard_for_country`, `pd`.`standard_for_customer`, `pd`.`material_code`, `pd`.`design_number`, `pd`.`design_variant`, `pd`.`accessories`, `pdc`.`id` AS  `product_design_costs_id`, `pdc`.`material_pricelist_reference`, `pdc`.`year`, `pdc`.`quarter`, `pdc`.`currency`, `pdc`.`labor_cost` ,  `pdc`.`labor_hours`, `pdc`.`material_cost`, `pdsp`.`minimum_price`, `pdsp`.`id` as `product_designs_sales_prices_id`, `pdsp`.`minimum_price`, `pdsp`.`minimum_price_for_country_id`, `pdsp`.`validity_date_from`, `pdsp`.`validity_date_to` FROM `product_designs` `pd` LEFT JOIN `product_designs_costs` `pdc` ON `pd`.`id`=`pdc`.`product_design_id` AND `pdc`.`year`='"+year+"' AND `pdc`.`quarter`='"+quarter+"' LEFT JOIN `product_designs_sales_prices` `pdsp` ON `pdsp`.`product_designs_id`='"+req.params.product_designs_id+"' WHERE `pd`.`id`='"+req.params.product_designs_id+"'", function(err, design) {
					if(err){
						console.log(err);
						res.json({"statusCode": 500, "success":"false", "message": "internal error"});
					}
					else{
						connection.query("SELECT `pdtd`.`id`, `pdtd`.`product_design_id`, `pdtd`.`product_properties_id`, `product_properties`.`property_name`, `product_properties`.`unit_of_measurement`, `pdtd`.`spec_value`, `pdtd`.`calculated_value`, `pdtd`.`measured_value` FROM `product_designs_technical_details` `pdtd` LEFT JOIN `product_properties` ON `pdtd`.`product_properties_id`=`product_properties`.`id` WHERE `pdtd`.`product_design_id`='"+req.params.product_designs_id+"'", function(err, design_technical_detail){
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
	var query="UPDATE `rfq_lines` SET `product_designs_id`='"+req.body.product_designs_id+"', `confirmed_delivery_date`='"+req.body.confirmed_delivery_date+"', `sales_price`='"+req.body.sales_price+"', `rfq_line_status`='2', `material_cost`='"+req.body.material_cost+"', `labour_cost`='"+req.body.labor_cost+"', `no_of_labour_hours`='"+req.body.no_of_labor_hours+"' WHERE `id`='"+req.body.rfq_lines_id+"' AND `rfq_id`='"+req.body.rfq_id+"'";
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

exports.tendering_calculate_sales_price = function(req, res){
	var query_1="SELECT `plants_id`, EXTRACT(YEAR FROM req_delivery_date) as year, EXTRACT(MONTH FROM req_delivery_date) as month, `number_of_units` FROM `rfq_lines` WHERE `id`='"+req.params['rfq_lines_id']+"' LIMIT 1";
	connection.query(query_1, function(err, rfq_lines){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			var quarter=Math.ceil(rfq_lines[0].month/3);
			var year=rfq_lines[0].year;
			var query_1="SELECT `labor_cost`, `labor_hours`, `material_cost`, `currency` FROM `product_designs_costs` WHERE product_design_id='"+req.params['product_design_id']+"' AND year='"+year+"' AND quarter='"+quarter+"' LIMIT 1";
			console.log("SELECT `labor_cost`, `labor_hours`, `material_cost`, `currency` FROM `product_designs_costs` WHERE product_design_id='"+req.params['product_design_id']+"' AND year='"+year+"' AND quarter='"+quarter+"' LIMIT 1");
			connection.query(query_1, function(err, product_cost_data){
				if(err){
					console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					var plants_id=rfq_lines[0].plants_id;
					var query_1="SELECT `id`, `overhead_name`, `value` FROM `plants_master_data` WHERE `plant_id`='"+plants_id+"'";
					connection.query(query_1, function(err, overheads){
						if(err){
							console.log(err);
							res.json({"statusCode": 500, "success":"false", "message": "internal error"});
						}
						else{
							// var query_1="SELECT `id`, `complexities_id`, `plants_id`, `overhead` FROM `complexities_master_data` WHERE `plants_id`='"+plants_id+"' AND `complexities_id`='"+req.params['complexities_id']+"'";
							// var query_1="SELECT `id`, `complexities_id`, `plants_id`, `overhead` FROM `complexities_master_data` WHERE `plants_id`='"+plants_id+"' AND `complexities_id`='3'";
							Q1="SELECT product_lines_id FROM `rfq_lines` WHERE id='"+req.params['rfq_lines_id']+"'";
							Q2="SELECT id FROM  `product_properties` WHERE property_name='complexity' AND product_lines_id IN ("+Q1+")";
							Q3="SELECT value FROM `rfq_lines_technical_specs` WHERE `rfq_lines_id`='"+req.params['rfq_lines_id']+"' AND product_properties_id IN ("+Q2+")";
							//Q4="SELECT id FROM complexities WHERE name=("+Q3+")";
							Q5="SELECT `complexities_id`, `plants_id`, `overhead`, `complexities`.`name` as `complexity_name` FROM `complexities_master_data` LEFT JOIN `complexities` ON `complexities`.`id`=`complexities_master_data`.`complexities_id` WHERE `plants_id`='"+plants_id+"' AND complexities_id ='"+req.params.complexity_id+"'";

							connection.query(Q5, function(err, complexities){
								if(err){
									console.log(err);
									res.json({"statusCode": 500, "success":"false", "message": "internal error"});
								}
								else{
									if(product_cost_data.length>0)
										product_cost_data[0]["extra_engineering_hours"]=0;
									res.json({"statusCode": 200, "success":"true", "message": "", "product_cost_data": product_cost_data, "overheads": overheads, "complexities": complexities, "rfq_lines": rfq_lines});
								}
							});
						}
					});
				}
			});
			
		}
	});
};

exports.tendering_save_calculated_sales_price = function(req, res){
	// "plants_id", "complexities_id", 
	var fields= ["product_design_id", "rfq_lines_id", "material_cost", "labor_cost", "labor_hours", "extra_engineering_cost", "dcp", "cost_packaging", "packaging_cost_transformer", "extra_packaging_costs_build_of_parts", "packaging", "engineering_overheads", "plant_overheads", "site_overheads", "regional_overheads", "product_line_overheads", "corporate_overheads", "depreciation", "overheads", "frieght_f_term", "friegth_c_term", "friegth_d_term", "transport", "financial_cost_loc", "financial_cost_bonds", "maintenance_equipment", "administrative_cost_various", "extra_documentation_required", "supervision", "erection_comm", "factory_training", "onsite_training", "warranty_on_full_cost", "extra_cost", "full_cost_excluding_commision", "ebit_percentage", "ebit", "commission_on_net_sales_price", "commission_on_f_term", "commission_on_gross_sales", "commission", "minimum_intercompany_sales", "minimum_sales_price_to_customer","acc", "acc_factor"];

		connection.query("SELECT `id` FROM `rfq_lines_calculated_sales_price` WHERE `rfq_lines_id`='"+req.body.rfq_lines_id+"'", function(err, info){
			if(err){
				console.log(err);
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				var query_1="";
				if(info.length>0){
					query_1="UPDATE `rfq_lines_calculated_sales_price` SET ";
					for (var i = 0; i < fields.length; i++) {
						query_1+=fields[i]+"='"+req.body[fields[i]]+"', ";
					};
					query_1=query_1.substring("", query_1.length-2);
					query_1+=" WHERE rfq_lines_id="+req.body.rfq_lines_id;
				}
				else{
					// `plants_id`, `complexities_id`,
					query_1="INSERT INTO `rfq_lines_calculated_sales_price`(`product_design_id`, `rfq_lines_id`, `material_cost`, `labor_cost`, `labor_hours`, `extra_engineering_cost`, `dcp`, `cost_packaging`, `packaging_cost_transformer`, `extra_packaging_costs_build_of_parts`, `packaging`, `engineering_overheads`, `plant_overheads`, `site_overheads`, `regional_overheads`, `product_line_overheads`, `corporate_overheads`, `depreciation`, `overheads`, `frieght_f_term`, `friegth_c_term`, `friegth_d_term`, `transport`, `financial_cost_loc`, `financial_cost_bonds`, `maintenance_equipment`, `administrative_cost_various`, `extra_documentation_required`, `supervision`, `erection_comm`, `factory_training`, `onsite_training`, `warranty_on_full_cost`, `extra_cost`, `full_cost_excluding_commision`, `ebit_percentage`, `ebit`, `commission_on_net_sales_price`, `commission_on_f_term`, `commission_on_gross_sales`, `commission`, `minimum_intercompany_sales`, `minimum_sales_price_to_customer`) VALUES (";
					for (var i = 0; i < fields.length; i++) {
						query_1+="'"+req.body[fields[i]]+"', ";
					};
					query_1=query_1.substring("", query_1.length-2);
					query_1+=")";
				}
				connection.query(query_1, function(err, result){
					if(err){
						console.log(err);
						res.json({"statusCode": 500, "success":"false", "message": "internal error"});
					}
					else{
						connection.query("SELECT `id` FROM `rfq_lines_calculated_sales_price` WHERE `rfq_lines_id`='"+req.body.rfq_lines_id+"'", function(err, sales_price_detail){
							if(err){
								console.log(err);
								res.json({"statusCode": 500, "success":"false", "message": "internal error"});
							}
							else{
								connection.query("UPDATE `rfq_lines` SET `minimum_sales_price`='"+req.body.minimum_sales_price_to_customer+"', `rfq_lines_calculated_sales_price_id`='"+sales_price_detail[0].id+"' WHERE `id`='"+req.body.rfq_lines_id+"'", function(err, info){
									if(err){
										console.log(err);
										res.json({"statusCode": 500, "success":"false", "message": "internal error"});
									}
									else{
										res.json({"statusCode": 200, "success":"true", "message": "data inserted"});
									}
								});
							}
						});
					}
				});
			}
		});
};

exports.tendering_get_sales_price_detail = function(req, res){
	console.log("SELECT * FROM `rfq_lines_calculated_sales_price` WHERE `rfq_lines_id`='"+req.params.rfq_lines_id+"'");
	connection.query("SELECT * FROM `rfq_lines_calculated_sales_price` WHERE `rfq_lines_id`='"+req.params.rfq_lines_id+"'", function(err, info){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			res.json({"statusCode": 200, "success":"true", "message": "", "sales_price": info});
		}
	});
};

exports.tendering_full_view_quote_detail = function(req, res){
	var query_1 = "SELECT * FROM `rfq` LEFT JOIN `plants` ON `rfq`.`plants_id`=`plants`.`id` WHERE `id`='"+req.params.rfq_id+"'";
	connection.query(query_1, function(err, rfq){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			Q1="`product_designs` ON `product_designs`.`id`=`rfq_lines`.`product_designs_id`";
			Q2="`rfq_lines_calculated_sales_price` ON `rfq_lines`.`id`=`rfq_lines_calculated_sales_price`.`rfq_lines_id`";
			Q3="`complexities` ON `complexities`.`id`=`rfq_lines_calculated_sales_price`.`complexities_id`";
			var query_2 = "SELECT * FROM `rfq_lines` LEFT JOIN "+Q1+" LEFT JOIN "+Q2+" LEFT JOIN "+Q3+" WHERE `rfq_lines`.`rfq_id`='"+req.params.rfq_id+"'";
			connection.query(query_2, function(err, rfq_lines){
				if(err){
					console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					res.json({"statusCode": 200, "success":"true", "message": "", "rfq": rfq, "rfq_lines": rfq_lines});
				// 	// discuss for save complexity_id
				// 	// for the complexity
				// 	// pick plant id from first query
				// 	// otherwise need a loop
				// 		// Q1="SELECT product_lines_id FROM `rfq_lines` WHERE id='"+req.params['rfq_lines_id']+"'";
				// 		// Q2="SELECT id FROM  `product_properties` WHERE property_name='complexity' AND product_lines_id IN ("+Q1+")";
				// 		// Q3="SELECT value FROM `rfq_lines_technical_specs` WHERE `rfq_lines_id`='"+req.params['rfq_lines_id']+"' AND product_properties_id IN ("+Q2+")";
				// 		// Q4="SELECT id FROM complexities WHERE name=("+Q3+")";
				// 		// Q5="SELECT `complexities_id`, `plants_id`, `overhead` FROM `complexities_master_data` WHERE `plants_id`='"+plants_id+"' AND complexities_id IN ("+Q4+")";
				// 		// connection.query();
				}
			});
		}
	});
};
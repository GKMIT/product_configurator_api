var async = require("async");
exports.tendering_teams_quotes = function(req, res){
	connection.query("SELECT * FROM `organization_users` WHERE `id`='"+req.params.user_id+"' AND `sysadmin`='1'", function(err, admin){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			if(admin.length>0){
				var query="SELECT DISTINCT `rfq`.`id` , `rfq`.`document_no`,  `rfq`.`version_no`,  `rfq`.`date_rfq_in`,  `rfq`.`requested_quotation_date`, `customers`.`name` FROM  `rfq` LEFT JOIN `customers` ON `rfq`.`customers_id`=`customers`.`id`, `organization_users` WHERE  `rfq`.`rfq_status_id` = '4' AND `organization_users`.`id`='"+req.params.user_id+"' ORDER BY  `rfq`.`updated_at` DESC";

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
				var query="SELECT DISTINCT `rfq`.`id` , `rfq`.`document_no`,  `rfq`.`version_no`,  `rfq`.`date_rfq_in`,  `rfq`.`requested_quotation_date`, `customers`.`name` FROM  `rfq` INNER JOIN  `organization_users` ON  `rfq`.`tendering_teams_id` =  `organization_users`.`tendering_teams_id` LEFT JOIN `customers` ON `rfq`.`customers_id`=`customers`.`id` WHERE  `rfq`.`rfq_status_id` = '4' AND `organization_users`.`id`='"+req.params.user_id+"' AND (`created_by`='"+req.params.user_id+"' OR `rfq`.`sales_person_id`='"+req.params.user_id+"' OR (`rfq`.`tendering_teams_id`=(SELECT `tendering_teams_id` FROM `organization_users` WHERE `id`='"+req.params.user_id+"' LIMIT 1) AND `rfq`.`tendering_teams_id`!='0')) ORDER BY  `rfq`.`updated_at` DESC";

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
};

exports.design_requests = function(req, res){
	connection.query("SELECT * FROM `organization_users` WHERE `id`='"+req.params.user_id+"' AND `sysadmin`='1'", function(err, admin){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			if(admin.length>0){
				var query="SELECT `rfq`.`document_no`, `rfq`.`id` as `rfq_id`, `product_lines`.`name` as `product_line`, `plants`.`name` as `plant_name`, `rfq_lines`.`design_request_date`, `rfq_lines`.`design_require_date`, `rfq_lines`.`design_submit_date`, `rfq_lines`.`id` FROM  `rfq_lines` JOIN `rfq` ON `rfq_lines`.`rfq_id`=`rfq`.`id` JOIN `product_lines` on `rfq_lines`.`product_lines_id` = `product_lines`.`id` LEFT JOIN `plants` on `rfq_lines`.`plants_id` = `plants`.`id` WHERE  `rfq_lines`.`design_request` = 1 ORDER BY  `rfq_lines`.`design_request_date` DESC";

				connection.query(query, function(err, rfq_lines) {
					if(err){
						console.log(err);
							res.json({"statusCode": 500, "success":"false", "message": "internal error"});
					}
					else{
						res.json({"statusCode": 200, "success":"true", "message": "", "rfq_lines":rfq_lines});
					}
				});
			}
			else{
				var query="SELECT DISTINCT `rfq`.`id` , `rfq`.`document_no`,  `rfq`.`version_no`,  `rfq`.`date_rfq_in`,  `rfq`.`requested_quotation_date`, `customers`.`name` FROM  `rfq` INNER JOIN  `organization_users` ON  `rfq`.`tendering_teams_id` =  `organization_users`.`tendering_teams_id` LEFT JOIN `customers` ON `rfq`.`customers_id`=`customers`.`id` WHERE  `rfq`.`rfq_status_id` = '4' AND `organization_users`.`id`='"+req.params.user_id+"' AND (`created_by`='"+req.params.user_id+"' OR `rfq`.`sales_person_id`='"+req.params.user_id+"' OR (`rfq`.`tendering_teams_id`=(SELECT `tendering_teams_id` FROM `organization_users` WHERE `id`='"+req.params.user_id+"' LIMIT 1) AND `rfq`.`tendering_teams_id`!='0')) ORDER BY  `rfq`.`updated_at` DESC";

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

exports.available_designs = function(req, res){
	var query="SELECT `product_designs`.`id`,`product_designs`.`origional_id`, `product_lines`.`name` as `product_line`, `plants`.`name` as `plant_name`, `product_designs`.`material_code`, `product_designs`.`design_number`, `product_designs`.`design_variant`, `product_designs`.`design_spec_version`, `product_designs`.`design_version_number`, `product_designs`.`updated_at` FROM  `product_designs` JOIN `product_lines` on `product_designs`.`product_lines_id` = `product_lines`.`id` LEFT JOIN `plants` on `product_designs`.`plants_id` = `plants`.`id`";

	connection.query(query, function(err, designs) {
		if(err){
			console.log(err);
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			res.json({"statusCode": 200, "success":"true", "message": "", "designs":designs});
		}
	});

}

exports.available_design_props = function(req, res){
	var query="SELECT product_designs_technical_details.spec_value, product_designs_technical_details.calculated_value, product_designs_technical_details.measured_value, product_designs_technical_details.plus_tolerance, product_designs_technical_details.minus_tolerance, product_designs_technical_details.maximum_value, product_designs_technical_details.minimum_value, product_designs_technical_details.updated_at, product_properties.property_name , product_properties.unit_of_measurement from product_designs_technical_details join product_properties on product_designs_technical_details.product_properties_id = product_properties.id where product_designs_technical_details.product_design_id = "+req.params.design_id+" and product_properties.id != 1 order by product_designs_technical_details.updated_at desc ";

	connection.query(query, function(err, props) {
		if(err){
			console.log(err);
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			res.json({"statusCode": 200, "success":"true", "message": "", "props":props});
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
			connection.query("SELECT `r_lines`.`id`, `r_lines`.`design_request`, `r_lines`.`product_lines_id`, `p_lines`.`mandatory_properties`, `p_lines`.`name` as `product_lines_name`, `r_lines`.`plants_id`, `plants`.`name` as `plants_name`, `r_lines`.`number_of_units`,`r_lines`.`req_delivery_date`, EXTRACT(MONTH FROM req_delivery_date) as month, EXTRACT(YEAR FROM req_delivery_date) as year, `r_lines`.`sales_price`, `r_lines`.`confirmed_delivery_date`, `r_lines`.`product_designs_id`, `r_lines`.`minimum_sales_price`, `r_lines`.`rfq_lines_calculated_sales_price_id`, `r_lines`.`variant_to` FROM `rfq_lines` `r_lines` LEFT JOIN `product_lines` `p_lines` ON `r_lines`.`product_lines_id`=`p_lines`.`id` LEFT JOIN `plants` ON `r_lines`.`plants_id`=`plants`.`id` LEFT JOIN `product_designs` ON `r_lines`.`product_designs_id`=`product_designs`.`id`  WHERE `rfq_id`='"+req.params.rfq_id+"'", function(err, rfq_lines) {
				if(err){
					console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					if(rfq_lines.length==0){
						res.json({"statusCode": 404, "success":"false", "message": "rfq line items not exist"});
					}
					//var complete_rfq_lines=rfq_lines;
					var complete_rfq_lines=[];
					var counter=0;
					// var counter1=0;
					var counter2=0;
					var plant_counter=0;
					async.forEach(rfq_lines,  function(line_item, done){
						var query="SELECT `id`, `name` FROM `plants` WHERE `product_lines_id`='"+line_item.product_lines_id+"'";
						console.log(query);
						connection.query(query, function(err, plants_detail) {
							if (err) {
								console.log(err);
								done(err);
							}
							else {
								line_item["plants"] = plants_detail;
								complete_rfq_lines.push(line_item);
								done();
							}
						});
						},function(err){
							if (err){
								console.log(err);
								res.json({"statusCode": 500, "success": "false", "message":"internal error"});
							}
							else{
								connection.query("SELECT `id`, `name`, `examples` FROM `product_types`", function(err, product_types){
									if(err){
										console.log(err);
										res.json({"statusCode": 500, "success":"false", "message": "internal error"});
									}
									else{
										for (var i = 0; i < rfq_lines.length; i++) {
											connection.query("SELECT `rlts`.`id`, `rlts`.`rfq_lines_id`, `rlts`.`product_properties_id`, `rlts`.`value`, `rlts`.`remark`, `pp`.`property_name`, `pp`.`unit_of_measurement`, `pp`.`data_type` FROM `rfq_lines_technical_specs` `rlts` LEFT JOIN `product_properties` `pp` ON `rlts`.`product_properties_id`=`pp`.id WHERE `rfq_lines_id`='"+rfq_lines[i].id+"'", function(err, rfq_lines_technical_specs) {
												if(err){
													console.log(err);
													console.log("sokokosks");
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
																if(checkComplexity(complete_rfq_lines[0].rfq_lines_technical_specs)){
																	connection.query("SELECT `id`, `name` FROM `complexities`", function(err, complexities){
																		if(err){
																			console.log(err);
																			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
																		}
																		else{
																			res.json({"statusCode": 200, "success":"true", "message": "","rfq":rfq ,"rfq_lines":complete_rfq_lines, "complexities":complexities, "product_types": product_types});
																		}
																	});
																}
																else{
																	res.json({"statusCode": 200, "success":"true", "message": "","rfq":rfq ,"rfq_lines":complete_rfq_lines, "complexities":[], "product_types": product_types});
																}
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
	connection.query("UPDATE `rfq_lines` SET `plants_id`='"+req.body.plants_id+"' WHERE `id`='"+req.body.rfq_lines_id+"'", function(err, update_line_item){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			connection.query("SELECT `product_lines`.`id`, `product_lines`.`mandatory_properties`, `product_lines`.`equal_properties`, `product_lines`.`range_properties`, `rfq_lines`.`plants_id` FROM `product_lines` INNER JOIN `rfq_lines` ON `product_lines`.`id`=`rfq_lines`.`product_lines_id` WHERE `rfq_lines`.`id`='"+req.body.rfq_lines_id+"'", function(err, product_lines){
				if(err){
					console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					if(product_lines.length==0){
						res.json({"statusCode":404, "success":"false", "message":"product_lines not found"});
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
						query="";
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
						console.log(mandatoryfilter.length);
						console.log(mandatory_prop_arr.length);
						if(mandatoryfilter.length<mandatory_prop_arr.length){
							res.json({"statusCode":422, "success":"false", "message":"mandatory properties not complete"});
						}
						else{
							// new array declare for the create equalfilter AND rangefilter id, value array
							var equalfilter=new Array();
							var rangefilter=new Array();
							var equal_prop_arr=equal_prop.split(",");
							var range_prop_arr=range_prop.split(",");
							for (var i = 0; i < req.body.properties.length; i++) {
								if (equal_prop_arr.indexOf(req.body.properties[i].id) != -1) {
									query+="  (product_properties_id='"+req.body.properties[i].id+"' AND spec_value='"+req.body.properties[i].value+"') OR";
									equalfilterids+=req.body.properties[i].id+", ";
								}
								else if (range_prop_arr.indexOf(req.body.properties[i].id) != -1) {
									query+=" (product_properties_id='"+req.body.properties[i].id+"' AND  minimum_value <= '"+req.body.properties[i].value+"' AND maximum_value >= '"+req.body.properties[i].value+"' ) OR";
									rangefilterids+=req.body.properties[i].id+", ";
									rangefilter.push(req.body.properties[i].id);
								}
							};
							query=query.substring("", query.length-2);
							equalfilterids=equalfilterids.substring("", equalfilterids.length-2);
							rangefilterids=rangefilterids.substring("", rangefilterids.length-2);
							//var master_data_version_query="Select `last_relevant_design_version` FROM `master_data` WHERE `plants_id`='"+product_lines[0].plants_id+"' LIMIT 1";
							var master_data_version_query="Select `last_relevant_design_version` FROM `master_data` WHERE `plants_id`='"+req.body.plants_id+"' LIMIT 1";

							var master_data_pricelist_version_query="Select `most_recent_pricelist_version` FROM `master_data` WHERE `plants_id`='"+req.body.plants_id+"' LIMIT 1";


							var pre_query = "SELECT distinct `pd`.`id` FROM `product_designs` `pd`, `product_designs_costs` `pdc` WHERE `pd`.`design_version_number`> ("+master_data_version_query+") AND `pdc`.`material_pricelist_reference`=("+master_data_pricelist_version_query+") AND `pd`.`id`=`pdc`.`product_design_id` AND `pd`.`plants_id`='"+req.body.plants_id+"'";
							var post_query = "SELECT distinct `product_design_id` FROM `product_designs_technical_details`	WHERE product_design_id IN ("+pre_query+") AND product_design_id IN ( SELECT product_design_id FROM product_designs_technical_details WHERE "+query+" GROUP BY product_design_id HAVING count(*) = "+req.body.properties.length+")";

							var final_query = "SELECT distinct id FROM `product_designs` WHERE id IN ("+post_query+")";
							console.log(final_query);
							connection.query(final_query, function(err, product_designs){
								if(err){
									console.log(err);
									res.json({"statusCode": 500, "success":"false", "message": "internal error"});
								}
								else{
									if(product_designs.length==0){
										connection.query("SELECT * FROM `rfq` WHERE `id`=(select rfq_id from rfq_lines where id='"+req.body.rfq_lines_id+"' LIMIT 1) LIMIT 1", function(err, rfq_info) {
											if(err){
												res.json({"statusCode": 500, "success":"false", "message": "internal error"});
											}
											else{
												var mailOptions = {
													from: "From :  ✔ <"+smtpConfig.email+">", // sender address
													to: smtpConfig.design_department_email, // list of receivers seprated by comma also
													subject: 'Design Not Found ✔', // Subject line
													text: 'No suitable design found for RFQ #docnr and line #rfqLineNumber.', // plaintext body
													html: '<p>No suitable design found for RFQ '+rfq_info[0].document_no+' and line '+ req.body.rfq_lines_id+'</p>' // html body
												};
												transporter.sendMail(mailOptions, function(error, info){
													if(error){
														console.log(error);
													}else{
														// res.json({"statusCode": 404, "success":"false", "message": "result not found", "product_designs": "[]"});
													}
												});
											}
										});

										connection.query("select `product_designs`.`id`, `product_designs`.`plants_id`, `plants`.`name` as `plant_name`, `product_designs`.`material_code`, `product_designs`.`design_version`, `product_designs`.`design_variant`, `product_designs`.`accessories`, `product_designs`.`acc`, `product_designs`.`default` FROM `product_designs` LEFT JOIN `plants` ON `product_designs`.`plants_id`=`plants`.`id` where `default`=1", function(err, default_design){
											if(err){
												console.log(err);
												res.json({"statusCode": 500, "success":"false", "message": "internal error"});
											}
											else{
												for( var i=0; i<default_design.length; i++){
													default_design[i]['range_properties']=[];
												}
												res.json({"statusCode": 200, "success":"true", "message": "default design founded","filter_properties": [], "product_designs": default_design});
											}
										});
									}
									else{
										final_design_ids="";
										for (var i = 0; i < product_designs.length; i++) {
											final_design_ids+=product_designs[i].id+",";
										};
										final_design_ids=final_design_ids.substring("", final_design_ids.length-1);
										connection.query("SELECT `product_designs`.`id`, `product_designs`.`plants_id`, `plants`.`name` as `plant_name`, `product_designs`.`material_code`, `product_designs`.`design_version`, `product_designs`.`design_variant`, `product_designs`.`accessories`, `product_designs`.`acc`, `product_designs`.`default` FROM `product_designs` LEFT JOIN `plants` ON `product_designs`.`plants_id`=`plants`.`id` WHERE `product_designs`.`id` IN ("+final_design_ids+") OR `default`=1", function(err, result){
											if(err){
												console.log(err);
												res.json({"statusCode": 500, "success":"false", "message": "internal error"});
											}
											else{
												if(result.length==0){
													connection.query("SELECT * FROM `rfq` WHERE `id`=(select rfq_id from rfq_lines where id='"+req.body.rfq_lines_id+"' LIMIT 1) LIMIT 1", function(err, rfq_info) {
														if(err){
															res.json({"statusCode": 500, "success":"false", "message": "internal error"});
														}
														else{
															var mailOptions = {
																from: "From :  ✔ <"+smtpConfig.email+">", // sender address
																to: smtpConfig.design_department_email, // list of receivers seprated by comma also
																subject: 'Design Not Found ✔', // Subject line
																text: 'No suitable design found for RFQ #docnr and line #rfqLineNumber.', // plaintext body
																html: '<p>No suitable design found for RFQ '+rfq_info[0].document_no+' and line '+ req.body.rfq_lines_id+'</p>' // html body
															};
															transporter.sendMail(mailOptions, function(error, info){
																if(error){
																	console.log(error);
																}else{
																	// res.json({"statusCode": 404, "success":"false", "message": "result not found", "product_designs": "[]"});
																}
															});
														}
													});
													res.json({"statusCode": 404, "success":"false", "message": "result not found", "product_designs": "[]"});
												}
												else{
													if(rangefilter.length>0){
														var result_design_ids="";
														for (var i = 0; i < product_designs.length; i++) {
															result_design_ids+=product_designs[i].id+",";
														};
														result_design_ids=result_design_ids.substring("", result_design_ids.length-1);

														query_1="SELECT `pdtd`.`product_design_id`, `pdtd`.`product_properties_id`, `pp`.`property_name`, `pp`.`unit_of_measurement`, `pdtd`.`spec_value`, `pdtd`.`plus_tolerance`, `pdtd`.`minus_tolerance` FROM `product_designs_technical_details` `pdtd`  INNER JOIN `product_properties` `pp` ON `pp`.`id`=`pdtd`.`product_properties_id` WHERE `pdtd`.`product_design_id` IN ("+result_design_ids+") AND `pdtd`.`product_properties_id` IN ("+rangefilterids+")";
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
																			range_result_arr.push({"id": range_result[j].product_properties_id,"property_name":range_result[j].property_name, "unit_of_measurement": range_result[j].unit_of_measurement, "spec_value":range_result[j].spec_value, "plus_tolerance": range_result[j].plus_tolerance, "minus_tolerance": range_result[j].minus_tolerance});
																		}
																	};
																	result[counter][name]=range_result_arr;
																	range_result_arr=[];
																	counter++;
																};
																connection.query("SELECT distinct `id`, `property_name` FROM `product_properties` WHERE `product_properties`.`id` IN ("+rangefilterids+")", function(err, filter_result){
																	if(err){
																		console.log(err);
																		res.json({"statusCode": 500, "success":"false", "message": "internal error"});
																	}
																	else{
																		console.log("============");
																		console.log(result[0].range_properties);
																		console.log(filter_result);
																		res.json({"statusCode": 200, "success":"true", "message": "", "filter_properties": filter_result, "product_designs": result});
																	}
																});
															}
														});
													}
													else{
														console.log("yoyoyoyoyyo");
														for (var i = 0; i < result.length; i++) {
															result[i]["range_properties"]=[];
														};
														// connection.query("SELECT distinct `id`, `property_name` FROM `product_properties` WHERE `product_properties`.`id` IN ( "+equalfilterids+")", function(err, filter_result){
														// 	if(err){
														// 		console.log(err);
														// 		res.json({"statusCode": 500, "success":"false", "message": "internal error"});
														// 	}
														// 	else{
														// filter properties is actually range and here just becoz format of json not differ
														console.log("============");
														console.log(result);
														res.json({"statusCode": 200, "success":"true", "message": "", "filter_properties": [], "product_designs": result});
														// res.json({"statusCode": 200, "success":"true", "message": "",  "filter_properties":[], "product_designs": result});
														// 	}
														// });

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
		}
	});
};

exports.tendering_fetch_particular_design = function(req, res){
	var query="SELECT `id`, `product_lines_id`, `plants_id`, `standard_for_country`, `standard_for_customer`, `material_code`, `design_number`, `design_variant`, `accessories` FROM `product_designs` where `id`='"+req.params.product_designs_id+"' AND `default`=1 LIMIT 1";
	connection.query(query, function(err, info){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			if(info.length>0){
				info[0]['product_design_costs_id']="0";
				info[0]['material_pricelist_reference']=0;
				info[0]['year']=0;
				info[0]['quarter']=0;
				info[0]['currency']="EUR";
				info[0]['labor_cost']=0;
				info[0]['labor_hours']=0;
				info[0]['minimum_price']=null;
				info[0]['product_designs_sales_prices_id']=null;
				info[0]['minimum_price_for_country_id']=null;
				info[0]['validity_date_from']=null;
				info[0]['validity_date_to']=null;

				var product_designs_technical_details=new Array();
				var temp={};

				connection.query("SELECT * FROM `rfq_lines_technical_specs` WHERE `rfq_lines_id`='"+req.params.rfq_lines_id+"' and `product_properties_id`='2' LIMIT 1", function(err, tech_detail){
					if(err){
						console.log(err);
						res.json({"statusCode": 500, "success":"false", "message": "internal error"});
					}
					else{
						if(tech_detail.length>0){
							temp['id']= tech_detail[0].id;
							temp['product_design_id']= 0;
							temp['product_properties_id']= tech_detail[0].product_properties_id;
							temp['property_name']= "complexity";
							temp['unit_of_measurement']= "";
							temp['spec_value']= tech_detail[0].value;
							temp['calculated_value']= 0;
							temp['measured_value']= 0;
							product_designs_technical_details.push(temp);
						}
						else{
							temp['id']= 0;
							temp['product_design_id']= 0;
							temp['product_properties_id']= 0;
							temp['property_name']= "";
							temp['unit_of_measurement']= "";
							temp['spec_value']= 0;
							temp['calculated_value']= 0;
							temp['measured_value']= 0;
							product_designs_technical_details.push(temp);
						}
						res.json({"statusCode": 200, "success":"true", "message": "", "design":info, "product_designs_technical_details": product_designs_technical_details});
					}
				});
			}
			else{
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
											if(design[0].product_design_costs_id==null){
												connection.query("SELECT * FROM `rfq` WHERE `id`=(select rfq_id from rfq_lines where id='"+req.body.rfq_lines_id+"' LIMIT 1) LIMIT 1", function(err, rfq_info) {
													if(err){
														res.json({"statusCode": 500, "success":"false", "message": "internal error"});
													}
													else{
														var mailOptions = {
														    from: "From :  ✔ <"+smtpConfig.email+">", // sender address
														    to: smtpConfig.design_department_email, // list of receivers seprated by comma also
														    subject: 'Design Cost Not Found ✔', // Subject line
														    text: 'No cost defined for design '+design[0].material_code+'/'+design[0].design_number+' in quarter '+year+'/'+quarter, // plaintext body
														    html: '<p>No cost defined for design '+design[0].material_code+'/'+design[0].design_number+' in quarter '+year+'/'+quarter+'</p>' // html body
														};
														transporter.sendMail(mailOptions, function(error, info){
														    if(error){
														        console.log(error);
														    }else{
														    	// res.json({"statusCode": 200, "success":"true", "message": "", "design":design, "product_designs_technical_details": design_technical_detail});
														    }
														});
													}
												});
											}
											// else{
												res.json({"statusCode": 200, "success":"true", "message": "", "design":design, "product_designs_technical_details": design_technical_detail});
											// }
											
										}
									});
								}
							});
						}
					}
				});
			}
		}
	});
}

exports.tendering_submit_rfq_lines = function(req, res){
	var flag_arr=[];
	req.body.properties.forEach(function(prop){
		connection.query("select * from `rfq_lines_technical_specs` where `rfq_lines_id`='"+req.body.rfq_lines_id+"' AND `product_properties_id`='"+prop.property_id+"' AND `id`='"+prop.id+"'", function(err, info){
			if(err){
				console.log(err);
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				var line_query="";
				if(info.length>0){
					line_query="UPDATE `rfq_lines_technical_specs` SET `product_properties_id`='"+prop.property_id+"', `value`='"+prop.value+"', `remark`='"+prop.remark+"' WHERE `id`='"+prop.id+"'";
				}
				else{
					line_query="INSERT INTO `rfq_lines_technical_specs` (`rfq_lines_id` ,`product_properties_id`, `value`, `remark`) values('"+req.body.rfq_lines_id+"', '"+prop.property_id+"', '"+prop.value+"', '"+prop.remark+"')";
				}
				connection.query(line_query, function(err, lines){
					if(err){
						console.log(err);
						res.json({"statusCode": 500, "success":"false", "message": "internal error"});
					}
					else{
						flag_arr.push(prop);
						if(flag_arr.length==req.body.properties.length){
							var frq_line_status=0;
							if(req.body.product_designs_id==0 || req.body.product_designs_id==""){
								frq_line_status=0;
							}
							else{
								frq_line_status=2;
							}
							var query="UPDATE `rfq_lines` SET `product_designs_id`='"+req.body.product_designs_id+"', `confirmed_delivery_date`='"+req.body.confirmed_delivery_date+"', `sales_price`='"+req.body.sales_price+"', `rfq_line_status`='"+frq_line_status+"', `material_cost`='"+req.body.material_cost+"', `labour_cost`='"+req.body.labor_cost+"', `no_of_labour_hours`='"+req.body.no_of_labor_hours+"' WHERE `id`='"+req.body.rfq_lines_id+"' AND `rfq_id`='"+req.body.rfq_id+"'";
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
						}
					}
				});
			}
		});
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
								// var query="UPDATE `rfq` SET `estimated_sales_price`='"+estimated_sales_price[0].sales_price+"', `quote_creation_date`=NOW(), `rfq_status_id`='"+req.body.rfq_status_id+"' WHERE `id`='"+req.body.rfq_id+"'";
								var query="UPDATE `rfq` SET `quote_creation_date`=NOW(), `rfq_status_id`='"+req.body.rfq_status_id+"' WHERE `id`='"+req.body.rfq_id+"'";
								connection.query(query, function(err, product_designs) {
									if(err){
										console.log(err);
										res.json({"statusCode": 500, "success":"false", "message": "internal error"});
									}
									else{
										if(estimated_sales_price[0].sales_price>250000){
											connection.query("SELECT `rfq`.`document_no`, `rfq`.`estimated_sales_price`, `customers`.name FROM `rfq` LEFT JOIN `customers` ON `customers`.`id`=`rfq`.`customers_id` WHERE `rfq`.`id`='"+req.body.rfq_id+"' LIMIT 1", function(err, rfq_info) {
												if(err){
													res.json({"statusCode": 500, "success":"false", "message": "internal error"});
												}
												else{
													var mailOptions = {
														from: "From :  ✔ <"+smtpConfig.email+">", // sender address
														to: smtpConfig.sales_and_marketing_director_email+","+smtpConfig.pl_head_email, // list of receivers seprated by comma also
														subject: 'Quote Submitted to sales', // Subject line
														text: 'Quotation #docnr for a total Sales Price of #SalesPrice is about to be submitted to customer #customerName', // plaintext body
														html: '<p>Quotation '+rfq_info[0].document_no+' for a total Sales Price of '+estimated_sales_price[0].sales_price+' is about to be submitted to customer '+rfq_info[0].name+'</p>' // html body
													};
													transporter.sendMail(mailOptions, function(error, info){
														if(error){
															console.log(error);
														}else{
															// res.json({"statusCode": 200, "success":"true", "message": "submitted successfully !"});
														}
													});
												}
											});
										}
										// else{
										res.json({"statusCode": 200, "success":"true", "message": "submitted successfully !"});
										// }
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
	var query="select * from `product_designs` where `id`='"+req.params['product_design_id']+"' LIMIT 1";
	connection.query(query, function(err, info){
		console.log(info);
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			if(info[0].default){
				var query_1="SELECT `plants_id`, EXTRACT(YEAR FROM req_delivery_date) as year, EXTRACT(MONTH FROM req_delivery_date) as month, `number_of_units` FROM `rfq_lines` WHERE `id`='"+req.params['rfq_lines_id']+"' LIMIT 1";
				connection.query(query_1, function(err, rfq_lines){
					if(err){
						console.log(err);
						res.json({"statusCode": 500, "success":"false", "message": "internal error"});
					}
					else{
						var product_cost_data=[{'labor_cost':0,'labor_hours':0, 'material_cost':0, 'currency':'EUR', 'extra_engineering_hours':0}];
						var overheadQuery = "SELECT `id`, `overhead_name`, `value` FROM `plants_master_data` WHERE `plant_id`='"+rfq_lines[0].plants_id+"'";
						console.log(overheadQuery);
						connection.query(overheadQuery, function(err, overheads){
							if(err){
								console.log(err);
								res.json({"statusCode": 500, "success":"false", "message": "internal error"});
							}
							else{
								connection.query("SELECT * FROM `rfq_lines_calculated_sales_price` WHERE `rfq_lines_id`='"+req.params.rfq_lines_id+"' AND `product_design_id`='"+req.params['product_design_id']+"'", function(err, info){
									if(err){
										console.log(err);
										res.json({"statusCode": 500, "success":"false", "message": "internal error"});
									}
									else{
										res.json({"statusCode": 200, "success":"true", "message": "", "product_cost_data": product_cost_data, "complexities": [{}], "overheads": overheads, "rfq_lines": rfq_lines, "minimum_calculated_sales_price": info});
									}
								});
							}
						});
					}
				});
			}
			else{
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
						connection.query(query_1, function(err, product_cost_data){
							if(err){
								console.log(err);
								res.json({"statusCode": 500, "success":"false", "message": "internal error"});
							}
							else{
								var query_1="SELECT `spec_value` FROM  `product_designs_technical_details` WHERE  `product_design_id` ='"+req.params['product_design_id']+"' AND  `product_properties_id` =2";
								var query_2="SELECT `c`.`id`, `c`.`name`, `cmd`.`overhead` FROM `complexities_master_data` `cmd` INNER JOIN `complexities` `c` ON `cmd`.`complexities_id`=`c`.`id` WHERE `c`.`name` IN ("+query_1+") AND `cmd`.`plants_id`='"+rfq_lines[0].plants_id+"'";
								// var final_query="SELECT `c`.`id`, `c`.`name`, `cmd`.`overhead` FROM `complexities_master_data` `cmd` INNER JOIN `complexities` `c` ON `cmd`.`complexities_id`=`c`.`id` WHERE plants_id="+rfq_lines[0].plants_id + "AND ";
								// Q1="SELECT id, name FROM `complexities`";
								connection.query(query_2, function(err, complexities){
									if(err){
										console.log(err);
										res.json({"statusCode": 500, "success":"false", "message": "internal error"});
									}
									else{
										if(complexities.length==0){
											res.json({"statusCode": 422, "success":"false", "message": "Not enough technical specifications available about this product design"});
										}
										var overheadQuery = "SELECT `id`, `overhead_name`, `value` FROM `plants_master_data` WHERE `plant_id`='"+rfq_lines[0].plants_id+"'";
										console.log(overheadQuery);
										connection.query(overheadQuery, function(err, overheads){
											if(err){
												console.log(err);
												res.json({"statusCode": 500, "success":"false", "message": "internal error"});
											}
											else{
												if(product_cost_data.length>0)
												product_cost_data[0]["extra_engineering_hours"]=0;
												connection.query("SELECT * FROM `rfq_lines_calculated_sales_price` WHERE `rfq_lines_id`='"+req.params.rfq_lines_id+"' AND `product_design_id`='"+req.params['product_design_id']+"'", function(err, info){
													if(err){
														console.log(err);
														res.json({"statusCode": 500, "success":"false", "message": "internal error"});
													}
													else{
														res.json({"statusCode": 200, "success":"true", "message": "", "product_cost_data": product_cost_data, "complexities": complexities, "overheads": overheads, "rfq_lines": rfq_lines, "minimum_calculated_sales_price": info});
													}
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
		}
	});
};

exports.tendering_complexity_overhead = function(req, res){
	query_1="SELECT id, overhead FROM `complexities_master_data` WHERE `complexities_id`='"+req.params.complexities_id+"' and `plants_id`='"+req.params.plants_id+"'";
	connection.query(query_1, function(err, info){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			if(info.length==0){
				res.json({"statusCode": 200, "success":"true", "message": "calculated sales price not found", "info": []});
			}
			else{
				res.json({"statusCode": 200, "success":"true", "message": "", "info": info});
			}
		}
	});
};

exports.tendering_save_calculated_sales_price = function(req, res){
	// "plants_id", "complexities_id", 
	var fields= ["complexities_id", "product_design_id", "rfq_lines_id", "material_cost", "labor_cost", "labor_hours", "extra_engineering_cost", "dcp", "cost_packaging", "packaging_cost_transformer", "extra_packaging_costs_build_of_parts", "packaging", "engineering_overheads", "plant_overheads", "site_overheads", "regional_overheads", "product_line_overheads", "corporate_overheads", "depreciation", "overheads", "frieght_f_term", "friegth_c_term", "friegth_d_term", "transport", "financial_cost_loc", "financial_cost_bonds", "maintenance_equipment", "administrative_cost_various", "extra_documentation_required", "supervision", "erection_comm", "factory_training", "onsite_training", "warranty_on_full_cost", "extra_cost", "full_cost_excluding_commision", "ebit_percentage", "ebit", "commission_on_net_sales_price", "commission_on_f_term", "commission_on_gross_sales", "commission", "minimum_intercompany_sales", "minimum_sales_price_to_customer","acc", "acc_factor", "extra_engineering_hours"];

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
					query_1="INSERT INTO `rfq_lines_calculated_sales_price`(`complexities_id`, `product_design_id`, `rfq_lines_id`, `material_cost`, `labor_cost`, `labor_hours`, `extra_engineering_cost`, `dcp`, `cost_packaging`, `packaging_cost_transformer`, `extra_packaging_costs_build_of_parts`, `packaging`, `engineering_overheads`, `plant_overheads`, `site_overheads`, `regional_overheads`, `product_line_overheads`, `corporate_overheads`, `depreciation`, `overheads`, `frieght_f_term`, `friegth_c_term`, `friegth_d_term`, `transport`, `financial_cost_loc`, `financial_cost_bonds`, `maintenance_equipment`, `administrative_cost_various`, `extra_documentation_required`, `supervision`, `erection_comm`, `factory_training`, `onsite_training`, `warranty_on_full_cost`, `extra_cost`, `full_cost_excluding_commision`, `ebit_percentage`, `ebit`, `commission_on_net_sales_price`, `commission_on_f_term`, `commission_on_gross_sales`, `commission`, `minimum_intercompany_sales`, `minimum_sales_price_to_customer`,`acc`, `acc_factor`, `extra_engineering_hours`) VALUES (";
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
										res.json({"statusCode": 200, "success":"true", "message": "data inserted", "rfq_lines_calculated_sales_price_id":sales_price_detail[0].id});
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

// exports.tendering_full_view_quote_detail = function(req, res){
// 	var query_1 = "SELECT * FROM `rfq` LEFT JOIN `plants` ON `rfq`.`plants_id`=`plants`.`id` WHERE `id`='"+req.params.rfq_id+"'";
// 	connection.query(query_1, function(err, rfq){
// 		if(err){
// 			console.log(err);
// 			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
// 		}
// 		else{
// 			Q1="`product_designs` ON `product_designs`.`id`=`rfq_lines`.`product_designs_id`";
// 			Q2="`rfq_lines_calculated_sales_price` ON `rfq_lines`.`id`=`rfq_lines_calculated_sales_price`.`rfq_lines_id`";
// 			Q3="`complexities` ON `complexities`.`id`=`rfq_lines_calculated_sales_price`.`complexities_id`";
// 			var query_2 = "SELECT * FROM `rfq_lines` LEFT JOIN "+Q1+" LEFT JOIN "+Q2+" LEFT JOIN "+Q3+" WHERE `rfq_lines`.`rfq_id`='"+req.params.rfq_id+"'";
// 			connection.query(query_2, function(err, rfq_lines){
// 				if(err){
// 					console.log(err);
// 					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
// 				}
// 				else{
// 					res.json({"statusCode": 200, "success":"true", "message": "", "rfq": rfq, "rfq_lines": rfq_lines});
// 				}
// 			});
// 		}
// 	});
// };

exports.tendering_view_calculated_sales_price = function(req, res){
	query_1="SELECT * FROM `rfq_lines_calculated_sales_price` WHERE `rfq_lines_id`='"+req.params.rfq_lines_calculated_sales_price_id+"'";
	connection.query(query_1, function(err, info){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			if(info.length==0){
				res.json({"statusCode": 200, "success":"true", "message": "calculated sales price not found", "info": []});
			}
			else{
				res.json({"statusCode": 200, "success":"true", "message": "", "info": info});
			}
		}
	});
};

exports.tendering_rfq_lines_technical_spec_delete = function(req, res){
	var delete_query="DELETE FROM `rfq_lines_technical_specs` WHERE `rfq_lines_id`='"+req.params.rfq_lines_id+"' AND `product_properties_id`='"+req.params.product_properties_id+"' LIMIT 1";
	connection.query(delete_query, function(err, info){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			res.json({"statusCode": 200, "success":"true", "message": "rfq_lines technical specification successfully deleted", "info": info});
		}
	});
}


// checkComplexity(complete_rfq_lines.rfq_lines[0].rfq_lines_technical_specs)
function checkComplexity(object){
	flag=false;
	object.forEach(function(obj) {
	  	// console.log('Result: ', match(obj, { "product_properties_id": '2'}));
	  	if(match(obj, { "product_properties_id": '2'})){
	  		flag=true;
	  	}		
	});
	return flag;
}

// extra function 
function match(item, filter) {
  var keys = Object.keys(filter);
  // true if any true
  return keys.some(function (key) {
    return item[key] == filter[key];
  });
}

exports.tendering_request_design = function(req, res){
	var total_lines= req.body.line_items.length;

	for (var i = 0; i < req.body.line_items.length; i++) {
		var query = "UPDATE `rfq_lines` SET `design_request` = 1, `plants_id` = "+req.body.line_items[i].plant_id+", `design_require_date` = '"+req.body.design_require_date+"', `design_request_date` = NOW() WHERE `id` = "+req.body.line_items[i].id+" ";
		console.log(query);
		connection.query(query, function(err, info){
			if(err){
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				if(total_lines == (i+1)) res.json({"statusCode": 200, "success":"true", "message": ""});
			}
			else{
				console.log(i);
				if(total_lines == i) res.json({"statusCode": 200, "success":"true", "message": ""});
			}
		});
	};

}

exports.save_design_submit = function(req, res){
	console.log(req.body);

	var query = "UPDATE `rfq_lines` SET `design_submit_date` = '"+req.body.date_submit+"' WHERE `id` = "+req.body.rfq_lines_id+" ";
	console.log(query);
	connection.query(query, function(err, info){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			query_1="SELECT design_require_date, design_submit_date FROM `rfq_lines` WHERE id= "+req.body.rfq_lines_id+" LIMIT 1";
			connection.query(query_1, function(err, data){
				if(err){
					console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					if(data.length==0){
						res.json({"statusCode": 500, "success":"false", "message": "RFQ line not found"});
					}
					else{
						res.json({"statusCode": 200, "success":"true", "message": "", "rfq_line": data});
					}
				}
			});
		}
	});

}
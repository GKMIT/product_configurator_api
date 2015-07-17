var moment = require('moment');
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

	connection.query("SELECT * FROM `organization_users` WHERE `id`='"+req.params.user_id+"' AND `sysadmin`='1'", function(err, admin){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			if(admin.length>0){
				query="SELECT `rfq`.`id`, `rfq`.`document_no`, `rfq`.`version_no`, `rfq`.`quote_submission_date`, `rfq`.`estimated_sales_price`, `rfq`.`quote_validity_date`, `rfq`.`probability_id`, `rfq`.`by_when`, `customers`.`name` FROM `rfq` LEFT JOIN `customers` ON `rfq`.`customers_id`=`customers`.`id` WHERE `rfq_status_id`='6' ORDER BY `rfq`.`quote_validity_date` asc";
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
							query="SELECT `rfq`.`id`, `rfq`.`document_no`, `rfq`.`version_no`, `rfq`.`quote_submission_date`, `rfq`.`estimated_sales_price`, `rfq`.`quote_validity_date`, `rfq`.`probability_id`, `rfq`.`by_when`, `customers`.`name` FROM `rfq` LEFT JOIN `customers` ON `rfq`.`customers_id`=`customers`.`id` WHERE `rfq_status_id`='6' AND (`rfq`.`sales_hub_id`='"+info[0].id+"' OR `created_by`='"+req.params.user_id+"') ORDER BY rfq.quote_validity_date asc";
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
							query="SELECT `rfq`.`id`, `rfq`.`document_no`, `rfq`.`version_no`, `rfq`.`quote_submission_date`, `rfq`.`estimated_sales_price`, `rfq`.`quote_validity_date`, `rfq`.`probability_id`, `rfq`.`by_when`, `customers`.`name` FROM `rfq` LEFT JOIN `customers` ON `rfq`.`customers_id`=`customers`.`id` WHERE `rfq_status_id`='6' AND (`created_by`='"+req.params.user_id+"' OR `sales_person_id`='"+req.params.user_id+"') ORDER BY `rfq`.`quote_validity_date` asc";
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

exports.sales_quote_followup_fetch_one = function(req, res){
	var query="SELECT `id`, `document_no`, `version_no`, `quote_creation_date`, `quote_submission_date`, `estimated_sales_price`, `quote_validity_date`, `probability_id`, `rfq_status_id`, `sales_price`, `won_gross_sale`, `won_gross_sale`, `next_action`, `by_when` FROM `rfq` WHERE `rfq_status_id` IN (6,9) AND `id`='"+req.params.rfq_id+"'";
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
						var query="select * from `rfq_lines` where `rfq_lines`.`rfq_id`='"+req.params.rfq_id+"'";

						var async = require("async");

						connection.query(query, function(err, line_items){
							if(err){
								console.log(err);
								res.json({"statusCode": 500, "success":"false", "message": "internal error"});
							}
							else{
								var max_price_ids="0";
								var excluded_ids="0";
								var not_in_id="0";
								var total_max_price=0;
								async.each(line_items, function(item, done){
									//not in ecludeded ids need to add in query
									var query="select max(sales_price) as price, id from `rfq_lines` where ((rfq_lines.id='"+item.id+"' AND variant_to='0') OR rfq_lines.variant_to='"+item.id+"') AND id NOT IN ("+not_in_id+")";
									not_in_id+=", "+item.id;
									connection.query(query, function(err, item_info){
										if(err){
											done(err);
										}
										else{
											if(item_info.length>0 && item_info[0].id!=null){
												max_price_ids+=", "+item_info[0].id;
												total_max_price+=item_info[0].price;
											}
											done();
										}
									});
								}, function(err){
									if(err){
										console.log(err);
										res.json({"statusCode": 500, "success":"false", "message": "internal error"});
									}
									else{
										rfq[0]["minimum_sales_price"]=total_max_price;
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

// not use till
exports.sales_quote_followup_update = function(req, res){
	// console.log(req.body.quote_submission_date);
	// var query="UPDATE `rfq` SET `probability_id`='"+req.body.probability+"', `rfq_status_id`='"+req.body.rfq_status_id+"', `sales_price`='"+req.body.sales_price+"' WHERE `id`='"+req.body.rfq_id+"'";

	var query="UPDATE `rfq` SET `probability_id`='"+req.body.probability+"', `rfq_status_id`='"+req.body.rfq_status_id+"', `sales_price`='"+req.body.sales_price+"'";

	if(req.body.rfq_status_id==6){
		if(req.body.by_when){
			query+=" , `next_action`='"+req.body.next_action+"'";
		}

		if(req.body.by_when){
			try{
				req.body.by_when=moment(new Date(req.body.by_when).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
			}catch(ex){
				req.body.by_when='0000-00-00 00:00:00';
			}
			query+=" , `by_when`='"+req.body.by_when+"'";
		}
	}

	if(req.body.won_gross_sale){
		query+=", `won_gross_sale`='"+req.body.won_gross_sale+"'";
	}
	if(req.body.rejection_remarks_id){
		query+=", `lost_remarks_id`='"+req.body.rejection_remarks_id+"'";
	}
		query+=" WHERE `id`='"+req.body.rfq_id+"'";
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

exports.sales_quote_followup_onhold = function(req, res){
	// console.log(req.body.quote_submission_date);
	// var query="UPDATE `rfq` SET `probability_id`='"+req.body.probability+"', `rfq_status_id`='"+req.body.rfq_status_id+"', `sales_price`='"+req.body.sales_price+"' WHERE `id`='"+req.body.rfq_id+"'";

	var query="UPDATE `rfq` SET `rfq_status_id`='"+req.body.rfq_status_id+"' WHERE `id`='"+req.body.rfq_id+"'";
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



exports.sales_quote_followup_obsolete = function(req, res){
	var async = require("async");
	var query_update_rfq="UPDATE `rfq` SET `rfq_status_id`='"+req.body.rfq_status_id+"' WHERE `id`='"+req.body.rfq_id+"'";
	connection.query(query_update_rfq, function(err, rfq_update){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			query="select * from `rfq` where `id`='"+req.body.rfq_id+"'";
			connection.query(query, function(err, rfq){
				if(err){
					console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					var new_version=parseInt(rfq[0].version_no)+1;
					new_version=new_version+".0";

					var date_rfq_in='0000-00-00 00:00:00';
					try{
						date_rfq_in=moment(new Date(rfq[0].date_rfq_in).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
					}
					catch(ex){
						date_rfq_in='0000-00-00 00:00:00';
					}
					

					var requested_quotation_date ='0000-00-00 00:00:00';
					try{
						requested_quotation_date=moment(new Date(rfq[0].requested_quotation_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
					}
					catch(ex){
						date_rfq_in='0000-00-00 00:00:00';
					}

					var document_part=rfq[0].document_no.split("/");
					var document_no=document_part[0]+"/"+new_version;
					try{
						rfq[0].quote_creation_date=moment(new Date(rfq[0].quote_creation_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
					}catch(ex){
						rfq[0].quote_creation_date='0000-00-00 00:00:00';
					}

					try{
						rfq[0].quote_submission_date=moment(new Date(rfq[0].quote_submission_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
					}catch(ex){
						rfq[0].quote_submission_date='0000-00-00 00:00:00';
					}

					try{
						rfq[0].quote_validity_date=moment(new Date(rfq[0].quote_validity_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
					}catch(ex){
						rfq[0].quote_validity_date='0000-00-00 00:00:00';
					}
					var new_rfq_query="INSERT INTO `rfq` (`sales_hub_id`, `sales_person_id`, `customers_id`, `sales_segments_id`, `sales_agents_id`, `tendering_teams_id`, `product_lines_id`, `tendering_teams_members_id`, `rejection_remarks_id`, `type_of_quote_id`, `project_name`, `date_rfq_in`, `customer_country`, `installation_country`, `version_no`, `document_no`, `rfq_status_id`, `quote_creation_date`, `quote_submission_date`, `quote_validity_date`, `probability_id`, `requested_quotation_date`, `estimated_sales_price`, `created_by`, `strategic_quote`, `channel_to_market_id`, `is_bid`, `sales_rejection_remarks_id`, `sales_price`, `bid_no_bid_rejection_comments`, `customer_reference`) VALUES('"+rfq[0].sales_hub_id+"', '"+rfq[0].sales_person_id+"', '"+rfq[0].customers_id+"', '"+rfq[0].sales_segments_id+"', '"+rfq[0].sales_agents_id+"', '"+rfq[0].tendering_teams_id+"', '"+rfq[0].product_lines_id+"', '"+rfq[0].tendering_teams_members_id+"', '"+rfq[0].rejection_remarks_id+"', '"+rfq[0].type_of_quote_id+"', '"+rfq[0].project_name+"', '"+date_rfq_in+"', '"+rfq[0].customer_country+"', '"+rfq[0].installation_country+"', '"+new_version+"', '"+document_no+"', '1', '"+rfq[0].quote_creation_date+"', '"+rfq[0].quote_submission_date+"', '"+rfq[0].quote_validity_date+"', '"+rfq[0].probability_id+"', '"+requested_quotation_date+"', '"+rfq[0].estimated_sales_price+"', '"+rfq[0].created_by+"', '"+rfq[0].strategic_quote+"', '"+rfq[0].channel_to_market_id+"', '"+rfq[0].is_bid+"', '"+rfq[0].sales_rejection_remarks_id+"', '"+rfq[0].sales_price+"', '"+rfq[0].bid_no_bid_rejection_comments+"', '"+rfq[0].customer_reference+"')";
					connection.query(new_rfq_query, function(err, new_rfq_info){
						if(err){
							res.json({"statusCode": 500, "success":"false", "message": "internal error"});
						}
						else{
							connection.query("SELECT * FROM `rfq_lines_questions` WHERE `rfq_id`='"+req.body.rfq_id+"'", function(err, rfq_question){
								if(err){
									res.json({"statusCode": 500, "success":"false", "message": "internal error"});
								}
								else{
									var async = require("async");
									async.each(rfq_question, function(question, done){
										var rfq_id = new_rfq_info.insertId;
										var rfq_questions_id = question.rfq_questions_id;
										var question_value = question.question_value;
										var question_query="INSERT INTO `rfq_lines_questions` (`rfq_id`, `rfq_questions_id`, `question_value`) VALUES ('"+rfq_id+"', '"+rfq_questions_id+"', '"+question_value+"')";
										connection.query(question_query, function(err, question_info){
											if(err){
												done(err);
											}
											else{
												done();
											}
										});
									}, function(err){
										if(err){
											res.json({"statusCode": 500, "success":"false", "message": "internal error"});
										}
										else{
											var new_rfq_id=new_rfq_info.insertId;
											var rfq_lines_query="select * from `rfq_lines` where `rfq_id`='"+req.body.rfq_id+"' and has_variant='1'";
											connection.query(rfq_lines_query, function(err, line_items){
												if(err){
													console.log(err);
													res.json({"statusCode": 500, "success":"false", "message": "internal error"});
												}
												else{
													var new_rfq_lines_id_1=0;
													var line_item_id=0;
													//var line_item_id_1=0;
													async.each(line_items, function(items, done){
															var line_item_id_1 = items.id;
															var line_item_id = items.id;
															var product_lines_id = items.product_lines_id;
															var plants_id = items.plants_id;
															var rfq_id = new_rfq_id;
															var number_of_units = items.number_of_units;
															try{
																items.req_delivery_date=moment(new Date(items.req_delivery_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
															}catch(ex) {
																items.req_delivery_date = '0000-00-00 00:00:00';
															}
															var req_delivery_date = items.req_delivery_date;
															var rfq_line_status = items.rfq_line_status;
															var product_designs_id = items.product_designs_id;
															var material_code = items.material_code;
															var material_cost = items.material_cost;
															var labour_cost = items.labour_cost;
															var no_of_labour_hours = items.no_of_labour_hours;
															var sales_price = items.sales_price;
															var confirmed_delivery_date = items.confirmed_delivery_date;
															var minimum_sales_price = items.minimum_sales_price;
															var rfq_lines_calculated_sales_price_id = items.rfq_lines_calculated_sales_price_id;
															var variant_to = items.variant_to;
															var has_variant = items.has_variant;
															var new_rfq_lines_id =0;
															var q1="INSERT INTO `rfq_lines` (`product_lines_id`, `plants_id`, `rfq_id`, `number_of_units`, `req_delivery_date`, `rfq_line_status`, `product_designs_id`, `material_code`, `material_cost`, `labour_cost`, `no_of_labour_hours`, `sales_price`, `confirmed_delivery_date`, `minimum_sales_price`, `rfq_lines_calculated_sales_price_id`, `variant_to`, `has_variant`) VALUES('"+product_lines_id+"', '"+plants_id+"', '"+rfq_id+"', '"+number_of_units+"', '"+req_delivery_date+"', '"+rfq_line_status+"', '"+product_designs_id+"', '"+material_code+"', '"+material_cost+"', '"+labour_cost+"', '"+no_of_labour_hours+"', '"+sales_price+"', '"+confirmed_delivery_date+"', '"+minimum_sales_price+"', '"+rfq_lines_calculated_sales_price_id+"', '"+variant_to+"', '"+has_variant+"')";
															connection.query(q1, function(err, item_insert){
																if(err){
																	done(err);
																}
																else{
																	new_rfq_lines_id = item_insert.insertId;
																	new_rfq_lines_id_1 = item_insert.insertId;
																	var spec_query="select * from `rfq_lines_technical_specs` where `rfq_lines_id`='"+line_item_id+"'";
																	connection.query(spec_query, function(err, tech_spacs){
																		if(err){
																			done(err);
																		}
																		else{
																			async.each(tech_spacs, function(specs, done){
																				var tech_insert_query = "INSERT INTO `rfq_lines_technical_specs`(`rfq_lines_id`, `product_properties_id`, `value`, `remark`) VALUES ('"+new_rfq_lines_id+"','"+specs.product_properties_id+"','"+specs.value+"','"+specs.remark+"')";
																				connection.query(tech_insert_query, function(err, info_tech_insert){
																					if(err){
																						done(err);
																					}
																					else{
																						done();
																					}
																				});
																			}, function(err){
																				if(err){
																					done(err);
																				}
																				else{
																					var variant_rfq_lines_query="select * from `rfq_lines` where `rfq_id`='"+req.body.rfq_id+"' and variant_to='"+line_item_id+"'";
																					connection.query(variant_rfq_lines_query, function(err, variant_line_items){
																						if(err){
																							done(err);
																						}
																						else{
																							async.each(variant_line_items, function(variant_line, done){
																								var line_item_id = variant_line.id;
																								var product_lines_id = variant_line.product_lines_id;
																								var plants_id = variant_line.plants_id;
																								var rfq_id = new_rfq_id;
																								var number_of_units = variant_line.number_of_units;
																								try{
																									variant_line.req_delivery_date=moment(new Date(variant_line.req_delivery_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
																								}catch(ex) {
																									variant_line.req_delivery_date = '0000-00-00 00:00:00';
																								}
																								var req_delivery_date = variant_line.req_delivery_date;
																								var rfq_line_status = variant_line.rfq_line_status;
																								var product_designs_id = variant_line.product_designs_id;
																								var material_code = variant_line.material_code;
																								var material_cost = variant_line.material_cost;
																								var labour_cost = variant_line.labour_cost;
																								var no_of_labour_hours = variant_line.no_of_labour_hours;
																								var sales_price = variant_line.sales_price;
																								var confirmed_delivery_date = variant_line.confirmed_delivery_date;
																								var minimum_sales_price = variant_line.minimum_sales_price;
																								var rfq_lines_calculated_sales_price_id = variant_line.rfq_lines_calculated_sales_price_id;
																								var variant_to = new_rfq_lines_id;
																								var has_variant = variant_line.has_variant;
																								var new_variant_rfq_lines_id =0;
																								var q2="INSERT INTO `rfq_lines` (`product_lines_id`, `plants_id`, `rfq_id`, `number_of_units`, `req_delivery_date`, `rfq_line_status`, `product_designs_id`, `material_code`, `material_cost`, `labour_cost`, `no_of_labour_hours`, `sales_price`, `confirmed_delivery_date`, `minimum_sales_price`, `rfq_lines_calculated_sales_price_id`, `variant_to`, `has_variant`) VALUES('"+product_lines_id+"', '"+plants_id+"', '"+rfq_id+"', '"+number_of_units+"', '"+req_delivery_date+"', '"+rfq_line_status+"', '"+product_designs_id+"', '"+material_code+"', '"+material_cost+"', '"+labour_cost+"', '"+no_of_labour_hours+"', '"+sales_price+"', '"+confirmed_delivery_date+"', '"+minimum_sales_price+"', '"+rfq_lines_calculated_sales_price_id+"', '"+variant_to+"', '"+has_variant+"')";
																								connection.query(q2, function(err, variant_line_insert){
																									if(err){
																										done(err);
																									}
																									else{
																										var spec_query="select * from `rfq_lines_technical_specs` where `rfq_lines_id`='"+line_item_id+"'";
																										connection.query(spec_query, function(err, tech_spacs) {
																											if (err) {
																												done(err);
																											}
																											else{
																												var new_rfq_lines_id = variant_line_insert.insertId;
																												async.each(tech_spacs, function(specs, done){
																													var tech_insert_query = "INSERT INTO `rfq_lines_technical_specs`(`rfq_lines_id`, `product_properties_id`, `value`, `remark`) VALUES ('"+new_rfq_lines_id+"','"+specs.product_properties_id+"','"+specs.value+"','"+specs.remark+"')";
																													connection.query(tech_insert_query, function(err, info_tech_insert){
																														if(err){
																															done(err);
																														}
																														else{
																															done();
																														}
																													});
																												}, function(err){
																													if(err){
																														done(err);
																													}
																													else{
																														var sales_price_query="SELECT * FROM `rfq_lines_calculated_sales_price` WHERE `rfq_lines_id`='"+line_item_id+"'";
																														console.log(sales_price_query);
																														connection.query(sales_price_query, function(err, line_sales_price){
																															if(err){
																																done(err);
																															}
																															else{
																																if(line_sales_price.length>0){
																																	var complexities_id = line_sales_price[0].complexities_id;
																																	var product_design_id = line_sales_price[0].product_design_id;
																																	var rfq_lines_id = new_rfq_lines_id;
																																	var material_cost = line_sales_price[0].material_cost;
																																	var labor_cost = line_sales_price[0].labor_cost;
																																	var labor_hours = line_sales_price[0].labor_hours;
																																	var extra_engineering_cost = line_sales_price[0].extra_engineering_cost;
																																	var dcp = line_sales_price[0].dcp;
																																	var cost_packaging = line_sales_price[0].cost_packaging;
																																	var packaging_cost_transformer = line_sales_price[0].packaging_cost_transformer;
																																	var extra_packaging_costs_build_of_parts = line_sales_price[0].extra_packaging_costs_build_of_parts;
																																	var packaging = line_sales_price[0].packaging;
																																	var engineering_overheads = line_sales_price[0].engineering_overheads;
																																	var plant_overheads = line_sales_price[0].plant_overheads;
																																	var site_overheads = line_sales_price[0].site_overheads;
																																	var regional_overheads = line_sales_price[0].regional_overheads;
																																	var product_line_overheads = line_sales_price[0].product_line_overheads;
																																	var corporate_overheads = line_sales_price[0].corporate_overheads;
																																	var depreciation = line_sales_price[0].depreciation;
																																	var overheads = line_sales_price[0].overheads;
																																	var frieght_f_term = line_sales_price[0].frieght_f_term;
																																	var friegth_c_term = line_sales_price[0].friegth_c_term;
																																	var friegth_d_term = line_sales_price[0].friegth_d_term;
																																	var transport = line_sales_price[0].transport;
																																	var financial_cost_loc = line_sales_price[0].financial_cost_loc;
																																	var financial_cost_bonds = line_sales_price[0].financial_cost_bonds;
																																	var maintenance_equipment = line_sales_price[0].maintenance_equipment;
																																	var administrative_cost_various = line_sales_price[0].administrative_cost_various;
																																	var extra_documentation_required = line_sales_price[0].extra_documentation_required;
																																	var supervision = line_sales_price[0].supervision;
																																	var erection_comm = line_sales_price[0].erection_comm;
																																	var factory_training = line_sales_price[0].factory_training;
																																	var onsite_training = line_sales_price[0].onsite_training;
																																	var warranty_on_full_cost = line_sales_price[0].warranty_on_full_cost;
																																	var extra_cost = line_sales_price[0].extra_cost;
																																	var full_cost_excluding_commision = line_sales_price[0].full_cost_excluding_commision;
																																	var ebit_percentage = line_sales_price[0].ebit_percentage;
																																	var ebit = line_sales_price[0].ebit;
																																	var commission_on_net_sales_price = line_sales_price[0].commission_on_net_sales_price;
																																	var commission_on_f_term = line_sales_price[0].commission_on_f_term;
																																	var commission_on_gross_sales = line_sales_price[0].commission_on_gross_sales;
																																	var commission = line_sales_price[0].commission;
																																	var minimum_intercompany_sales = line_sales_price[0].minimum_intercompany_sales;
																																	var minimum_sales_price_to_customer = line_sales_price[0].minimum_sales_price_to_customer;
																																	var acc = line_sales_price[0].acc;
																																	var acc_factor = line_sales_price[0].acc_factor;
																																	var extra_engineering_hours = line_sales_price[0].extra_engineering_hours;

																																	var insert_sales_price_query="INSERT INTO `rfq_lines_calculated_sales_price`(`complexities_id`, `product_design_id`, `rfq_lines_id`, `material_cost`, `labor_cost`, `labor_hours`, `extra_engineering_cost`, `dcp`, `cost_packaging`, `packaging_cost_transformer`, `extra_packaging_costs_build_of_parts`, `packaging`, `engineering_overheads`, `plant_overheads`, `site_overheads`, `regional_overheads`, `product_line_overheads`, `corporate_overheads`, `depreciation`, `overheads`, `frieght_f_term`, `friegth_c_term`, `friegth_d_term`, `transport`, `financial_cost_loc`, `financial_cost_bonds`, `maintenance_equipment`, `administrative_cost_various`, `extra_documentation_required`, `supervision`, `erection_comm`, `factory_training`, `onsite_training`, `warranty_on_full_cost`, `extra_cost`, `full_cost_excluding_commision`, `ebit_percentage`, `ebit`, `commission_on_net_sales_price`, `commission_on_f_term`, `commission_on_gross_sales`, `commission`, `minimum_intercompany_sales`, `minimum_sales_price_to_customer`, `acc`, `acc_factor`, `extra_engineering_hours`) VALUES ('"+complexities_id+"','"+product_design_id+"', '"+rfq_lines_id+"', '"+material_cost+"', '"+labor_cost+"', '"+labor_hours+"', '"+extra_engineering_cost+"', '"+dcp+"', '"+cost_packaging+"', '"+packaging_cost_transformer+"', '"+extra_packaging_costs_build_of_parts+"', '"+packaging+"', '"+engineering_overheads+"', '"+plant_overheads+"', '"+site_overheads+"', '"+regional_overheads+"', '"+product_line_overheads+"', '"+corporate_overheads+"', '"+depreciation+"', '"+overheads+"', '"+frieght_f_term+"', '"+friegth_c_term+"', '"+friegth_d_term+"', '"+transport+"', '"+financial_cost_loc+"', '"+financial_cost_bonds+"', '"+maintenance_equipment+"', '"+administrative_cost_various+"', '"+extra_documentation_required+"', '"+supervision+"', '"+erection_comm+"', '"+factory_training+"', '"+onsite_training+"', '"+warranty_on_full_cost+"', '"+extra_cost+"', '"+full_cost_excluding_commision+"', '"+ebit_percentage+"', '"+ebit+"', '"+commission_on_net_sales_price+"', '"+commission_on_f_term+"', '"+commission_on_gross_sales+"', '"+commission+"', '"+minimum_intercompany_sales+"', '"+minimum_sales_price_to_customer+"', '"+acc+"', '"+acc_factor+"', '"+extra_engineering_hours+"')";
																																	connection.query(insert_sales_price_query, function(err, calc_sales_price_insert){
																																		if(err){
																																			done(err);
																																		}
																																		else{
																																			done();
																																		}
																																	});
																																}
																																else{
																																	done();
																																}
																															}
																														});
																													}
																												});
																											}
																										});
																									}
																								});
																							}, function(err){
																								if(err){
																									done(err);
																								}
																								else{
																									var sales_price_query="SELECT * FROM `rfq_lines_calculated_sales_price` WHERE `rfq_lines_id`='"+line_item_id_1+"'";
																									console.log(sales_price_query);
																									connection.query(sales_price_query, function(err, line_sales_price){
																										if(err){
																											done(err);
																										}
																										else{
																											if(line_sales_price.length>0){
																												var complexities_id = line_sales_price[0].complexities_id;
																												var product_design_id = line_sales_price[0].product_design_id;
																												var rfq_lines_id = new_rfq_lines_id;
																												var material_cost = line_sales_price[0].material_cost;
																												var labor_cost = line_sales_price[0].labor_cost;
																												var labor_hours = line_sales_price[0].labor_hours;
																												var extra_engineering_cost = line_sales_price[0].extra_engineering_cost;
																												var dcp = line_sales_price[0].dcp;
																												var cost_packaging = line_sales_price[0].cost_packaging;
																												var packaging_cost_transformer = line_sales_price[0].packaging_cost_transformer;
																												var extra_packaging_costs_build_of_parts = line_sales_price[0].extra_packaging_costs_build_of_parts;
																												var packaging = line_sales_price[0].packaging;
																												var engineering_overheads = line_sales_price[0].engineering_overheads;
																												var plant_overheads = line_sales_price[0].plant_overheads;
																												var site_overheads = line_sales_price[0].site_overheads;
																												var regional_overheads = line_sales_price[0].regional_overheads;
																												var product_line_overheads = line_sales_price[0].product_line_overheads;
																												var corporate_overheads = line_sales_price[0].corporate_overheads;
																												var depreciation = line_sales_price[0].depreciation;
																												var overheads = line_sales_price[0].overheads;
																												var frieght_f_term = line_sales_price[0].frieght_f_term;
																												var friegth_c_term = line_sales_price[0].friegth_c_term;
																												var friegth_d_term = line_sales_price[0].friegth_d_term;
																												var transport = line_sales_price[0].transport;
																												var financial_cost_loc = line_sales_price[0].financial_cost_loc;
																												var financial_cost_bonds = line_sales_price[0].financial_cost_bonds;
																												var maintenance_equipment = line_sales_price[0].maintenance_equipment;
																												var administrative_cost_various = line_sales_price[0].administrative_cost_various;
																												var extra_documentation_required = line_sales_price[0].extra_documentation_required;
																												var supervision = line_sales_price[0].supervision;
																												var erection_comm = line_sales_price[0].erection_comm;
																												var factory_training = line_sales_price[0].factory_training;
																												var onsite_training = line_sales_price[0].onsite_training;
																												var warranty_on_full_cost = line_sales_price[0].warranty_on_full_cost;
																												var extra_cost = line_sales_price[0].extra_cost;
																												var full_cost_excluding_commision = line_sales_price[0].full_cost_excluding_commision;
																												var ebit_percentage = line_sales_price[0].ebit_percentage;
																												var ebit = line_sales_price[0].ebit;
																												var commission_on_net_sales_price = line_sales_price[0].commission_on_net_sales_price;
																												var commission_on_f_term = line_sales_price[0].commission_on_f_term;
																												var commission_on_gross_sales = line_sales_price[0].commission_on_gross_sales;
																												var commission = line_sales_price[0].commission;
																												var minimum_intercompany_sales = line_sales_price[0].minimum_intercompany_sales;
																												var minimum_sales_price_to_customer = line_sales_price[0].minimum_sales_price_to_customer;
																												var acc = line_sales_price[0].acc;
																												var acc_factor = line_sales_price[0].acc_factor;
																												var extra_engineering_hours = line_sales_price[0].extra_engineering_hours;

																												var insert_sales_price_query="INSERT INTO `rfq_lines_calculated_sales_price`(`complexities_id`, `product_design_id`, `rfq_lines_id`, `material_cost`, `labor_cost`, `labor_hours`, `extra_engineering_cost`, `dcp`, `cost_packaging`, `packaging_cost_transformer`, `extra_packaging_costs_build_of_parts`, `packaging`, `engineering_overheads`, `plant_overheads`, `site_overheads`, `regional_overheads`, `product_line_overheads`, `corporate_overheads`, `depreciation`, `overheads`, `frieght_f_term`, `friegth_c_term`, `friegth_d_term`, `transport`, `financial_cost_loc`, `financial_cost_bonds`, `maintenance_equipment`, `administrative_cost_various`, `extra_documentation_required`, `supervision`, `erection_comm`, `factory_training`, `onsite_training`, `warranty_on_full_cost`, `extra_cost`, `full_cost_excluding_commision`, `ebit_percentage`, `ebit`, `commission_on_net_sales_price`, `commission_on_f_term`, `commission_on_gross_sales`, `commission`, `minimum_intercompany_sales`, `minimum_sales_price_to_customer`, `acc`, `acc_factor`, `extra_engineering_hours`) VALUES ('"+complexities_id+"','"+product_design_id+"', '"+rfq_lines_id+"', '"+material_cost+"', '"+labor_cost+"', '"+labor_hours+"', '"+extra_engineering_cost+"', '"+dcp+"', '"+cost_packaging+"', '"+packaging_cost_transformer+"', '"+extra_packaging_costs_build_of_parts+"', '"+packaging+"', '"+engineering_overheads+"', '"+plant_overheads+"', '"+site_overheads+"', '"+regional_overheads+"', '"+product_line_overheads+"', '"+corporate_overheads+"', '"+depreciation+"', '"+overheads+"', '"+frieght_f_term+"', '"+friegth_c_term+"', '"+friegth_d_term+"', '"+transport+"', '"+financial_cost_loc+"', '"+financial_cost_bonds+"', '"+maintenance_equipment+"', '"+administrative_cost_various+"', '"+extra_documentation_required+"', '"+supervision+"', '"+erection_comm+"', '"+factory_training+"', '"+onsite_training+"', '"+warranty_on_full_cost+"', '"+extra_cost+"', '"+full_cost_excluding_commision+"', '"+ebit_percentage+"', '"+ebit+"', '"+commission_on_net_sales_price+"', '"+commission_on_f_term+"', '"+commission_on_gross_sales+"', '"+commission+"', '"+minimum_intercompany_sales+"', '"+minimum_sales_price_to_customer+"', '"+acc+"', '"+acc_factor+"', '"+extra_engineering_hours+"')";
																												connection.query(insert_sales_price_query, function(err, calc_sales_price_insert){
																													if(err){
																														done(err);
																													}
																													else{
																														done();
																													}
																												});
																											}
																											else{
																												done();
																											}
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
															});
														},
														function(err){
															if(err){
																done(err);
															}
															else{
																var query="select * from `rfq_lines` where `rfq_id`='"+req.body.rfq_id+"' and has_variant='0' and `variant_to`='0'";
																connection.query(query, function(err, line_info){
																	if(err){
																		done(err);
																	}
																	else{
																		async.each(line_info, function(items, done){
																			var line_item_id = items.id;
																			var product_lines_id = items.product_lines_id;
																			var plants_id = items.plants_id;
																			var rfq_id = new_rfq_id;
																			var number_of_units = items.number_of_units;
																			try{
																				items.req_delivery_date=moment(new Date(items.req_delivery_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
																			}catch(ex) {
																				items.req_delivery_date = '0000-00-00 00:00:00';
																			}
																			var req_delivery_date = items.req_delivery_date;
																			var rfq_line_status = items.rfq_line_status;
																			var product_designs_id = items.product_designs_id;
																			var material_code = items.material_code;
																			var material_cost = items.material_cost;
																			var labour_cost = items.labour_cost;
																			var no_of_labour_hours = items.no_of_labour_hours;
																			var sales_price = items.sales_price;
																			var confirmed_delivery_date = items.confirmed_delivery_date;
																			var minimum_sales_price = items.minimum_sales_price;
																			var rfq_lines_calculated_sales_price_id = items.rfq_lines_calculated_sales_price_id;
																			var variant_to = 0;
																			var has_variant = 0;
																			var new_rfq_lines_id =0;
																			var q1="INSERT INTO `rfq_lines` (`product_lines_id`, `plants_id`, `rfq_id`, `number_of_units`, `req_delivery_date`, `rfq_line_status`, `product_designs_id`, `material_code`, `material_cost`, `labour_cost`, `no_of_labour_hours`, `sales_price`, `confirmed_delivery_date`, `minimum_sales_price`, `rfq_lines_calculated_sales_price_id`, `variant_to`, `has_variant`) VALUES('"+product_lines_id+"', '"+plants_id+"', '"+rfq_id+"', '"+number_of_units+"', '"+req_delivery_date+"', '"+rfq_line_status+"', '"+product_designs_id+"', '"+material_code+"', '"+material_cost+"', '"+labour_cost+"', '"+no_of_labour_hours+"', '"+sales_price+"', '"+confirmed_delivery_date+"', '"+minimum_sales_price+"', '"+rfq_lines_calculated_sales_price_id+"', '"+variant_to+"', '"+has_variant+"')";
																			connection.query(q1, function(err, item_insert){
																				if(err){
																					done(err);
																				}
																				else{
																					new_rfq_lines_id = item_insert.insertId;
																					var spec_query="select * from `rfq_lines_technical_specs` where `rfq_lines_id`='"+line_item_id+"'";
																					connection.query(spec_query, function(err, tech_spacs) {
																						if (err) {
																							done(err);
																						}
																						else{
																							async.each(tech_spacs, function(specs, done){
																								var tech_insert_query = "INSERT INTO `rfq_lines_technical_specs`(`rfq_lines_id`, `product_properties_id`, `value`, `remark`) VALUES ('"+new_rfq_lines_id+"','"+specs.product_properties_id+"','"+specs.value+"','"+specs.remark+"')";
																								connection.query(tech_insert_query, function(err, info_tech_insert){
																									if(err){
																										done(err);
																									}
																									else{
																										done();
																									}
																								});
																							}, function(err){
																								if(err){
																									done(err);
																								}
																								else{
																									var sales_price_query="SELECT * FROM `rfq_lines_calculated_sales_price` WHERE `rfq_lines_id`='"+line_item_id+"'";
																									connection.query(sales_price_query, function(err, line_sales_price){
																										if(err){
																											done(err);
																										}
																										else{
																											var complexities_id = line_sales_price[0].complexities_id;
																											var product_design_id = line_sales_price[0].product_design_id;
																											var rfq_lines_id = new_rfq_lines_id;
																											var material_cost = line_sales_price[0].material_cost;
																											var labor_cost = line_sales_price[0].labor_cost;
																											var labor_hours = line_sales_price[0].labor_hours;
																											var extra_engineering_cost = line_sales_price[0].extra_engineering_cost;
																											var dcp = line_sales_price[0].dcp;
																											var cost_packaging = line_sales_price[0].cost_packaging;
																											var packaging_cost_transformer = line_sales_price[0].packaging_cost_transformer;
																											var extra_packaging_costs_build_of_parts = line_sales_price[0].extra_packaging_costs_build_of_parts;
																											var packaging = line_sales_price[0].packaging;
																											var engineering_overheads = line_sales_price[0].engineering_overheads;
																											var plant_overheads = line_sales_price[0].plant_overheads;
																											var site_overheads = line_sales_price[0].site_overheads;
																											var regional_overheads = line_sales_price[0].regional_overheads;
																											var product_line_overheads = line_sales_price[0].product_line_overheads;
																											var corporate_overheads = line_sales_price[0].corporate_overheads;
																											var depreciation = line_sales_price[0].depreciation;
																											var overheads = line_sales_price[0].overheads;
																											var frieght_f_term = line_sales_price[0].frieght_f_term;
																											var friegth_c_term = line_sales_price[0].friegth_c_term;
																											var friegth_d_term = line_sales_price[0].friegth_d_term;
																											var transport = line_sales_price[0].transport;
																											var financial_cost_loc = line_sales_price[0].financial_cost_loc;
																											var financial_cost_bonds = line_sales_price[0].financial_cost_bonds;
																											var maintenance_equipment = line_sales_price[0].maintenance_equipment;
																											var administrative_cost_various = line_sales_price[0].administrative_cost_various;
																											var extra_documentation_required = line_sales_price[0].extra_documentation_required;
																											var supervision = line_sales_price[0].supervision;
																											var erection_comm = line_sales_price[0].erection_comm;
																											var factory_training = line_sales_price[0].factory_training;
																											var onsite_training = line_sales_price[0].onsite_training;
																											var warranty_on_full_cost = line_sales_price[0].warranty_on_full_cost;
																											var extra_cost = line_sales_price[0].extra_cost;
																											var full_cost_excluding_commision = line_sales_price[0].full_cost_excluding_commision;
																											var ebit_percentage = line_sales_price[0].ebit_percentage;
																											var ebit = line_sales_price[0].ebit;
																											var commission_on_net_sales_price = line_sales_price[0].commission_on_net_sales_price;
																											var commission_on_f_term = line_sales_price[0].commission_on_f_term;
																											var commission_on_gross_sales = line_sales_price[0].commission_on_gross_sales;
																											var commission = line_sales_price[0].commission;
																											var minimum_intercompany_sales = line_sales_price[0].minimum_intercompany_sales;
																											var minimum_sales_price_to_customer = line_sales_price[0].minimum_sales_price_to_customer;
																											var acc = line_sales_price[0].acc;
																											var acc_factor = line_sales_price[0].acc_factor;
																											var extra_engineering_hours = line_sales_price[0].extra_engineering_hours;

																											var insert_sales_price_query="INSERT INTO `rfq_lines_calculated_sales_price`(`complexities_id`, `product_design_id`, `rfq_lines_id`, `material_cost`, `labor_cost`, `labor_hours`, `extra_engineering_cost`, `dcp`, `cost_packaging`, `packaging_cost_transformer`, `extra_packaging_costs_build_of_parts`, `packaging`, `engineering_overheads`, `plant_overheads`, `site_overheads`, `regional_overheads`, `product_line_overheads`, `corporate_overheads`, `depreciation`, `overheads`, `frieght_f_term`, `friegth_c_term`, `friegth_d_term`, `transport`, `financial_cost_loc`, `financial_cost_bonds`, `maintenance_equipment`, `administrative_cost_various`, `extra_documentation_required`, `supervision`, `erection_comm`, `factory_training`, `onsite_training`, `warranty_on_full_cost`, `extra_cost`, `full_cost_excluding_commision`, `ebit_percentage`, `ebit`, `commission_on_net_sales_price`, `commission_on_f_term`, `commission_on_gross_sales`, `commission`, `minimum_intercompany_sales`, `minimum_sales_price_to_customer`, `acc`, `acc_factor`, `extra_engineering_hours`) VALUES ('"+complexities_id+"','"+product_design_id+"', '"+rfq_lines_id+"', '"+material_cost+"', '"+labor_cost+"', '"+labor_hours+"', '"+extra_engineering_cost+"', '"+dcp+"', '"+cost_packaging+"', '"+packaging_cost_transformer+"', '"+extra_packaging_costs_build_of_parts+"', '"+packaging+"', '"+engineering_overheads+"', '"+plant_overheads+"', '"+site_overheads+"', '"+regional_overheads+"', '"+product_line_overheads+"', '"+corporate_overheads+"', '"+depreciation+"', '"+overheads+"', '"+frieght_f_term+"', '"+friegth_c_term+"', '"+friegth_d_term+"', '"+transport+"', '"+financial_cost_loc+"', '"+financial_cost_bonds+"', '"+maintenance_equipment+"', '"+administrative_cost_various+"', '"+extra_documentation_required+"', '"+supervision+"', '"+erection_comm+"', '"+factory_training+"', '"+onsite_training+"', '"+warranty_on_full_cost+"', '"+extra_cost+"', '"+full_cost_excluding_commision+"', '"+ebit_percentage+"', '"+ebit+"', '"+commission_on_net_sales_price+"', '"+commission_on_f_term+"', '"+commission_on_gross_sales+"', '"+commission+"', '"+minimum_intercompany_sales+"', '"+minimum_sales_price_to_customer+"', '"+acc+"', '"+acc_factor+"', '"+extra_engineering_hours+"')";
																											connection.query(insert_sales_price_query, function(err, calc_sales_price_insert){
																												if(err){
																													done(err);
																												}
																												else{
																													done();
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

																		}, function(err){
																			if(err){
																				done(err);
																			}
																			else{
																				res.json({"statusCode": 200, "success":"true", "message": "New Rfq version Created Sucessfully"})
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
							});
						}
					});
				}
			});
		}
	});
}

function sync(index, rfq_lines, rfq_id, callback){
	var req_delivery_date=rfq_lines[index].req_delivery_date;
	try{
		req_delivery_date=moment(new Date(rfq_lines[index].req_delivery_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
	}catch(ex){
		req_delivery_date='0000-00-00 00:00:00';
	}
	var query_rfq_lines="INSERT INTO `rfq_lines` (`product_lines_id`, `plants_id`, `rfq_id`, `number_of_units`, `req_delivery_date`, `rfq_line_status`, `product_designs_id`, `material_code`, `material_cost`, `labour_cost`, `no_of_labour_hours`, `sales_price`, `confirmed_delivery_date`, `minimum_sales_price`, `rfq_lines_calculated_sales_price_id`, `variant_to`) VALUES('"+rfq_lines[index].product_lines_id+"', '"+rfq_lines[index].plants_id+"', '"+rfq_id+"', '"+rfq_lines[index].number_of_units+"', '"+req_delivery_date+"', '"+rfq_lines[index].rfq_line_status+"', '"+rfq_lines[index].product_designs_id+"', '"+rfq_lines[index].material_code+"', '"+rfq_lines[index].material_cost+"', '"+rfq_lines[index].labour_cost+"', '"+rfq_lines[index].no_of_labour_hours+"', '"+rfq_lines[index].sales_price+"', '"+rfq_lines[index].confirmed_delivery_date+"', '"+rfq_lines[index].minimum_sales_price+"', '"+rfq_lines[index].rfq_lines_calculated_sales_price_id+"', '"+rfq_lines[index].variant_to+"')";
	connection.query(query_rfq_lines, function(err, new_rfq_lines){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			var rfq_lines_id=rfq_lines[index].id;
			var query="select * from `rfq_lines_technical_specs` where `rfq_lines_id`='"+rfq_lines_id+"'";
			connection.query(query, function(err, technical_specs){
				if(err){
					console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					var technical_spec_counter=0;
					for (var j = 0; j < technical_specs.length; j++) {
						technical_sepc(j, new_rfq_lines.insertId, technical_specs[j]);
					};
				}
			});
		}
	});
	if(index==rfq_lines.length-1){
		callback();
	}
};

function technical_sepc(index, rfq_lines_id, technical_specs, callback){
	var query_technical_spec="INSERT INTO `rfq_lines_technical_specs` (`rfq_lines_id`, `product_properties_id`, `value`, `remark`) VALUES ('"+rfq_lines_id+"', '"+technical_specs.product_properties_id+"', '"+technical_specs.value+"', '"+technical_specs.remark+"')";
	connection.query(query_technical_spec, function(err, info){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
		}
	});
};




exports.extend_validity_period_quote = function(req, res){
	var async = require("async");
	var query_update_rfq="UPDATE `rfq` SET `rfq_status_id`='8' WHERE `id`='"+req.body.rfq_id+"'";
	connection.query(query_update_rfq, function(err, rfq_update){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			query="select * from `rfq` where `id`='"+req.body.rfq_id+"'";
			connection.query(query, function(err, rfq){
				if(err){
					console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					var sales_hub_id = rfq[0].sales_hub_id;
					var sales_person_id = rfq[0].sales_person_id;
					var customers_id = rfq[0].customers_id;
					var sales_segments_id = rfq[0].sales_segments_id;
					var sales_agents_id = rfq[0].sales_agents_id;
					var tendering_teams_id = rfq[0].tendering_teams_id;
					var product_lines_id = rfq[0].product_lines_id;
					var tendering_teams_members_id = rfq[0].tendering_teams_members_id;
					var rejection_remarks_id = rfq[0].rejection_remarks_id;
					var lost_remarks_id = rfq[0].lost_remarks_id;
					var type_of_quote_id = rfq[0].type_of_quote_id;
					var project_name = rfq[0].project_name;
					try{
						rfq[0].date_rfq_in=moment(new Date(rfq[0].date_rfq_in).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
					}catch(ex){
						rfq[0].date_rfq_in='0000-00-00 00:00:00';
					}
					var date_rfq_in = rfq[0].date_rfq_in;
					var customer_country = rfq[0].customer_country;
					var installation_country = rfq[0].installation_country;

					var new_version=parseInt(rfq[0].version_no)+1;
					new_version=new_version+".0";

					var document_part=rfq[0].document_no.split("/");
					var document_no=document_part[0]+"/"+new_version;
					//var document_no=rfq[0].document_no;
					var version_no = new_version;
					var document_no = document_no;
					var rfq_status_id = 4;
					try{
						rfq[0].quote_creation_date=moment(new Date(rfq[0].quote_creation_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
					}catch(ex){
						rfq[0].quote_creation_date='0000-00-00 00:00:00';
					}
					var quote_creation_date = rfq[0].quote_creation_date;

					try{
						rfq[0].quote_submission_date=moment(new Date(rfq[0].quote_submission_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
					}catch(ex){
						rfq[0].quote_submission_date='0000-00-00 00:00:00';
					}

					var quote_submission_date = rfq[0].quote_submission_date;

					try{
						req.body.validity_date=moment(new Date(req.body.validity_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
					}catch(ex){
						req.body.validity_date='0000-00-00 00:00:00';
					}

					var quote_validity_date = req.body.validity_date;

					var probability_id = rfq[0].probability_id;

					try{
						rfq[0].requested_quotation_date=moment(new Date(rfq[0].requested_quotation_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
					}catch(ex){
						rfq[0].requested_quotation_date='0000-00-00 00:00:00';
					}
					var requested_quotation_date = rfq[0].requested_quotation_date;
					var estimated_sales_price = rfq[0].estimated_sales_price;
					var created_by = rfq[0].created_by;
					var strategic_quote = rfq[0].strategic_quote;
					var channel_to_market_id = rfq[0].channel_to_market_id;
					var is_bid = rfq[0].is_bid;
					var sales_rejection_remarks_id = rfq[0].sales_rejection_remarks_id;
					var sales_price = rfq[0].sales_price;
					var bid_no_bid_rejection_comments = rfq[0].bid_no_bid_rejection_comments;
					var customer_reference = rfq[0].customer_reference;
					var won_gross_sale = rfq[0].won_gross_sale;

					var new_rfq_id=0;

					var new_rfq_query="INSERT INTO `rfq` (`sales_hub_id`, `sales_person_id`, `customers_id`, `sales_segments_id`, `sales_agents_id`, `tendering_teams_id`, `product_lines_id`, `tendering_teams_members_id`, `rejection_remarks_id`, `lost_remarks_id`, `type_of_quote_id`, `project_name`, `date_rfq_in`, `customer_country`, `installation_country`, `version_no`, `document_no`, `rfq_status_id`, `quote_creation_date`, `quote_submission_date`, `quote_validity_date`, `probability_id`, `requested_quotation_date`, `estimated_sales_price`, `created_by`, `strategic_quote`, `channel_to_market_id`, `is_bid`, `sales_rejection_remarks_id`, `sales_price`, `bid_no_bid_rejection_comments`, `customer_reference`, `won_gross_sale`) VALUES('"+sales_hub_id+"','"+sales_person_id+"','"+customers_id+"','"+sales_segments_id+"','"+sales_agents_id+"','"+tendering_teams_id+"','"+product_lines_id+"','"+tendering_teams_members_id+"','"+rejection_remarks_id+"','"+lost_remarks_id+"','"+type_of_quote_id+"','"+project_name+"','"+date_rfq_in+"','"+customer_country+"','"+installation_country+"','"+version_no+"','"+document_no+"','"+rfq_status_id+"','"+quote_creation_date+"','"+quote_submission_date+"','"+quote_validity_date+"','"+probability_id+"','"+requested_quotation_date+"','"+estimated_sales_price+"','"+created_by+"','"+strategic_quote+"','"+channel_to_market_id+"','"+is_bid+"','"+sales_rejection_remarks_id+"','"+sales_price+"','"+bid_no_bid_rejection_comments+"','"+customer_reference+"','"+won_gross_sale+"')";

					connection.query(new_rfq_query, function(err, new_rfq_info){
						if(err){
							res.json({"statusCode": 500, "success":"false", "message": "internal error"});
						}
						else{
							connection.query("SELECT * FROM `rfq_lines_questions` WHERE `rfq_id`='"+req.body.rfq_id+"'", function(err, rfq_question){
								if(err){
									res.json({"statusCode": 500, "success":"false", "message": "internal error"});
								}
								else{
									var async = require("async");
									async.each(rfq_question, function(question, done){
										var rfq_id = new_rfq_info.insertId;
										var rfq_questions_id = question.rfq_questions_id;
										var question_value = question.question_value;
										var question_query="INSERT INTO `rfq_lines_questions` (`rfq_id`, `rfq_questions_id`, `question_value`) VALUES ('"+rfq_id+"', '"+rfq_questions_id+"', '"+question_value+"')";
										connection.query(question_query, function(err, question_info){
											if(err){
												done(err);
											}
											else{
												done();
											}
										});
									}, function(err){
										if(err){
											res.json({"statusCode": 500, "success":"false", "message": "internal error"});
										}
										else{
											var new_rfq_id=new_rfq_info.insertId;
											var rfq_lines_query="select * from `rfq_lines` where `rfq_id`='"+req.body.rfq_id+"' and has_variant='1'";
											connection.query(rfq_lines_query, function(err, line_items){
												if(err){
													console.log(err);
													res.json({"statusCode": 500, "success":"false", "message": "internal error"});
												}
												else{
													var new_rfq_lines_id_1=0;
													var line_item_id=0;
													//var line_item_id_1=0;
													async.each(line_items, function(items, done){
															var line_item_id_1 = items.id;
															var line_item_id = items.id;
															var product_lines_id = items.product_lines_id;
															var plants_id = items.plants_id;
															var rfq_id = new_rfq_id;
															var number_of_units = items.number_of_units;
															try{
																items.req_delivery_date=moment(new Date(items.req_delivery_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
															}catch(ex) {
																items.req_delivery_date = '0000-00-00 00:00:00';
															}
															var req_delivery_date = items.req_delivery_date;
															var rfq_line_status = items.rfq_line_status;
															var product_designs_id = items.product_designs_id;
															var material_code = items.material_code;
															var material_cost = items.material_cost;
															var labour_cost = items.labour_cost;
															var no_of_labour_hours = items.no_of_labour_hours;
															var sales_price = items.sales_price;
															var confirmed_delivery_date = items.confirmed_delivery_date;
															var minimum_sales_price = items.minimum_sales_price;
															var rfq_lines_calculated_sales_price_id = items.rfq_lines_calculated_sales_price_id;
															var variant_to = items.variant_to;
															var has_variant = items.has_variant;
															var new_rfq_lines_id =0;
															var q1="INSERT INTO `rfq_lines` (`product_lines_id`, `plants_id`, `rfq_id`, `number_of_units`, `req_delivery_date`, `rfq_line_status`, `product_designs_id`, `material_code`, `material_cost`, `labour_cost`, `no_of_labour_hours`, `sales_price`, `confirmed_delivery_date`, `minimum_sales_price`, `rfq_lines_calculated_sales_price_id`, `variant_to`, `has_variant`) VALUES('"+product_lines_id+"', '"+plants_id+"', '"+rfq_id+"', '"+number_of_units+"', '"+req_delivery_date+"', '"+rfq_line_status+"', '"+product_designs_id+"', '"+material_code+"', '"+material_cost+"', '"+labour_cost+"', '"+no_of_labour_hours+"', '"+sales_price+"', '"+confirmed_delivery_date+"', '"+minimum_sales_price+"', '"+rfq_lines_calculated_sales_price_id+"', '"+variant_to+"', '"+has_variant+"')";
															connection.query(q1, function(err, item_insert){
																if(err){
																	done(err);
																}
																else{
																	new_rfq_lines_id = item_insert.insertId;
																	new_rfq_lines_id_1 = item_insert.insertId;
																	var spec_query="select * from `rfq_lines_technical_specs` where `rfq_lines_id`='"+line_item_id+"'";
																	connection.query(spec_query, function(err, tech_spacs){
																		if(err){
																			done(err);
																		}
																		else{
																			async.each(tech_spacs, function(specs, done){
																				var tech_insert_query = "INSERT INTO `rfq_lines_technical_specs`(`rfq_lines_id`, `product_properties_id`, `value`, `remark`) VALUES ('"+new_rfq_lines_id+"','"+specs.product_properties_id+"','"+specs.value+"','"+specs.remark+"')";
																				connection.query(tech_insert_query, function(err, info_tech_insert){
																					if(err){
																						done(err);
																					}
																					else{
																						done();
																					}
																				});
																			}, function(err){
																				if(err){
																					done(err);
																				}
																				else{
																					var variant_rfq_lines_query="select * from `rfq_lines` where `rfq_id`='"+req.body.rfq_id+"' and variant_to='"+line_item_id+"'";
																					connection.query(variant_rfq_lines_query, function(err, variant_line_items){
																						if(err){
																							done(err);
																						}
																						else{
																							async.each(variant_line_items, function(variant_line, done){
																								var line_item_id = variant_line.id;
																								var product_lines_id = variant_line.product_lines_id;
																								var plants_id = variant_line.plants_id;
																								var rfq_id = new_rfq_id;
																								var number_of_units = variant_line.number_of_units;
																								try{
																									variant_line.req_delivery_date=moment(new Date(variant_line.req_delivery_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
																								}catch(ex) {
																									variant_line.req_delivery_date = '0000-00-00 00:00:00';
																								}
																								var req_delivery_date = variant_line.req_delivery_date;
																								var rfq_line_status = variant_line.rfq_line_status;
																								var product_designs_id = variant_line.product_designs_id;
																								var material_code = variant_line.material_code;
																								var material_cost = variant_line.material_cost;
																								var labour_cost = variant_line.labour_cost;
																								var no_of_labour_hours = variant_line.no_of_labour_hours;
																								var sales_price = variant_line.sales_price;
																								var confirmed_delivery_date = variant_line.confirmed_delivery_date;
																								var minimum_sales_price = variant_line.minimum_sales_price;
																								var rfq_lines_calculated_sales_price_id = variant_line.rfq_lines_calculated_sales_price_id;
																								var variant_to = new_rfq_lines_id;
																								var has_variant = variant_line.has_variant;
																								var new_variant_rfq_lines_id =0;
																								var q2="INSERT INTO `rfq_lines` (`product_lines_id`, `plants_id`, `rfq_id`, `number_of_units`, `req_delivery_date`, `rfq_line_status`, `product_designs_id`, `material_code`, `material_cost`, `labour_cost`, `no_of_labour_hours`, `sales_price`, `confirmed_delivery_date`, `minimum_sales_price`, `rfq_lines_calculated_sales_price_id`, `variant_to`, `has_variant`) VALUES('"+product_lines_id+"', '"+plants_id+"', '"+rfq_id+"', '"+number_of_units+"', '"+req_delivery_date+"', '"+rfq_line_status+"', '"+product_designs_id+"', '"+material_code+"', '"+material_cost+"', '"+labour_cost+"', '"+no_of_labour_hours+"', '"+sales_price+"', '"+confirmed_delivery_date+"', '"+minimum_sales_price+"', '"+rfq_lines_calculated_sales_price_id+"', '"+variant_to+"', '"+has_variant+"')";
																								connection.query(q2, function(err, variant_line_insert){
																									if(err){
																										done(err);
																									}
																									else{
																										var spec_query="select * from `rfq_lines_technical_specs` where `rfq_lines_id`='"+line_item_id+"'";
																										connection.query(spec_query, function(err, tech_spacs) {
																											if (err) {
																												done(err);
																											}
																											else{
																												var new_rfq_lines_id = variant_line_insert.insertId;
																												async.each(tech_spacs, function(specs, done){
																													var tech_insert_query = "INSERT INTO `rfq_lines_technical_specs`(`rfq_lines_id`, `product_properties_id`, `value`, `remark`) VALUES ('"+new_rfq_lines_id+"','"+specs.product_properties_id+"','"+specs.value+"','"+specs.remark+"')";
																													connection.query(tech_insert_query, function(err, info_tech_insert){
																														if(err){
																															done(err);
																														}
																														else{
																															done();
																														}
																													});
																												}, function(err){
																													if(err){
																														done(err);
																													}
																													else{
																														var sales_price_query="SELECT * FROM `rfq_lines_calculated_sales_price` WHERE `rfq_lines_id`='"+line_item_id+"'";
																														console.log(sales_price_query);
																														connection.query(sales_price_query, function(err, line_sales_price){
																															if(err){
																																done(err);
																															}
																															else{
																																if(line_sales_price.length>0){
																																	var complexities_id = line_sales_price[0].complexities_id;
																																	var product_design_id = line_sales_price[0].product_design_id;
																																	var rfq_lines_id = new_rfq_lines_id;
																																	var material_cost = line_sales_price[0].material_cost;
																																	var labor_cost = line_sales_price[0].labor_cost;
																																	var labor_hours = line_sales_price[0].labor_hours;
																																	var extra_engineering_cost = line_sales_price[0].extra_engineering_cost;
																																	var dcp = line_sales_price[0].dcp;
																																	var cost_packaging = line_sales_price[0].cost_packaging;
																																	var packaging_cost_transformer = line_sales_price[0].packaging_cost_transformer;
																																	var extra_packaging_costs_build_of_parts = line_sales_price[0].extra_packaging_costs_build_of_parts;
																																	var packaging = line_sales_price[0].packaging;
																																	var engineering_overheads = line_sales_price[0].engineering_overheads;
																																	var plant_overheads = line_sales_price[0].plant_overheads;
																																	var site_overheads = line_sales_price[0].site_overheads;
																																	var regional_overheads = line_sales_price[0].regional_overheads;
																																	var product_line_overheads = line_sales_price[0].product_line_overheads;
																																	var corporate_overheads = line_sales_price[0].corporate_overheads;
																																	var depreciation = line_sales_price[0].depreciation;
																																	var overheads = line_sales_price[0].overheads;
																																	var frieght_f_term = line_sales_price[0].frieght_f_term;
																																	var friegth_c_term = line_sales_price[0].friegth_c_term;
																																	var friegth_d_term = line_sales_price[0].friegth_d_term;
																																	var transport = line_sales_price[0].transport;
																																	var financial_cost_loc = line_sales_price[0].financial_cost_loc;
																																	var financial_cost_bonds = line_sales_price[0].financial_cost_bonds;
																																	var maintenance_equipment = line_sales_price[0].maintenance_equipment;
																																	var administrative_cost_various = line_sales_price[0].administrative_cost_various;
																																	var extra_documentation_required = line_sales_price[0].extra_documentation_required;
																																	var supervision = line_sales_price[0].supervision;
																																	var erection_comm = line_sales_price[0].erection_comm;
																																	var factory_training = line_sales_price[0].factory_training;
																																	var onsite_training = line_sales_price[0].onsite_training;
																																	var warranty_on_full_cost = line_sales_price[0].warranty_on_full_cost;
																																	var extra_cost = line_sales_price[0].extra_cost;
																																	var full_cost_excluding_commision = line_sales_price[0].full_cost_excluding_commision;
																																	var ebit_percentage = line_sales_price[0].ebit_percentage;
																																	var ebit = line_sales_price[0].ebit;
																																	var commission_on_net_sales_price = line_sales_price[0].commission_on_net_sales_price;
																																	var commission_on_f_term = line_sales_price[0].commission_on_f_term;
																																	var commission_on_gross_sales = line_sales_price[0].commission_on_gross_sales;
																																	var commission = line_sales_price[0].commission;
																																	var minimum_intercompany_sales = line_sales_price[0].minimum_intercompany_sales;
																																	var minimum_sales_price_to_customer = line_sales_price[0].minimum_sales_price_to_customer;
																																	var acc = line_sales_price[0].acc;
																																	var acc_factor = line_sales_price[0].acc_factor;
																																	var extra_engineering_hours = line_sales_price[0].extra_engineering_hours;

																																	var insert_sales_price_query="INSERT INTO `rfq_lines_calculated_sales_price`(`complexities_id`, `product_design_id`, `rfq_lines_id`, `material_cost`, `labor_cost`, `labor_hours`, `extra_engineering_cost`, `dcp`, `cost_packaging`, `packaging_cost_transformer`, `extra_packaging_costs_build_of_parts`, `packaging`, `engineering_overheads`, `plant_overheads`, `site_overheads`, `regional_overheads`, `product_line_overheads`, `corporate_overheads`, `depreciation`, `overheads`, `frieght_f_term`, `friegth_c_term`, `friegth_d_term`, `transport`, `financial_cost_loc`, `financial_cost_bonds`, `maintenance_equipment`, `administrative_cost_various`, `extra_documentation_required`, `supervision`, `erection_comm`, `factory_training`, `onsite_training`, `warranty_on_full_cost`, `extra_cost`, `full_cost_excluding_commision`, `ebit_percentage`, `ebit`, `commission_on_net_sales_price`, `commission_on_f_term`, `commission_on_gross_sales`, `commission`, `minimum_intercompany_sales`, `minimum_sales_price_to_customer`, `acc`, `acc_factor`, `extra_engineering_hours`) VALUES ('"+complexities_id+"','"+product_design_id+"', '"+rfq_lines_id+"', '"+material_cost+"', '"+labor_cost+"', '"+labor_hours+"', '"+extra_engineering_cost+"', '"+dcp+"', '"+cost_packaging+"', '"+packaging_cost_transformer+"', '"+extra_packaging_costs_build_of_parts+"', '"+packaging+"', '"+engineering_overheads+"', '"+plant_overheads+"', '"+site_overheads+"', '"+regional_overheads+"', '"+product_line_overheads+"', '"+corporate_overheads+"', '"+depreciation+"', '"+overheads+"', '"+frieght_f_term+"', '"+friegth_c_term+"', '"+friegth_d_term+"', '"+transport+"', '"+financial_cost_loc+"', '"+financial_cost_bonds+"', '"+maintenance_equipment+"', '"+administrative_cost_various+"', '"+extra_documentation_required+"', '"+supervision+"', '"+erection_comm+"', '"+factory_training+"', '"+onsite_training+"', '"+warranty_on_full_cost+"', '"+extra_cost+"', '"+full_cost_excluding_commision+"', '"+ebit_percentage+"', '"+ebit+"', '"+commission_on_net_sales_price+"', '"+commission_on_f_term+"', '"+commission_on_gross_sales+"', '"+commission+"', '"+minimum_intercompany_sales+"', '"+minimum_sales_price_to_customer+"', '"+acc+"', '"+acc_factor+"', '"+extra_engineering_hours+"')";
																																	connection.query(insert_sales_price_query, function(err, calc_sales_price_insert){
																																		if(err){
																																			done(err);
																																		}
																																		else{
																																			done();
																																		}
																																	});
																																}
																																else{
																																	done();
																																}
																															}
																														});
																													}
																												});
																											}
																										});
																									}
																								});
																							}, function(err){
																								if(err){
																									done(err);
																								}
																								else{
																									var sales_price_query="SELECT * FROM `rfq_lines_calculated_sales_price` WHERE `rfq_lines_id`='"+line_item_id_1+"'";
																									console.log(sales_price_query);
																									connection.query(sales_price_query, function(err, line_sales_price){
																										if(err){
																											done(err);
																										}
																										else{
																											if(line_sales_price.length>0){
																												var complexities_id = line_sales_price[0].complexities_id;
																												var product_design_id = line_sales_price[0].product_design_id;
																												var rfq_lines_id = new_rfq_lines_id;
																												var material_cost = line_sales_price[0].material_cost;
																												var labor_cost = line_sales_price[0].labor_cost;
																												var labor_hours = line_sales_price[0].labor_hours;
																												var extra_engineering_cost = line_sales_price[0].extra_engineering_cost;
																												var dcp = line_sales_price[0].dcp;
																												var cost_packaging = line_sales_price[0].cost_packaging;
																												var packaging_cost_transformer = line_sales_price[0].packaging_cost_transformer;
																												var extra_packaging_costs_build_of_parts = line_sales_price[0].extra_packaging_costs_build_of_parts;
																												var packaging = line_sales_price[0].packaging;
																												var engineering_overheads = line_sales_price[0].engineering_overheads;
																												var plant_overheads = line_sales_price[0].plant_overheads;
																												var site_overheads = line_sales_price[0].site_overheads;
																												var regional_overheads = line_sales_price[0].regional_overheads;
																												var product_line_overheads = line_sales_price[0].product_line_overheads;
																												var corporate_overheads = line_sales_price[0].corporate_overheads;
																												var depreciation = line_sales_price[0].depreciation;
																												var overheads = line_sales_price[0].overheads;
																												var frieght_f_term = line_sales_price[0].frieght_f_term;
																												var friegth_c_term = line_sales_price[0].friegth_c_term;
																												var friegth_d_term = line_sales_price[0].friegth_d_term;
																												var transport = line_sales_price[0].transport;
																												var financial_cost_loc = line_sales_price[0].financial_cost_loc;
																												var financial_cost_bonds = line_sales_price[0].financial_cost_bonds;
																												var maintenance_equipment = line_sales_price[0].maintenance_equipment;
																												var administrative_cost_various = line_sales_price[0].administrative_cost_various;
																												var extra_documentation_required = line_sales_price[0].extra_documentation_required;
																												var supervision = line_sales_price[0].supervision;
																												var erection_comm = line_sales_price[0].erection_comm;
																												var factory_training = line_sales_price[0].factory_training;
																												var onsite_training = line_sales_price[0].onsite_training;
																												var warranty_on_full_cost = line_sales_price[0].warranty_on_full_cost;
																												var extra_cost = line_sales_price[0].extra_cost;
																												var full_cost_excluding_commision = line_sales_price[0].full_cost_excluding_commision;
																												var ebit_percentage = line_sales_price[0].ebit_percentage;
																												var ebit = line_sales_price[0].ebit;
																												var commission_on_net_sales_price = line_sales_price[0].commission_on_net_sales_price;
																												var commission_on_f_term = line_sales_price[0].commission_on_f_term;
																												var commission_on_gross_sales = line_sales_price[0].commission_on_gross_sales;
																												var commission = line_sales_price[0].commission;
																												var minimum_intercompany_sales = line_sales_price[0].minimum_intercompany_sales;
																												var minimum_sales_price_to_customer = line_sales_price[0].minimum_sales_price_to_customer;
																												var acc = line_sales_price[0].acc;
																												var acc_factor = line_sales_price[0].acc_factor;
																												var extra_engineering_hours = line_sales_price[0].extra_engineering_hours;

																												var insert_sales_price_query="INSERT INTO `rfq_lines_calculated_sales_price`(`complexities_id`, `product_design_id`, `rfq_lines_id`, `material_cost`, `labor_cost`, `labor_hours`, `extra_engineering_cost`, `dcp`, `cost_packaging`, `packaging_cost_transformer`, `extra_packaging_costs_build_of_parts`, `packaging`, `engineering_overheads`, `plant_overheads`, `site_overheads`, `regional_overheads`, `product_line_overheads`, `corporate_overheads`, `depreciation`, `overheads`, `frieght_f_term`, `friegth_c_term`, `friegth_d_term`, `transport`, `financial_cost_loc`, `financial_cost_bonds`, `maintenance_equipment`, `administrative_cost_various`, `extra_documentation_required`, `supervision`, `erection_comm`, `factory_training`, `onsite_training`, `warranty_on_full_cost`, `extra_cost`, `full_cost_excluding_commision`, `ebit_percentage`, `ebit`, `commission_on_net_sales_price`, `commission_on_f_term`, `commission_on_gross_sales`, `commission`, `minimum_intercompany_sales`, `minimum_sales_price_to_customer`, `acc`, `acc_factor`, `extra_engineering_hours`) VALUES ('"+complexities_id+"','"+product_design_id+"', '"+rfq_lines_id+"', '"+material_cost+"', '"+labor_cost+"', '"+labor_hours+"', '"+extra_engineering_cost+"', '"+dcp+"', '"+cost_packaging+"', '"+packaging_cost_transformer+"', '"+extra_packaging_costs_build_of_parts+"', '"+packaging+"', '"+engineering_overheads+"', '"+plant_overheads+"', '"+site_overheads+"', '"+regional_overheads+"', '"+product_line_overheads+"', '"+corporate_overheads+"', '"+depreciation+"', '"+overheads+"', '"+frieght_f_term+"', '"+friegth_c_term+"', '"+friegth_d_term+"', '"+transport+"', '"+financial_cost_loc+"', '"+financial_cost_bonds+"', '"+maintenance_equipment+"', '"+administrative_cost_various+"', '"+extra_documentation_required+"', '"+supervision+"', '"+erection_comm+"', '"+factory_training+"', '"+onsite_training+"', '"+warranty_on_full_cost+"', '"+extra_cost+"', '"+full_cost_excluding_commision+"', '"+ebit_percentage+"', '"+ebit+"', '"+commission_on_net_sales_price+"', '"+commission_on_f_term+"', '"+commission_on_gross_sales+"', '"+commission+"', '"+minimum_intercompany_sales+"', '"+minimum_sales_price_to_customer+"', '"+acc+"', '"+acc_factor+"', '"+extra_engineering_hours+"')";
																												connection.query(insert_sales_price_query, function(err, calc_sales_price_insert){
																													if(err){
																														done(err);
																													}
																													else{
																														done();
																													}
																												});
																											}
																											else{
																												done();
																											}
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
															});
														},
														function(err){
															if(err){
																done(err);
															}
															else{
																var query="select * from `rfq_lines` where `rfq_id`='"+req.body.rfq_id+"' and has_variant='0' and `variant_to`='0'";
																connection.query(query, function(err, line_info){
																	if(err){
																		done(err);
																	}
																	else{
																		async.each(line_info, function(items, done){
																			var line_item_id = items.id;
																			var product_lines_id = items.product_lines_id;
																			var plants_id = items.plants_id;
																			var rfq_id = new_rfq_id;
																			var number_of_units = items.number_of_units;
																			try{
																				items.req_delivery_date=moment(new Date(items.req_delivery_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
																			}catch(ex) {
																				items.req_delivery_date = '0000-00-00 00:00:00';
																			}
																			var req_delivery_date = items.req_delivery_date;
																			var rfq_line_status = items.rfq_line_status;
																			var product_designs_id = items.product_designs_id;
																			var material_code = items.material_code;
																			var material_cost = items.material_cost;
																			var labour_cost = items.labour_cost;
																			var no_of_labour_hours = items.no_of_labour_hours;
																			var sales_price = items.sales_price;
																			var confirmed_delivery_date = items.confirmed_delivery_date;
																			var minimum_sales_price = items.minimum_sales_price;
																			var rfq_lines_calculated_sales_price_id = items.rfq_lines_calculated_sales_price_id;
																			var variant_to = 0;
																			var has_variant = 0;
																			var new_rfq_lines_id =0;
																			var q1="INSERT INTO `rfq_lines` (`product_lines_id`, `plants_id`, `rfq_id`, `number_of_units`, `req_delivery_date`, `rfq_line_status`, `product_designs_id`, `material_code`, `material_cost`, `labour_cost`, `no_of_labour_hours`, `sales_price`, `confirmed_delivery_date`, `minimum_sales_price`, `rfq_lines_calculated_sales_price_id`, `variant_to`, `has_variant`) VALUES('"+product_lines_id+"', '"+plants_id+"', '"+rfq_id+"', '"+number_of_units+"', '"+req_delivery_date+"', '"+rfq_line_status+"', '"+product_designs_id+"', '"+material_code+"', '"+material_cost+"', '"+labour_cost+"', '"+no_of_labour_hours+"', '"+sales_price+"', '"+confirmed_delivery_date+"', '"+minimum_sales_price+"', '"+rfq_lines_calculated_sales_price_id+"', '"+variant_to+"', '"+has_variant+"')";
																			connection.query(q1, function(err, item_insert){
																				if(err){
																					done(err);
																				}
																				else{
																					new_rfq_lines_id = item_insert.insertId;
																					var spec_query="select * from `rfq_lines_technical_specs` where `rfq_lines_id`='"+line_item_id+"'";
																					connection.query(spec_query, function(err, tech_spacs) {
																						if (err) {
																							done(err);
																						}
																						else{
																							async.each(tech_spacs, function(specs, done){
																								var tech_insert_query = "INSERT INTO `rfq_lines_technical_specs`(`rfq_lines_id`, `product_properties_id`, `value`, `remark`) VALUES ('"+new_rfq_lines_id+"','"+specs.product_properties_id+"','"+specs.value+"','"+specs.remark+"')";
																								connection.query(tech_insert_query, function(err, info_tech_insert){
																									if(err){
																										done(err);
																									}
																									else{
																										done();
																									}
																								});
																							}, function(err){
																								if(err){
																									done(err);
																								}
																								else{
																									var sales_price_query="SELECT * FROM `rfq_lines_calculated_sales_price` WHERE `rfq_lines_id`='"+line_item_id+"'";
																									connection.query(sales_price_query, function(err, line_sales_price){
																										if(err){
																											done(err);
																										}
																										else{
																											var complexities_id = line_sales_price[0].complexities_id;
																											var product_design_id = line_sales_price[0].product_design_id;
																											var rfq_lines_id = new_rfq_lines_id;
																											var material_cost = line_sales_price[0].material_cost;
																											var labor_cost = line_sales_price[0].labor_cost;
																											var labor_hours = line_sales_price[0].labor_hours;
																											var extra_engineering_cost = line_sales_price[0].extra_engineering_cost;
																											var dcp = line_sales_price[0].dcp;
																											var cost_packaging = line_sales_price[0].cost_packaging;
																											var packaging_cost_transformer = line_sales_price[0].packaging_cost_transformer;
																											var extra_packaging_costs_build_of_parts = line_sales_price[0].extra_packaging_costs_build_of_parts;
																											var packaging = line_sales_price[0].packaging;
																											var engineering_overheads = line_sales_price[0].engineering_overheads;
																											var plant_overheads = line_sales_price[0].plant_overheads;
																											var site_overheads = line_sales_price[0].site_overheads;
																											var regional_overheads = line_sales_price[0].regional_overheads;
																											var product_line_overheads = line_sales_price[0].product_line_overheads;
																											var corporate_overheads = line_sales_price[0].corporate_overheads;
																											var depreciation = line_sales_price[0].depreciation;
																											var overheads = line_sales_price[0].overheads;
																											var frieght_f_term = line_sales_price[0].frieght_f_term;
																											var friegth_c_term = line_sales_price[0].friegth_c_term;
																											var friegth_d_term = line_sales_price[0].friegth_d_term;
																											var transport = line_sales_price[0].transport;
																											var financial_cost_loc = line_sales_price[0].financial_cost_loc;
																											var financial_cost_bonds = line_sales_price[0].financial_cost_bonds;
																											var maintenance_equipment = line_sales_price[0].maintenance_equipment;
																											var administrative_cost_various = line_sales_price[0].administrative_cost_various;
																											var extra_documentation_required = line_sales_price[0].extra_documentation_required;
																											var supervision = line_sales_price[0].supervision;
																											var erection_comm = line_sales_price[0].erection_comm;
																											var factory_training = line_sales_price[0].factory_training;
																											var onsite_training = line_sales_price[0].onsite_training;
																											var warranty_on_full_cost = line_sales_price[0].warranty_on_full_cost;
																											var extra_cost = line_sales_price[0].extra_cost;
																											var full_cost_excluding_commision = line_sales_price[0].full_cost_excluding_commision;
																											var ebit_percentage = line_sales_price[0].ebit_percentage;
																											var ebit = line_sales_price[0].ebit;
																											var commission_on_net_sales_price = line_sales_price[0].commission_on_net_sales_price;
																											var commission_on_f_term = line_sales_price[0].commission_on_f_term;
																											var commission_on_gross_sales = line_sales_price[0].commission_on_gross_sales;
																											var commission = line_sales_price[0].commission;
																											var minimum_intercompany_sales = line_sales_price[0].minimum_intercompany_sales;
																											var minimum_sales_price_to_customer = line_sales_price[0].minimum_sales_price_to_customer;
																											var acc = line_sales_price[0].acc;
																											var acc_factor = line_sales_price[0].acc_factor;
																											var extra_engineering_hours = line_sales_price[0].extra_engineering_hours;

																											var insert_sales_price_query="INSERT INTO `rfq_lines_calculated_sales_price`(`complexities_id`, `product_design_id`, `rfq_lines_id`, `material_cost`, `labor_cost`, `labor_hours`, `extra_engineering_cost`, `dcp`, `cost_packaging`, `packaging_cost_transformer`, `extra_packaging_costs_build_of_parts`, `packaging`, `engineering_overheads`, `plant_overheads`, `site_overheads`, `regional_overheads`, `product_line_overheads`, `corporate_overheads`, `depreciation`, `overheads`, `frieght_f_term`, `friegth_c_term`, `friegth_d_term`, `transport`, `financial_cost_loc`, `financial_cost_bonds`, `maintenance_equipment`, `administrative_cost_various`, `extra_documentation_required`, `supervision`, `erection_comm`, `factory_training`, `onsite_training`, `warranty_on_full_cost`, `extra_cost`, `full_cost_excluding_commision`, `ebit_percentage`, `ebit`, `commission_on_net_sales_price`, `commission_on_f_term`, `commission_on_gross_sales`, `commission`, `minimum_intercompany_sales`, `minimum_sales_price_to_customer`, `acc`, `acc_factor`, `extra_engineering_hours`) VALUES ('"+complexities_id+"','"+product_design_id+"', '"+rfq_lines_id+"', '"+material_cost+"', '"+labor_cost+"', '"+labor_hours+"', '"+extra_engineering_cost+"', '"+dcp+"', '"+cost_packaging+"', '"+packaging_cost_transformer+"', '"+extra_packaging_costs_build_of_parts+"', '"+packaging+"', '"+engineering_overheads+"', '"+plant_overheads+"', '"+site_overheads+"', '"+regional_overheads+"', '"+product_line_overheads+"', '"+corporate_overheads+"', '"+depreciation+"', '"+overheads+"', '"+frieght_f_term+"', '"+friegth_c_term+"', '"+friegth_d_term+"', '"+transport+"', '"+financial_cost_loc+"', '"+financial_cost_bonds+"', '"+maintenance_equipment+"', '"+administrative_cost_various+"', '"+extra_documentation_required+"', '"+supervision+"', '"+erection_comm+"', '"+factory_training+"', '"+onsite_training+"', '"+warranty_on_full_cost+"', '"+extra_cost+"', '"+full_cost_excluding_commision+"', '"+ebit_percentage+"', '"+ebit+"', '"+commission_on_net_sales_price+"', '"+commission_on_f_term+"', '"+commission_on_gross_sales+"', '"+commission+"', '"+minimum_intercompany_sales+"', '"+minimum_sales_price_to_customer+"', '"+acc+"', '"+acc_factor+"', '"+extra_engineering_hours+"')";
																											connection.query(insert_sales_price_query, function(err, calc_sales_price_insert){
																												if(err){
																													done(err);
																												}
																												else{
																													done();
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

																		}, function(err){
																			if(err){
																				done(err);
																			}
																			else{
																				res.json({"statusCode": 200, "success":"true", "message": "validity RFQ extended successfully"})
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
							});
						}
					});
				}
			});
		}
	});
};
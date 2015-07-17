var moment = require('moment');
var async = require('async');
exports.followup_archive_quote = function(req, res){
	connection.query("SELECT * FROM `organization_users` WHERE `id`='"+req.params.user_id+"' AND `sysadmin`='1'", function(err, admin){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			if(admin.length>0){
				var query="SELECT DISTINCT `rfq`.`id` , `rfq`.`document_no`, `rfq`.`rfq_status_id`,  `rfq`.`version_no`,  `rfq`.`date_rfq_in`,  `rfq`.`requested_quotation_date`, `customers`.`name` FROM  `rfq` LEFT JOIN `customers` ON `rfq`.`customers_id`=`customers`.`id`, `organization_users` WHERE  `rfq`.`rfq_status_id` IN  (3,7) AND `organization_users`.`id`='"+req.params.user_id+"' ORDER BY  `rfq`.`created_at` asc";

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
				connection.query("SELECT * FROM `sales_hubs` WHERE `head_id`='"+req.params.user_id+"' LIMIT 1", function(err, info){
					if(err){
						console.log(err);
						res.json({"statusCode": 500, "success":"false", "message": "internal error"});
					}
					else{
						if(info.length>0){

							var query="SELECT DISTINCT `rfq`.`id` , `rfq`.`document_no`, `rfq`.`rfq_status_id`,  `rfq`.`version_no`,  `rfq`.`date_rfq_in`,  `rfq`.`requested_quotation_date`, `customers`.`name` FROM  `rfq` LEFT JOIN `customers` ON `rfq`.`customers_id`=`customers`.`id` INNER JOIN  `organization_users` ON  `rfq`.`sales_hub_id` =  `organization_users`.`sales_hubs_id` WHERE  `rfq`.`rfq_status_id` IN (3,7) AND `organization_users`.`id`='"+req.params.user_id+"' AND (`created_by`='"+req.params.user_id+"' OR `rfq`.`sales_person_id`='"+req.params.user_id+"') ORDER BY  `rfq`.`created_at` asc";

							connection.query(query, function(err, rfq){
								if(err){
									res.json({"statusCode":500, "success":"false", "message":"internal error"});
								}
								else{
									res.json({"statusCode": 200, "success":"true", "message": "", "rfq":rfq});
								}
							});
						}
						else{
							var query="SELECT DISTINCT `rfq`.`id`, `rfq`.`document_no`, `rfq`.`rfq_status_id`,  `rfq`.`version_no`,  `rfq`.`date_rfq_in`,  `rfq`.`requested_quotation_date`, `customers`.`name` FROM  `rfq` LEFT JOIN `customers` ON `rfq`.`customers_id`=`customers`.`id` INNER JOIN  `organization_users` ON  `rfq`.`tendering_teams_id` =  `organization_users`.`tendering_teams_id` WHERE  `rfq`.`rfq_status_id` IN (3,7) AND `organization_users`.`id`='"+req.params.user_id+"' AND `rfq`.`tendering_teams_id`=(SELECT `tendering_teams_id` FROM `organization_users` WHERE `id`='"+req.params.user_id+"') ORDER BY  `rfq`.`created_at` asc";
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
};

exports.followup_onhold_quote = function(req, res){
	connection.query("SELECT * FROM `organization_users` WHERE `id`='"+req.params.user_id+"' AND `sysadmin`='1'", function(err, admin){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			if(admin.length>0){
				var query="SELECT DISTINCT `rfq`.`id` , `rfq`.`document_no`, `rfq`.`rfq_status_id`,  `rfq`.`version_no`,  `rfq`.`date_rfq_in`,  `rfq`.`requested_quotation_date`, `customers`.`name` FROM  `rfq` LEFT JOIN `customers` ON `rfq`.`customers_id`=`customers`.`id`, `organization_users` WHERE  `rfq`.`rfq_status_id` = 9 AND `organization_users`.`id`='"+req.params.user_id+"' ORDER BY  `rfq`.`created_at` asc";

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
				connection.query("SELECT * FROM `sales_hubs` WHERE `head_id`='"+req.params.user_id+"' LIMIT 1", function(err, info){
					if(err){
						console.log(err);
						res.json({"statusCode": 500, "success":"false", "message": "internal error"});
					}
					else{
						if(info.length>0){

							var query="SELECT DISTINCT `rfq`.`id` , `rfq`.`document_no`, `rfq`.`rfq_status_id`,  `rfq`.`version_no`,  `rfq`.`date_rfq_in`,  `rfq`.`requested_quotation_date`, `customers`.`name` FROM  `rfq` LEFT JOIN `customers` ON `rfq`.`customers_id`=`customers`.`id` INNER JOIN  `organization_users` ON  `rfq`.`sales_hub_id` =  `organization_users`.`sales_hubs_id` WHERE  `rfq`.`rfq_status_id`= 9 AND `organization_users`.`id`='"+req.params.user_id+"' AND (`created_by`='"+req.params.user_id+"' OR `rfq`.`sales_person_id`='"+req.params.user_id+"') ORDER BY  `rfq`.`created_at` asc";

							connection.query(query, function(err, rfq){
								if(err){
									res.json({"statusCode":500, "success":"false", "message":"internal error"});
								}
								else{
									res.json({"statusCode": 200, "success":"true", "message": "", "rfq":rfq});
								}
							});
						}
						else{
							var query="SELECT DISTINCT `rfq`.`id`, `rfq`.`document_no`, `rfq`.`rfq_status_id`,  `rfq`.`version_no`,  `rfq`.`date_rfq_in`,  `rfq`.`requested_quotation_date`, `customers`.`name` FROM  `rfq` LEFT JOIN `customers` ON `rfq`.`customers_id`=`customers`.`id` INNER JOIN  `organization_users` ON  `rfq`.`tendering_teams_id` =  `organization_users`.`tendering_teams_id` WHERE  `rfq`.`rfq_status_id`= 9 AND `organization_users`.`id`='"+req.params.user_id+"' AND `rfq`.`tendering_teams_id`=(SELECT `tendering_teams_id` FROM `organization_users` WHERE `id`='"+req.params.user_id+"') ORDER BY  `rfq`.`created_at` asc";
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
};

exports.followup_archive_quote_copy = function(req, res){
	var query="SELECT * FROM `rfq` WHERE `id`='"+req.body.rfq_id+"'";
	connection.query(query, function(err, info){
		if(err){
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			if(info[0].date_rfq_in!="0000-00-00 00:00:00"){
				info[0].date_rfq_in=moment(new Date(info[0].date_rfq_in).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
			}
			else{
				info[0].date_rfq_in="0000-00-00 00:00:00";
			}
			if(info[0].requested_quotation_date!="0000-00-00 00:00:00"){
				info[0].requested_quotation_date=moment(new Date(info[0].requested_quotation_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
			}
			else{
				info[0].requested_quotation_date="0000-00-00 00:00:00";
			}
			query="INSERT INTO `rfq` (`sales_hub_id`, `sales_person_id`, `customers_id`, `sales_segments_id`, `sales_agents_id`, `tendering_teams_id`, `product_lines_id`, `tendering_teams_members_id`, `rejection_remarks_id`, `lost_remarks_id`, `type_of_quote_id`, `project_name`, `date_rfq_in`, `customer_country`, `installation_country`, `rfq_status_id`, `probability_id`, `requested_quotation_date`, `created_by`, `strategic_quote`, `channel_to_market_id`, `is_bid`, `sales_rejection_remarks_id`, `customer_reference`) VALUES( '"+info[0].sales_hub_id+"', '"+info[0].sales_person_id+"', '"+info[0].customers_id+"', '"+info[0].sales_segments_id+"', '"+info[0].sales_agents_id+"', '"+info[0].tendering_teams_id+"', '"+info[0].product_lines_id+"', '"+info[0].tendering_teams_members_id+"', '"+info[0].rejection_remarks_id+"', '"+info[0].lost_remarks_id+"', '"+info[0].type_of_quote_id+"', '"+info[0].project_name+"', '"+info[0].date_rfq_in+"', '"+info[0].customer_country+"', '"+info[0].installation_country+"', '1', '"+info[0].probability_id+"', '"+info[0].requested_quotation_date+"', '"+req.body.user_id+"', '"+info[0].strategic_quote+"', '"+info[0].channel_to_market_id+"', '"+info[0].is_bid+"', '"+info[0].sales_rejection_remarks_id+"', '"+info[0].customer_reference+"')";

			connection.query(query, function(err, rfq){
				if(err){
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					var new_rfq_id=rfq.insertId;
					connection.query("SELECT r.id, r.version_no, r.document_no, EXTRACT(YEAR FROM `r`.`created_at`) as year, c.iso_code, pl.id as product_lines_id, pl.name FROM rfq r JOIN countries c ON r.customer_country=c.id JOIN product_lines pl ON r.product_lines_id=pl.id WHERE r.id='"+new_rfq_id+"'", function(err, rfq_detail){
						if(err){
							res.json({"statusCode":500, "success": "false", "message": "internal error"});
						}
						else{
							var document_no="";
							var version_no="1.0";

								var country=rfq_detail[0].iso_code;
								var year=""+rfq_detail[0].year;
								year=year.toString();
								year=year[2]+year[3];
								var number=rfq_detail[0].id;
								var product_line=rfq_detail[0].product_lines_id;
								var product_line_name="";
								var rfq_id=rfq_detail[0].id;
								if(product_line==1){
									product_line_name="D";
								}
								if(product_line==2){
									product_line_name="P";
								}
								document_no=country+year+product_line_name+number+"/"+version_no;

							connection.query("UPDATE `rfq` SET `version_no`='"+version_no+"', `document_no`='"+document_no+"' WHERE id='"+new_rfq_id+"'", function(err, info_tech){
								if(err){
									res.json({"statusCode":500, "success": "false", "message": "internal error"});
								}
								else{
									//var new_rfq_id=new_rfq.insertId;
									var rfq_lines_query="select * from `rfq_lines` where `rfq_id`='"+req.body.rfq_id+"' and has_variant='1'";
									var async = require("async");
									connection.query(rfq_lines_query, function(err, line_items){
										if(err){
											console.log(err);
											res.json({"statusCode": 500, "success":"false", "message": "internal error"});
										}
										else{
											var line_item_id=0;
											async.each(line_items, function(items, done){
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
																						//var q2="INSERT INTO `rfq_lines` (`product_lines_id`, `plants_id`, `rfq_id`, `number_of_units`, `req_delivery_date`, `rfq_line_status`, `product_designs_id`, `material_code`, `material_cost`, `labour_cost`, `no_of_labour_hours`, `sales_price`, `confirmed_delivery_date`, `minimum_sales_price`, `rfq_lines_calculated_sales_price_id`, `variant_to`, `has_variant`) VALUES('"+product_lines_id+"', '"+plants_id+"', '"+rfq_id+"', '"+number_of_units+"', '"+req_delivery_date+"', '"+rfq_line_status+"', '"+product_designs_id+"', '"+material_code+"', '"+material_cost+"', '"+labour_cost+"', '"+no_of_labour_hours+"', '"+sales_price+"', '"+confirmed_delivery_date+"', '"+minimum_sales_price+"', '"+rfq_lines_calculated_sales_price_id+"', '"+variant_to+"', '"+has_variant+"')";
																						var q2="INSERT INTO `rfq_lines` (`product_lines_id`, `plants_id`, `rfq_id`, `number_of_units`, `req_delivery_date`, `variant_to`, `has_variant`) VALUES('"+product_lines_id+"', '"+plants_id+"', '"+rfq_id+"', '"+number_of_units+"', '"+req_delivery_date+"', '"+variant_to+"', '"+has_variant+"')";
																						connection.query(q2, function(err, variant_line_insert){
																							if(err){
																								done(err);
																							}
																							else{
																								//var new_rfq_lines_id = variant_line_insert.insertId;
																								//console.log(new_rfq_lines_id);
																								var spec_query="select * from `rfq_lines_technical_specs` where `rfq_lines_id`='"+line_item_id+"'";
																								connection.query(spec_query, function(err, tech_spacs) {
																									if (err) {
																										done(err);
																									}
																									else{
																										new_rfq_lines_id = variant_line_insert.insertId;
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
																												done();
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
																	//var product_designs_id = items.product_designs_id;
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
																	var q1="INSERT INTO `rfq_lines` (`product_lines_id`, `plants_id`, `rfq_id`, `number_of_units`, `req_delivery_date`, `variant_to`, `has_variant`) VALUES('"+product_lines_id+"', '"+plants_id+"', '"+rfq_id+"', '"+number_of_units+"', '"+req_delivery_date+"', '"+variant_to+"', '"+has_variant+"')";
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
																							done();
																						}
																					});
																				}
																			});
																		}
																	});

																}, function(err){
																	if(err){
																		res.json({"statusCode":500, "success": "false", "message": "internal error"});
																	}
																	else{
																		res.json({"statusCode": 200, "success":"true", "message": "RFQ Copy Generated Successfully"});
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


exports.status_update = function(req, res){
	var query="SELECT `id`, `name` FROM `rfq_status`";
	connection.query(query, function(err, rfq_status){
		if(err){
			res.json({"statusCode": 500, "success": "false", "message":"internal error"});
		}
		else{
			
		}
	});
};
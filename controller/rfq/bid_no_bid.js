var moment = require('moment');
exports.ready_rfq_bid = function(req, res){
	connection.query("SELECT * FROM `organization_users` WHERE `id`='"+req.params.user_id+"' AND `sysadmin`='1'", function(err, admin){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			if(admin.length>0){
				query="SELECT `rfq`.`id`, `rfq`.`document_no`, `rfq`.`version_no`, `rfq`.`date_rfq_in`, `rfq`.`sales_agents_id`, `agent`.`name` as ` sales_agent_name`, `customers`.`name` as `customer_name`, `organization_users`.`full_name` as `sales_person_name` FROM `rfq` LEFT JOIN `sales_agents` `agent` ON `rfq`.`sales_agents_id`=`agent`.`id` LEFT JOIN `customers` ON `customers`.`id`=`rfq`.`customers_id` LEFT JOIN `organization_users` on `organization_users`.`id`=`rfq`.`sales_person_id` WHERE `rfq`.`rfq_status_id`='2' ORDER BY `rfq`.`updated_at` desc";
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
				query="SELECT `rfq`.`id`, `rfq`.`document_no`, `rfq`.`version_no`, `rfq`.`date_rfq_in`, `rfq`.`sales_agents_id`, `agent`.`name` as ` sales_agent_name`, `customers`.`name` as `customer_name`, `organization_users`.`full_name` as `sales_person_name` FROM `rfq` LEFT JOIN `sales_agents` `agent` ON `rfq`.`sales_agents_id`=`agent`.`id` LEFT JOIN `customers` ON `customers`.`id`=`rfq`.`customers_id` LEFT JOIN `organization_users` on `organization_users`.`id`=`rfq`.`sales_person_id` WHERE `rfq`.`rfq_status_id`='2' AND (`created_by`='"+req.params.user_id+"' OR `rfq`.`sales_person_id`='"+req.params.user_id+"' OR (`rfq`.`tendering_teams_id`=(SELECT `tendering_teams_id` FROM `organization_users` WHERE `id`='"+req.params.user_id+"' LIMIT 1) AND `rfq`.`tendering_teams_id`!='0')) ORDER BY `rfq`.`updated_at` desc";
				connection.query(query, function(err, rfq) {
					if(err){
						console.log(err);
							res.json({"statusCode": 500, "success":"false", "message": "internal error"});
					}
					else{
						res.json({"statusCode": 200, "success":"true", "message": "", "rfq":rfq});
					}
				});
				// connection.query("select * from `sales_hubs` where `head_id`='"+req.params.user_id+"' LIMIT 1", function(err, info){
				// 	if(err){
				// 		console.log(err);
				// 		res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				// 	}
				// 	else{
				// 		if(info.length>0){
				// 			query="SELECT `rfq`.`id`, `rfq`.`document_no`, `rfq`.`version_no`, `rfq`.`date_rfq_in`, `rfq`.`sales_agents_id`, `agent`.`name` FROM `rfq` LEFT JOIN `sales_agents` `agent` ON `rfq`.`sales_agents_id`=`agent`.`id` WHERE `rfq_status_id`='2' AND (`rfq`.`sales_hub_id`='"+info[0].id+"' OR `created_by`='"+req.params.user_id+"' OR `sales_person_id`='"+req.params.user_id+"') ORDER BY rfq.updated_at desc";
				// 			connection.query(query, function(err, rfq) {
				// 				if(err){
				// 					console.log(err);
				// 						res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				// 				}
				// 				else{
				// 					res.json({"statusCode": 200, "success":"true", "message": "", "rfq":rfq});
				// 				}
				// 			});
				// 		}
				// 		else{
				// 			query="SELECT `rfq`.`id`, `rfq`.`document_no`, `rfq`.`version_no`, `rfq`.`date_rfq_in`, `rfq`.`sales_agents_id`, `agent`.`name` FROM `rfq` LEFT JOIN `sales_agents` `agent` ON `rfq`.`sales_agents_id`=`agent`.`id` WHERE `rfq_status_id`='2' AND (`created_by`='"+req.params.user_id+"' OR `sales_person_id`='"+req.params.user_id+"') ORDER BY `rfq`.`updated_at` desc";
				// 			connection.query(query, function(err, rfq) {
				// 				if(err){
				// 					console.log(err);
				// 						res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				// 				}
				// 				else{
				// 					res.json({"statusCode": 200, "success":"true", "message": "", "rfq":rfq});
				// 				}
				// 			});
				// 		}
				// 	}
				// });
			}
		}
	});
};
exports.ready_rfq_bid_detail = function(req, res){
	connection.query("SELECT `rfq`.`id`, `rfq`.`document_no`, `rfq`.`version_no`, `rfq`.`requested_quotation_date`, `rfq`.`is_bid`, `rejection_remarks`.`description` as `rejection_remarks_name` FROM `rfq` LEFT JOIN `rejection_remarks` ON `rejection_remarks`.`id`=`rfq`.`sales_rejection_remarks_id` WHERE `rfq`.`rfq_status_id`='2' AND `rfq`.`id`='"+req.params.rfq_id+"'", function(err, rfq) {
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			connection.query("SELECT  `rfq_questions`.`id` ,  `rfq_questions`.`question`, `rfq_lines_questions`.`rfq_id`, `rfq_lines_questions`.`question_value` FROM  `rfq_questions` LEFT JOIN  `rfq_lines_questions` ON `rfq_lines_questions`. `rfq_id` =  '"+req.params.rfq_id+"' AND  `rfq_questions`.`id` =  `rfq_lines_questions`.`rfq_questions_id`", function(err, rfq_questions) {
				if(err){
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					res.json({"statusCode": 200, "success":"true", "message": "", "rfq":rfq, "rfq_questions": rfq_questions});
				}
			});
		}
	});
};

exports.save_rfq_questions = function(req, res){
	connection.query("DELETE FROM `rfq_lines_questions` WHERE `rfq_id`='"+req.body.rfq_id+"'", function(err, info){
		if(err){
			console.log(err);
			res.json({"statusCode":500, "success": "false", "message": "internal error"});
		}
		else{
			var rfq_id=req.body.rfq_id;
				var fields=["question_id", "value"];
				var query="INSERT INTO `rfq_lines_questions`(`rfq_id`, `rfq_questions_id`, `question_value`) VALUES (";
				for (var i = 0; i < req.body.questions.length; i++) {
					query=query+"'"+rfq_id+"'";
					for (var j = 0; j < fields.length; j++) {
						query=query+", '"+req.body.questions[i][fields[j]]+"'";
						if(j+1==fields.length){
							query=query+")";
						}
					}
					if(i+1<req.body.questions.length){
						query=query+", (";
					}
				}
				// console.log(query);
				connection.query(query, function(err, info){
					if(err){
						console.log(err);
						res.json({"statusCode":500, "success": "false", "message": "internal error"});
					}
					else{
						res.json({"statusCode":200, "success":"true", "message": "data insterted successfully"});
					}					
				});
		}					
	});
				
};

exports.full_rfq_detail = function(req, res){
	connection.query("SELECT rfq.id, `rfq`.`document_no`, `rfq`.`version_no`, `sales_hubs`.`name` as `sales_hub`, `ou`.`user_name` as `sales_person`, `countries`.`name` as `customer_country`, `inst_country`.`name` as `installation_country`, `customers`.`name` as `customer_name`,  `type_of_quotes`.`description` as `quote_type`, `rfq`.`project_name`, `rfq`.`date_rfq_in`, `sales_segments`.`name` as `sales_segment`, `sales_agents`.`name` as `sales_agent_name`,  `product_lines`.`name` as `product_lines_name`, `tendering_teams`.`name` as `tendering_team`, `organization_users`.user_name `tendering_team_members`, `rfq`.`requested_quotation_date`, `rfq`.`probability_id`, `probability`.`name` as `probability_name`, `probability`.`value`, `rfq`.`strategic_quote`, `channel_to_market`.`name` as `channel_to_market_name`, `rfq`.`is_bid`, `rejection_remarks`.`description` as `rejection_remarks_name`, `rfq`.`estimated_sales_price` FROM `rfq` LEFT JOIN `sales_hubs` ON `rfq`.`sales_hub_id`=`sales_hubs`.`id` LEFT JOIN `organization_users` `ou` ON `rfq`.`sales_person_id`=`ou`.`id` LEFT JOIN `customers` ON `rfq`.`customers_id`=`customers`.`id` LEFT JOIN `sales_segments` ON `rfq`.`sales_segments_id`=`sales_segments`.`id` LEFT JOIN `sales_agents` ON `rfq`.`sales_agents_id`=`sales_agents`.`id` LEFT JOIN `tendering_teams` ON `rfq`.`tendering_teams_id`=`tendering_teams`.`id` LEFT JOIN `organization_users` ON `rfq`.`tendering_teams_members_id`=`organization_users`.`id` LEFT JOIN `countries` ON `rfq`.`customer_country`=`countries`.`id` LEFT JOIN `countries` `inst_country` ON `rfq`.`installation_country`=`inst_country`.`id` LEFT JOIN `type_of_quotes` ON `rfq`.`type_of_quote_id`=`type_of_quotes`.id LEFT JOIN `product_lines` ON `rfq`.`product_lines_id`=`product_lines`.`id` LEFT JOIN `channel_to_market` ON `channel_to_market`.`id`=`rfq`.`channel_to_market_id` LEFT JOIN `rejection_remarks` ON `rejection_remarks`.`id`=`rfq`.`sales_rejection_remarks_id` LEFT JOIN `probability` ON `probability`.`id`=`rfq`.`probability_id` WHERE `rfq`.`id`='"+req.params.rfq_id+"'", function(err, rfq) {
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			connection.query("SELECT `rfq_lines`.`id`, `rfq_lines`.`product_lines_id`, `product_lines`.`name` as `product_lines_name`, `rfq_lines`.`plants_id`, `rfq_lines`.`rfq_id`, `rfq_lines`.`number_of_units`, `rfq_lines`.`req_delivery_date`, `rfq_lines`.`rfq_line_status`, `rfq_lines`.`material_code`, `rfq_lines`.`material_cost`, `rfq_lines`.`labour_cost`, `rfq_lines`.`no_of_labour_hours`, `rfq_lines`.`sales_price`, `rfq_lines`.`confirmed_delivery_date`, `rfq_lines`.`variant_to`, `rfq_lines`.`created_at`, `rfq_lines`.`updated_at`, `plants`.`name` as `plant_name` FROM `rfq_lines` LEFT JOIN `plants` ON `rfq_lines`.`plants_id`=`plants`.`id` LEFT JOIN `product_lines` ON `product_lines`.`id`=`rfq_lines`.`product_lines_id` WHERE rfq_id='"+rfq[0].id+"'", function(err, rfq_lines) {
				if(err){
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					if(rfq_lines.length>0){
						var default_estimated_sales_price = 0;
						var max_estimated_sales_price = 0;
						var async = require("async");

						//async.each();

						var not_in_id=0;


						async.each(rfq_lines, function(item, done){
								var line_query="select * from `rfq_lines` where ((rfq_lines.id='"+item.id+"' AND variant_to='0') OR rfq_lines.variant_to='"+item.id+"') AND id NOT IN ("+not_in_id+")";
								not_in_id+=", "+item.id;
								connection.query(line_query, function(err, filter_line_items){
									if(err){
										done(err);
									}
									else{
										//console.log(filter_line_items);
										async.each(filter_line_items, function(line_item, done){
												var query = "SELECT * FROM  `rfq_lines_technical_specs` WHERE `rfq_lines_id`='"+line_item.id+"'";
												connection.query(query, function(err, spec_line_item){
													if(err){
														done(err);
													}
													else{
														async.each(spec_line_item, function(specs, done){
																if(specs.product_properties_id==3 && specs.rfq_lines_id==line_item.id){
																	mva=parseInt(specs.value)/1000;
																	if(max_estimated_sales_price<(line_item.number_of_units*(mva*10000))){
																		console.log(line_item.id);
																		max_estimated_sales_price=line_item.number_of_units*(mva*10000);
																		done();
																	}
																	else{
																		done();
																	}
																	//max_estimated_sales_price=line_item.number_of_units*(mva*10000);
																	//if()
																}
																else{
																	done();
																}
															},
															function(err){
																if(err){
																	done(err);
																}
																else{
																	done();
																}
															});
													}
												});
											},
											function(err){
												if(err){
													done();
												}
												else{
													console.log(max_estimated_sales_price);
													default_estimated_sales_price+=max_estimated_sales_price;
													max_estimated_sales_price=0;
													done();
												}
											});
									}
								});
							},
							function(err){
								if(err){
									console.log(err);
									res.json({"statusCode": 500, "success":"false", "message": "internal error"});
								}
								else{
									rfq[0]["default_estimated_sales_price"]=default_estimated_sales_price;
									res.json({"statusCode": 200, "success":"true", "message": "", "rfq":rfq, "rfq_lines": rfq_lines, "rfq_lines_technical_specs": []});
								}
							});

					}
					else{
						res.json({"statusCode": 200, "success":"true", "message": "", "rfq":rfq, "rfq_lines": rfq_lines, "rfq_lines_technical_specs": []});
					}
				}
			});
		}
	});
};

exports.rfq_bid_submit = function(req, res){
	// AND `created_by`='"+req.body.user_id+"'
	connection.query("UPDATE `rfq` SET `rfq_status_id`='"+req.body.rfq_status_id+"', `estimated_sales_price`='"+req.body.estimated_sales_price+"' WHERE `id`='"+req.body.rfq_id+"'", function(err, info) {
		if(err){
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			if(req.body.estimated_sales_price>250000){
				connection.query("SELECT * FROM `rfq` WHERE `id`='"+req.body.rfq_id+"'", function(err, rfq_info) {
					if(err){
						res.json({"statusCode": 500, "success":"false", "message": "internal error"});
					}
					else{
						var mailOptions = {
						    from: "From :  ✔ <"+smtpConfig.email+">", // sender address
						    to: smtpConfig.sales_and_marketing_director_email+","+smtpConfig.pl_head_email, // list of receivers seprated by comma also
						    subject: 'Bid New RFQ ✔', // Subject line
						    text: '', // plaintext body
						    html: '<p>Bid/No Bid decision required on document '+rfq_info[0].document_no+' for an estimated value of '+req.body.estimated_sales_price+'<p>' // html body
						};
						transporter.sendMail(mailOptions, function(error, info){
						    if(error){
						        console.log(error);
						    }else{
						    	// res.json({"statusCode": 200, "success":"true", "message": "rfq submitted to tendering team"});
						    }
						});
					}
				});
			}
			// else{
				res.json({"statusCode": 200, "success":"true", "message": "rfq submitted to tendering team"});
			// }
		}
	});
};

exports.get_rejection_remarks = function(req, res){
	connection.query("SELECT `id`, `description` FROM `rejection_remarks`", function(err, rejection_remarks) {
		if(err){
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			res.json({"statusCode": 200, "success":"true", "message": "", "rejection_remarks": rejection_remarks});
		}
	});
};


exports.rfq_no_bid_submit = function(req, res){
	// AND `created_by`='"+req.body.user_id+"'
	var query="";
	if(typeof req.body.comments=="undefined"){
		query="UPDATE `rfq` SET `rfq_status_id`='"+req.body.rfq_status_id+"', `rejection_remarks_id`='"+req.body.rejection_remarks_id+"', `estimated_sales_price`='"+req.body.estimated_sales_price+"' WHERE `id`='"+req.body.rfq_id+"'";
	}
	else{
		query="UPDATE `rfq` SET `rfq_status_id`='"+req.body.rfq_status_id+"', `rejection_remarks_id`='"+req.body.rejection_remarks_id+"', `estimated_sales_price`='"+req.body.estimated_sales_price+"', `bid_no_bid_rejection_comments`='"+req.body.comments+"' WHERE `id`='"+req.body.rfq_id+"'";
	}
	connection.query(query, function(err, info) {
		if(err){
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			res.json({"statusCode": 200, "success":"true", "message": "rfq rejected successfully"});
		}
	});
};


exports.duplicateRfq = function(req, res){
	// var query="UPDATE `rfq` SET `rfq_status_id`='"+req.body.rfq_status_id+"' WHERE `id`='"+req.body.rfq_id+"'";
	// connection.query(query, function(err, quote) {
	// 	if(err){
	// 		console.log(err);
	// 		res.json({"statusCode": 500, "success":"false", "message": "internal error"});
	// 	}
	// 	else{
			query="SELECT * FROM `rfq` WHERE `id`='"+req.body.rfq_id+"'";
			connection.query(query, function(err, rfq){
				if(err){
					console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					var new_version=parseInt(rfq[0].version_no);
					// var new_version=parseInt(rfq[0].version_no)+1;
					new_version=new_version+".0";
					// var date_rfq_in=new Date(rfq[0].date_rfq_in).toISOString();
					// var mement = require('moment');
					console.log(rfq[0].quote_creation_date);
					console.log(rfq[0].date_rfq_in);
					var date_rfq_in="0000-00-00 00:00:00";
					if(rfq[0].date_rfq_in!="0000-00-00 00:00:00"){
						date_rfq_in=moment(new Date(rfq[0].date_rfq_in).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
					}
					// var quote_creation_date=moment(new Date(rfq[0].quote_creation_date).toISOString().substring(0,18), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
					// console.log(quote_creation_date);
					// var quote_submission_date=moment(new Date(rfq[0].quote_submission_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
					// var quote_validity_date=moment(new Date(rfq[0].quote_validity_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
					var requested_quotation_date="0000-00-00 00:00:00";
					if(rfq[0].requested_quotation_date!="0000-00-00 00:00:00"){
						requested_quotation_date=moment(new Date(rfq[0].requested_quotation_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
					}

					// console.log(date_rfq_in);
					// console.log(rfq[0].date_rfq_in);
					var document_part=rfq[0].document_no.split("/");
					var document_no=document_part[0]+"/"+new_version;
					// var new_version=parseInt(version_part[version_part.length-1])+1;
					var new_rfq_query="INSERT INTO `rfq` (`sales_hub_id`, `sales_person_id`, `customers_id`, `sales_segments_id`, `sales_agents_id`, `tendering_teams_id`, `product_lines_id`, `tendering_teams_members_id`, `rejection_remarks_id`, `type_of_quote_id`, `project_name`, `date_rfq_in`, `customer_country`, `installation_country`, `version_no`, `document_no`, `rfq_status_id`, `quote_creation_date`, `quote_submission_date`, `quote_validity_date`, `probability_id`, `requested_quotation_date`, `estimated_sales_price`, `created_by`, `strategic_quote`, `channel_to_market_id`, `is_bid`, `sales_rejection_remarks_id`, `sales_price`, `bid_no_bid_rejection_comments`, `customer_reference`) VALUES('"+rfq[0].sales_hub_id+"', '"+rfq[0].sales_person_id+"', '"+rfq[0].customers_id+"', '"+rfq[0].sales_segments_id+"', '"+rfq[0].sales_agents_id+"', '"+rfq[0].tendering_teams_id+"', '"+rfq[0].product_lines_id+"', '"+rfq[0].tendering_teams_members_id+"', '"+rfq[0].rejection_remarks_id+"', '"+rfq[0].type_of_quote_id+"', '"+rfq[0].project_name+"', '"+date_rfq_in+"', '"+rfq[0].customer_country+"', '"+rfq[0].installation_country+"', '"+new_version+"', '"+document_no+"', '1', '"+rfq[0].quote_creation_date+"', '"+rfq[0].quote_submission_date+"', '"+rfq[0].quote_validity_date+"', '"+rfq[0].probability_id+"', '"+requested_quotation_date+"', '"+rfq[0].estimated_sales_price+"', '"+rfq[0].created_by+"', '"+rfq[0].strategic_quote+"', '"+rfq[0].channel_to_market_id+"', '"+rfq[0].is_bid+"', '"+rfq[0].sales_rejection_remarks_id+"', '"+rfq[0].sales_price+"', '"+rfq[0].bid_no_bid_rejection_comments+"', '"+rfq[0].customer_reference+"')";
					connection.query(new_rfq_query, function(err, new_rfq){
						if(err){
							console.log(err);
							res.json({"statusCode": 500, "success":"false", "message": "internal error"});
						}
						else{
							var new_rfq_id=new_rfq.insertId;
							var rfq_lines_query="select * from `rfq_lines` where `rfq_id`='"+req.body.rfq_id+"' and has_variant='1'";
							console.log(rfq_lines_query);
							var async = require("async");
							connection.query(rfq_lines_query, function(err, line_items){
								if(err){
									console.log(err);
									res.json({"statusCode": 500, "success":"false", "message": "internal error"});
								}
								else{
									//var line_item_id=0;
									async.each(line_items, function(items, done){
											console.log("YOOYOYO");
											var line_item_id = items.id;
											var line_item_id_1 = items.id;
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
																	console.log("++++++++============++++++++++");
																	console.log(line_item_id);
																	console.log("++++++++============++++++++++");
																	var variant_rfq_lines_query="select * from `rfq_lines` where `rfq_id`='"+req.body.rfq_id+"' and variant_to='"+line_item_id+"'";
																	console.log(variant_rfq_lines_query);
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
																									//console.log(tech_insert_query);
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
																										console.log("dsdfsdfsf");
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
												console.log("asdalsdkjasdjalksdjlajsdl");
											//	same process follow for the has_variant = 0 and variant_to=0
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
																res.json({"statusCode": 200, "success":"true", "message": "new Partial RFQ created successfully"})
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
	var req_delivery_date=moment(new Date(rfq_lines[index].req_delivery_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
	var query_rfq_lines="INSERT INTO `rfq_lines` (`product_lines_id`, `plants_id`, `rfq_id`, `number_of_units`, `req_delivery_date`, `rfq_line_status`, `product_designs_id`, `material_code`, `material_cost`, `labour_cost`, `no_of_labour_hours`, `sales_price`, `confirmed_delivery_date`, `minimum_sales_price`, `rfq_lines_calculated_sales_price_id`) VALUES('"+rfq_lines[index].product_lines_id+"', '"+rfq_lines[index].plants_id+"', '"+rfq_id+"', '"+rfq_lines[index].number_of_units+"', '"+req_delivery_date+"', '"+rfq_lines[index].rfq_line_status+"', '"+rfq_lines[index].product_designs_id+"', '"+rfq_lines[index].material_code+"', '"+rfq_lines[index].material_cost+"', '"+rfq_lines[index].labour_cost+"', '"+rfq_lines[index].no_of_labour_hours+"', '"+rfq_lines[index].sales_price+"', '"+rfq_lines[index].confirmed_delivery_date+"', '"+rfq_lines[index].minimum_sales_price+"', '"+rfq_lines[index].rfq_lines_calculated_sales_price_id+"')";
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


exports.revert_to_sales = function(req, res){
	var query="SELECT `rfq`.`version_no`, `rfq`.`document_no`, `organization_users`.`email` FROM `rfq` LEFT JOIN `organization_users` ON `rfq`.`created_by`=`organization_users`.`id` WHERE `rfq`.`id`='"+req.body.rfq_id+"' limit 1";
	connection.query(query, function(err, rfq_info){
		if(err){
			res.json({"statusCode":500, "success": "false", "message": "internal error"});
		}
		else{
			console.log(rfq_info);
			var mailOptions = {
			    from: "CG Global <"+smtpConfig.email+">", // sender address
			    to: smtpConfig.sales_and_marketing_director_email+', '+rfq_info[0].email, // list of receivers seprated by comma also
			    subject: 'RFQ Revert to sales ✔', // Subject line
			    text: 'RFQ #docnr is Reverted to sales', // plaintext body
			    html: '<p>RFQ '+rfq_info[0].document_no+' is reverted to sales</p>' // html body
			};
			transporter.sendMail(mailOptions, function(error, info){
			    if(error){
			        console.log(error);
			    } else {
			    	console.log("Mail Sent");
			    	// res.json({"statusCode": 404, "success":"false", "message": "result not found", "product_designs": "[]"});
			    }
			});
		}
	});
	connection.query("UPDATE `rfq` SET `rfq_status_id`='"+req.body.rfq_status_id+"' WHERE id='"+req.body.rfq_id+"'", function(err, info_tech){
		if(err){
			res.json({"statusCode":500, "success": "false", "message": "internal error"});
		}
		else{
			res.json({"statusCode":200, "success":"true", "message":"rfq reverted successfully"});
		}
	});
};
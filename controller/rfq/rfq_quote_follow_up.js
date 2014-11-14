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
				query="SELECT `rfq`.`id`, `rfq`.`document_no`, `rfq`.`version_no`, `rfq`.`quote_submission_date`, `rfq`.`estimated_sales_price`, `rfq`.`quote_validity_date`, `rfq`.`probability_id`, `customers`.`name` FROM `rfq` LEFT JOIN `customers` ON `rfq`.`customers_id`=`customers`.`id` WHERE `rfq_status_id`='6' ORDER BY `rfq`.`quote_validity_date` asc";
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
							query="SELECT `rfq`.`id`, `rfq`.`document_no`, `rfq`.`version_no`, `rfq`.`quote_submission_date`, `rfq`.`estimated_sales_price`, `rfq`.`quote_validity_date`, `rfq`.`probability_id`, `customers`.`name` FROM `rfq` LEFT JOIN `customers` ON `rfq`.`customers_id`=`customers`.`id` WHERE `rfq_status_id`='6' AND (`rfq`.`sales_hub_id`='"+info[0].id+"' OR `created_by`='"+req.params.user_id+"') ORDER BY rfq.quote_validity_date asc";
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
							query="SELECT `rfq`.`id`, `rfq`.`document_no`, `rfq`.`version_no`, `rfq`.`quote_submission_date`, `rfq`.`estimated_sales_price`, `rfq`.`quote_validity_date`, `rfq`.`probability_id`, `customers`.`name` FROM `rfq` LEFT JOIN `customers` ON `rfq`.`customers_id`=`customers`.`id` WHERE `rfq_status_id`='6' AND (`created_by`='"+req.params.user_id+"' OR `sales_person_id`='"+req.params.user_id+"') ORDER BY `rfq`.`quote_validity_date` asc";
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
	var query="SELECT `id`, `document_no`, `version_no`, `quote_creation_date`, `quote_submission_date`, `estimated_sales_price`, `quote_validity_date`, `probability_id`, `rfq_status_id`, `sales_price`, `won_gross_sale`, `won_gross_sale`, `next_action`, `by_when` FROM `rfq` WHERE `rfq_status_id`='6' AND `id`='"+req.params.rfq_id+"'";
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
						connection.query("select sum(`sales_price`) as `minimum_sales_price` from `rfq_lines` where `rfq_id`='"+rfq[0].id+"'", function(err, rfq_lines){
							if(err){
								console.log(err);
								res.json({"statusCode": 500, "success":"false", "message": "internal error"});
							}
							else{
								rfq[0]["minimum_sales_price"]=rfq_lines[0].minimum_sales_price;
								
								connection.query("SELECT `id`, `description` FROM `lost_remarks`", function(err, rejection_remarks){
									if(err){
										console.log(err);
										res.json({"statusCode": 500, "success":"false", "message": "internal error"});
									}
									else{
										res.json({"statusCode": 200, "success":"true", "message": "", "rfq":rfq, "probability": probability, "rejection_remarks": rejection_remarks});
										// res.json({"statusCode": 200, "success":"true", "message": "", "rfq":rfq, "probability": probability, });
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
	console.log(query);
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
	var query="UPDATE `rfq` SET `rfq_status_id`='"+req.body.rfq_status_id+"' WHERE `id`='"+req.body.rfq_id+"'";
	connection.query(query, function(err, quote) {
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			query="SELECT * FROM `rfq` WHERE `id`='"+req.body.rfq_id+"'";
			connection.query(query, function(err, rfq){
				if(err){
					console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					var new_version=parseInt(rfq[0].version_no)+1;
					new_version=new_version+".0";
					
					var date_rfq_in=moment(new Date(rfq[0].date_rfq_in).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
					var requested_quotation_date=moment(new Date(rfq[0].requested_quotation_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
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
					connection.query(new_rfq_query, function(err, new_rfq){
						if(err){
							console.log(err);
							res.json({"statusCode": 500, "success":"false", "message": "internal error"});
						}
						else{
							var new_rfq_id=new_rfq.insertId;
							var rfq_lines_query="select * from `rfq_lines` where `rfq_id`='"+req.body.rfq_id+"'";
							connection.query(rfq_lines_query, function(err, rfq_lines){
								if(err){
									console.log(err);
									res.json({"statusCode": 500, "success":"false", "message": "internal error"});
								}
								else{
									var rfq_lines_counter=0;
									var lengthTest=new Array();
									for (var i = 0; i < rfq_lines.length; i++) {
										sync(i, rfq_lines, new_rfq.insertId, function(){
											res.json({"statusCode": 200, "success":"true", "message": "new version of RFQ created successfully"})
										})
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

function sync(index, rfq_lines, rfq_id, callback){
	var req_delivery_date=rfq_lines[index].req_delivery_date;
	try{
		req_delivery_date=moment(new Date(rfq_lines[index].req_delivery_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
	}catch(ex){
		req_delivery_date='0000-00-00 00:00:00';
	}
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




exports.extend_validity_period_quote = function(req, res){
	var async = require("async");
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
			var date_rfq_in = rfq[0].date_rfq_in;
			var customer_country = rfq[0].customer_country;
			var installation_country = rfq[0].installation_country;

			var new_version=parseInt(rfq[0].version_no)+1;
			new_version=new_version+".0";

			var document_part=rfq[0].document_no.split("/");
			var document_no=document_part[0]+"/"+new_version;

			var version_no = new_version;
			var document_no = document_no;
			var rfq_status_id = rfq[0].rfq_status_id;
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
					new_rfq_id=new_rfq_info.insertId;
					var query="select * from `rfq_lines_questions` where `rfq_id`='"+req.body.rfq_id+"'";
					connection.query(query, function(err, rfq_question){
						if(err){
							console.log(err);
							res.json({"statusCode": 500, "success":"false", "message": "internal error"});
						}
						else{
							async.forEach(rfq_question, function(question, done){
								var query="INSERT INTO `rfq_lines_questions`(`rfq_id`, `rfq_questions_id`, `question_value`) VALUES('"+new_rfq_info.insertId+"', '"+question.rfq_questions_id+"', '"+question.question_value+"')";
								connection.query(query, function(err, new_rfq_question){
									if(err){
										console.log(err);
										done(err);
									}
									else{
										done();
									}
								});
							}, function(err){
								if(err){
									console.log(err);
									res.json({"statusCode": 500, "success":"false", "message": "internal error"});
								}
								else{
									connection.query("SELECT * FROM `rfq_lines` WHERE `rfq_id`='"+req.body.rfq_id+"'", function(err, line_items){
										if(err){
											console.log(err);
											res.json({"statusCode": 500, "success":"false", "message": "internal error"});
										}
										else{
											async.forEach(line_items, function(item, done){
													var new_rfq_lines_id=0;
													var product_lines_id = item.product_lines_id;
													var plants_id = item.plants_id;
													var rfq_id = new_rfq_id;
													var number_of_units = item.number_of_units;
													try{
														rfq[0].req_delivery_date=moment(new Date(rfq[0].req_delivery_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
													}catch(ex){
														rfq[0].req_delivery_date='0000-00-00 00:00:00';
													}
													var req_delivery_date = item.req_delivery_date;
													var rfq_line_status = item.rfq_line_status;
													var product_designs_id = item.product_designs_id;
													var material_code = item.material_code;
													var material_cost = item.material_cost;
													var labour_cost = item.labour_cost;
													var no_of_labour_hours = item.no_of_labour_hours;
													var sales_price = item.sales_price;
													try{
														rfq[0].confirmed_delivery_date=moment(new Date(rfq[0].confirmed_delivery_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
													}catch(ex){
														rfq[0].confirmed_delivery_date='0000-00-00 00:00:00';
													}
													var confirmed_delivery_date = item.confirmed_delivery_date;
													var minimum_sales_price = item.minimum_sales_price;
													var rfq_lines_calculated_sales_price_id = item.rfq_lines_calculated_sales_price_id;

													var rfq_line_insert_query = "INSERT INTO `rfq_lines`(`product_lines_id`, `plants_id`, `rfq_id`, `number_of_units`, `req_delivery_date`, `rfq_line_status`, `product_designs_id`, `material_code`, `material_cost`, `labour_cost`, `no_of_labour_hours`, `sales_price`, `confirmed_delivery_date`, `minimum_sales_price`, `rfq_lines_calculated_sales_price_id`) VALUES('"+product_lines_id+"', '"+plants_id+"', '"+rfq_id+"', '"+number_of_units+"', '"+req_delivery_date+"', '"+rfq_line_status+"', '"+product_designs_id+"', '"+material_code+"', '"+material_cost+"', '"+labour_cost+"', '"+no_of_labour_hours+"', '"+sales_price+"', '"+confirmed_delivery_date+"', '"+minimum_sales_price+"', '"+rfq_lines_calculated_sales_price_id+"')";

													connection.query(rfq_line_insert_query, function(err, info){
														if(err){
															done(err);
														}
														else{
															new_rfq_lines_id = info.insertId;
															connection.query("SELECT * FROM `rfq_lines_calculated_sales_price` where `rfq_lines_id`='"+item.id+"'", function(err, calc_sales_price){
																if(err){
																	done(err);
																}
																else{
																	if(calc_sales_price.length>0) {
																		var complexities_id = calc_sales_price[0].complexities_id;
																		var product_design_id = calc_sales_price[0].product_design_id;

																		var material_cost = calc_sales_price[0].material_cost;
																		var labor_cost = calc_sales_price[0].labor_cost;
																		var labor_hours = calc_sales_price[0].labor_hours;
																		var extra_engineering_cost = calc_sales_price[0].extra_engineering_cost;
																		var dcp = calc_sales_price[0].dcp;
																		var cost_packaging = calc_sales_price[0].cost_packaging;
																		var packaging_cost_transformer = calc_sales_price[0].packaging_cost_transformer;
																		var extra_packaging_costs_build_of_parts = calc_sales_price[0].extra_packaging_costs_build_of_parts;
																		var packaging = calc_sales_price[0].packaging;
																		var engineering_overheads = calc_sales_price[0].engineering_overheads;
																		var plant_overheads = calc_sales_price[0].plant_overheads;
																		var site_overheads = calc_sales_price[0].site_overheads;
																		var regional_overheads = calc_sales_price[0].regional_overheads;
																		var product_line_overheads = calc_sales_price[0].product_line_overheads;
																		var corporate_overheads = calc_sales_price[0].corporate_overheads;
																		var depreciation = calc_sales_price[0].depreciation;
																		var overheads = calc_sales_price[0].overheads;
																		var frieght_f_term = calc_sales_price[0].frieght_f_term;
																		var friegth_c_term = calc_sales_price[0].friegth_c_term;
																		var friegth_d_term = calc_sales_price[0].friegth_d_term;
																		var transport = calc_sales_price[0].transport;
																		var financial_cost_loc = calc_sales_price[0].financial_cost_loc;
																		var financial_cost_bonds = calc_sales_price[0].financial_cost_bonds;
																		var maintenance_equipment = calc_sales_price[0].maintenance_equipment;
																		var administrative_cost_various = calc_sales_price[0].administrative_cost_various;
																		var extra_documentation_required = calc_sales_price[0].extra_documentation_required;
																		var supervision = calc_sales_price[0].supervision;
																		var erection_comm = calc_sales_price[0].erection_comm;
																		var factory_training = calc_sales_price[0].factory_training;
																		var onsite_training = calc_sales_price[0].onsite_training;
																		var warranty_on_full_cost = calc_sales_price[0].warranty_on_full_cost;
																		var extra_cost = calc_sales_price[0].extra_cost;
																		var full_cost_excluding_commision = calc_sales_price[0].full_cost_excluding_commision;
																		var ebit_percentage = calc_sales_price[0].ebit_percentage;
																		var ebit = calc_sales_price[0].ebit;
																		var commission_on_net_sales_price = calc_sales_price[0].commission_on_net_sales_price;
																		var commission_on_f_term = calc_sales_price[0].commission_on_f_term;
																		var commission_on_gross_sales = calc_sales_price[0].commission_on_gross_sales;
																		var commission = calc_sales_price[0].commission;
																		var minimum_intercompany_sales = calc_sales_price[0].minimum_intercompany_sales;
																		var minimum_sales_price_to_customer = calc_sales_price[0].minimum_sales_price_to_customer;
																		var acc = calc_sales_price[0].acc;
																		var acc_factor = calc_sales_price[0].acc_factor;
																		var extra_engineering_hours = calc_sales_price[0].extra_engineering_hours;
																		var rfq_lines_calculated_sales_price_query = "INSERT INTO `rfq_lines_calculated_sales_price` (`complexities_id`, `product_design_id`, `rfq_lines_id`, `material_cost`, `labor_cost`, `labor_hours`, `extra_engineering_cost`, `dcp`, `cost_packaging`, `packaging_cost_transformer`, `extra_packaging_costs_build_of_parts`, `packaging`, `engineering_overheads`, `plant_overheads`, `site_overheads`, `regional_overheads`, `product_line_overheads`, `corporate_overheads`, `depreciation`, `overheads`, `frieght_f_term`, `friegth_c_term`, `friegth_d_term`, `transport`, `financial_cost_loc`, `financial_cost_bonds`, `maintenance_equipment`, `administrative_cost_various`, `extra_documentation_required`, `supervision`, `erection_comm`, `factory_training`, `onsite_training`, `warranty_on_full_cost`, `extra_cost`, `full_cost_excluding_commision`, `ebit_percentage`, `ebit`, `commission_on_net_sales_price`, `commission_on_f_term`, `commission_on_gross_sales`, `commission`, `minimum_intercompany_sales`, `minimum_sales_price_to_customer`, `acc`, `acc_factor`, `extra_engineering_hours`) VALUES('" + complexities_id + "', '" + product_design_id + "', '" + new_rfq_lines_id + "', '" + material_cost + "', '" + labor_cost + "', '" + labor_hours + "', '" + extra_engineering_cost + "', '" + dcp + "', '" + cost_packaging + "', '" + packaging_cost_transformer + "', '" + extra_packaging_costs_build_of_parts + "', '" + packaging + "', '" + engineering_overheads + "', '" + plant_overheads + "', '" + site_overheads + "', '" + regional_overheads + "', '" + product_line_overheads + "', '" + corporate_overheads + "', '" + depreciation + "', '" + overheads + "', '" + frieght_f_term + "', '" + friegth_c_term + "', '" + friegth_d_term + "', '" + transport + "', '" + financial_cost_loc + "', '" + financial_cost_bonds + "', '" + maintenance_equipment + "', '" + administrative_cost_various + "', '" + extra_documentation_required + "', '" + supervision + "', '" + erection_comm + "', '" + factory_training + "', '" + onsite_training + "', '" + warranty_on_full_cost + "', '" + extra_cost + "', '" + full_cost_excluding_commision + "', '" + ebit_percentage + "', '" + ebit + "', '" + commission_on_net_sales_price + "', '" + commission_on_f_term + "', '" + commission_on_gross_sales + "', '" + commission + "', '" + minimum_intercompany_sales + "', '" + minimum_sales_price_to_customer + "', '" + acc + "', '" + acc_factor + "', '" + extra_engineering_hours + "')";

																		connection.query(rfq_lines_calculated_sales_price_query, function (err, rfq_line_sales_price) {
																			if (err) {
																				done(err)
																			}
																			else {
																				connection.query("SELECT * FROM `rfq_lines_technical_specs` WHERE `rfq_lines_id`='" + item.id + "'", function (err, tech_spec) {
																					if (err) {
																						done(err);
																					}
																					else {
																						var product_properties_id = tech_spec[0].product_properties_id;
																						var value = tech_spec[0].value;
																						var remark = tech_spec[0].remark;
																						var tech_spec_query = "INSERT INTO `rfq_lines_technical_specs`(`rfq_lines_id`, `product_properties_id`, `value`, `remark`) VALUES('"+new_rfq_lines_id+"','"+product_properties_id+"', '"+value+"', '"+remark+"')";
																						connection.query(tech_spec_query, function (err, rfq_line_tech_spec) {
																							if (err) {
																								done(err);
																							}
																							else {
																								done();
																							}
																						});
																					}
																				});
																			}
																		});
																	}
																	else{
																		connection.query("SELECT * FROM `rfq_lines_technical_specs` WHERE `rfq_lines_id`='" + item.id + "'", function (err, tech_spec) {
																			if (err) {
																				done(err);
																			}
																			else {
																				if(tech_spec.length>0){
																					var product_properties_id = tech_spec[0].product_properties_id;
																					var value = tech_spec[0].value;
																					var remark = tech_spec[0].remark;
																					var tech_spec_query = "INSERT INTO `rfq_lines_technical_specs`(`rfq_lines_id`, `product_properties_id`, `value`, `remark`) VALUES('"+new_rfq_lines_id+"', '"+product_properties_id+"', '"+value+"', '"+remark+"')";
																					connection.query(tech_spec_query, function (err, rfq_line_tech_spec) {
																						if (err) {
																							done(err);
																						}
																						else {
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
														res.json({"statusCode": 200, "success":"true", "message": "validity date updated with new version successfully"});
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
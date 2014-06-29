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
	connection.query("select * from `sales_hubs` where `head_id`='"+req.params.user_id+"' LIMIT 1", function(err, info){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			if(info.length>0){
				query="SELECT `id`, `document_no`, `version_no`, `quote_submission_date`, `estimated_sales_price`, `quote_validity_date`, `probability_id` FROM `rfq` WHERE `rfq_status_id`='6' AND `rfq`.`sales_hub_id`='"+info[0].id+"' ORDER BY rfq.quote_validity_date asc";
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
				query="SELECT `id`, `document_no`, `version_no`, `quote_submission_date`, `estimated_sales_price`, `quote_validity_date`, `probability_id` FROM `rfq` WHERE `rfq_status_id`='6' AND (`created_by`='"+req.params.user_id+"' OR `sales_person_id`='"+req.params.user_id+"') ORDER BY `rfq`.`quote_validity_date` asc";
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

exports.sales_quote_followup_fetch_one = function(req, res){
	var query="SELECT `id`, `document_no`, `version_no`, `quote_creation_date`, `quote_submission_date`, `estimated_sales_price`, `quote_validity_date`, `probability_id`, `rfq_status_id`, `sales_price` FROM `rfq` WHERE `rfq_status_id`='6' AND `id`='"+req.params.rfq_id+"'";
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
						connection.query("select sum(`minimum_sales_price`) as `minimum_sales_price` from `rfq_lines` where `rfq_id`='"+rfq[0].id+"'", function(err, rfq_lines){
							if(err){
								console.log(err);
								res.json({"statusCode": 500, "success":"false", "message": "internal error"});
							}
							else{
								rfq[0]["minimum_sales_price"]=rfq_lines[0].minimum_sales_price;
								
								connection.query("SELECT `id`, `description` FROM `rejection_remarks`", function(err, rejection_remarks){
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
	var query="UPDATE `rfq` SET `quote_submission_date`='"+req.body.quote_submission_date+"', quote_validity_date='"+req.body.quote_validity_date+"', `probability_id`='"+req.body.probability+"', `rfq_status_id`='"+req.body.rfq_status_id+"' WHERE `id`='"+req.body.rfq_id+"'";
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
					// var date_rfq_in=new Date(rfq[0].date_rfq_in).toISOString();
					// var mement = require('moment');
					console.log(rfq[0].quote_creation_date);
					console.log(rfq[0].date_rfq_in);
					
					var date_rfq_in=moment(new Date(rfq[0].date_rfq_in).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
					// var quote_creation_date=moment(new Date(rfq[0].quote_creation_date).toISOString().substring(0,18), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
					// console.log(quote_creation_date);
					// var quote_submission_date=moment(new Date(rfq[0].quote_submission_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
					// var quote_validity_date=moment(new Date(rfq[0].quote_validity_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
					var requested_quotation_date=moment(new Date(rfq[0].requested_quotation_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
					// console.log(date_rfq_in);
					// console.log(rfq[0].date_rfq_in);
					var document_part=rfq[0].document_no.split("/");
					var document_no=document_part[0]+"/"+new_version;
					// var new_version=parseInt(version_part[version_part.length-1])+1;
					var new_rfq_query="INSERT INTO `rfq` (`sales_hub_id`, `sales_person_id`, `customers_id`, `sales_segments_id`, `sales_agents_id`, `tendering_teams_id`, `product_lines_id`, `tendering_teams_members_id`, `rejection_remarks_id`, `type_of_quote_id`, `project_name`, `date_rfq_in`, `customer_country`, `installation_country`, `version_no`, `document_no`, `rfq_status_id`, `quote_creation_date`, `quote_submission_date`, `quote_validity_date`, `probability_id`, `requested_quotation_date`, `estimated_sales_price`, `created_by`, `strategic_quote`, `channel_to_market_id`, `is_bid`, `sales_rejection_remarks_id`, `sales_price`) VALUES('"+rfq[0].sales_hub_id+"', '"+rfq[0].sales_person_id+"', '"+rfq[0].customers_id+"', '"+rfq[0].sales_segments_id+"', '"+rfq[0].sales_agents_id+"', '"+rfq[0].tendering_teams_id+"', '"+rfq[0].product_lines_id+"', '"+rfq[0].tendering_teams_members_id+"', '"+rfq[0].rejection_remarks_id+"', '"+rfq[0].type_of_quote_id+"', '"+rfq[0].project_name+"', '"+date_rfq_in+"', '"+rfq[0].customer_country+"', '"+rfq[0].installation_country+"', '"+new_version+"', '"+document_no+"', '2', '"+rfq[0].quote_creation_date+"', '"+rfq[0].quote_submission_date+"', '"+rfq[0].quote_validity_date+"', '"+rfq[0].probability_id+"', '"+requested_quotation_date+"', '"+rfq[0].estimated_sales_price+"', '"+rfq[0].created_by+"', '"+rfq[0].strategic_quote+"', '"+rfq[0].channel_to_market_id+"', '"+rfq[0].is_bid+"', '"+rfq[0].sales_rejection_remarks_id+"', '"+rfq[0].sales_price+"')";
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
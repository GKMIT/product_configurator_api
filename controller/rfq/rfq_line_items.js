var moment = require("moment");
exports.product_lines = function(req, res){
	//  AND created_by='"+req.params.user_id+"'
	connection.query("SELECT * FROM `rfq` WHERE `id`='"+req.params.rfq_id+"'", function(err, rfq) {
		if(err){
			res.json({"statusCode":500, "success":"false", "message": "internal error"});
		}
		else{
			var line_item_query="SELECT `rfq_lines`.id, `rfq_lines`.product_lines_id, `rfq_lines`.plants_id, `rfq_lines`.rfq_id, `rfq_lines`.number_of_units, `rfq_lines`.`req_delivery_date`, `rfq_lines`.`variant_to`, `product_lines`.`name` as `product_lines_name`, `plants`.name as `plant_name` FROM `rfq_lines` LEFT JOIN `product_lines` ON rfq_lines.product_lines_id=product_lines.id LEFT JOIN `plants` ON rfq_lines.plants_id=plants.id WHERE rfq_id='"+req.params.rfq_id+"'";
			connection.query(line_item_query, function(err, rfq_lines_items) {
				if(err){
					res.json({"statusCode":500, "success":"false", "message": "internal error"});
				}
				else{
					connection.query("SELECT `id`, `name` FROM `product_lines`", function(err, product_lines) {
						if(err){
							res.json({"statusCode":500, "success":"false", "message": "internal error"});
						}
						else{
							res.json({"statusCode":200, "success":"true", "message":"", "selected_rfq":rfq, "selected_rfq_lines_items": rfq_lines_items, "product_lines": product_lines});
						}
					});
				}
			});
		}
	});
}

exports.all_rfq_product_lines = function(req, res){
	 // AND created_by='"+req.params.user_id+"'
	connection.query("SELECT * FROM `rfq` WHERE `id`='"+req.params.rfq_id+"'", function(err, rfq) {
		if(err){
			res.json({"statusCode":500, "success":"false", "message": "internal error"});
		}
		else{
			connection.query("SELECT * FROM `rfq_lines` WHERE rfq_id='"+req.params.rfq_id+"'", function(err, rfq_lines_items) {
				if(err){
					res.json({"statusCode":500, "success":"false", "message": "internal error"});
				}
				else{
					res.json({"statusCode":200, "success":"true", "message":"", "selected_rfq":rfq, "selected_rfq_lines_items": rfq_lines_items});
				}
			});
		}
	});
}

exports.fetch_product_plants_properties = function(req, res){
	connection.query("SELECT `id`,`name` FROM `plants` WHERE product_lines_id='"+req.params.product_lines_id+"'", function(err, production_plants) {
		if(err){
			res.json({"statusCode":500, "success":"false", "message": "internal error"});
		}
		else{
			connection.query("SELECT `product_properties`.`id`, `product_properties`.`property_name`, `product_properties`.`data_type`, `product_properties`.`input_type` FROM `product_properties` WHERE  product_lines_id='"+req.params.product_lines_id+"'", function(err, product_properties) {
				if(err){
					console.log(err);
						res.json({"statusCode":500, "success":"false", "message": "internal error"});
				}
				else{
					connection.query("SELECT `product_lines`.`id`, `product_lines`.`name`, `product_lines`.`mandatory_properties` FROM `product_lines` WHERE id='"+req.params.product_lines_id+"'", function(err, mandatory_properties) {
						if(err){
							console.log(err);
								res.json({"statusCode":500, "success":"false", "message": "internal error"});
						}
						else{
							connection.query("SELECT `id`, `name`, `examples` FROM `product_types`", function(err, product_types) {
									if(err){
										res.json({"statusCode":500, "success":"false", "message": "internal error"});
									}
									else{
										connection.query("SELECT `name` as `id`, `name` FROM `complexities`", function(err, complexities) {
											if(err){
												res.json({"statusCode":500, "success":"false", "message": "internal error"});
											}
											else{
												res.json({"statusCode":200, "success":"true", "massage":"", "production_plants":production_plants, "product_properties":product_properties, "mandatory_properties":mandatory_properties, "complexity": complexities, "product_types":product_types});
											}
										});
									}
								});
							// res.json({"statusCode":200, "success":"true", "massage":"", "production_plants":production_plants, "product_properties":product_properties, "mandatory_properties":mandatory_properties});
						}
					});
				}
			});
		}
	});
}

// another api call
exports.product_properties = function(req, res){
	connection.query("SELECT `id`,`property_name` FROM `product_properties` WHERE product_lines_id='"+req.params.product_lines_id+"'", function(err, product_properties) {
		if(err){
			console.log(err);
				res.json({"statusCode":500, "success":"false", "message": "internal error"});
		}
		else{
			res.json({"statusCode":200, "success":"true", "massage":"", "product_properties":product_properties});
		}
	});
}


exports.fetch_rfq_line_items = function(req, res){
	connection.query("SELECT * FROM `rfq_lines` WHERE `id`='"+req.params.rfq_lines_id+"'", function(err, rfq_lines) {
		if(err){
				res.json({"statusCode":500, "success":"false", "message": "internal error"});
		}
		else{
			if(rfq_lines.length>0){
				connection.query("SELECT `rlts`.`product_properties_id`, `rlts`.`value`, `rlts`.`remark`, `pp`.`unit_of_measurement`, `pp`.`id`, `pp`.`data_type`, `pp`.`input_type` FROM `rfq_lines_technical_specs` `rlts` JOIN `product_properties` `pp` ON `rlts`.`product_properties_id`=`pp`.`id` WHERE rfq_lines_id='"+req.params.rfq_lines_id+"'", function(err, technical_specifications) {
					if(err){
						console.log(err);
							res.json({"statusCode":500, "success":"false", "message": "internal error"});
					}
					else{
						connection.query("SELECT `id`, `name` FROM `product_lines`", function(err, product_lines) {
							if(err){
								res.json({"statusCode":500, "success":"false", "message": "internal error"});
							}
							else{
								// connection.query("SELECT `id`, `name` FROM `product_types`", function(err, product_types) {
								// 	if(err){
								// 		res.json({"statusCode":500, "success":"false", "message": "internal error"});
								// 	}
								// 	else{
								// 		connection.query("SELECT `id`, `name` FROM `complexities`", function(err, complexities) {
								// 			if(err){
								// 				res.json({"statusCode":500, "success":"false", "message": "internal error"});
								// 			}
								// 			else{
								// 				res.json({"statusCode":200, "success":"true", "massage":"", "rfq_lines":rfq_lines, "product_lines": product_lines, "technical_specifications":technical_specifications, "complexity": complexities, "product_types":product_types});
								// 			}
								// 		});
								// 	}
								// });
									res.json({"statusCode":200, "success":"true", "massage":"", "rfq_lines":rfq_lines, "product_lines": product_lines, "technical_specifications":technical_specifications});
							}
						});
					}
				});
			}
			else{
				res.json({"statusCode":404, "success":"false", "message": "data not found"});
			}
		}
	});
}


exports.save_line_item = function(req, res){
	connection.query("SELECT `mandatory_properties` FROM `product_lines` WHERE `id`='"+req.body.product_lines_id+"'", function(err, mandatory){
		if(err){
			console.log(err);
			res.json({"statusCode":500, "success": "false", "message": "internal error"});
		}
		else{
			var testIds=mandatory[0].mandatory_properties.split(",");
			var counter=0;
			for (var i = 0; i < testIds.length; i++) {
				for (var j = 0; j < req.body.technical_specifications.length; j++) {
					if(testIds[i]==req.body.technical_specifications[j].product_properties_id){
						counter++;
					}
				};
			};
			console.log(counter);
			if(counter>=testIds.length){
				//connection.query("INSERT INTO `rfq_lines` (`product_lines_id`, `plants_id`, `rfq_id`, `number_of_units`, `req_delivery_date`) VALUES('"+req.body.product_lines_id+"', '"+req.body.plants_id+"', '"+req.body.rfq_id+"', '"+req.body.number_of_units+"', '"+req.body.req_delivery_date+"')", function(err, info){
				connection.query("INSERT INTO `rfq_lines` (`product_lines_id`, `rfq_id`, `number_of_units`, `req_delivery_date`) VALUES('"+req.body.product_lines_id+"', '"+req.body.rfq_id+"', '"+req.body.number_of_units+"', '"+req.body.req_delivery_date+"')", function(err, info){
					if(err){
						res.json({"statusCode":500, "success": "false", "message": "internal error"});
					}
					else{
						if(req.body.technical_specifications.length>0){
							var rfq_lines_id=info.insertId;
							var fields=["product_properties_id", "value", "remark"];
							// console.log(req.body.technical_specifications);
							var query="INSERT INTO `rfq_lines_technical_specs` (`rfq_lines_id`, `product_properties_id`, `value`, `remark`) VALUES (";
							for (var i = 0; i < req.body.technical_specifications.length; i++) {
								query=query+"'"+rfq_lines_id+"'";
								for (var j = 0; j < fields.length; j++) {
									if(typeof req.body.technical_specifications[i][fields[j]]=="undefined"){
										query=query+", ''";
									}
									else{
										query=query+", '"+req.body.technical_specifications[i][fields[j]]+"'";
									}
									if(j+1==fields.length){
										query=query+")";
									}
								}
								if(i+1<req.body.technical_specifications.length){
									query=query+", (";
								}
							}
							// console.log(query);
							connection.query(query, function(err, info_tech){
										if(err){
											res.json({"statusCode":500, "success": "false", "message": "internal error"});
										}
											res.json({"statusCode":200, "success":"true", "message":"data insterted successfully"});
									});
						}
						res.json({"statusCode":200, "success":"true", "message":"data insterted successfully"});
					}
				});
			}
			else{
				res.json({"statusCode":422, "success":"false", "message":"Please fill mandatory fields !"});
			}
		}
			
	});
}


exports.update_line_item = function(req, res){
	// console.log(req.body.technical_specifications.length);
	//connection.query("UPDATE `rfq_lines` SET `product_lines_id` = '"+req.body.product_lines_id+"', `plants_id` = '"+req.body.plants_id+"', `rfq_id` = '"+req.body.rfq_id+"', `number_of_units` = '"+req.body.number_of_units+"', `req_delivery_date` = '"+req.body.req_delivery_date+"' WHERE `id`='"+req.body.rfq_lines_id+"'", function(err, info){
	connection.query("UPDATE `rfq_lines` SET `product_lines_id` = '"+req.body.product_lines_id+"', `rfq_id` = '"+req.body.rfq_id+"', `number_of_units` = '"+req.body.number_of_units+"', `req_delivery_date` = '"+req.body.req_delivery_date+"' WHERE `id`='"+req.body.rfq_lines_id+"'", function(err, info){
		if(err){
			res.json({"statusCode":500, "success": "false", "message": "internal error"});
		}
		else if(typeof req.body.technical_specifications=="object" && Array.isArray(req.body.technical_specifications) && req.body.technical_specifications.length>0){
			connection.query("SELECT `mandatory_properties` FROM `product_lines` WHERE `id`='"+req.body.product_lines_id+"'", function(err, mandatory){
				if(err){
					console.log(err);
					res.json({"statusCode":500, "success": "false", "message": "internal error"});
				}
				else{
					var testIds=mandatory[0].mandatory_properties.split(",");
					var counter=0;
					for (var i = 0; i < testIds.length; i++) {
						for (var j = 0; j < req.body.technical_specifications.length; j++) {
							if(testIds[i]==req.body.technical_specifications[j].product_properties_id){
								counter++;
							}
						};
					};
					if(counter>=testIds.length){
						connection.query("DELETE  FROM `rfq_lines_technical_specs` WHERE `rfq_lines_id`='"+req.body.rfq_lines_id+"'", function(err, info){
							if(err){
								res.json({"statusCode":500, "success": "false", "message": "internal error"});
							}
							else{
								var rfq_lines_id=req.body.rfq_lines_id;
								var fields=["product_properties_id", "value", "remark"];
								var query="INSERT INTO `rfq_lines_technical_specs` (`rfq_lines_id`, `product_properties_id`, `value`, `remark`) VALUES (";
								for (var i = 0; i < req.body.technical_specifications.length; i++) {
									query=query+"'"+rfq_lines_id+"'";
									for (var j = 0; j < fields.length; j++) {
										if(typeof req.body.technical_specifications[i][fields[j]]=="undefined"){
										query=query+", ''";
										}
										else{
											query=query+", '"+req.body.technical_specifications[i][fields[j]]+"'";
										}
										if(j+1==fields.length){
											query=query+")";
										}
									}
									if(i+1<req.body.technical_specifications.length){
										query=query+", (";
									}
								}
								// console.log(query);
								connection.query(query, function(err, info_tech){
									if(err){
										res.json({"statusCode":500, "success": "false", "message": "internal error"});
									}
									else{
										res.json({"statusCode":200, "success":"true", "message":"data update successfully"});
									}
								});
							}
						});
					}
					else{
						res.json({"statusCode":422, "success":"false", "message":"Please fill mandatory fields !"});
					}
				}
					
			});
		}
		else{
			res.json({"statusCode":200, "success":"true", "message":"data update successfully"});
		}
	});
}

exports.delete_line_item = function(req, res){
	connection.query("DELETE  FROM `rfq_lines` WHERE `id` = '"+req.params.rfq_lines_id+"'", function(err, info_tech){
		if(err){
			res.json({"statusCode":500, "success": "false", "message": "internal error"});
		}
		else{
			connection.query("DELETE FROM `rfq_lines_technical_specs` WHERE `rfq_lines_id`='"+req.params.rfq_lines_id+"'", function(err, info_tech){
				if(err){
					res.json({"statusCode":500, "success": "false", "message": "internal error"});
				}
				else{
					res.json({"statusCode":200, "success":"true", "message":"data deleted successfully"});
				}
			});
		}
	});
}

exports.complete_rfq = function(req, res){
	if(req.body.rfq_status_id==2){
		connection.query("SELECT * FROM `rfq_lines` WHERE rfq_id='"+req.body.rfq_id+"'", function(err, check_line_item){
				if(err){
					res.json({"statusCode":500, "success": "false", "message": "internal error"});
				}
				else{
					if(check_line_item.length>0){
						connection.query("UPDATE `rfq` SET `rfq_status_id`='"+req.body.rfq_status_id+"' WHERE id='"+req.body.rfq_id+"'", function(err, info_tech){
							if(err){
								res.json({"statusCode":500, "success": "false", "message": "internal error"});
							}
							else{
								res.json({"statusCode":200, "success":"true", "message":"rfq completed successfully"});
							}
						});
					}
					else{
						res.json({"statusCode":404, "success": "false", "message": "Please save the Line Item first before you can Complete the RFQ"});
					}
				}
		});
		
	}
	else
	{
		if(req.body.revert_to_sales){
			var query="SELECT `rfq`.`sales_hub_id`, `rfq`.`sales_person_id`, `rfq`.`sales_segments_id`, `rfq`.`sales_agents_id`, `rfq`.`tendering_teams_id`, `rfq`.`tendering_teams_members_id`, `rfq`.`project_name`, `rfq`.`date_rfq_in`, `rfq`.`customer_country`, `rfq`.`installation_country`, `rfq`.`version_no`, `document_no`, `created_by`, `organization_users`.`email` FROM `rfq` LEFT JOIN `organization_users` ON `rfq`.`created_by`=`organization_users`.`id` WHERE `rfq`.`id`='"+req.body.rfq_id+"'";
			connection.query(query, function(err, rfq_info){
				if(err){
					res.json({"statusCode":500, "success": "false", "message": "internal error"});
				}
				else{
					var mailOptions = {
					    from: "From :  ✔ <"+smtpConfig.email+">", // sender address
					    to: smtpConfig.sales_and_marketing_director_email+', '+rfq_info[0].email, // list of receivers seprated by comma also
					    subject: 'RFQ Revert to sales ✔', // Subject line
					    text: 'RFQ #docnr is Reverted to sales', // plaintext body
					    html: '<p>RFQ '+rfq_info[0].document_no+' is reverted to sales</p>' // html body
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
			connection.query("UPDATE `rfq` SET `rfq_status_id`='"+req.body.rfq_status_id+"' WHERE id='"+req.body.rfq_id+"'", function(err, info_tech){
				if(err){
					res.json({"statusCode":500, "success": "false", "message": "internal error"});
				}
				else{
					res.json({"statusCode":200, "success":"true", "message":"rfq completed successfully"});
				}
			});
		}
		else{
			connection.query("UPDATE `rfq` SET `rfq_status_id`='"+req.body.rfq_status_id+"' WHERE id='"+req.body.rfq_id+"'", function(err, info_tech){
				if(err){
					res.json({"statusCode":500, "success": "false", "message": "internal error"});
				}
				else{
					res.json({"statusCode":200, "success":"true", "message":"rfq completed successfully"});
				}
			});
		}
	}
}


exports.fetch_property_detail = function(req, res, next){
	connection.query("SELECT `id`, `property_name`, `product_lines_id`, `categories_id`, `unit_of_measurement`, data_type, input_type FROM `product_properties` WHERE `id`='"+req.params.property_id+"'", function(err, property){
		if(err){
			console.log(err);
			res.json({"statusCode":500, "success": "false", "message": "internal error"});
		}
		else{
			var flag=0;
			var query="";
			// if(req.params.property_id==2){
			// 	query+="product_types";
			// 	flag=1;
			// }
			// else if(req.params.property_id==3){
			// 	query+="complexities";
			// 	flag=1;
			// }
			if(req.params.property_id==1){
				query+="SELECT `id`, `name`, `examples` FROM `product_types`";
				flag=1;
			}
			else if(req.params.property_id==2){
				query+="SELECT `name` as `id`, `name` FROM `complexities`";
				flag=1;
			}
			else{
				res.json({"statusCode":200, "success":"true", "message":"", "properties": property, "value":[]});
			}
			if(flag==1){
				connection.query(query, function(err, prop_val){
					if(err){
						console.log(err);
						res.json({"statusCode":500, "success": "false", "message": "internal error"});
					}
					else{
						res.json({"statusCode":200, "success":"true", "message":"", "properties": property, "value": prop_val});
					}
				});
			}
		}
	});
}


exports.variant_to = function(req, res){
	connection.query("UPDATE `rfq_lines` SET `has_variant`='1' WHERE `id`='"+req.body.rfq_lines_id+"'", function(err, update_rfq){
		if(err){
			console.log(err);
			res.json({"statusCode":500, "success": "false", "message": "internal error"});
		}
		else{
			var async = require("async");
			var rfq_lines_id=1;
			var query="SELECT * FROM `rfq_lines` WHERE `id`='"+req.body.rfq_lines_id+"' AND `variant_to`=0";
			connection.query(query, function(err, line_items){
				if(err){
					console.log(err);
					res.json({"statusCode":500, "success": "false", "message": "internal error"});
				}
				else{
					if(line_items.length>0){
						var id = line_items[0].id;
						var plants_id = line_items[0].plants_id;
						var product_lines_id = line_items[0].product_lines_id;
						var rfq_id = line_items[0].rfq_id;
						var number_of_units = line_items[0].number_of_units;
						try{
							line_items[0].req_delivery_date=moment(new Date(line_items[0].req_delivery_date).toISOString().substring(0,10), "YYYY-MM-DD").format('YYYY-MM-DD hh:mm:ss');
						}catch(ex) {
							line_items[0].req_delivery_date = '0000-00-00 00:00:00';
						}
						var req_delivery_date = line_items[0].req_delivery_date;
						var rfq_line_status = line_items[0].rfq_line_status;
						query="INSERT INTO `rfq_lines`(`plants_id`, `product_lines_id`, `rfq_id`, `number_of_units`, `req_delivery_date`, `rfq_line_status`, `variant_to`) VALUES('"+plants_id+"', '"+product_lines_id+"', '"+rfq_id+"', '"+number_of_units+"', '"+req_delivery_date+"', '"+rfq_line_status+"', '"+req.body.rfq_lines_id+"')";
						connection.query(query, function(err, info){
							if(err){
								console.log(err);
								res.json({"statusCode":500, "success": "false", "message": "internal error"});
							}
							else{
								var new_rfq_lines_id=info.insertId;
								query="SELECT * FROM `rfq_lines_technical_specs` WHERE `rfq_lines_id`='"+req.body.rfq_lines_id+"'";
								connection.query(query, function(err, tech_specs){
									if(err){
										console.log(err);
										res.json({"statusCode":500, "success": "false", "message": "internal error"});
									}
									else{
										async.each(tech_specs, function(specs, done){
											query="INSERT INTO `rfq_lines_technical_specs` (`rfq_lines_id`, `product_properties_id`, `value`, `remark`) VALUES('"+new_rfq_lines_id+"', '"+specs.product_properties_id+"', '"+specs.value+"', '"+specs.remark+"')";
											connection.query(query, function(err, tech_entry){
												if(err){
													done(err);
												}
												else{
													done();
												}
											});

										}, function(err){
											if(err){
												console.log(err);
												res.json({"statusCode":500, "success": "false", "message": "internal error"});
											}
											else{
												res.json({"statusCode":200, "success": "true", "message": "Variant generated successfully"});
											}
										});
									}
								});
							}
						});
					}
					else{
						res.json({"statusCode":406, "success": "true", "message": "Variant can't generate another variant"});
					}
				}
			});
		}
	});
};
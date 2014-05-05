exports.product_lines = function(req, res){
	connection.query("SELECT * FROM `rfq` WHERE `id`='"+req.params.rfq_id+"' AND created_by='"+req.params.user_id+"'", function(err, rfq) {
		if(err){
			res.json({"statusCode":500, "success":"false", "message": "internal error"});
		}
		else{
			connection.query("SELECT `rfq_lines`.id, `rfq_lines`.product_lines_id, `rfq_lines`.plants_id, `rfq_lines`.rfq_id, `rfq_lines`.number_of_units, `rfq_lines`.`req_delivery_date`, `product_lines`.name as `product_lines_name`, `plants`.name as `plant_name` FROM `rfq_lines`, `product_lines`, `plants` WHERE rfq_id='"+req.params.rfq_id+"' AND rfq_lines.product_lines_id=product_lines.id AND rfq_lines.plants_id=plants.id", function(err, rfq_lines_items) {
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
	connection.query("SELECT * FROM `rfq` WHERE `id`='"+req.params.rfq_id+"' AND created_by='"+req.params.user_id+"'", function(err, rfq) {
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
			connection.query("SELECT `id`,`property_name` FROM `product_properties` WHERE product_lines_id='"+req.params.product_lines_id+"'", function(err, product_properties) {
				if(err){
					console.log(err);
						res.json({"statusCode":500, "success":"false", "message": "internal error"});
				}
				else{
					res.json({"statusCode":200, "success":"true", "massage":"", "production_plants":production_plants, "product_properties":product_properties, "product_properties":product_properties});
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
				connection.query("SELECT `rlts`.`product_properties_id`, `rlts`.`value`, `rlts`.`remark`, `pp`.`unit_of_measurement` FROM `rfq_lines_technical_specs` `rlts` JOIN `product_properties` `pp` ON `rlts`.`product_properties_id`=`pp`.`id` WHERE rfq_lines_id='"+req.params.rfq_lines_id+"'", function(err, technical_specifications) {
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
	connection.query("INSERT INTO `rfq_lines` (`product_lines_id`, `plants_id`, `rfq_id`, `number_of_units`, `req_delivery_date`) VALUES('"+req.body.product_lines_id+"', '"+req.body.plants_id+"', '"+req.body.rfq_id+"', '"+req.body.number_of_units+"', '"+req.body.req_delivery_date+"')", function(err, info){
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


exports.update_line_item = function(req, res){
	// console.log(req.body.technical_specifications.length);
	connection.query("UPDATE `rfq_lines` SET `product_lines_id` = '"+req.body.product_lines_id+"', `plants_id` = '"+req.body.plants_id+"', `rfq_id` = '"+req.body.rfq_id+"', `number_of_units` = '"+req.body.number_of_units+"', `req_delivery_date` = '"+req.body.req_delivery_date+"' WHERE `id`='"+req.body.rfq_lines_id+"'", function(err, info){
		if(err){
			res.json({"statusCode":500, "success": "false", "message": "internal error"});
		}
		else if(typeof req.body.technical_specifications=="object" && Array.isArray(req.body.technical_specifications) && req.body.technical_specifications.length>0){
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
		connection.query("SELECT r.id, EXTRACT(YEAR FROM date_rfq_in) as year, c.iso_code, pl.id as product_lines_id, pl.name FROM rfq r JOIN countries c ON r.customer_country=c.id JOIN product_lines pl ON r.product_lines_id=pl.id WHERE r.id='"+req.body.rfq_id+"'", function(err, rfq_detail){
			if(err){
				res.json({"statusCode":500, "success": "false", "message": "internal error"});
			}
			else{
				if(rfq_detail.length>0){
					// TODO : code this will optimize after some discussion
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

					connection.query("UPDATE `rfq` SET `version_no`='"+version_no+"', `document_no`='"+document_no+"', `rfq_status_id`='"+req.body.rfq_status_id+"' WHERE id='"+req.body.rfq_id+"'", function(err, info_tech){
						if(err){
							res.json({"statusCode":500, "success": "false", "message": "internal error"});
						}
						else{
							res.json({"statusCode":200, "success":"true", "message":"rfq completed successfully"});
						}
					});
				}
				else{
					res.json({"statusCode":206, "success":"true", "message":"rfq detail not completed"});
				}
			}
		});
	}
	else
	{
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


exports.fetch_property_detail = function(req, res, next){
	connection.query("SELECT `id`, `property_name`, `product_lines_id`, `categories_id`, `unit_of_measurement` FROM `product_properties` WHERE `id`='"+req.params.property_id+"'", function(err, property){
		if(err){
			console.log(err);
			res.json({"statusCode":500, "success": "false", "message": "internal error"});
		}
		else{
			res.json({"statusCode":200, "success":"true", "message":"", "properties": property});
		}
	});
}
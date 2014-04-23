exports.product_lines = function(req, res){
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
	connection.query("SELECT * FROM `rfq_lines` WHERE `rfq_id`='"+req.params.rfq_id+"'", function(err, rfq_lines) {
		if(err){
				res.json({"statusCode":500, "success":"false", "message": "internal error"});
		}
		else{
			if(rfq_lines.length>0){
				connection.query("SELECT `id`, `name` FROM `plants` WHERE `product_lines_id`='"+rfq_lines[0].product_lines_id+"'", function(err, plants) {
					if(err){
							res.json({"statusCode":500, "success":"false", "message": "internal error"});
					}
					else{
						connection.query("SELECT * FROM `product_properties` WHERE product_lines_id='"+rfq_lines[0].product_lines_id+"'", function(err, product_properties) {
							if(err){
									res.json({"statusCode":500, "success":"false", "message": "internal error"});
							}
							else{
								connection.query("SELECT `product_properties_id`, `value`, `remark` FROM `rfq_lines_technical_specs` WHERE product_properties_id='"+product_properties[0].id+"'", function(err, technical_specifications) {
									if(err){
										console.log(err);
											res.json({"statusCode":500, "success":"false", "message": "internal error"});
									}
									else{
										res.json({"statusCode":200, "success":"true", "massage":"", "rfq_lines":rfq_lines, "production_plants":plants, "product_properties":product_properties, "technical_specifications":technical_specifications});
									}
								});
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
			var rfq_lines_id=info.insertId;
			var fields=["product_properties_id", "value", "remark"];
			var query="INSERT INTO `rfq_lines_technical_specs` (`rfq_lines_id`, `product_properties_id`, `value`, `remark`) VALUES (";
			for (var i = 0; i < req.body.technical_specifications.length; i++) {
				query=query+"'"+rfq_lines_id+"'";
				for (var j = 0; j < fields.length; j++) {
					query=query+", '"+req.body.technical_specifications[i][fields[j]]+"'";
					if(j+1==fields.length){
						query=query+")";
					}
					// else{
						
					// }
				}
				if(i+1<req.body.technical_specifications.length){
					query=query+", (";
				}
			}
			connection.query(query, function(err, info_tech){
				if(err){
					res.json({"statusCode":500, "success": "false", "message": "internal error"});
				}
				else{
					res.json({"statusCode":200, "success":"true", "message":"data insterted successfully",});
				}
			});
		}
	});
}


exports.update_line_item = function(req, res){
	connection.query("UPDATE `rfq_lines` SET `product_lines_id` = '"+req.body.product_lines_id+"', `plants_id` = '"+req.body.plants_id+"', `rfq_id` = '"+req.body.rfq_id+"', `number_of_units` = '"+req.body.number_of_units+"', `req_delivery_date` = '"+req.body.req_delivery_date+"' WHERE `id`='"+req.body.rfq_lines_id+"'", function(err, info){
		if(err){
			res.json({"statusCode":500, "success": "false", "message": "internal error"});
		}
		else{
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
							query=query+", '"+req.body.technical_specifications[i][fields[j]]+"'";
							if(j+1==fields.length){
								query=query+")";
							}
						}
						if(i+1<req.body.technical_specifications.length){
							query=query+", (";
						}
					}
					console.log(query);
					connection.query(query, function(err, info_tech){
						if(err){
							res.json({"statusCode":500, "success": "false", "message": "internal error"});
						}
						else{
							res.json({"statusCode":200, "success":"true", "message":"data insterted successfully",});
						}
					});
				}
			});
		}
	});
}

exports.delete_line_item = function(req, res){
	connection.query("DELETE FROM `rfq_lines_technical_specs` WHERE `rfq_lines_id`='"+req.params.rfq_lines_id+"'", function(err, info_tech){
		if(err){
			res.json({"statusCode":500, "success": "false", "message": "internal error"});
		}
		else{
			res.json({"statusCode":200, "success":"true", "message":"data deleted successfully",});
		}
	});
}

exports.complete_rfq = function(req, res){
	connection.query("UPDATE `rfq` SET `rfq_status_id`='"+req.body.rfq_status_id+"' WHERE id='"+req.body.rfq_status_id+"'", function(err, info_tech){
		if(err){
			res.json({"statusCode":500, "success": "false", "message": "internal error"});
		}
		else{
			res.json({"statusCode":200, "success":"true", "message":"status updated successfully",});
		}
	});
}
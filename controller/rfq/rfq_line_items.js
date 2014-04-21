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

exports.fetch_production_plants = function(req, res){
	connection.query("SELECT `id`,`name` FROM `plants` WHERE product_lines_id='"+req.params.product_lines_id+"'", function(err, production_plants) {
		if(err){
			res.json({"statusCode":500, "success":"false", "message": "internal error"});
		}
		else{
			res.json({"statusCode":200, "success":"true", "message":"", "production_plants":production_plants});
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
			res.json({"statusCode":200, "success":"true", "message":"", "product_properties":product_properties});
		}
	});
}
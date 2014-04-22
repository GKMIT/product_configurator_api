exports.product_line = function(req, res, next){
	var checkValid=1;
	if(req.header("authentication_token")=="" || typeof req.header("authentication_token")=="undefined"){
		checkValid=0;
		res.json({"statusCode": 404, "success":"false", "message": "authentication_token not found"});
	}
	else if(typeof req.params.user_id=="undefined" || req.params.user_id==""){
		checkValid=0;
		res.json({"statusCode": 404, "success":"false", "message": "user_id not found"});
	}
	else if(typeof req.params.rfq_id=="undefined" || req.params.rfq_id==""){
		checkValid=0;
		res.json({"statusCode": 404, "success":"false", "message": "rfq_id not found"});
	}
	else if(checkValid==1){
		connection.query("SELECT `id`, `authentication_token` FROM `organization_users` WHERE `authentication_token`='"+req.header("authentication_token")+"' AND `id`="+req.params.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
					connection.query("SELECT * FROM `rfq` WHERE `id`='"+req.params.rfq_id+"' AND created_by='"+req.params.user_id+"'", function(err, rfq) {
						if(err){
							console.log(err);
								res.json({"statusCode": 401, "success":"false", "message": "invalid access of RFQ"});
						}
						else{
							next();
						}
					});
				}
				else{
					res.json({"statusCode": 404, "success":"false", "message": "user not found"});
				}
			}
		});
	}
};



exports.fetch_product_plants_properties = function(req, res, next){
	var checkValid=1;
	if(req.header("authentication_token")=="" || typeof req.header("authentication_token")=="undefined"){
		checkValid=0;
		res.json({"statusCode": 404, "success":"false", "message": "authentication_token not found"});
	}
	else if(typeof req.params.user_id=="undefined" || req.params.user_id==""){
		checkValid=0;
		res.json({"statusCode": 404, "success":"false", "message": "user_id not found"});
	}
	else if(typeof req.params.product_lines_id=="undefined" || req.params.product_lines_id==""){
		checkValid=0;
		res.json({"statusCode": 404, "success":"false", "message": "rfq_id not found"});
	}
	else if(checkValid==1){
		connection.query("SELECT `id`, `authentication_token` FROM `organization_users` WHERE `authentication_token`='"+req.header("authentication_token")+"' AND `id`="+req.params.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
					connection.query("SELECT * FROM `rfq` WHERE `id`='"+req.params.rfq_id+"' AND created_by='"+req.params.user_id+"'", function(err, rfq) {
						if(err){
							console.log(err);
								res.json({"statusCode": 401, "success":"false", "message": "invalid access of RFQ"});
						}
						else{
							next();
						}
					});
				}
				else{
					res.json({"statusCode": 404, "success":"false", "message": "user not found"});
				}
			}
		});
	}
}



exports.fetch_rfq_line_items = function(req, res, next){
	var checkValid=1;
	var fields = ["user_id", "rfq_id", "rfq_lines_id"];
	if(typeof req.header("authentication_token")=="undefined" || req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(checkValid==1){
			for(var i=0; i<fields.length; i++){
			if(typeof req.params[fields[i]]=="undefined" || req.params[fields[i]]==""){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" not defined"});
				break;
			}
		}
	}
	if(checkValid==1){
		connection.query("SELECT `id`, `authentication_token` FROM `organization_users` WHERE `authentication_token`='"+req.header("authentication_token")+"' AND `id`="+req.params.user_id, function(err, organization_users) {
			if(err){
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
					connection.query("SELECT * FROM `rfq` WHERE `id`='"+req.params.rfq_id+"' AND created_by='"+req.params.user_id+"'", function(err, rfq) {
						if(err){
							res.json({"statusCode": 401, "success":"false", "message": "invalid access of RFQ"});
						}
						else{
							next();
						}
					});
				}
				else{
					res.json({"statusCode": 404, "success":"false", "message": "user not found"});
				}
			}
		});
	}
}


exports.save_line_item = function(req, res, next){
	var checkValid=1;
	var fields = ["user_id", "product_lines_id", "plant_id", "rfq_id", "number_of_units", "req_delivery_date","rfq_status_id"];
	if(typeof req.header("authentication_token")=="undefined" || req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(checkValid==1){
		for(var i=0; i<fields.length; i++){
			if(typeof req.body[fields[i]]=="undefined" || req.body[fields[i]]==""){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" not defined"});
				break;
			}
		}
	}
	if(checkValid==1){
		var subfields=["product_properties_id", "value", "remark"];
			if(typeof req.body.techincal_specifications=="object" || !Array.isArray(req.body.technical_specifications)){
				res.json({"statusCode": 404, "success":"false", "message": "technical_specifications not found !"});
			}
			else{
			for(var i=0; i<req.body.technical_specifications.length; i++){
				for(var j=0; j<subfields.length; j++){
					if(typeof req.body.technical_specifications[i][subfields[i]]=="undefined" || req.body.technical_specifications[i][subfields[i]]==""){
						checkValid=0;
						res.json({"statusCode": 404, "success": "false", "message": subfields[i]+" not defined"});
						break;
					}
				}
			}
		}
		if(checkValid==1){
			connection.query("SELECT `id`, `authentication_token` FROM `organization_users` WHERE `authentication_token`='"+req.header("authentication_token")+"' AND `id`="+req.body.user_id, function(err, organization_users) {
				if(err){
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					if (organization_users.length>0) {
						connection.query("SELECT * FROM `rfq` WHERE `id`='"+req.params.rfq_id+"' AND created_by='"+req.params.user_id+"'", function(err, rfq) {
							if(err){
								res.json({"statusCode": 401, "success":"false", "message": "invalid access"});
							}
							else{
								next();
							}
						});
					}
					else{
						res.json({"statusCode": 404, "success":"false", "message": "user not found"});
					}
				}
			});
		}

	}
}
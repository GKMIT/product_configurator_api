var validator=require("validator");
exports.sales_quote_finalize_fetch_all = function(req, res, next){
	var checkValid=1;
	if(req.header("authentication_token")=="" || typeof req.header("authentication_token")=="undefined"){
		checkValid=0;
		res.json({"statusCode": 404, "success":"false", "message": "authentication_token not found"});
	}
	else if(typeof req.params.user_id=="undefined"){
		checkValid=0;
		res.json({"statusCode": 404, "success":"false", "message": "user_id not undefined"});
	}
	else if (req.params.user_id=="" || !validator.isNumeric(req.params.user_id)){
		checkValid=0;
		res.json({"statusCode": 404, "success":"false", "message": "user_id not found"});
	}
	else if(checkValid==1){
		connection.query("SELECT `id`, `authentication_token` FROM `organization_users` WHERE `authentication_token`='"+req.header("authentication_token")+"' AND `id`="+req.params.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
						next();				
				}
				else{
					res.json({"statusCode": 404, "success":"false", "message": "user not found"});
				}
			}
		});
	}
};


exports.sales_quote_finalize_fetch_one = function(req, res, next){
	var checkValid=1;
	var fields = ["user_id", "rfq_id"];
	if(typeof req.header("authentication_token")=="undefined" || req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(checkValid==1){
		for(var i=0; i<fields.length; i++){
			if(typeof req.params[fields[i]]=="undefined" || req.params[fields[i]]=="" || !validator.isNumeric(req.params[fields[i]])){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" not found"});
				break;
			}
		}
	}
	if(checkValid==1){
		connection.query("SELECT `id`, `authentication_token` FROM `organization_users` WHERE `authentication_token`='"+req.header("authentication_token")+"' AND `id`="+req.params.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
						next();				
				}
				else{
					res.json({"statusCode": 404, "success":"false", "message": "user not found"});
				}
			}
		});
	}
};


exports.sales_quote_finalize_submit = function(req, res, next){
	var checkValid=1;
	// quote_validity_date
	var fields = ["user_id", "rfq_id", "probability", "rfq_status_id"];
	if(typeof req.header("authentication_token")=="undefined" || req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(checkValid==1){
		for(var i=0; i<fields.length; i++){
			if(typeof req.body[fields[i]]=="undefined" || req.body[fields[i]]=="" || !validator.isNumeric(req.body[fields[i]])){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" not found"});
				break;
			}
		}
	}
	if(checkValid==1){
		if (req.body.quote_validity_date=="" || req.body.quote_validity_date==""){
		checkValid=0;
		res.json({"statusCode": 404, "success":"false", "message": "quote_validity_date not found"});
	}
	}
	if(checkValid==1){
		connection.query("SELECT `id`, `authentication_token` FROM `organization_users` WHERE `authentication_token`='"+req.header("authentication_token")+"' AND `id`="+req.body.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
						next();				
				}
				else{
					res.json({"statusCode": 404, "success":"false", "message": "user not found"});
				}
			}
		});
	}
};

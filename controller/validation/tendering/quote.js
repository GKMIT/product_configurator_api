var validator=require("validator");
exports.tendering_teams_quotes = function(req, res, next){
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



exports.tendering_fetch_particular_quote = function(req, res, next){
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
	else if (req.params.rfq_id=="" || !validator.isNumeric(req.params.rfq_id)){
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


exports.tendering_fetch_product_design_detail = function(req, res, next){
	var checkValid=1;
	if(req.header("authentication_token")=="" || typeof req.header("authentication_token")=="undefined"){
		checkValid=0;
		res.json({"statusCode": 404, "success":"false", "message": "authentication_token not found"});
	}
	else if (req.params.user_id=="" || !validator.isNumeric(req.params.user_id)){
		checkValid=0;
		res.json({"statusCode": 404, "success":"false", "message": "user_id not found"});
	}
	else if (req.params.rfq_id=="" || !validator.isNumeric(req.params.rfq_id)){
		checkValid=0;
		res.json({"statusCode": 404, "success":"false", "message": "user_id not found"});
	}
	else if (req.params.rfq_lines_id=="" || !validator.isNumeric(req.params.rfq_lines_id)){
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

exports.tendering_fetch_particular_design = function(req, res, next){
	var checkValid=1;
	if(req.header("authentication_token")=="" || typeof req.header("authentication_token")=="undefined"){
		checkValid=0;
		res.json({"statusCode": 404, "success":"false", "message": "authentication_token not found"});
	}
	else if (req.params.user_id=="" || !validator.isNumeric(req.params.user_id)){
		checkValid=0;
		res.json({"statusCode": 404, "success":"false", "message": "user_id not found"});
	}
	else if (req.params.product_designs_id=="" || !validator.isNumeric(req.params.product_designs_id)){
		checkValid=0;
		res.json({"statusCode": 404, "success":"false", "message": "user_id not found"});
	}
	else if (req.params.product_designs_costs_id=="" || !validator.isNumeric(req.params.product_designs_costs_id)){
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


exports.tendering_submit_rfq_lines = function(req, res, next){
	var checkValid=1;
	var fields = ["user_id", "rfq_id", "rfq_lines_id", "product_designs_id", "sales_price"];
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
		if(typeof req.body.confirmed_delivery_date=="undefined" || req.body.confirmed_delivery_date==""){
			checkValid=0;
			res.json({"statusCode": 404, "success": "false", "message": "confirmed_delivery_date not found"});
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

exports.tendering_submit_rfq_to_sales = function(req, res, next){
	var checkValid=1;
	var fields = ["user_id", "rfq_id", "rfq_status_id"];
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
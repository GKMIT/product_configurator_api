var validator=require("validator");
exports.ready_rfq_bid = function(req, res, next){
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
}


var validator=require("validator");
exports.ready_rfq_bid_detail = function(req, res, next){
	
	var checkValid=1;
	var fields = ["user_id", "rfq_id"];
	if(typeof req.header("authentication_token")=="undefined" || req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(checkValid==1){
			for(var i=0; i<fields.length; i++){
			if(typeof req.params[fields[i]]=="undefined"){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" not defined"});
			}
			else if(req.params[fields[i]]=="" || !validator.isNumeric(req.params[fields[i]])){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" value not valid"});
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
					connection.query("SELECT * FROM rfq WHERE `id`="+req.params.rfq_id, function(err, rfq) {
						if(err){
							res.json({"statusCode": 500, "success":"false", "message": "internal error"});
						}
						else{
							if (rfq.length>0) {
									next();				
							}
							else{
								res.json({"statusCode": 401, "success":"false", "message": "invalid access"});
							}
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


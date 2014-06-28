var validator=require("validator");
exports.add = function(req, res, next){
	var checkValid=1;
	var fields = ["user_id", "sap_customer_id", "name", "email"];
	if(typeof req.header("authentication_token")=="undefined" || req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(checkValid==1){
		for(var i=0; i<fields.length; i++){
			if(typeof req.body[fields[i]]=="undefined" || req.body[fields[i]]==""){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" not found"});
				break;
			}
		}
	}
	if(checkValid==1){
		if(!validator.isEmail(req.body.email)){
			checkValid=0;
			res.json({"statusCode": 422, "success": "false", "message": "invalid Email"});
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
					connection.query("SELECT * FROM `customers` where `email`='"+req.body.email+"' LIMIT 1", function(err, info){
						if(err){
							console.log(err);
							res.json({"statusCode": 500, "success":"false", "message": "internal error"});
						}
						else{
							if(info.length>0){
								res.json({"statusCode": 422, "success":"false", "message": "user already exist"});
							}
							else{
								next();
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
};
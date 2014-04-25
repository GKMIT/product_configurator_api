var validator=require("validator");

exports.rfq_general_data = function(req, res, next){
		var checkValid=1;
	var fields = ["user_id", "rfq_id"];
	if(typeof req.header("authentication_token")=="undefined" || req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(checkValid==1){
			for(var i=0; i<fields.length; i++){
			if(typeof req.params[fields[i]]=="undefined" || req.params[fields[i]]==""){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" not defined"});
			}
			else if(!validator.isNumeric(req.params[fields[i]])){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" non Numeric"});
				break;
			}
		}
	}

	if(checkValid==1){
		connection.query("SELECT `id`,`authentication_token`, `user_status` FROM `organization_users` WHERE `authentication_token`='"+req.header('authentication_token')+"' AND `id`='"+req.params.user_id+"'", function(err, organization_users) {
			if(err){
				checkValid=0
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if(organization_users.length>0){
					if(organization_users[0].user_status!=1){
						checkValid=0;
						res.json({statusCode: 401, "success":"false", message: "unauthorised user"});
					}
					else{
						next();
					}
				}
				else{
					checkValid=0;
					res.json({"statusCode": 404, "success": "false", "message": "User not found !"});
				}
			}
		});
	}
}
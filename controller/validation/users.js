exports.updatePassword = function(req, res, next){
	var checkValid=1;
	var fields = ["user_id", "old_password", "new_password", "confirmed_password"];
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
		if(req.body.new_password!=req.body.confirmed_password){
			checkValid=0;
			res.json({"statusCode": 422, "success": "false", "message": "Confirmed Password Does Not Match"});
		}
	}
	if(checkValid==1){
		connection.query("SELECT `id`, `authentication_token` FROM `organization_users` WHERE `authentication_token`='"+req.header("authentication_token")+"' AND `id`='"+req.body.user_id+"' AND `password`='"+req.body.old_password+"'", function(err, organization_users) {
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
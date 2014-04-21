exports.general_product_data_saveValidation = function(req, res, next){
	var checkValid=1;
	var fields = ["user_id", "rfq_id", "rfq_status_id"];
	if(typeof req.header("authentication_token")=="undefined" || req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(checkValid==1){
			for(var i=0; i<fields.length; i++){
			if(typeof req.body[fields[i]]=="undefined" || req.body[fields[i]]==""){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" not defined"});
			}
			if(checkValid==0){
				break;
			}
		}
	}
	if(checkValid==1){
		console.log("dsd");
		connection.query("SELECT `id`, `authentication_token` FROM `organization_users` WHERE `authentication_token`='"+req.header("authentication_token")+"' AND `id`="+req.body.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				console.log(organization_users.length);
				if (organization_users.length>0) {
					connection.query("SELECT * FROM `rfq` WHERE `id`='"+req.body.rfq_id+"' AND created_by='"+req.body.user_id+"'", function(err, rfq) {
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
exports.product_properties = function(req, res){
	if(req.header("authentication_token") && typeof req.params.user_id!=="undefined" && req.params.user_id!=="" && typeof req.params.product_lines_id && req.params.product_lines_id!==""){
		connection.query("SELECT `id`,`authentication_token` FROM `organization_users` WHERE authentication_token='"+token+"' AND id="+req.params.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json(500, {"success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
					connection.query("SELECT `id`,`property_name` FROM `product_properties` WHERE product_lines_id='"+req.params.product_lines_id+"'", function(err, product_properties) {
						if(err){
							console.log(err);
								res.json(500, {"success":"false", "message": "internal error"});
						}
						else{
							res.json(200, {"success":"true", "message":"", "product_properties":product_properties});
						}
					});
				}
				else{
					res.json(404, {"success": "false", "message": "unauthorized access"});
				}

			}
		});
	}
	else{
		if(req.header("authentication_token")){
  			res.json(422, {"success": "false", "message": "Authentication token"});
  		}
  		else if(req.params.user_id===""){
  			res.json(422, {"success": "false", "message": "user_id not found"});
  		}
  		else if(typeof req.params.user_id==="undefined"){
  			res.json(422, {"success": "false", "message": "parameter user_id not defined !"});
  		}
  		else if(req.params.product_lines_id===""){
  			res.json(422, {"success": "false", "message": "product_lines_id not found"});
  		}
  		else{
  			res.json(422, {"success": "false", "message": "parameter product_lines_id not defined"});
  		}
	}
}
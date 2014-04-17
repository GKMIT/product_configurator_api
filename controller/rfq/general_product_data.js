exports.rfq_product_lines = function(req, res){

  	if(req.header("authentication_token") && typeof req.params.user_id!=="undefined" && req.params.user_id!==""){
  		var token=req.header("authentication_token");
  	  connection.query("SELECT `id`,`authentication_token` FROM `organization_users` WHERE authentication_token='"+token+"' AND id="+req.params.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json(500, {"success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
					connection.query("SELECT `id`,`name` FROM `product_lines`", function(err, product_lines) {
					if(err){
						console.log(err);
							res.json(500, {"success":"false", "message": "internal error"});
					}
					else{
						res.json(200, {"success":"true", "message":"", "product_lines":product_lines});
					}
					});
				}else{
					res.json(404, {"success": "false", "message": "Authentication token not valid or user id not valid"});
				}
			}
		});
  	}
  	else{
  		if(req.header("authentication_token")){
  			res.json(404, {"success": "false", "message": "Authentication token"});
  		}
  		else if(req.params.user_id!==""){
  			res.json(404, {"success": "false", "message": "id not found"});
  		}
  		else{
  			res.json(404, {"success": "false", "message": "parameter not defined !"});
  		}
  		
  	}
};


exports.rfq_tendering_teams = function(req, res){
  	if(req.header("authentication_token") && typeof req.params.user_id!=="undefined" && req.params.user_id!=="" && typeof req.params.product_lines_id && req.params.product_lines_id!==""){
  		var token=req.header("authentication_token");
  	  connection.query("SELECT `id`,`authentication_token` FROM `organization_users` WHERE authentication_token='"+token+"' AND id="+req.params.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json(500, {"success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
					connection.query("SELECT `id`,`name` FROM `tendering_teams` WHERE product_lines_id='"+req.params.product_lines_id+"'", function(err, tendering_teams) {
					if(err){
						console.log(err);
							res.json(500, {"success":"false", "message": "internal error"});
					}
					else{
						res.json(200, {"success":"true", "message":"", "tendering_teams":tendering_teams});
					}
				});
				}else{
					res.json(404, {"success": "false", "message": "Authentication token not valid or user id not valid"});
				}
			}
		});
  	}
  	else{
  		if(req.header("authentication_token")){
  			res.json(404, {"success": "false", "message": "Authentication token"});
  		}
  		else if(req.params.user_id===""){
  			res.json(404, {"success": "false", "message": "user_id not found"});
  		}
  		else if(typeof req.params.user_id==="undefined"){
  			res.json(404, {"success": "false", "message": "parameter user_id not defined !"});
  		}
  		else if(req.params.product_lines_id===""){
  			res.json(404, {"success": "false", "message": "product_line_id not found"});
  		}
  		else{
  			res.json(404, {"success": "false", "message": "parameter product_line_id not defined"});
  		}
  	}
};



exports.rfq_tendering_teams_members = function(req, res){

  	if(req.header("authentication_token") && typeof req.params.user_id!=="undefined" && req.params.user_id!=="" && typeof req.params.tendering_teams_id!=="undefined" && req.params.tendering_teams_id!==""){
  		var token=req.header("authentication_token");
  	  connection.query("SELECT `id`,`authentication_token` FROM `organization_users` WHERE authentication_token='"+token+"' AND id="+req.params.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json(500, {"success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
					connection.query("SELECT `id`,`user_name` FROM `organization_users` WHERE tendering_teams_id='"+req.params.tendering_teams_id+"'", function(err, tendering_teams_members) {
					if(err){
						console.log(err);
							res.json(500, {"success":"false", "message": "internal error"});
					}
					else{
						res.json(200, {"success":"true", "message":"", "tendering_teams_members":tendering_teams_members});
					}
				});
				}else{
					res.json(404, {"success": "false", "message": "unauthorized access"});
				}
			}
		});
  	}
  	else{
  		if(req.header("authentication_token")){
  			res.json(404, {"success": "false", "message": "Authentication token"});
  		}
  		else if(req.params.user_id===""){
  			res.json(404, {"success": "false", "message": "user_id not found"});
  		}
  		else if(typeof req.params.user_id==="undefined"){
  			res.json(404, {"success": "false", "message": "parameter user_id not defined !"});
  		}
  		else if(req.params.tendering_teams_id===""){
  			res.json(404, {"success": "false", "message": "tendering_teams_id not found"});
  		}
  		else{
  			res.json(404, {"success": "false", "message": "parameter tendering_teams_id not defined"});
  		}
  	}
};




exports.general_product_data_save = function(req, res){
// console.log(req.body);
  	if(req.header("authentication_token") && typeof req.body.user_id!=="undefined" && req.body.user_id!=="" && typeof req.body.product_lines_id && req.body.product_lines_id!=="" && typeof req.body.tendering_teams_id && req.body.tendering_teams_id!=="" && typeof req.body.tendering_teams_members_id && req.body.tendering_teams_members_id!=="" && typeof req.body.rfq_id!=="undefined" && req.body.rfq_id!==""){
  		var token=req.header("authentication_token");
  	  connection.query("SELECT `id`,`authentication_token` FROM `organization_users` WHERE authentication_token='"+token+"' AND id="+req.body.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json(500, {"success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
					connection.query("UPDATE `rfq` SET `product_lines_id`='"+req.body.product_lines_id+"', `tendering_teams_id`='"+req.body.tendering_teams_id+"', `tendering_teams_members_id`='"+req.body.tendering_teams_members_id+"' WHERE `id`='"+req.body.rfq_id+"'", function(err, tendering_teams_members) {
					if(err){
						console.log(err);
							res.json(500, {"success":"false", "message": "internal error"});
					}
					else{
						res.json(200, {"success":"true", "message":"", "rfq_id":req.body.rfq_id});
					}
				});
				}else{
					res.json(404, {"success": "false", "message": "Authentication token not valid or user id not valid"});
				}
			}
		});
  	}
  	else{
  		if(req.header("authentication_token")){
  			res.json(422, {"success": "false", "message": "Authentication token"});
  		}
  		else if(req.body.user_id===""){
  			res.json(422, {"success": "false", "message": "user_id not found"});
  		}
  		else if(typeof req.body.user_id==="undefined"){
  			res.json(422, {"success": "false", "message": "parameter user_id not defined !"});
  		}
  		else if(req.body.tendering_teams_id===""){
  			res.json(422, {"success": "false", "message": "tendering_teams_id not found"});
  		}
  		else if(typeof req.body.tendering_teams_id==="undefined"){
  			res.json(422, {"success": "false", "message": "parameter tendering_teams_id not defined"});
  		}
  		else if(req.body.product_lines_id===""){
  			res.json(422, {"success": "false", "message": "product_line_id not found"});
  		}
  		else if(typeof req.body.product_lines_id==="undefined"){
  			res.json(422, {"success": "false", "message": "parameter product_line_id not defined"});
  		}
  		else if(req.body.tendering_teams_teams_members_id===""){
  			res.json(422, {"success": "false", "message": "tendering_teams_members_id not found"});
  		}
  		else if(typeof req.body.tendering_teams_teams_members_id==="undefined"){
  			res.json(422, {"success": "false", "message": "parameter tendering_teams_members_id not defined"});
  		}
  		else if(req.body.rfq_id===""){
  			res.json(422, {"success": "false", "message": "rfq_id not found"});
  		}
  		else{
  			res.json(422, {"success": "false", "message": "parameter rfq_id not defined"});
  		}
  	}
};

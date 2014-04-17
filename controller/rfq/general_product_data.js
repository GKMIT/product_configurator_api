exports.rfq_product_lines = function(req, res){
console.log(req.params);
  	if(req.header("authentication_token") && typeof req.params.user_id!=="undefined" && req.params.user_id!=="" && typeof req.params.rfq_id!=="undefined" && req.params.rfq_id!==""){
  		var token=req.header("authentication_token");
  	  connection.query("SELECT `id`,`authentication_token` FROM `organization_users` WHERE authentication_token='"+token+"' AND id="+req.params.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json(500, {"success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
					connection.query("SELECT * FROM `rfq` WHERE `id`='"+req.params.rfq_id+"' AND created_by='"+req.params.user_id+"'", function(err, rfq) {
						if(err){
								res.json(500, {"success":"false", "message": "internal error"});
						}
						else{
							connection.query("SELECT `id`,`name` FROM `product_lines`", function(err, product_lines) {
								if(err){
									console.log(err);
										res.json(500, {"success":"false", "message": "internal error"});
								}
								else{
									// if(rfq[0].tenderinr_teams_id>0){}
									// if(rfq[0].tendering_teams_members_id>0){}

									connection.query("SELECT `id`,`name` FROM `tendering_teams` WHERE product_lines_id='"+rfq[0].product_lines_id+"'", function(err, tendering_teams) {
										if(err){
											console.log(err);
												res.json(500, {"success":"false", "message": "internal error"});
										}
										else{
											connection.query("SELECT `id`,`user_name` FROM `organization_users` WHERE tendering_teams_id='"+rfq[0].tendering_teams_id+"'", function(err, tendering_teams_members) {
												if(err){
													console.log(err);
														res.json(500, {"success":"false", "message": "internal error"});
												}
												else{
													res.json(200, {"success":"true", "message":"", "product_lines":product_lines, "selected_rfq":rfq, "tendering_teams": tendering_teams, "tendering_teams_members": tendering_teams_members});
												}
											});
										}
									});

									
								}
							});
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
					connection.query("SELECT * FROM `rfq` WHERE `id`='"+req.params.rfq_id+"' AND created_by='"+req.params.user_id+"'", function(err, rfq) {
						if(err){
							console.log(err);
								res.json(500, {"success":"false", "message": "internal error"});
						}
						else{
							connection.query("SELECT `id`,`name` FROM `tendering_teams` WHERE product_lines_id='"+req.params.product_lines_id+"'", function(err, tendering_teams) {
								if(err){
									console.log(err);
										res.json(500, {"success":"false", "message": "internal error"});
								}
								else{
									res.json(200, {"success":"true", "message":"", "tendering_teams":tendering_teams, "selected_rfq":rfq});
								}
							});
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
  		else if(req.params.user_id===""){
  			res.json(422, {"success": "false", "message": "user_id not found"});
  		}
  		else if(typeof req.params.user_id==="undefined"){
  			res.json(422, {"success": "false", "message": "parameter user_id not defined !"});
  		}
  		else if(req.params.product_lines_id===""){
  			res.json(422, {"success": "false", "message": "product_line_id not found"});
  		}
  		else{
  			res.json(422, {"success": "false", "message": "parameter product_line_id not defined"});
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
					connection.query("SELECT * FROM `rfq` WHERE `id`='"+req.params.rfq_id+"' AND created_by='"+req.params.user_id+"'", function(err, rfq) {
						if(err){
							console.log(err);
								res.json(500, {"success":"false", "message": "internal error"});
						}
						else{
							connection.query("SELECT `id`,`user_name` FROM `organization_users` WHERE tendering_teams_id='"+req.params.tendering_teams_id+"'", function(err, tendering_teams_members) {
								if(err){
									console.log(err);
										res.json(500, {"success":"false", "message": "internal error"});
								}
								else{
									res.json(200, {"success":"true", "message":"", "tendering_teams_members":tendering_teams_members, "selected_rfq":rfq});
								}
							});
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
  			res.json(422, {"success": "false", "message": "Authentication token"});
  		}
  		else if(req.params.user_id===""){
  			res.json(422, {"success": "false", "message": "user_id not found"});
  		}
  		else if(typeof req.params.user_id==="undefined"){
  			res.json(422, {"success": "false", "message": "parameter user_id not defined !"});
  		}
  		else if(req.params.tendering_teams_id===""){
  			res.json(422, {"success": "false", "message": "tendering_teams_id not found"});
  		}
  		else{
  			res.json(422, {"success": "false", "message": "parameter tendering_teams_id not defined"});
  		}
  	}
};




exports.general_product_data_save = function(req, res){
	console.log(req.body);
  	if(req.header("authentication_token") && typeof req.body.user_id!=="undefined" && req.body.user_id!==""){
  		var token=req.header("authentication_token");
  	  connection.query("SELECT `id`,`authentication_token` FROM `organization_users` WHERE authentication_token='"+token+"' AND id="+req.body.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json(500, {"success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
					connection.query("SELECT * FROM `rfq` WHERE `id`='"+req.params.rfq_id+"' AND created_by='"+req.params.user_id+"'", function(err, rfq) {
						if(err){
							console.log(err);
								res.json(500, {"success":"false", "message": "internal error"});
						}
						else{
							var param = new Array();
  							var paramValue = new Array();
  							if(typeof req.body.product_lines_id!=="undefined" || req.body.product_lines_id!==""){
  								param.push("product_lines_id");
  								paramValue.push(req.body.product_lines_id);
  							}
  							if(typeof req.body.tendering_teams_id!=="undefined" || req.body.tendering_teams_id!==""){
  								param.push("tendering_teams_id");
  								paramValue.push(req.body.tendering_teams_id);
  							}
  							if(typeof req.body.tendering_teams_members_id!=="undefined" || req.body.tendering_teams_members_id!==""){
  								param.push("tendering_teams_members_id");
  								paramValue.push(req.body.tendering_teams_members_id);
  							}
  							var query="UPDATE `rfq` SET ";
  							for (var i = 0; i < param.length; i++) {
  								query=query+param[i]+"="+paramValue[i];
  								if(i+1<param.length){
  									query+=",";
  								}
  							};
  							query=query+" WHERE `id`='"+req.body.rfq_id+"' AND created_by='"+req.body.user_id+"'";
  							console.log(query);
							connection.query(query, function(err, tendering_teams_members) {
								if(err){
									console.log(err);
										res.json(500, {"success":"false", "message": "internal error"});
								}
								else{
									res.json(200, {"success":"true", "message":"", "rfq_id":req.body.rfq_id, "selected_rfq": rfq});
								}
							});
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
  		else{
  		 // if(typeof req.body.user_id==="undefined"){
  			res.json(422, {"success": "false", "message": "parameter user_id not defined !"});
  		}
  		// else if(req.body.tendering_teams_id===""){
  		// 	res.json(422, {"success": "false", "message": "tendering_teams_id not found"});
  		// }
  		// else if(typeof req.body.tendering_teams_id==="undefined"){
  		// 	res.json(422, {"success": "false", "message": "parameter tendering_teams_id not defined"});
  		// }
  		// else if(req.body.product_lines_id===""){
  		// 	res.json(422, {"success": "false", "message": "product_line_id not found"});
  		// }
  		// else if(typeof req.body.product_lines_id==="undefined"){
  		// 	res.json(422, {"success": "false", "message": "parameter product_line_id not defined"});
  		// }
  		// else if(req.body.tendering_teams_teams_members_id===""){
  		// 	res.json(422, {"success": "false", "message": "tendering_teams_members_id not found"});
  		// }
  		// else if(typeof req.body.tendering_teams_teams_members_id==="undefined"){
  		// 	res.json(422, {"success": "false", "message": "parameter tendering_teams_members_id not defined"});
  		// }
  		// else if(req.body.rfq_id===""){
  		// 	res.json(422, {"success": "false", "message": "rfq_id not found"});
  		// }
  		// else{
  		// 	res.json(422, {"success": "false", "message": "parameter rfq_id not defined"});
  		// }
  	}
};

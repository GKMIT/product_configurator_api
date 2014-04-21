function rfq_product_linesValidation(req, res, callback){
	var checkValid=1;
	if(typeof req.header("authentication_token")=="undefined" || req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(typeof req.params.user_id=="undefined" || req.params.user_id==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "user_id not found"});
	}
	else if(typeof req.params.rfq_id=="undefined" || req.params.rfq_id==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "rfq_id not found"});
	}
	else if(checkValid==1){
		connection.query("SELECT `id`,`authentication_token` FROM `organization_users` WHERE `authentication_token`='"+req.header("authentication_token")+"' AND `id`='"+req.params.user_id+"'", function(err, organization_users) {
			if(err){
				console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if(organization_users.length==0){
					checkValid=0;
					res.json({"statusCode": 404, "success": "false", "message": "user not found !"});
				}
				else{
					callback(req, res, checkValid);
				}
			}
		});
	}
}
exports.rfq_product_lines = function(req, res){
	rfq_product_linesValidation(req, res, function(req, res, checkValid){
		if (checkValid==1) {
					connection.query("SELECT * FROM `rfq` WHERE `id`='"+req.params.rfq_id+"' AND created_by='"+req.params.user_id+"'", function(err, rfq) {
						if(err){
								res.json({"statusCode": 500, "success":"false", "message": "internal error"});
						}
						else{
							if(rfq.length==0){
								res.json({"statusCode": 401, "success": "false", "message": "unauthorized access"});
							}
							else{
								connection.query("SELECT `id`,`name` FROM `product_lines`", function(err, product_lines) {
									if(err){
										console.log(err);
											res.json({"statusCode": 500, "success":"false", "message": "internal error"});
									}
									else{
										// if(rfq[0].tenderinr_teams_id>0){}
										// if(rfq[0].tendering_teams_members_id>0){}

										connection.query("SELECT `id`,`name` FROM `tendering_teams` WHERE product_lines_id='"+rfq[0].product_lines_id+"'", function(err, tendering_teams) {
											if(err){
												console.log(err);
													res.json({"statusCode": 500, "success":"false", "message": "internal error"});
											}
											else{
												connection.query("SELECT `id`,`user_name` FROM `organization_users` WHERE tendering_teams_id='"+rfq[0].tendering_teams_id+"'", function(err, tendering_teams_members) {
													if(err){
														console.log(err);
															res.json({"statusCode": 500, "success":"false", "message": "internal error"});
													}
													else{
														res.json({"statusCode": 200, "success":"true", "message":"", "product_lines":product_lines, "selected_rfq":rfq, "tendering_teams": tendering_teams, "tendering_teams_members": tendering_teams_members});
													}
												});
											}
										});

										
									}
								});
							}
							
						}
					});

				}
	});
};


function rfq_tendering_teamsValidation(req, res, callback){
	var checkValid=1;
	if(typeof req.header("authentication_token")=="undefined" || req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(typeof req.params.user_id=="undefined" || req.params.user_id==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "user_id not found"});
	}
	else if(typeof req.params.product_lines_id=="undefined" || req.params.product_lines_id==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "product_lines_id not found"});
	}
	else if(checkValid==1){
		connection.query("SELECT `id`,`authentication_token` FROM `organization_users` WHERE authentication_token='"+req.header("authentication_token")+"' AND id="+req.params.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if(organization_users.length==0){
					checkValid=0;
					res.json({"statusCode": 404, "success": "false", "message": "user not found !"});
				}
				else{
					callback(req, res, checkValid);
				}
			}
		});
	}
}

exports.rfq_tendering_teams = function(req, res){
	rfq_tendering_teamsValidation(req, res, function(req, res, checkValid){
		// connection.query("SELECT * FROM `rfq` WHERE `id`='"+req.params.rfq_id+"' AND created_by='"+req.params.user_id+"'", function(err, rfq) {
		// 	if(err){
		// 		// console.log(err);
		// 			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		// 	}
		// 	else{
			if(checkValid==1){
				connection.query("SELECT `id`,`name` FROM `tendering_teams` WHERE product_lines_id='"+req.params.product_lines_id+"'", function(err, tendering_teams) {
					if(err){
						console.log(err);
							res.json({"statusCode": 500, "success":"false", "message": "internal error"});
					}
					else{
						// res.json({"statusCode": 200, "success":"true", "message":"", "tendering_teams":tendering_teams, "selected_rfq":rfq});
						res.json({"statusCode": 200, "success":"true", "message":"", "tendering_teams":tendering_teams});
					}
				});
			}
	// 		}
	// 	});
	});
};



exports.rfq_tendering_teams_members = function(req, res){

  	if(req.header("authentication_token") && typeof req.params.user_id!=="undefined" && req.params.user_id!=="" && typeof req.params.tendering_teams_id!=="undefined" && req.params.tendering_teams_id!==""){
  		var token=req.header("authentication_token");
  	  connection.query("SELECT `id`,`authentication_token` FROM `organization_users` WHERE authentication_token='"+token+"' AND id="+req.params.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
					connection.query("SELECT * FROM `rfq` WHERE `id`='"+req.params.rfq_id+"' AND created_by='"+req.params.user_id+"'", function(err, rfq) {
						if(err){
							console.log(err);
								res.json({"statusCode": 500, "success":"false", "message": "internal error"});
						}
						else{
							connection.query("SELECT `id`,`user_name` FROM `organization_users` WHERE tendering_teams_id='"+req.params.tendering_teams_id+"'", function(err, tendering_teams_members) {
								if(err){
									console.log(err);
										res.json({"statusCode": 500, "success":"false", "message": "internal error"});
								}
								else{
									res.json({"statusCode": 200, "success":"true", "message":"", "tendering_teams_members":tendering_teams_members, "selected_rfq":rfq});
								}
							});
						}
					});
				
				}else{
					res.json({"statusCode": 404, "success": "false", "message": "unauthorized access"});
				}
			}
		});
  	}
  	else{
  		if(req.header("authentication_token")){
  			res.json({"statusCode": 422, "success": "false", "message": "Authentication token"});
  		}
  		else if(req.params.user_id===""){
  			res.json({"statusCode": 422, "success": "false", "message": "user_id not found"});
  		}
  		else if(typeof req.params.user_id==="undefined"){
  			res.json({"statusCode": 422, "success": "false", "message": "parameter user_id not defined !"});
  		}
  		else if(req.params.tendering_teams_id===""){
  			res.json({"statusCode": 422, "success": "false", "message": "tendering_teams_id not found"});
  		}
  		else{
  			res.json({"statusCode": 422, "success": "false", "message": "parameter tendering_teams_id not defined"});
  		}
  	}
};




exports.general_product_data_save = function(req, res){
	console.log("hello");
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

	param.push("rfq_status_id");
	paramValue.push(req.body.rfq_status_id);
	
	var query="UPDATE `rfq` SET ";
	for (var i = 0; i < param.length; i++) {
		query=query+param[i]+"='"+paramValue[i]+"' ";
		if(i+1<param.length){
			query+=",";
		}
	};
		query=query+" WHERE `id`='"+req.body.rfq_id+"' AND created_by='"+req.body.user_id+"'";
		// console.log(query);
	connection.query(query, function(err, tendering_teams_members) {
		if(err){
			console.log(err);
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			res.json({"statusCode": 200, "success":"true", "message":"", "rfq_id":req.body.rfq_id});
		}
	});
};

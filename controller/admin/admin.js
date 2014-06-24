exports.admin_fetch_user =function(req, res){
	var query_1="SELECT * FROM `organization_users`";
	connection.query(query_1, function(err, info){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			res.json({"statusCode": 200, "success":"true", "message": "", "users": info});
		}
	});
};

exports.admin_create_user = function(req, res){
	// if user_name will need to calculate from our end then
	var email_parts=req.body.email.split("@");
	var user_name=email_parts[0];

	var query_1="INSERT INTO `organization_users` (`reports_to_id`,`tendering_teams_id`, `sales_hubs_id`, `user_name`, `full_name`, `password`, `email`, `user_status`, `sysadmin`) VALUES('"+req.body.report_to_id+"', '"+req.body.tendering_teams_id+"', '"+req.body.sales_hubs_id+"', '"+user_name+"', '"+req.body.full_name+"', '"+req.body.password+"', '"+req.body.email+"', '"+req.body.user_status+"', '"+req.body.sysadmin+"')";

	// var query_1="INSERT INTO `organization_users` (`reports_to_id`,`tendering_teams_id`, `sales_hubs_id`, `user_name`, `full_name`, `password`, `email`, `user_status`, `sysadmin`) VALUES('"+req.body.report_to_id+"', '"+req.body.tendering_teams_id+"', '"+req.body.sales_hubs_id+"', '"+req.body.user_name+"', '"+req.body.full_name+"', '"+req.body.password+"', '"+req.body.email+"', '"+req.body.user_status+"', '"+req.body.sysadmin+"')";

	connection.query(query_1, function(err, info){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			res.json({"statusCode": 201, "success":"true", "message": "", "user_id":info.insertId});
		}
	});
};

exports.admin_update_user = function(req, res){
	// if user_name will need to calculate from our end then
	var email_parts=req.body.email.split("@");
	var user_name=email_parts[0];
	var query_1="UPDATE `organization_users` SET `reports_to_id`='"+req.body.report_to_id+"', `tendering_teams_id`='"+req.body.tendering_teams_id+"', `sales_hubs_id`='"+req.body.sales_hubs_id+"', `user_name`='"+user_name+"', `full_name`='"+req.body.full_name+"', `password`='"+req.body.password+"', `email`='"+req.body.email+"', `user_status`='"+req.body.user_status+"' WHERE `id`='"+req.body.update_user_id+"'";

	// var query_1="UPDATE `organization_users` SET `report_to_id`='"+req.body.report_to_id+"', `tendering_teams_id`='"+req.body.tendering_teams_id+"', `sales_hubs_id`='"+req.body.sales_hubs_id+"', `user_name`='"+req.body.user_name+"', `full_name`='"+req.body.full_name+"', `password`='"+req.body.password+"', `email`='"+req.body.email+"', `user_status`='"+req.body.user_status+"'";
	connection.query(query_1, function(err, info){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			res.json({"statusCode": 200, "success":"true", "message": "", "id":req.body.update_user_id, "affectedRows": info.affectedRows});
		}
	});
};

exports.admin_enable_disable_user = function(req, res){
	var query_1="UPDATE `organization_users` SET `user_status`='"+req.body.user_status+"' WHERE id='"+req.body.update_user_id+"'";
	connection.query(query_1, function(err, info){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			console.log(info);
			res.json({"statusCode": 200, "success":"true", "message": "", "id":req.body.update_user_id, "affectedRows": info.affectedRows});
		}
	});
};
var validator=require('validator');

 
exports.login = function(req, res){

if(typeof req.body.email==="undefined" || typeof req.body.password==="undefined" || req.body.password==="" || req.body.email===""){
	if(req.body.email===""){
		res.json(422, {"success":"false","message":"Email value not found"});
	}
	if(req.body.password===""){
		res.json(422, {"success":"false","message":"password value not found"});
	}
	if(typeof req.body.email==="undefined"){
		res.json(422, {"success":"false","message":"Email not found"});
	}
	if(typeof req.body.password==="undefined"){
		res.json(422, {"success":"false", "message":"password not found"});
	}
}
else{
		var email=req.body.email;
		var password=req.body.password;

		// password = crypto.createHash('md5').update(password).digest('hex');
		// password=secrate.encrypt(password);

		if(!validator.isEmail(email)){
			res.json(422, {"success":"false","message" : "email not valid"});
		}
		connection.query("SELECT `id`,`tendering_teams_id`, `sales_hubs_id`, `sysadmin`, `user_name`, `email` FROM `organization_users` WHERE `email`='"+email+"' AND `password`='"+password+"' AND `user_status`=1 limit 1 ", function(err, rows) {
			if(err){
				console.log(err);
						res.json(500,{"success":"false", message: "internal error"});
					}
			else{
				
				if(rows.length > 0 ){
					var time = new Date().getTime();
					var auth_token=email+time;
					auth_token=crypto.createHash('md5').update(auth_token).digest('hex');
					connection.query("UPDATE `organization_users` SET `authentication_token`='"+auth_token+"' WHERE `email`='"+email+"' AND password='"+password+"'", function(
							err, result) {
						if(err){
							res.json(500, {"success":"false", message: "internal error"});
						}
						else{
							var priv=0;
							if(rows[0].sales_hubs_id){
								priv=1;
							}
							if(rows[0].tendering_teams_id){
								priv=2;
							}
							if(rows[0].sysadmin){
								priv=4;
							}
							if(rows[0].sales_hubs_id && rows[0].tendering_teams_id){
								priv=3;
							}
							res.json(200, {"success":"true", "message":"", "priv": priv, "authentication_token":auth_token, "data":rows});
						}
					});
				} else {
					res.json(404, {"success":"false","message":"user not found"});
				}
			}
	});
}
};

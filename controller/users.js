var validator=require('validator');

 
exports.login = function(req, res){
	validateUser(req, res, function(email, password, req, res, checkValid){
		testUser(email, password, req, res, checkValid);
	});
};

function validateUser(req, res, callback){
	var fields = new Array();
	fields.push("email");
	fields.push("password");
	var parameterValue=JSON.parse(JSON.stringify(req.body));
	var i=0;
	var checkValid=1;
	
	for (i = 0; i < fields.length; i++) {
		if(typeof parameterValue[fields[i]]=="undefined"){
			checkValid=0;
			res.json({statusCode: 404, "success":"false", "message": "paramter "+fields[i]+" not found"});
		}
		if(parameterValue[fields[i]] == ""){
			checkValid=0;
			res.json({statusCode: 404, "success":"false", "message": fields[i]+" value not found"});
		}
	}	
		var email=req.body.email;
		var password=req.body.password;
		if(checkValid==1){
			if(!validator.isEmail(req.body.email)){
				checkValid=0;
				res.json({statusCode: 422, "success":"false", "message": "invalid email "});
			}
		}
		
		
		if(i==fields.length){
			if(checkValid==1){
				callback(email, password, req, res, checkValid);
			}
		}
}

function testUser(email, password, req, res){
	connection.query("SELECT `id`,`tendering_teams_id`, `sales_hubs_id`, `sysadmin`, `user_name`, `email`, `user_status` FROM `organization_users` WHERE `email`='"+email+"' AND `password`='"+password+"' limit 1 ", function(err, rows) {
		if(err){
				res.json({statusCode: 500, "success":"false", message: "internal error"});
		}
		else{
			if(rows.length > 0 ){
				if(rows[0].user_status!=1)
				{
					res.json({statusCode: 401, "success":"false", message: "unathorised user"});
				}
				else if(rows[0].user_status==1){
					var time = new Date().getTime();
					var auth_token=email+time;
					auth_token=crypto.createHash('md5').update(auth_token).digest('hex');
					connection.query("UPDATE `organization_users` SET `authentication_token`='"+auth_token+"' WHERE `id`='"+rows[0].id+"'", function(
							err, result) {
						if(err){
							res.json({statusCode: 500, "success":"false", message: "internal error"});
						}
						else{
							var priv=0;
							if(rows[0].sysadmin){
								priv=4;
							} else if(rows[0].sales_hubs_id && rows[0].tendering_teams_id){
								priv=3;
							}else if(rows[0].sales_hubs_id){
								priv=1;
							}else if(rows[0].tendering_teams_id){
								priv=2;
							}
							
							if (priv==0)
								res.json({statusCode: 500, "success":"false", message: "internal error"});
							else
								res.json({statusCode: 200, "success":"true", "message":"", "priv": priv, "authentication_token":auth_token, "data":rows});
						}
					});
				}
				
			}
			else {
				res.json({statusCode: 404, "success":"false","message":"user not found"});
			}
		}
	});
}

exports.updatePassword = function(req, res){
	var query="UPDATE `organization_users` SET `password`='"+req.body.new_password+"' WHERE `id`='"+req.body.user_id+"'";
	connection.query(query, function(err, info){
		if(err){
			console.log(err);
			res.json({statusCode: 500, "success":"false", message: "internal error"});
		}
		else{
			res.json({statusCode: 200, "success":"true", message: "password updated successfully"});
		}
	});
}
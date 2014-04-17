exports.rfq_partial_show = function(req, res){
	console.log(req.body);
	console.log(req.body.user_id);
	if(req.header("authentication_token") && typeof req.body.user_id!=="undefined" && req.body.user_id!==""){

		connection.query("SELECT `id`,`authentication_token` FROM `organization_users` WHERE authentication_token='"+req.header("authentication_token")+"' AND id="+req.body.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json(500, {"success":"false", "message": "internal error"});
			}
			else{
				var query="SELECT cust.name, count.name,   FROM customers cust, countries count, rfq, sales_agents sa WHERE";
			}
		});
	}
	else{
		if(req.body.user_id===""){
			res.json(422, {"success":"false", "message": "user_id not found"});
		}
		else if(typeof req.body.user_id==="undefined"){
			res.json(422, {"success":"false", "message": "parameter user_id not defined"});
		}else{
			res.json(422, {"success":"false", "message": "Authentication token not found"});
		}
	}

};


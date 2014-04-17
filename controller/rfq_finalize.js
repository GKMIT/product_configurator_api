exports.rfq_finalize = function(req, res){
	console.log(req.body);
	console.log(req.body.user_id);
	if(req.header("authentication_token") && typeof req.body.user_id!=="undefined" && req.body.user_id!==""){

		connection.query("SELECT `id`,`authentication_token` FROM `organization_users` WHERE authentication_token='"+req.header("authentication_token")+"' AND id="+req.body.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json(500, {"success":"false", "message": "internal error"});
			}
			else{
				var query="SELECT rfq.id, cust.name, countries.name as customer_country, inst.name as customer_country, rfq.date_rfq_in, agent.name FROM rfq JOIN customers cust ON rfq.customers_id=cust.id JOIN sales_agents agent ON rfq.sales_agents_id=agent.id JOIN countries ON countries.id=rfq.installation_country  JOIN countries as inst ON inst.id=rfq.customer_country WHERE rfq_status_id=1";
				connection.query("SELECT `id`,`authentication_token` FROM `organization_users` WHERE authentication_token='"+req.header("authentication_token")+"' AND id="+req.body.user_id, function(err, organization_users) {
					if(err){
						console.log(err);
							res.json(500, {"success":"false", "message": "internal error"});
					}
					else{
					}
				});
			}
		});
	}
	else{
		if(typeof req.body.user_id==="undefined" || req.body.user_id===""){
			res.json(404, {"success":"false", "message": "user_id not found"});
		}else{
			res.json(404, {"success":"false", "message": "Authentication token not found"});
		}
	}

};


exports.rfq_partial_show = function(req, res){
	if(req.header("authentication_token") && typeof req.params.user_id!=="undefined" && req.params.user_id!==""){

		connection.query("SELECT `id`,`authentication_token` FROM `organization_users` WHERE authentication_token='"+req.header("authentication_token")+"' AND id="+req.params.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json(500, {"success":"false", "message": "internal error"});
			}
			else{
				var query="SELECT rfq.id, cust.name, countries.name as customer_country, inst.name as installation_country, rfq.date_rfq_in, agent.name, rfq.rfq_status_id FROM rfq JOIN customers cust ON rfq.customers_id=cust.id LEFT JOIN sales_agents agent ON rfq.sales_agents_id=agent.id JOIN countries ON countries.id=rfq.installation_country  JOIN countries as inst ON inst.id=rfq.customer_country WHERE `rfq_status_id`='0' OR `rfq_status_id`='1' AND created_by='"+req.params.user_id+"'";
				console.log(query);
				connection.query(query, function(err, partial_rfq) {
					if(err){
						console.log(err);
							res.json(500, {"success":"false", "message": "internal error"});
					}
					else{
						res.json(200, {"success":"true", "message": "", "partial_rfq":partial_rfq});
					}
				});
			}
		});
	}
	else{
		if(typeof req.params.user_id==="undefined"){
			res.json(422, {"success":"false", "message": "parameter user_id not found"});
		}else if(req.params.user_id===""){
			res.json(422, {"success":"false", "message": "Authentication token not found"});
		}
	}

};


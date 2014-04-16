exports.rfq_general_data = function(req, res){

// console.log("hello");
// console.log(req.params.id);
  	if(req.header("authentication_token") || req.params.id){
  		var token=req.header("authentication_token");
  		// console.log(token);
  	  connection.query("SELECT `id`,`authentication_token` FROM `organization_users` WHERE authentication_token='"+token+"' AND id="+req.params.id, function(err, organization_users) {
			if(err){
					res.json(500, {"success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
					connection.query("SELECT `id`,`name` FROM `sales_hubs`", function(err, sales_hubs) {
						if(err){
								res.json(500, {"success":"false", "message": "internal error"});
								}
						else{
							connection.query("SELECT `id`,`name` FROM `countries`", function(err, countries) {
								if(err){
										res.json(500, {"success":"false", "message": "internal error"});
								}
								else{
									connection.query("SELECT `id`,`name` FROM `customers`", function(err, customers) {
										if(err){
												res.json(500, {"success":"false", "message": "internal error"});
										}
										else{
											connection.query("SELECT `id`,`description` FROM `type_of_quotes`", function(err, type_of_quote) {
												if(err){
														res.json(500, {"success":"false", "message": "internal error"});
												}
												else{
													connection.query("SELECT `id`,`name` FROM `sales_segments`", function(err, sales_segments) {
														if(err){
																res.json(500, {"success":"false", "message": "internal error"});
														}
														else{
															res.json(200, {"success":"true", "message": "", "sales_hubs": sales_hubs, "countries": countries, "customers": customers, "type_of_quote": type_of_quote, "sales_segments": sales_segments});
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}else{
					res.json(422, {"success": "false", "message": "Authentication token not valid"});
				}
			}
		});
  	}
  	else{
  		res.json(404, {"success": "false", "message": "Authentication token and id not found"});
  	}
};


exports.rfq_product_data = function(req, res){
	res.json(200, {"a":"a"});
};

exports.rfq_general_data_sales_agents = function(req, res){
	if(req.header("authentication_token") && req.params.country_id && req.params.user_id){
		connection.query("SELECT `id`,`authentication_token` FROM `organization_users` WHERE authentication_token='"+req.header("authentication_token")+"' AND id="+req.params.user_id, function(err, organization_users) {
			if(err){
					res.json(500, {"success":"false", "message": "internal error"});
			}
			else{
				connection.query("SELECT `sa`.`id`,`sa`.`name` FROM `sales_agents` `sa`, `agent_country_allocation` `aca` WHERE sa.id=aca.sales_agents_id AND countries_id='"+req.params.country_id+"'", function(err, sales_agents) {
					if(err){
							res.json(500, {"success":"false", "message": "internal error"});
					}
					else{
						res.json(200, {"success":"true", "message": "", "sales_agents": sales_agents});
					}
				});
			}
		});
	}
	else{
		if(!req.header("authentication_token")){
			res.json(422, {"success":"false", "message": "Authentication token not found"});
		}
		else if(typeof req.params.country_id==="undefined"){
			res.json(422, {"success":"false", "message": "country_id not found"});
		}
		else{
			res.json(404, {"success":"false", "message": "user_id not found"});
		}
	}
};

exports.rfq_general_data_sales_persons=function(req, res){
	if(req.header("authentication_token") && req.params.user_id && req.params.sales_hubs_id){
		connection.query("SELECT `id`,`authentication_token` FROM `organization_users` WHERE authentication_token='"+req.header("authentication_token")+"' AND id="+req.params.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json(500, {"success":"false", "message": "internal error"});
			}
			else{
				connection.query("SELECT `id`, `user_name` FROM `organization_users` WHERE `sales_hubs_id`='"+req.params.sales_hubs_id+"'", function(err, sales_persons) {
					if(err){
						console.log(err);
							res.json(500, {"success":"false", "message": "internal error"});
					}
					else{
						res.json(200, {"success":"true", "message": "", "sales_persons": sales_persons});
					}
				});
			}
		});
	}
	else{
		if(!req.header("authentication_token")){
			res.json(422, {"success":"false", "message": "Authentication token not found"});
		}
		else if(typeof req.params.sales_hubs_id==="undefined"){
			res.json(422, {"success":"false", "message": "sales_hubs_id not found"});
		}
		else{
			res.json(404, {"success":"false", "message": "user_id not found"});
		}
	}
};




exports.save_rfq_general_data = function(req, res){
	console.log(req.body);
	if(req.header("authentication_token") || typeof req.body.user_id=="undefined" || req.body.user_id){

		connection.query("SELECT `id`,`authentication_token` FROM `organization_users` WHERE authentication_token='"+req.header("authentication_token")+"' AND id="+req.body.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json(500, {"success":"false", "message": "internal error"});
			}
			else{
				var param = new Array();
  				var paramValue = new Array();
				
				if(typeof req.body.sales_hub_id!=="undefined" && req.body.sales_hub_id!==""){
					console.log("sdfdfdf");
					param.push("sales_hub_id");
					paramValue.push(req.body.sales_hub_id);
					console.log(req.body.sales_hub_id);

				}
				if(typeof req.body.sales_person_id!=="undefined" && req.body.sales_person_id!==""){
					param.push("sales_person_id");
					paramValue.push(req.body.sales_person_id);
				}
				if(typeof req.body.customer_country!=="undefined" && req.body.customer_country!==""){
					param.push("customer_country");
					paramValue.push(req.body.customer_country);
				}
				if(typeof req.body.installation_country!=="undefined" && req.body.installation_country!==""){
					param.push("installation_country");
					paramValue.push(req.body.installation_country);
				}
				if(typeof req.body.customers_id!=="undefined" && req.body.customers_id!==""){
					param.push("customers_id");
					paramValue.push(req.body.customers_id);
				}
				if(typeof req.body.type_of_quote_id!=="undefined" && req.body.type_of_quote_id!==""){
					param['type_of_quote_id'] = req.body.type_of_quote_id;
				}
				if(typeof req.body.project_name!=="undefined" && req.body.project_name!==""){
					param.push("project_name");
					paramValue.push(req.body.project_name);
				}
				if(typeof req.body.date_rfq_in!=="undefined" && req.body.date_rfq_in!==""){
					param.push("date_rfq_in");
					paramValue.push(req.body.date_rfq_in);
				}
				if(typeof req.body.sales_segments_id!=="undefined" && req.body.sales_segments_id!==""){
					param.push("sales_segments_id");
					paramValue.push(req.body.sales_segments_id);
				}
				if(typeof req.body.sales_agents_id!=="undefined" && req.body.sales_agents_id!==""){
					param.push("sales_agents_id");
					paramValue.push(req.body.sales_agents_id);
				}
				if(typeof req.body.requested_quotation_date!=="undefined" && req.body.requested_quotation_date!==""){
					param.push("requested_quotation_date");
					paramValue.push(req.body.requested_quotation_date);
				}
				if(typeof req.body.probability!=="undefined" && req.body.probability!==""){
					param.push("probability");
					paramValue.push(req.body.probability);
				}
				var query="INSERT INTO rfq (";
				var queryparam="";
				var queryValue="VALUES(";
				for(var i=0; i<param.length; i++){
					queryparam=queryparam+param[i];
					queryValue=queryValue+"'"+paramValue[i]+"'";
					console.log(paramValue[i]);
					if(i+1<param.length){
						queryparam=queryparam+",";
						queryValue=queryValue+",";
					}
				}
				query=query+queryparam+")"+queryValue+")";
				console.log(query);
				

				connection.query(query, function(err, rows) {
				if(err){
						res.json(500, {"success":"false", "message": "internal error"});
				}
				else{
					res.json(200, {"success": "true", "message": ""});
				}
				
			});
			}
		});
	}
	else{
		res.json(404, {"success":"false", "message": "Authentication token not found"});
	}

};


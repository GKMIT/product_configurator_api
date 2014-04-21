function get_rfq_generalValidation(req, res, callback){
	var checkValid=1;
	if(req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(typeof req.header("authentication_token")=="undefined"){
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not defined"});	
	}
	else if(typeof req.params.user_id=="undefined"){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "parameter user_id not defined !"});
	}
	else if(req.params.user_id==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "user_id not found"});
	}
	else if(checkValid==1){
		connection.query("SELECT `id`,`authentication_token`, `user_status` FROM `organization_users` WHERE `authentication_token`='"+req.header('authentication_token')+"' AND `id`='"+req.params.user_id+"'", function(err, organization_users) {
			if(err){
				checkValid=0
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{

				console.log("welcome"+organization_users.length);
				if(organization_users.length>0){
					if(organization_users[0].user_status!=1){
						checkValid=0;
						res.json({statusCode: 401, "success":"false", message: "unauthorised user"});
					}
				}
				else{
					checkValid=0;
					res.json({"statusCode": 404, "success": "false", "message": "User not found !"});
				}
			}
		});
	}
	else if(checkValid==1){
		if(typeof req.params.rfq_id=="undefined"){
			checkValid=0;
			res.json({"statusCode": 404, "success": "false", "message": "parameter rfq_id not defined !"});
		}
		else if(req.params.rfq_id!==""){
			checkValid=0;
			res.json({"statusCode": 404, "success": "false", "message": "parameter rfq_id not defined !"});
		}
	}
	// else if(checkValid==1){
	// 	console.log("reach to callaback");
		callback(req, res, checkValid);
	// }
	// else if(ch)
	
}

function get_rfq_genereral_data(req, res, checkValid){
		connection.query("SELECT * FROM `rfq` WHERE `id`='"+req.params.rfq_id+"' AND created_by='"+req.params.user_id+"'", function(err, rfq) {
			if(err){
				console.log(err);
				res.json({"statusCode":500, "success":"false", "message": "internal error"});
			}
			else{
				connection.query("SELECT `id`,`name` FROM `sales_hubs`", function(err, sales_hubs) {
					if(err){
							res.json({"statusCode":500, "success":"false", "message": "internal error"});
							}
					else{
						connection.query("SELECT `id`,`name` FROM `countries`", function(err, countries) {
							if(err){
									res.json({"statusCode":500, "success":"false", "message": "internal error"});
							}
							else{
								connection.query("SELECT `id`,`name` FROM `customers`", function(err, customers) {
									if(err){
											res.json({"statusCode":500, "success":"false", "message": "internal error"});
									}
									else{
										connection.query("SELECT `id`,`description` FROM `type_of_quotes`", function(err, type_of_quote) {
											if(err){
													res.json({"statusCode":500, "success":"false", "message": "internal error"});
											}
											else{
												connection.query("SELECT `id`,`name` FROM `sales_segments`", function(err, sales_segments) {
													if(err){
															res.json({"statusCode":500, "success":"false", "message": "internal error"});
													}
													else{
														if(rfq.length<=0){
															res.json({"statusCode":200, "success":"true", "message": "", "sales_hubs": sales_hubs, "countries": countries, "customers": customers, "type_of_quote": type_of_quote, "sales_segments": sales_segments, "selected_rfq": "", "sales_agents": "", "sales_persons": ""});
														}
														else{
															connection.query("SELECT `sa`.`id`,`sa`.`name` FROM `sales_agents` `sa`, `agent_country_allocation` `aca` WHERE sa.id=aca.sales_agents_id AND countries_id='"+rfq[0].customer_country+"'", function(err, sales_agents) {
																if(err){
																		res.json({"statusCode":500, "success":"false", "message": "internal error"});
																}
																else{
																	connection.query("SELECT `id`, `user_name` FROM `organization_users` WHERE `sales_hubs_id`='"+rfq[0].sales_hub_id+"'", function(err, sales_persons) {
																		if(err){
																			console.log(err);
																				res.json({"statusCode":500, "success":"false", "message": "internal error"});
																		}
																		else{
																			res.json({"statusCode":200, "success":"true", "message": "", "sales_hubs": sales_hubs, "countries": countries, "customers": customers, "type_of_quote": type_of_quote, "sales_segments": sales_segments, "selected_rfq": rfq, "sales_agents": sales_agents, "sales_persons": sales_persons});
																		}
																	});																					
																}
															});																			
														}																		
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
			}
		});
}

exports.rfq_general_data = function(req, res){
	get_rfq_generalValidation(req, res, function(req, res, checkValid){
		// console.log("welcome"+checkValid);
		if(checkValid==1)
		get_rfq_genereral_data(req, res, checkValid);
	});
};

// API Code for GET Agents
function get_rfq_general_data_sales_agentsValidation(req, res, callback){
	var checkValid=1;
	if(req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(typeof req.header("authentication_token")=="undefined"){
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not defined"});	
	}
	else if(typeof req.params.country_id=="undefined"){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "parameter country_id not defined !"});
	}
	else if(req.params.country_id==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "country_id not found"});
	}
	else if(typeof req.params.user_id=="undefined"){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "parameter user_id not defined !"});
	}
	else if(req.params.user_id==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "user_id not found"});
	}
	else if(checkValid==1){
		connection.query("SELECT `id`,`authentication_token`, `user_status` FROM `organization_users` WHERE authentication_token='"+req.header('authentication_token')+"' AND id='"+req.params.user_id+"'", function(err, organization_users) {
			if(err){
				checkValid=0
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if(organization_users.length>0){
					if(organization_users[0].user_status!=1){
						checkValid=0;
						res.json({statusCode: 401, "success":"false", message: "unauthorised user"});
					}
				}
				else{
					checkValid=0;
					res.json({statusCode: 404, "success":"false", message: "user not valid"});
				}
			}
		});
	}
		callback(req, res, checkValid);
}

function get_rfq_general_data_sales_agents(req, res){
	connection.query("SELECT `sa`.`id`,`sa`.`name` FROM `sales_agents` `sa`, `agent_country_allocation` `aca` WHERE sa.id=aca.sales_agents_id AND countries_id='"+req.params.country_id+"'", function(err, sales_agents) {
		if(err){
				res.json({"statusCode":500, "success":"false", "message": "internal error"});
		}
		else{
			res.json({"statusCode":200, "success":"true", "message": "", "sales_agents": sales_agents});
		}
	});
}
exports.rfq_general_data_sales_agents = function(req, res){
		get_rfq_general_data_sales_agentsValidation(req, res, function(req, res, checkValid){
			if(checkValid==1){
				get_rfq_general_data_sales_agents(req, res);
			}
		});
};


// API Code for the sales_persons
function rfq_general_data_sales_personsValidation(req, res, callback){
	// if(req.header("authentication_token") && req.params.user_id && req.params.sales_hubs_id){
	var checkValid=1;
	if(req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(typeof req.header("authentication_token")=="undefined"){
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not defined"});	
	}
	else if(typeof req.params.user_id=="undefined"){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "parameter user_id not defined !"});
	}
	else if(req.params.user_id==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "user_id not found"});
	}
	else if(typeof req.params.sales_hubs_id=="undefined"){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "parameter sales_hubs_id not defined !"});
	}
	else if(req.params.sales_hubs_id==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "sales_hubs_id value not found"});
	}
	else if(checkValid==1){
		connection.query("SELECT `id`,`authentication_token`, `user_status` FROM `organization_users` WHERE authentication_token='"+req.header('authentication_token')+"' AND id='"+req.params.user_id+"'", function(err, organization_users) {
			if(err){
				checkValid=0
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if(organization_users.length>0){
					if(organization_users[0].user_status!=1){
						checkValid=0;
						res.json({statusCode: 401, "success":"false", message: "unauthorised user"});
					}
				}
				else{
					checkValid=0;
					res.json({"statusCode": 404, "success": "false", "message": "User not found !"});
				}
			}
		});
	}
	callback(req, res, checkValid);
}
function get_rfq_general_data_sales_persons(req, res){
	connection.query("SELECT `id`, `user_name` FROM `organization_users` WHERE `sales_hubs_id`='"+req.params.sales_hubs_id+"'", function(err, sales_persons) {
		if(err){
			console.log(err);
				res.json({"statusCode":500, "success":"false", "message": "internal error"});
		}
		else{
			res.json({"statusCode":200, "success":"true", "message": "", "sales_persons": sales_persons});
		}
	});
}

exports.rfq_general_data_sales_persons=function(req, res){
	rfq_general_data_sales_personsValidation(req, res, function(req, res, checkValid){
		if(checkValid==1){
			get_rfq_general_data_sales_persons(req, res);
		}
	});
};


// API Code for the save new rfq
function save_rfq_general_dataValidation(req, res, callback){
	var checkValid=1;
	var query="";
	var param = ["user_id", "sales_hub_id", "sales_person_id", "customers_id", "customer_country", "type_of_quote_id", "date_rfq_in", "sales_segments_id", "requested_quotation_date", "probability"];
	if(req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(typeof req.header("authentication_token")=="undefined"){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not defined"});	
	}
	if(checkValid==1){
		var parameterValue=JSON.parse(JSON.stringify(req.body));
			for(var i=0; i<param.length; i++){
				var fieldName=param[i];
			if(typeof parameterValue[param[i]]=="undefined"){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": param[i]+" not defined"});
			}
			else if(parameterValue[param[i]]==""){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": param[i]+" not defined"});
			}
			if(checkValid==0){
				break;
			}
		}
	}
	if(checkValid==1){
		connection.query("SELECT `id`,`authentication_token`, `user_status` FROM `organization_users` WHERE authentication_token='"+req.header('authentication_token')+"' AND id='"+req.body.user_id+"'", function(err, organization_users) {
			if(err){
				checkValid=0
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if(organization_users.length>0){
					if(organization_users[0].user_status!=1){
						checkValid=0;
						res.json({statusCode: 401, "success":"false", message: "unauthorised user"});
					}
					else{

					}
				}
				else{
					checkValid=0;
					res.json({"statusCode": 404, "success": "false", "message": "User not found !"});
				}
			}
		});
	}
						callback(req, res, checkValid);	
	
} 

exports.save_rfq_general_data = function(req, res){
	save_rfq_general_dataValidation(req, res, function(req, res, checkValid){
		if(checkValid==1){
			console.log("valid");
				var param = new Array();
  				var paramValue = new Array();
				// var flag="true";
				if(typeof req.body.installation_country!=="undefined" && req.body.installation_country!==""){
					param.push("installation_country");
					paramValue.push(req.body.installation_country);
				}
				if(typeof req.body.project_name!=="undefined" && req.body.project_name!==""){
					param.push("project_name");
					paramValue.push(req.body.project_name);
				}
				if(typeof req.body.sales_agents_id!=="undefined" && req.body.sales_agents_id!==""){
					param.push("sales_agents_id");
					paramValue.push(req.body.sales_agents_id);
				}
					


					var query="INSERT INTO rfq (";
					var queryparam="sales_hub_id, sales_person_id, customers_id, customer_country, type_of_quote_id, date_rfq_in, sales_segments_id, requested_quotation_date, created_by, rfq_status_id, probability";
					var queryValue="VALUES('"+req.body.sales_hub_id+"','"+req.body.sales_person_id+"','"+req.body.customers_id+"','"+req.body.customer_country+"','"+req.body.type_of_quote_id+"','"+req.body.date_rfq_in+"','"+req.body.sales_segments_id+"','"+req.body.requested_quotation_date+"','"+req.body.user_id+"','0','"+req.body.probability+"'";
					for(var i=0; i<param.length; i++){
						if(i==0){
							queryparam=queryparam+",";
							queryValue=queryValue+",";
						}
						queryparam=queryparam+""+param[i];
						queryValue=queryValue+"'"+paramValue[i]+"'";
						if(i+1<param.length){
							queryparam=queryparam+",";
							queryValue=queryValue+",";
						}
					}
					query=query+queryparam+")"+queryValue+")";
					connection.query(query, function(err, info) {
						if(err){
								res.json({"statusCode":500, "success":"false", "message": "internal error"});
						}
						else{
							res.json({"statusCode":200, "success": "true", "message": "", "rfq_id": info.insertId});
						}
					});
		}
	});
		
};

// API Code for the update call rfq
function update_rfq_general_dataValidation(req, res, callback){
	var checkValid=1;
	var param = ["user_id", "rfq_id", "sales_hub_id", "sales_person_id", "customers_id", "customer_country", "type_of_quote_id", "date_rfq_in", "sales_segments_id", "requested_quotation_date", "probability"];
	if(req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(typeof req.header("authentication_token")=="undefined"){
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not defined"});	
	}
	if(checkValid==1){
		var parameterValue=JSON.parse(JSON.stringify(req.body));
			for(var i=0; i<param.length; i++){
				var fieldName=param[i];
				// console.log(param[i]);
			if(typeof parameterValue[param[i]]=="undefined"){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": param[i]+" not defined"});
			}
			else if(parameterValue[param[i]]==""){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": param[i]+" not defined"});
			}
			if(checkValid==0){
				break;
			}
		}
	}
	if(checkValid==1){
		connection.query("SELECT `id`,`authentication_token`, `user_status` FROM `organization_users` WHERE authentication_token='"+req.header('authentication_token')+"' AND id='"+req.body.user_id+"'", function(err, organization_users) {
			if(err){
				checkValid=0
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if(organization_users.length>0){
					if(organization_users[0].user_status!=1){
						checkValid=0;
						res.json({statusCode: 401, "success":"false", message: "unauthorised user"});
					}
					else{

					}
				}
				else{
					checkValid=0;
					res.json({"statusCode": 404, "success": "false", "message": "User not found !"});
				}
			}
		});
	}
		callback(req, res, checkValid);	
	// }

	

}


exports.update_rfq_general_data = function(req, res){
	update_rfq_general_dataValidation(req, res, function(req, res, checkValid){
		connection.query("SELECT `id` FROM `rfq` WHERE id='"+req.body.rfq_id+"' AND created_by='"+req.body.user_id+"'", function(err, created_by) {
			if(err){
				checkValid=0
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{

				if(created_by.length==0){
					checkValid=0;
					res.json({statusCode: 401, "success":"false", message: "unauthorised access of RFQ"});
				}
			}
		});
		if(checkValid==1){
			var param = new Array();
				var paramValue = new Array();
			
				param.push("rfq_status_id");
				// partial status code is 1
				paramValue.push("1");

			if(typeof req.body.sales_agents_id!=="undefined" && req.body.sales_agents_id!==""){
				param.push("sales_agents_id");
				paramValue.push(req.body.sales_agents_id);
			}

			if(typeof req.body.project_name!=="undefined" && req.body.project_name!==""){
				param.push("project_name");
				paramValue.push(req.body.project_name);
			}

			if(typeof req.body.installation_country!=="undefined" && req.body.installation_country!==""){
				param.push("installation_country");
				paramValue.push(req.body.installation_country);
			}

				var query="UPDATE rfq ";
				var queryparam=" SET `sales_hub_id`='"+req.body.sales_hubs_id+"', `sales_person_id`='"+req.body.sales_person_id +"', `customers_id`='"+req.body.customers_id+"', `customer_country`='"+req.body.customer_country+"', `type_of_quote_id`='"+req.body.type_of_quote_id+"', `date_rfq_in`='"+req.body.date_rfq_in+"', `sales_segments_id`='"+req.body.requested_quotation_date+"', `created_by`='"+req.body.user_id+"', `probability`='"+req.body.probability+"'";
				var queryValue="";
				for(var i=0; i<param.length; i++){
					if(i==0){
						queryparam=queryparam+",";
					}
					queryparam=queryparam+"`"+param[i]+"`='"+paramValue[i]+"'";
					if(i+1<param.length){
						queryparam=queryparam+",";
					}
				}
				query=query+queryparam+ " WHERE id='"+req.body.rfq_id+"' AND created_by='"+req.body.user_id+"'";
				// console.log(query);
				connection.query(query, function(err, info) {
					if(err){
							res.json({"statusCode":500, "success":"false", "message": "internal error"});
					}
					else{
						res.json({"statusCode":200, "success": "true", "message": "", "rfq_id": req.body.rfq_id});
					}
				});
		}
	});	
};
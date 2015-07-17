var validator=require("validator");
exports.tendering_teams_quotes = function(req, res, next){
	var checkValid=1;
	if(req.header("authentication_token")=="" || typeof req.header("authentication_token")=="undefined"){
		checkValid=0;
		res.json({"statusCode": 404, "success":"false", "message": "authentication_token not found"});
	}
	else if(typeof req.params.user_id=="undefined"){
		checkValid=0;
		res.json({"statusCode": 404, "success":"false", "message": "user_id not undefined"});
	}
	else if (req.params.user_id=="" || !validator.isNumeric(req.params.user_id)){
		checkValid=0;
		res.json({"statusCode": 404, "success":"false", "message": "user_id not found"});
	}
	else if(checkValid==1){
		connection.query("SELECT `id`, `authentication_token` FROM `organization_users` WHERE `authentication_token`='"+req.header("authentication_token")+"' AND `id`="+req.params.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
						next();				
				}
				else{
					res.json({"statusCode": 404, "success":"false", "message": "user not found"});
				}
			}
		});
	}
};
exports.design_requests = function(req, res, next){
	var checkValid=1;
	if(req.header("authentication_token")=="" || typeof req.header("authentication_token")=="undefined"){
		checkValid=0;
		res.json({"statusCode": 404, "success":"false", "message": "authentication_token not found"});
	}
	else if(typeof req.params.user_id=="undefined"){
		checkValid=0;
		res.json({"statusCode": 404, "success":"false", "message": "user_id not undefined"});
	}
	else if (req.params.user_id=="" || !validator.isNumeric(req.params.user_id)){
		checkValid=0;
		res.json({"statusCode": 404, "success":"false", "message": "user_id not found"});
	}
	else if(checkValid==1){
		connection.query("SELECT `id`, `authentication_token` FROM `organization_users` WHERE `authentication_token`='"+req.header("authentication_token")+"' AND `id`="+req.params.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
						next();				
				}
				else{
					res.json({"statusCode": 404, "success":"false", "message": "user not found"});
				}
			}
		});
	}
};
exports.save_design_submit = function(req, res, next){
	var checkValid=1;
	var fields = ["rfq_lines_id","user_id"];
	console.log(req.body);
	if(req.header("authentication_token")=="" || typeof req.header("authentication_token")=="undefined"){
		checkValid=0;
		res.json({"statusCode": 404, "success":"false", "message": "authentication_token not found"});
	}
	else if(checkValid==1){
		for(var i=0; i<fields.length; i++){
			if(typeof req.body[fields[i]]=="undefined" || req.body[fields[i]]==0){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" not defined"});
				break;
			}
			if(req.body[fields[i]]==""  || !validator.isNumeric(req.body[fields[i]])){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" value not found"});
				break;
			}
		}
	}
	if(checkValid==1){
		connection.query("SELECT `id`, `authentication_token` FROM `organization_users` WHERE `authentication_token`='"+req.header("authentication_token")+"' AND `id`="+req.body.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
						next();				
				}
				else{
					res.json({"statusCode": 404, "success":"false", "message": "user not found"});
				}
			}
		});
	}
};
exports.tendering_fetch_particular_quote = function(req, res, next){
	var checkValid=1;

	if(req.header("authentication_token")=="" || typeof req.header("authentication_token")=="undefined"){
		checkValid=0;
		res.json({"statusCode": 404, "success":"false", "message": "authentication_token not found"});
	}
	else if(typeof req.params.user_id=="undefined"){
		checkValid=0;
		res.json({"statusCode": 404, "success":"false", "message": "user_id not undefined"});
	}
	else if (req.params.user_id=="" || !validator.isNumeric(req.params.user_id)){
		checkValid=0;
		res.json({"statusCode": 404, "success":"false", "message": "user_id not found"});
	}
	else if (req.params.rfq_id=="" || !validator.isNumeric(req.params.rfq_id)){
		checkValid=0;
		res.json({"statusCode": 404, "success":"false", "message": "user_id not found"});
	}
	else if(checkValid==1){
		connection.query("SELECT `id`, `authentication_token` FROM `organization_users` WHERE `authentication_token`='"+req.header("authentication_token")+"' AND `id`="+req.params.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
						next();				
				}
				else{
					res.json({"statusCode": 404, "success":"false", "message": "user not found"});
				}
			}
		});
	}
};

exports.tendering_fetch_product_design_detail = function(req, res, next){
	var checkValid=1;
	var fields = ["user_id", "rfq_id", "rfq_lines_id", "plants_id"];
	if(typeof req.header("authentication_token")=="undefined" || req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(checkValid==1){
		for(var i=0; i<fields.length; i++){
			if(typeof req.body[fields[i]]=="undefined" || req.body[fields[i]]==0){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" not defined"});
				break;
			}
			if(req.body[fields[i]]==""  || !validator.isNumeric(req.body[fields[i]])){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" value not found"});
				break;
			}
		}
	}
	if(checkValid==1){
		var subfields=["id", "value"];
		if(typeof req.body.properties!="object" || !Array.isArray(req.body.properties) || req.body.properties.length==0){
			checkValid=0;
			res.json({"statusCode": 404, "success":"false", "message": "properties not found !"});
		}
		else{
			for(var i=0; i<req.body.properties.length; i++){
				// console.log(req.body.equalfilter[i][subfields[i]]);
				for(var j=0; j<subfields.length; j++){
					if(typeof req.body.properties[i][subfields[j]]=="undefined" || req.body.properties[i][subfields[j]]==""){
						checkValid=0;
						res.json({"statusCode": 404, "success": "false", "message": "properties "+subfields[j]+" not defined"});
						break;
					}
				}
			}
		}
	}
	if(checkValid==1){
		connection.query("SELECT `id`, `authentication_token` FROM `organization_users` WHERE `authentication_token`='"+req.header("authentication_token")+"' AND `id`="+req.body.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
					flag=0;
					var exitFlag=0;
					for (var i = 0; i < req.body.properties.length; i++) {
						for (var j = 0; j < req.body.properties.length; j++) {
							if(req.body.properties[i].id==req.body.properties[j].id){
								flag++;
							}
						};
						if(flag==2){
							res.json({"statusCode": 500, "success":"false", "message": "Please do not provide multiple entries for same technical specification."});
						}
						flag=0;
						exitFlag++;
					};
					if(req.body.properties.length==exitFlag){
						next();
					}
				}
				else{
					res.json({"statusCode": 404, "success":"false", "message": "user not found"});
				}
			}
		});
	}
};

exports.tendering_fetch_particular_design = function(req, res, next){
	var checkValid=1;
	var fields = ["user_id", "rfq_lines_id", "product_designs_id"];
	if(typeof req.header("authentication_token")=="undefined" || req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(checkValid==1){
		for(var i=0; i<fields.length; i++){
			if(typeof req.params[fields[i]]=="undefined"){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" not defined"});
				break;
			}
			if(req.params[fields[i]]==""  || !validator.isNumeric(req.params[fields[i]]) || req.params[fields[i]]==0){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" value not found"});
				break;
			}
		}
	}
	if(checkValid==1){
		connection.query("SELECT `id`, `authentication_token` FROM `organization_users` WHERE `authentication_token`='"+req.header("authentication_token")+"' AND `id`="+req.params.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
						next();				
				}
				else{
					res.json({"statusCode": 404, "success":"false", "message": "user not found"});
				}
			}
		});
	}
};

exports.tendering_submit_rfq_lines = function(req, res, next){
	var checkValid=1;
	var fields = ["user_id", "rfq_id", "rfq_lines_id", "product_designs_id", "sales_price", "confirmed_delivery_date", "material_cost", "labor_cost", "no_of_labor_hours"];
	if(typeof req.header("authentication_token")=="undefined" || req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(checkValid==1){
		for(var i=0; i<fields.length; i++){
			 // || req.body[fields[i]]==0
			 // || !validator.isNumeric(req.body[fields[i]])
			if(typeof req.body[fields[i]]=="undefined" || req.body[fields[i]]==""){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" not found"});
				break;
			}
		}
		// if(i==fields.length){
		// 	if(checkValid==1){
		// 		if(typeof req.body.confirmed_delivery_date=="undefined" || req.body.confirmed_delivery_date==""){
		// 			checkValid=0;
		// 			res.json({"statusCode": 404, "success": "false", "message": "confirmed_delivery_date not found"});
		// 		}
		// 	}
		// }
	}
	
	if(checkValid==1){
		var prop_arr=["id", "property_id", "value", "remark"];
		if(typeof req.body.properties=="object" && req.body.properties.length>0){
			for (var i = 0; i < req.body.properties.length; i++) {

				if(typeof req.body.properties[i]['id']=="undefined" || typeof req.body.properties[i]['property_id']=="undefined" || req.body.properties[i]['property_id']=="" || typeof req.body.properties[i]['value']=="undefined" || typeof req.body.properties[i]['remark']=="undefined"){
					checkValid=0;
					res.json({"statusCode": 404, "success": "false", "message": "properties not in proper format"});
					checkvalid=0;
					break;
				}
			};
		}
		else{
			checkvalid=0;
			res.json({"statusCode": 404, "success": "false", "message": "properties not found"});
		}
		if(checkValid==1){
			connection.query("SELECT `id`, `authentication_token` FROM `organization_users` WHERE `authentication_token`='"+req.header("authentication_token")+"' AND `id`="+req.body.user_id, function(err, organization_users) {
				if(err){
					console.log(err);
						res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					if (organization_users.length>0) {
							next();				
					}
					else{
						res.json({"statusCode": 404, "success":"false", "message": "user not found"});
					}
				}
			});
		}
	}
	
};

exports.tendering_submit_rfq_to_sales = function(req, res, next){
	var checkValid=1;
	var fields = ["user_id", "rfq_id", "rfq_status_id"];
	if(typeof req.header("authentication_token")=="undefined" || req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(checkValid==1){
		for(var i=0; i<fields.length; i++){
			if(typeof req.body[fields[i]]=="undefined" || req.body[fields[i]]=="" || !validator.isNumeric(req.body[fields[i]])){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" not found"});
				break;
			}
		}
	}
	if(checkValid==1){
		connection.query("SELECT `id`, `authentication_token` FROM `organization_users` WHERE `authentication_token`='"+req.header("authentication_token")+"' AND `id`="+req.body.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
						// next();
						connection.query("SELECT * FROM `rfq_lines` WHERE `rfq_id`='"+req.body.rfq_id+"'", function(err, info){
							if(err){
								console.log(err);
								res.json({"statusCode": 500, "success":"false", "message": "internal error"});
							}
							else{
								connection.query("SELECT * FROM `rfq_lines` WHERE `rfq_id`='"+req.body.rfq_id+"' AND `rfq_line_status`='2'", function(err, line_info){
									if(line_info.length==info.length){
										next();
									}
									else{
										res.json({"statusCode": 422, "success":"false", "message": "Please select  designs for all rfq lines"});
									}
								});
							}
						});				
				}
				else{
					res.json({"statusCode": 404, "success":"false", "message": "user not found"});
				}
			}
		});
	}
};


exports.tendering_calculate_sales_price = function(req, res, next){
	var checkValid=1;
	var fields = ["user_id", "rfq_lines_id", "product_design_id"];
	// var fields = ["user_id", "rfq_lines_id", "complexities_id", "product_design_id"];
	if(typeof req.header("authentication_token")=="undefined" || req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(checkValid==1){
		for(var i=0; i<fields.length; i++){
			if(typeof req.params[fields[i]]=="undefined"){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" not defined"});
				break;
			}
			if(req.params[fields[i]]==""  || !validator.isNumeric(req.params[fields[i]]) || req.params[fields[i]]==0){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" value not found"});
				break;
			}
		}
	}
	if(checkValid==1){
		connection.query("SELECT `id`, `authentication_token` FROM `organization_users` WHERE `authentication_token`='"+req.header("authentication_token")+"' AND `id`="+req.params.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
						next();				
				}
				else{
					res.json({"statusCode": 404, "success":"false", "message": "user not found"});
				}
			}
		});
	}
};

exports.tendering_complexity_overhead = function(req, res, next){
	var checkValid=1;
	var fields = ["user_id", "complexities_id", "plants_id"];
	// var fields = ["user_id", "rfq_lines_id", "complexities_id", "product_design_id"];
	if(typeof req.header("authentication_token")=="undefined" || req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(checkValid==1){
		for(var i=0; i<fields.length; i++){
			if(typeof req.params[fields[i]]=="undefined"){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" not defined"});
				break;
			}
			if(req.params[fields[i]]==""  || !validator.isNumeric(req.params[fields[i]]) || req.params[fields[i]]==0){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" value not found"});
				break;
			}
		}
	}
	if(checkValid==1){
		connection.query("SELECT `id`, `authentication_token` FROM `organization_users` WHERE `authentication_token`='"+req.header("authentication_token")+"' AND `id`="+req.params.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
						next();
				}
				else{
					res.json({"statusCode": 404, "success":"false", "message": "user not found"});
				}
			}
		});
	}
};

exports.tendering_save_calculated_sales_price = function(req, res, next){
	var checkValid=1;
	// var fields = ["user_id", "rfq_id", "rfq_status_id"];
	// , "plants_id", 
	// , "material_cost", "labor_cost", "labor_hours", "extra_engineering_cost", "dcp", "cost_packaging", "packaging_cost_transformer", "extra_packaging_costs_build_of_parts", "packaging", "engineering_overheads", "plant_overheads", "site_overheads", "regional_overheads", "product_line_overheads", "corporate_overheads", "depreciation", "overheads", "frieght_f_term", "friegth_c_term", "friegth_d_term", "transport", "financial_cost_loc", "financial_cost_bonds", "maintenance_equipment", "administrative_cost_various", "extra_documentation_required", "supervision", "erection_comm", "factory_training", "onsite_training", "warranty_on_full_cost", "extra_cost", "full_cost_excluding_commision", "ebit_percentage", "ebit", "commission_on_net_sales_price", "commission_on_f_term", "commission_on_gross_sales", "commission", "minimum_intercompany_sales", "minimum_sales_price_to_customer", "acc", "acc_factor"
	var fields= ["complexities_id", "user_id", "product_design_id", "rfq_lines_id"];
	if(typeof req.header("authentication_token")=="undefined" || req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(checkValid==1){
		for(var i=0; i<fields.length; i++){
			//  || req.body[fields[i]]=="" || !validator.isNumeric(req.body[fields[i]])
			if(typeof req.body[fields[i]]=="undefined"){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" not found"});
				break;
			}
		}
	}
	if(checkValid==1){
		connection.query("SELECT `id`, `authentication_token` FROM `organization_users` WHERE `authentication_token`='"+req.header("authentication_token")+"' AND `id`="+req.body.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
						next();				
				}
				else{
					res.json({"statusCode": 404, "success":"false", "message": "user not found"});
				}
			}
		});
	}
};

exports.tendering_get_sales_price_detail = function(req, res, next){
	var checkValid=1;
	var fields = ["user_id", "rfq_lines_id"];
	if(typeof req.header("authentication_token")=="undefined" || req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(checkValid==1){
		for(var i=0; i<fields.length; i++){
			if(typeof req.params[fields[i]]=="undefined"){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" not defined"});
				break;
			}
			if(req.params[fields[i]]=="" || !validator.isNumeric(req.params[fields[i]]) || req.params[fields[i]]==0){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" value not found"});
				break;
			}
		}
	}
	if(checkValid==1){
		connection.query("SELECT `id`, `authentication_token` FROM `organization_users` WHERE `authentication_token`='"+req.header("authentication_token")+"' AND `id`="+req.params.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
						next();				
				}
				else{
					res.json({"statusCode": 404, "success":"false", "message": "user not found"});
				}
			}
		});
	}
};

exports.tendering_view_calculated_sales_price = function(req, res, next){
	var checkValid=1;
	var fields = ["user_id", "rfq_lines_id"];
	if(typeof req.header("authentication_token")=="undefined" || req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(checkValid==1){
		for(var i=0; i<fields.length; i++){
			if(typeof req.params[fields[i]]=="undefined"){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" not defined"});
				break;
			}
			if(req.params[fields[i]]=="" || !validator.isNumeric(req.params[fields[i]]) || req.params[fields[i]]==0){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" value not found"});
				break;
			}
		}
	}
	if(checkValid==1){
		connection.query("SELECT `id`, `authentication_token` FROM `organization_users` WHERE `authentication_token`='"+req.header("authentication_token")+"' AND `id`="+req.params.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
						next();				
				}
				else{
					res.json({"statusCode": 404, "success":"false", "message": "user not found"});
				}
			}
		});
	}
};

exports.tendering_rfq_lines_technical_spec_delete = function(req, res, next){
	var checkValid=1;
	var fields = ["user_id", "rfq_lines_id", "product_properties_id"];
	if(typeof req.header("authentication_token")=="undefined" || req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(checkValid==1){
		for(var i=0; i<fields.length; i++){
			if(typeof req.params[fields[i]]=="undefined"){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" not defined"});
				break;
			}
			if(req.params[fields[i]]=="" || !validator.isNumeric(req.params[fields[i]]) || req.params[fields[i]]==0){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" value not found"});
				break;
			}
		}
	}
	if(checkValid==1){
		connection.query("SELECT `id`, `authentication_token` FROM `organization_users` WHERE `authentication_token`='"+req.header("authentication_token")+"' AND `id`="+req.params.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
						next();				
				}
				else{
					res.json({"statusCode": 404, "success":"false", "message": "user not found"});
				}
			}
		});
	}
};

exports.tendering_request_design = function(req, res, next){
	var checkValid=1;
	var fields = ["user_id", "rfq_id"];
	if(typeof req.header("authentication_token")=="undefined" || req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(checkValid==1){
		for(var i=0; i<fields.length; i++){
			if(typeof req.body[fields[i]]=="undefined" || req.body[fields[i]]==0){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" not defined"});
				break;
			}
			if(req.body[fields[i]]==""  || !validator.isNumeric(req.body[fields[i]])){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" value not found"});
				break;
			}
		}
	}
	if(typeof req.body.line_items == "undefined"){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Line items not defined"});
	}
	if(checkValid==1){
		connection.query("SELECT `id`, `authentication_token` FROM `organization_users` WHERE `authentication_token`='"+req.header("authentication_token")+"' AND `id`="+req.body.user_id, function(err, organization_users) {
			if(err){
				console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{
				if (organization_users.length>0) {
						next();				
				}
				else{
					res.json({"statusCode": 404, "success":"false", "message": "user not found"});
				}
			}
		});
	}
};
var validator=require("validator");
exports.ready_rfq_bid = function(req, res, next){
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
}


exports.ready_rfq_bid_detail = function(req, res, next){
	var checkValid=1;
	var fields = ["user_id", "rfq_id"];
	if(typeof req.header("authentication_token")=="undefined" || req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(checkValid==1){
			for(var i=0; i<fields.length; i++){
			if(typeof req.params[fields[i]]=="undefined"){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" not defined"});
			}
			else if(req.params[fields[i]]=="" || !validator.isNumeric(req.params[fields[i]])){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" value not valid"});
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
					connection.query("SELECT * FROM rfq WHERE `id`='"+req.params.rfq_id+"' AND created_by='"+req.params.user_id+"'", function(err, rfq) {
						if(err){
							res.json({"statusCode": 500, "success":"false", "message": "internal error"});
						}
						else{
							if (rfq.length>0) {
								next();
							}
							else{
								res.json({"statusCode": 401, "success":"false", "message": "invalid access"});
							}
						}
					});
				}
				else{
					res.json({"statusCode": 404, "success":"false", "message": "user not found"});
				}
			}
		});
	}
}


exports.save_rfq_questions = function(req, res, next){
	var checkValid=1;
	var fields = ["user_id", "rfq_id"];
	if(typeof req.header("authentication_token")=="undefined" || req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(checkValid==1){
			for(var i=0; i<fields.length; i++){
				if(typeof req.body[fields[i]]=="undefined"){
					checkValid=0;
					res.json({"statusCode": 404, "success": "false", "message": fields[i]+" not defined"});
				}
				else if(!validator.isNumeric(req.body[fields[i]])){
					checkValid=0;
					res.json({"statusCode": 404, "success": "false", "message": fields[i]+" value not valid"});
					break;
				}
			}
	}
	if(checkValid==1){
		var subfields=["question_id", "value"];
			if(typeof req.body.questions!="object" || !Array.isArray(req.body.questions)){
				checkValid=0;
				res.json({"statusCode": 404, "success":"false", "message": "questions not found !"});
			}
			else{
			for(var i=0; i<req.body.questions.length; i++){
				for(var j=0; j<subfields.length; j++){
					if(typeof req.body.questions[i][subfields[j]]=="undefined" || !validator.isNumeric(req.body.questions[i][subfields[j]])){
						checkValid=0;
						res.json({"statusCode": 404, "success": "false", "message": subfields[j]+" not defined"});
						break;
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
						connection.query("SELECT * FROM rfq WHERE `id`='"+req.body.rfq_id+"' AND created_by='"+req.body.user_id+"'", function(err, rfq) {
							if(err){
								res.json({"statusCode": 500, "success":"false", "message": "internal error"});
							}
							else{
								if (rfq.length>0) {
									next();
								}
								else{
									res.json({"statusCode": 401, "success":"false", "message": "invalid access"});
								}
							}
						});
					}
					else{
						res.json({"statusCode": 404, "success":"false", "message": "user not found"});
					}
				}
			});
		}
	}
}

exports.full_rfq_detail = function(req, res, next){
	var checkValid=1;
	var fields = ["user_id", "rfq_id"];
	if(typeof req.header("authentication_token")=="undefined" || req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(checkValid==1){
			for(var i=0; i<fields.length; i++){
			if(typeof req.params[fields[i]]=="undefined"){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" not defined"});
			}
			else if(req.params[fields[i]]=="" || !validator.isNumeric(req.params[fields[i]])){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" value not valid"});
				break;
			}
		}
	}
	if(checkValid==1){
		connection.query("SELECT `id`, `authentication_token` FROM `organization_users` WHERE `authentication_token`='"+req.header("authentication_token")+"' AND `id`="+req.params.user_id+" LIMIT 1", function(err, organization_users) {
			if(err){
				console.log(err);
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
			}
			else{;
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


exports.rfq_bid_submit = function(req, res, next){
	var checkValid=1;
	var fields = ["user_id", "rfq_id", "rfq_status_id"];
	if(typeof req.header("authentication_token")=="undefined" || req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(checkValid==1){
		for(var i=0; i<fields.length; i++){
			if(typeof req.body[fields[i]]=="undefined"){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" not defined"});
				break;
			}
			if(!validator.isNumeric(req.body[fields[i]])){
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
					connection.query("SELECT * FROM `rfq` WHERE `id`='"+req.body.rfq_id+"' AND created_by='"+organization_users[0].id+"'", function(err, rfq) {
						if(err){
							res.json({"statusCode": 500, "success":"false", "message": "internal error"});
						}
						else{
							if(rfq.length>0){
								next();
							}
							else{
								res.json({"statusCode": 401, "success":"false", "message": "invalid access of RFQ"});
							}
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

exports.get_rejection_remarks = function(req, res, next){
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
}

exports.rfq_no_bid_submit = function(req, res, next){
	var checkValid=1;
	var fields = ["user_id", "rfq_id", "rfq_status_id", "rejection_remarks_id", "estimated_sales_price"];
	if(typeof req.header("authentication_token")=="undefined" || req.header("authentication_token")==""){
		checkValid=0;
		res.json({"statusCode": 404, "success": "false", "message": "Authentication token not found"});
	}
	else if(checkValid==1){
		for(var i=0; i<fields.length; i++){
			if(typeof req.body[fields[i]]=="undefined"){
				checkValid=0;
				res.json({"statusCode": 404, "success": "false", "message": fields[i]+" not defined"});
				break;
			}
			if(!validator.isNumeric(req.body[fields[i]])){
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
					connection.query("SELECT * FROM `rfq` WHERE `id`='"+req.body.rfq_id+"' AND created_by='"+organization_users[0].id+"'", function(err, rfq) {
						if(err){
							res.json({"statusCode": 500, "success":"false", "message": "internal error"});
						}
						else{
							if(rfq.length>0){
								next();
							}
							else{
								res.json({"statusCode": 401, "success":"false", "message": "invalid access of RFQ"});
							}
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
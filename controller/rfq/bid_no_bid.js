exports.ready_rfq_bid = function(req, res){
	var query="SELECT rfq.id, rfq.document_no, rfq.version_no, rfq.date_rfq_in, rfq.sales_agents_id, agent.name FROM rfq LEFT JOIN sales_agents agent ON rfq.sales_agents_id=agent.id WHERE `rfq_status_id`='2' AND created_by='"+req.params.user_id+"'";
	connection.query(query, function(err, rfq) {
		if(err){
			console.log(err);
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			res.json({"statusCode": 200, "success":"true", "message": "", "rfq":rfq});
		}
	});
};
exports.ready_rfq_bid_detail = function(req, res){
	connection.query("SELECT `rfq`.`id`, `rfq`.`document_no`, `rfq`.`version_no`, `rfq_lines`.`req_delivery_date` FROM `rfq` LEFT JOIN `rfq_lines` ON `rfq`.`id`=`rfq_lines`.`rfq_id` WHERE `rfq`.`rfq_status_id`='2' AND `rfq`.`id`='"+req.params.rfq_id+"'", function(err, rfq) {
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			connection.query("SELECT `id`, `question` FROM `rfq_questions`", function(err, rfq_questions) {
				if(err){
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					res.json({"statusCode": 200, "success":"true", "message": "", "rfq":rfq, "rfq_questions": rfq_questions});
				}
			});
		}
	});
};

exports.save_rfq_questions = function(req, res){
				var rfq_id=req.body.rfq_id;
				var fields=["question_id", "value"];
				var query="INSERT INTO `rfq_lines_questions`(`rfq_id`, `rfq_questions_id`, `question_value`) VALUES (";
				for (var i = 0; i < req.body.questions.length; i++) {
					query=query+"'"+rfq_id+"'";
					for (var j = 0; j < fields.length; j++) {
						query=query+", '"+req.body.questions[i][fields[j]]+"'";
						if(j+1==fields.length){
							query=query+")";
						}
					}
					if(i+1<req.body.questions.length){
						query=query+", (";
					}
				}
				console.log(query);
				connection.query(query, function(err, info){
					if(err){
						console.log(err);
						res.json({"statusCode":500, "success": "false", "message": "internal error"});
					}
					else{
						res.json({"statusCode":200, "success":"true", "message": "data insterted successfully"});
					}					
				});
};

exports.full_rfq_detail = function(req, res){
	connection.query("SELECT * FROM `rfq` WHERE `rfq`.`rfq_status_id`='2' AND `rfq`.`id`='"+req.params.rfq_id+"'", function(err, rfq) {
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			connection.query("SELECT * FROM `rfq_lines` WHERE rfq_id='"+rfq[0].id+"'", function(err, rfq_lines) {
				if(err){
					res.json({"statusCode": 500, "success":"false", "message": "internal error"});
				}
				else{
					var query="SELECT * FROM  `rfq_lines_technical_specs` WHERE ";
					for (var i = 0; i < rfq_lines.length; i++) {
						query=query+"rfq_lines_id='"+rfq_lines[i].id+"'";
						if(i+1<rfq_lines.length){
							query=query+" OR "
						}
					};
					console.log(query);
					connection.query(query, function(err, rfq_lines_technical_specs) {
						if(err){
							res.json({"statusCode": 500, "success":"false", "message": "internal error"});
						}
						else{
							res.json({"statusCode": 200, "success":"true", "message": "", "rfq":rfq, "rfq_lines": rfq_lines, "rfq_lines_technical_specs": rfq_lines_technical_specs});
						}
					});
				}
			});
		}
	});
};
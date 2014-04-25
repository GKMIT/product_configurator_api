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
			res.json({"statusCode": 500, "success":"false", "message": "yoyyointernal error"});
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
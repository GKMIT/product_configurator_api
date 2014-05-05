exports.sales_quote_finalize_fetch_all = function(req, res){
	var query="SELECT `id`, `document_no`, `version_no`, `date_rfq_in`, `created_at` FROM `rfq` WHERE `created_by`='"+req.params.user_id+"' AND `rfq_status_id`='5'  ORDER BY `rfq`.`updated_at` desc";
	connection.query(query, function(err, rfq) {
		if(err){
			console.log(err);
				res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			res.json({"statusCode": 200, "success":"true", "message": "", "rfq":rfq});
		}
	});
}
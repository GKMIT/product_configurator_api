exports.dashboard = function(req, res){
	var partialRfq="select count(`id`) as `total` from `rfq` where `rfq_status_id`='1'";
	var newRfq="select count(`id`) as `total` from `rfq` where `rfq_status_id`='2'";
	var noBidRfq="select count(`id`) as `total` from `rfq` where `rfq_status_id`='3'";
	var bid_in_tenderingRfq="select count(`id`) as `total` from `rfq` where `rfq_status_id`='4'";
	var outTenderingRfq="select count(`id`) as `total` from `rfq` where `rfq_status_id`='5'";
	var completed="select count(`id`) as `total` from `rfq` where `rfq_status_id`='6'";
	var totalPartialRfq=0;
	var totalNewRfq=0;
	var totalNoBidRfq=0;
	var totalbid_in_tenderingRfq=0;
	var totaloutTenderingRfq=0;
	var totalCompletedRfq=0;
	connection.query(partialRfq, function(err, info){
		if(err){
			console.log(err);
			res.json({"statusCode":500, "success": "false", "message": "internal error"});
		}
		else{
			totalPartialRfq=info[0].total;
			connection.query(newRfq, function(err, info){
				if(err){
					console.log(err);
					res.json({"statusCode":500, "success": "false", "message": "internal error"});
				}
				else{
					totalNewRfq=info[0].total;
					connection.query(noBidRfq, function(err, info){
						if(err){
							console.log(err);
							res.json({"statusCode":500, "success": "false", "message": "internal error"});
						}
						else{
							totalNoBidRfq=info[0].total;
							connection.query(bid_in_tenderingRfq, function(err, info){
								if(err){
									console.log(err);
									res.json({"statusCode":500, "success": "false", "message": "internal error"});
								}
								else{
									totalbid_in_tenderingRfq=info[0].total;
									connection.query(outTenderingRfq, function(err, info){
										if(err){
											console.log(err);
											res.json({"statusCode":500, "success": "false", "message": "internal error"});
										}
										else{
											totaloutTenderingRfq=info[0].total;
											connection.query(completed, function(err, info){
												if(err){
													console.log(err);
													res.json({"statusCode":500, "success": "false", "message": "internal error"});
												}
												else{
													totalCompletedRfq=info[0].total;
													res.json({"statusCode":200, "success": "true", "message": "", "partial": totalPartialRfq, "new": totalNewRfq, "nobid": totalNoBidRfq, "bid_in_tendering": totalbid_in_tenderingRfq, "outTendering": totaloutTenderingRfq, "completed": totalCompletedRfq});
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
};
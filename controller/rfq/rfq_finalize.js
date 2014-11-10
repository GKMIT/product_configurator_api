var async = require('async');
exports.rfq_partial_show = function(req, res){
	connection.query("SELECT * FROM `organization_users` WHERE `id`='"+req.params.user_id+"' AND `sysadmin`='1'", function(err, admin){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			if(admin.length>0){
				query="SELECT `rfq`.`id`, `cust`.`name` as  `customer_name`, `countries`.`name` as `customer_country`, `inst`.`name` as `installation_country`, `rfq`.`project_name`, `rfq`.`date_rfq_in`, `agent`.`name`, `rfq`.`rfq_status_id`, `rfq`.`document_no`, `rfq`.`version_no` FROM `rfq` LEFT JOIN `customers` `cust` ON `rfq`.`customers_id`=`cust`.`id` LEFT JOIN `sales_agents` `agent` ON `rfq`.`sales_agents_id`=`agent`.`id` LEFT JOIN `countries` ON `countries`.`id`=`rfq`.`customer_country` LEFT JOIN `countries` as `inst` ON `inst`.`id`=`rfq`.`installation_country` WHERE (`rfq`.`rfq_status_id`='0' OR `rfq`.`rfq_status_id`='1') ORDER BY `rfq`.`updated_at` desc";
				connection.query(query, function(err, partial_rfq) {
					if(err){
						console.log(err);
							res.json({"statusCode": 500, "success":"false", "message": "internal error"});
					}
					else{
						res.json({"statusCode": 200, "success":"true", "message": "", "partial_rfq":partial_rfq});
					}
				});
			}
			else{
				connection.query("select * from `sales_hubs` where `head_id`='"+req.params.user_id+"' LIMIT 1", function(err, info){
					if(err){
						console.log(err);
						res.json({"statusCode": 500, "success":"false", "message": "internal error"});
					}
					else{
						if(info.length>0){
							query="SELECT `rfq`.`id`, `cust`.`name` as  `customer_name`, `countries`.`name` as `customer_country`, `inst`.`name` as `installation_country`, `rfq`.`project_name`, `rfq`.`date_rfq_in`, `agent`.`name`, `rfq`.`rfq_status_id`, `rfq`.`document_no`, `rfq`.`version_no` FROM `rfq` LEFT JOIN `customers` `cust` ON `rfq`.`customers_id`=`cust`.`id` LEFT JOIN `sales_agents` `agent` ON `rfq`.`sales_agents_id`=`agent`.`id` LEFT JOIN `countries` ON `countries`.`id`=`rfq`.`customer_country` LEFT JOIN `countries` as `inst` ON `inst`.`id`=`rfq`.`installation_country` WHERE (`rfq`.`rfq_status_id`='0' OR `rfq`.`rfq_status_id`='1') AND (`rfq`.`sales_hub_id`='"+info[0].id+"' OR `created_by`='"+req.params.user_id+"') ORDER BY `rfq`.`updated_at` desc";
							connection.query(query, function(err, partial_rfq) {
								if(err){
									console.log(err);
										res.json({"statusCode": 500, "success":"false", "message": "internal error"});
								}
								else{
									res.json({"statusCode": 200, "success":"true", "message": "", "partial_rfq":partial_rfq});
								}
							});
						}
						else{
							query="SELECT `rfq`.`id`, `cust`.`name` as  `customer_name`, `countries`.`name` as `customer_country`, `inst`.`name` as `installation_country`, `rfq`.`project_name`, `rfq`.`date_rfq_in`, `agent`.`name`, `rfq`.`rfq_status_id`, `rfq`.`document_no`, `rfq`.`version_no` FROM `rfq` LEFT JOIN `customers` `cust` ON `rfq`.`customers_id`=`cust`.`id` LEFT JOIN `sales_agents` `agent` ON `rfq`.`sales_agents_id`=`agent`.`id` LEFT JOIN `countries` ON `countries`.`id`=`rfq`.`customer_country` LEFT JOIN `countries` as `inst` ON `inst`.`id`=`rfq`.`installation_country` WHERE (`rfq`.`rfq_status_id`='0' OR `rfq`.`rfq_status_id`='1') AND (`created_by`='"+req.params.user_id+"' OR `rfq`.`sales_person_id`='"+req.params.user_id+"') ORDER BY `rfq`.`updated_at` desc";
							connection.query(query, function(err, partial_rfq) {
								if(err){
									console.log(err);
										res.json({"statusCode": 500, "success":"false", "message": "internal error"});
								}
								else{
									res.json({"statusCode": 200, "success":"true", "message": "", "partial_rfq":partial_rfq});
								}
							});
						}
					}
				});
			}
		}
	});
	
};

exports.delete_rfq = function(req, res){
	var rfq="select * from `rfq` where `id`='"+req.params.rfq_id+"'";
	var rfq_lines="select `id` from `rfq_lines` where `rfq_id`='"+req.params.rfq_id+"'";
	var rfq_lines_calculated_sales_price_delete="";
	var rfq_lines_technical_specs_delete="";
	var rfq_lines_delete="delete from `rfq_lines` where `rfq_id`='"+req.params.rfq_id+"'";
	var rfq_delete="delete from `rfq` where `id`='"+req.params.rfq_id+"'";
	var rfq_lines_questions_delete="delete from `rfq_lines_questions` where `rfq_id`='"+req.params.rfq_id+"'";
	console.log(rfq_lines);
	connection.query(rfq_lines, function(err, rfq_lines){
		if(err){
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			async.each(rfq_lines, function(item, done){
				rfq_lines_calculated_sales_price_delete="delete from `rfq_lines_calculated_sales_price` where `rfq_lines_id`='"+item.id+"'";
				connection.query(rfq_lines_calculated_sales_price_delete, function(err, info){
					if(err){
						done(err);
					}
					else{
						rfq_lines_technical_specs_delete="delete from `rfq_lines_technical_specs` where `rfq_lines_id`='"+item.id+"'";
						connection.query(rfq_lines_technical_specs_delete, function(err, line_entry){
							if(err){
								done(err);
							}
							else{
								done();
							}
						});
					}
		    	});
			},
		    function(err){
		      	if (err){
			      	console.log(err);
			      	res.json({"statusCode": 500, "success": "false", "message":"internal error"});
			    }
			    else{
			    	connection.query(rfq_lines_delete, function(err, lines_items){
			    		if(err){
			    			console.log(err);
			    			res.json({"statusCode": 500, "success": "false", "message":"internal error"});
			    		}
			    		else{
			    			connection.query(rfq_lines_questions_delete, function(err, lines_items){
					    		if(err){
					    			res.json({"statusCode": 500, "success": "false", "message":"internal error"});
					    		}
					    		else{
					    			connection.query(rfq_delete, function(err, lines_items){
							    		if(err){
							    			res.json({"statusCode": 500, "success": "false", "message":"internal error"});
							    		}
							    		else{
							    			res.json({"statusCode": 202, "success":"true", "message":"RFQ Removed Successfully"});
							    		}
							    	});
					    		}
					    	});
			    		}
			    	});
			    }
			}
	    );
		}
	});
}
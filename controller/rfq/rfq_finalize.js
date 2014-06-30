exports.rfq_partial_show = function(req, res){
	connection.query("select * from `sales_hubs` where `head_id`='"+req.params.user_id+"' LIMIT 1", function(err, info){
		if(err){
			console.log(err);
			res.json({"statusCode": 500, "success":"false", "message": "internal error"});
		}
		else{
			if(info.length>0){
				query="SELECT `rfq`.`id`, `cust`.`name` as  `customer_name`, `countries`.`name` as `customer_country`, `inst`.`name` as `installation_country`, `rfq`.`date_rfq_in`, `agent`.`name`, `rfq`.`rfq_status_id` FROM `rfq` LEFT JOIN `customers` `cust` ON `rfq`.`customers_id`=`cust`.`id` LEFT JOIN `sales_agents` `agent` ON `rfq`.`sales_agents_id`=`agent`.`id` LEFT JOIN `countries` ON `countries`.`id`=`rfq`.`customer_country` LEFT JOIN `countries` as `inst` ON `inst`.`id`=`rfq`.`installation_country` WHERE (`rfq`.`rfq_status_id`='0' OR `rfq`.`rfq_status_id`='1') AND (`rfq`.`sales_hub_id`='"+info[0].id+"' OR `created_by`='"+req.params.user_id+"') ORDER BY `rfq`.`updated_at` desc";
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
				query="SELECT `rfq`.`id`, `cust`.`name` as  `customer_name`, `countries`.`name` as `customer_country`, `inst`.`name` as `installation_country`, `rfq`.`date_rfq_in`, `agent`.`name`, `rfq`.`rfq_status_id` FROM `rfq` LEFT JOIN `customers` `cust` ON `rfq`.`customers_id`=`cust`.`id` LEFT JOIN `sales_agents` `agent` ON `rfq`.`sales_agents_id`=`agent`.`id` LEFT JOIN `countries` ON `countries`.`id`=`rfq`.`customer_country` LEFT JOIN `countries` as `inst` ON `inst`.`id`=`rfq`.`installation_country` WHERE (`rfq`.`rfq_status_id`='0' OR `rfq`.`rfq_status_id`='1') AND (`created_by`='"+req.params.user_id+"') ORDER BY `rfq`.`updated_at` desc";
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
};
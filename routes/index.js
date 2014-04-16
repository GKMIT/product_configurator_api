var users = require('../controller/users');
var rfq = require('../controller/rfq');
module.exports = function(){
	app.post("/login", users.login);
	app.get("/rfq_general_data/:id", rfq.rfq_general_data);
	app.get("/rfq_product_data/:id", rfq.rfq_product_data);
	
	app.get("/rfq_general_data_sales_agents/:user_id/:country_id", rfq.rfq_general_data_sales_agents);
	app.get("/rfq_general_data_sales_persons/:user_id/:sales_hubs_id", rfq.rfq_general_data_sales_persons);

	
	app.post("/save_rfq_general_data", rfq.save_rfq_general_data);
};
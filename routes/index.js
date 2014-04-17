var users = require('../controller/users');
var rfq = require('../controller/rfq/rfq_general_data');
var rfq_product = require('../controller/rfq/general_product_data');
var rfq_line_items = require('../controller/rfq/rfq_line_items');
var rfq_finalize = require('../controller/rfq/rfq_finalize');
module.exports = function(){
	// rfq general data
	app.post("/login", users.login);
	app.get("/rfq_general_data/:id/:rfq_id", rfq.rfq_general_data);
	// country_id is customer country in the below call 
	app.get("/rfq_general_data_sales_agents/:user_id/:country_id", rfq.rfq_general_data_sales_agents);
	app.get("/rfq_general_data_sales_persons/:user_id/:sales_hubs_id", rfq.rfq_general_data_sales_persons);

	
	app.post("/save_rfq_general_data", rfq.save_rfq_general_data);
	app.put("/update_rfq_general_data", rfq.update_rfq_general_data);
	


	// rfq general product data
	app.get("/rfq_product_lines/:user_id/:rfq_id", rfq_product.rfq_product_lines);
	app.get("/rfq_tendering_teams/:user_id/:product_lines_id", rfq_product.rfq_tendering_teams);
	app.get("/rfq_tendering_teams_members/:user_id/:tendering_teams_id", rfq_product.rfq_tendering_teams_members);
	app.put("/general_product_data_save", rfq_product.general_product_data_save);
	// app.put("/general_product_data_update", rfq_product.general_product_data_update);

	// rfq line items
	app.get("/product_properties/:user_id/:product_lines_id", rfq_line_items.product_properties);


	// rfq finalize
	app.get("/rfq_partial_show/:user_id", rfq_finalize.rfq_partial_show);



};
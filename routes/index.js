var users = require('../controller/users');
// validations
var rfq_product_validation = require('../controller/validation/general_product_data.js');
var rfq_line_items_validation = require('../controller/validation/rfq_line_items.js');

// calls
var rfq = require('../controller/rfq/rfq_general_data');
var rfq_product = require('../controller/rfq/general_product_data');
var rfq_line_items = require('../controller/rfq/rfq_line_items');
var rfq_finalize = require('../controller/rfq/rfq_finalize');
module.exports = function(){
	// rfq general data
	app.post("/login", users.login);
	app.get("/rfq_general_data/:user_id/:rfq_id", rfq.rfq_general_data);
	// NOTE :  country_id is customer country in the below call 
	app.get("/rfq_general_data_sales_agents/:user_id/:country_id", rfq.rfq_general_data_sales_agents);
	app.get("/rfq_general_data_sales_persons/:user_id/:sales_hubs_id", rfq.rfq_general_data_sales_persons);

	
	app.post("/save_rfq_general_data", rfq.save_rfq_general_data);
	app.put("/update_rfq_general_data", rfq.update_rfq_general_data);
	


	// rfq general product data API's
	app.get("/rfq_product_lines/:user_id/:rfq_id", rfq_product.rfq_product_lines);
	app.get("/rfq_tendering_teams/:user_id/:product_lines_id", rfq_product.rfq_tendering_teams);
	app.get("/rfq_tendering_teams_members/:user_id/:tendering_teams_id", rfq_product.rfq_tendering_teams_members);
	app.put("/general_product_data_save", rfq_product_validation.general_product_data_saveValidation, rfq_product.general_product_data_save);
	

	// rfq line items API's
	app.get("/rfq_new_line_item/:user_id/:rfq_id", rfq_line_items_validation.product_line, rfq_line_items.product_lines);
	app.get("/all_rfq_line_items/:user_id/:rfq_id", rfq_line_items_validation.product_line, rfq_line_items.all_rfq_product_lines);
	app.get("/fetch_production_plants/:user_id/:product_lines_id", rfq_line_items_validation.fetch_production_plants, rfq_line_items.fetch_production_plants);
	app.get("/fetch_product_properties/:user_id/:product_lines_id", rfq_line_items_validation.fetch_production_plants, rfq_line_items.product_properties);

	// app.get("/fetch_rfq_line_items/:user_id/:rfq_id/:rfq_lines_id", rfq_line_items_validation.fetch_rfq_line_items, rfq_line_items.fetch_rfq_line_items);


	// rfq finalize
	app.get("/rfq_partial_show/:user_id", rfq_finalize.rfq_partial_show);

};
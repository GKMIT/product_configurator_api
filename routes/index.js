var users = require('../controller/users');
// validations
var rfq_general_data_validation = require('../controller/validation/rfq_general_data');
var rfq_product_validation = require('../controller/validation/general_product_data');
var rfq_line_items_validation = require('../controller/validation/rfq_line_items');
var rfq_finalize_validation = require('../controller/validation/rfq_finalize');
var rfq_bid_validation = require('../controller/validation/bid_no_bid');
// calls
var rfq = require('../controller/rfq/rfq_general_data');
var rfq_product = require('../controller/rfq/general_product_data');
var rfq_line_items = require('../controller/rfq/rfq_line_items');
var rfq_finalize = require('../controller/rfq/rfq_finalize');
var rfq_bid = require('../controller/rfq/bid_no_bid');
module.exports = function(){
	
	app.post("/login", users.login);
	// rfq general data
	app.get("/rfq_general_data/:user_id/:rfq_id", rfq_general_data_validation.rfq_general_data, rfq.rfq_general_data);
	// NOTE :  country_id is customer country in the below call 
	app.get("/rfq_general_data_sales_agents/:user_id/:country_id", rfq.rfq_general_data_sales_agents);
	app.get("/rfq_general_data_sales_persons/:user_id/:sales_hubs_id", rfq.rfq_general_data_sales_persons);

	
	app.post("/save_rfq_general_data", rfq.save_rfq_general_data);
	app.put("/update_rfq_general_data", rfq.update_rfq_general_data);
	


	// rfq general product data API's
	app.get("/rfq_product_lines/:user_id/:rfq_id", rfq_product.rfq_product_lines);
	app.get("/rfq_tendering_teams/:user_id/:product_lines_id", rfq_product.rfq_tendering_teams);
	app.get("/rfq_tendering_teams_members/:user_id/:tendering_teams_id",rfq_product_validation.rfq_tendering_teams_members, rfq_product.rfq_tendering_teams_members);
	app.put("/general_product_data_save", rfq_product_validation.general_product_data_saveValidation, rfq_product.general_product_data_save);


	// rfq line items API's
	app.get("/rfq_new_line_item/:user_id/:rfq_id", rfq_line_items_validation.product_line, rfq_line_items.product_lines);
	app.get("/all_rfq_line_items/:user_id/:rfq_id", rfq_line_items_validation.product_line, rfq_line_items.all_rfq_product_lines);
	app.get("/fetch_product_plants_properties/:user_id/:product_lines_id", rfq_line_items_validation.fetch_product_plants_properties, rfq_line_items.fetch_product_plants_properties);
	// app.get("/fetch_product_properties/:user_id/:product_lines_id", rfq_line_items_validation.fetch_production_plants, rfq_line_items.product_properties);

	// call for get the property value
	app.get("/fetch_property_detail/:user_id/:property_id", rfq_line_items_validation.fetch_property_detail, rfq_line_items.fetch_property_detail);

	app.get("/fetch_rfq_line_items/:user_id/:rfq_id/:rfq_lines_id", rfq_line_items_validation.fetch_rfq_line_items, rfq_line_items.fetch_rfq_line_items);
	
	app.post("/save_line_item", rfq_line_items_validation.save_line_item, rfq_line_items.save_line_item);
	app.put("/update_line_item", rfq_line_items_validation.update_line_item, rfq_line_items.update_line_item);
	app.delete("/delete_line_item/:user_id/:rfq_lines_id", rfq_line_items_validation.delete_line_item, rfq_line_items.delete_line_item);
	app.put("/complete_rfq", rfq_line_items_validation.complete_rfq, rfq_line_items.complete_rfq);


	// rfq finalize
	app.get("/rfq_finalize/:user_id",rfq_finalize_validation.rfq_partial_show, rfq_finalize.rfq_partial_show);

	// bid no bid

	app.get("/ready_rfq_bid/:user_id", rfq_bid_validation.ready_rfq_bid, rfq_bid.ready_rfq_bid);
	app.get("/ready_rfq_bid_detail/:user_id/:rfq_id", rfq_bid_validation.ready_rfq_bid_detail, rfq_bid.ready_rfq_bid_detail);
	app.post("/save_rfq_questions", rfq_bid_validation.save_rfq_questions, rfq_bid.save_rfq_questions);
	app.get("/full_rfq_detail/:user_id/:rfq_id", rfq_bid_validation.full_rfq_detail, rfq_bid.full_rfq_detail);
	app.put("/rfq_bid_submit", rfq_bid_validation.rfq_bid_submit, rfq_bid.rfq_bid_submit);
	app.get("/get_rejection_remarks/:user_id", rfq_bid_validation.get_rejection_remarks, rfq_bid.get_rejection_remarks);
	app.put("/rfq_no_bid_submit", rfq_bid_validation.rfq_no_bid_submit, rfq_bid.rfq_no_bid_submit);


	// api for the tendering person
	var tendering_calls=require('../controller/tendering/quote');
	var tendering_validation=require('../controller/validation/tendering/quote');
	app.get("/tendering_teams_quotes/:user_id", tendering_validation.tendering_teams_quotes, tendering_calls.tendering_teams_quotes);

	app.get("/tendering_fetch_particular_quote/:user_id/:rfq_id", tendering_validation.tendering_fetch_particular_quote, tendering_calls.tendering_fetch_particular_quote);

	app.post("/tendering_fetch_product_design_detail", tendering_validation.tendering_fetch_product_design_detail, tendering_calls.tendering_fetch_product_design_detail);
	
	app.get("/tendering_fetch_particular_design/:user_id/:product_designs_id/:rfq_lines_id",tendering_validation.tendering_fetch_particular_design,  tendering_calls.tendering_fetch_particular_design);

	// app.get("/tendering_calculate_sales_price/:user_id/:rfq_lines_id/:complexities_id/:product_design_id", tendering_validation.tendering_calculate_sales_price, tendering_calls.tendering_calculate_sales_price);
	
	app.get("/tendering_calculate_sales_price/:user_id/:rfq_lines_id/:product_design_id", tendering_validation.tendering_calculate_sales_price, tendering_calls.tendering_calculate_sales_price);

	app.get("/tendering_complexity_overhead/:user_id/:complexities_id/:plants_id", tendering_validation.tendering_complexity_overhead, tendering_calls.tendering_complexity_overhead);

	app.post("/tendering_save_calculated_sales_price", tendering_validation.tendering_save_calculated_sales_price, tendering_calls.tendering_save_calculated_sales_price);
	app.get("/tendering_get_sales_price_detail/:user_id/:rfq_lines_id", tendering_validation.tendering_get_sales_price_detail, tendering_calls.tendering_get_sales_price_detail);
	// api for the full rfq Detail
	// app.get("/tendering_full_view_quote_detail/:user_id/:rfq_lines_id", tendering_validation.tendering_get_sales_price_detail, tendering_calls.tendering_get_sales_price_detail);
	app.get("/tendering_view_calculated_sales_price/:user_id/:rfq_lines_id", tendering_validation.tendering_view_calculated_sales_price, tendering_calls.tendering_view_calculated_sales_price);
	app.put("/tendering_submit_rfq_lines", tendering_validation.tendering_submit_rfq_lines, tendering_calls.tendering_submit_rfq_lines);
	app.put("/tendering_submit_rfq_to_sales", tendering_validation.tendering_submit_rfq_to_sales, tendering_calls.tendering_submit_rfq_to_sales);

	app.delete("/tendering_rfq_lines_technical_spec_delete/:user_id/:rfq_lines_id/:product_properties_id", tendering_validation.tendering_rfq_lines_technical_spec_delete, tendering_calls.tendering_rfq_lines_technical_spec_delete);


	// api for the sales_person for the quote finalize and follow up
	var rfq_quote_calls=require('../controller/rfq/rfq_quote_finalize.js');
	var rfq_quote_validation=require('../controller/validation/rfq_quote_finalize.js');
	
	app.get("/sales_quote_finalize_fetch_all/:user_id", rfq_quote_validation.sales_quote_finalize_fetch_all, rfq_quote_calls.sales_quote_finalize_fetch_all);

	app.get("/sales_quote_finalize_fetch_one/:user_id/:rfq_id", rfq_quote_validation.sales_quote_finalize_fetch_one, rfq_quote_calls.sales_quote_finalize_fetch_one);
	
	app.put("/sales_quote_finalize_submit", rfq_quote_validation.sales_quote_finalize_submit, rfq_quote_calls.sales_quote_finalize_submit);

	// api for the quote follow up

	var rfq_followup_calls=require('../controller/rfq/rfq_quote_follow_up.js');
	var rfq_followup_validation=require('../controller/validation/rfq_quote_follow_up.js');
	
	app.get("/sales_quote_followup_fetch_all/:user_id", rfq_followup_validation.sales_quote_followup_fetch_all, rfq_followup_calls.sales_quote_followup_fetch_all);
	
	app.get("/sales_quote_followup_fetch_one/:user_id/:rfq_id", rfq_followup_validation.sales_quote_followup_fetch_one, rfq_followup_calls.sales_quote_followup_fetch_one);

	app.put("/sales_quote_followup_update", rfq_followup_validation.sales_quote_followup_update, rfq_followup_calls.sales_quote_followup_update);

	app.post("/sales_quote_followup_obsolete", rfq_followup_validation.sales_quote_followup_obsolete, rfq_followup_calls.sales_quote_followup_obsolete);

	var customerValidation=require("../controller/validation/customer.js");
	var customer=require("../controller/customer/customer.js");

	app.post("/customer", customerValidation.add, customer.add);
	app.get("/customer/:user_id", customerValidation.show, customer.show);


// sales_quote_followup_obsolete

	// dashboard
	var dashboardValidation = require("../controller/validation/dashboard.js");
	var dashboard = require("../controller/dashboard.js");
	app.get("/dashboard/:user_id", dashboardValidation.dashboard, dashboard.dashboard);


};
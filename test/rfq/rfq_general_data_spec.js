var app = require('../../helper/app');
var testConnection = require('../../helper/connection');

var should = require('should'),
	supertest = require('supertest');

	var general = require("../global/general");

	var email="nitin.naik@cgglobal.com";
	var password="5e8ff9bf55ba3508199d22e984129be6";

// test cases for the general data of the rfq creation

describe('RFQ General Data', function () {
	var url="/rfq_general_data";
	var parameter="";
	var token ="";
	var data="";

	it("Should OK all the valid data", function (done) {
		login("/login", email, password, function(out){
			rfq_finalize(out.data[0].id, out.authentication_token, function(obj){
				var rfq_id=obj.partial_rfq[0].id;
				rfq_general_data(url, out.data[0].id, rfq_id, out.authentication_token,200, function(obj){
					done();
				});
			})
	 	});
	});

	it("Should  not OK becouse authentication_token not set in the header", function (done) {
		login("/login", email, password, function(out){
			rfq_finalize(out.data[0].id, out.authentication_token, function(obj){
				var user_id=out.data[0].id;
				var rfq_id=obj.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				TokenNotSetTest(url, parameter, 404, function(){
					done();
				});
			})
	 	});
	});

	it("Should NOT OK becouse authentication_token set in header but value not set", function (done) {
		login("/login", email, password, function(out){
			rfq_finalize(out.data[0].id, out.authentication_token, function(obj){
				var rfq_id=obj.partial_rfq[0].id;
				rfq_general_data(url, out.data[0].id, rfq_id, "",404, function(obj){
					done();
				});
			})
	 	});
	});

	it("Should NOT OK becouse authentication_token set in header but value invalid set", function (done) {
		login("/login", email, password, function(out){
			rfq_finalize(out.data[0].id, out.authentication_token, function(obj){
				var rfq_id=obj.partial_rfq[0].id;
				rfq_general_data(url, out.data[0].id, rfq_id, "invalid",404, function(obj){
					done();
				});
			})
	 	});
	});


	it("Should NOT OK becouse user_id is a Not A Number", function (done) {
		login("/login", email, password, function(out){
			rfq_finalize(out.data[0].id, out.authentication_token, function(obj){
				var rfq_id=obj.partial_rfq[0].id;
				rfq_general_data(url, out.data[0].id+"helelelss", rfq_id, out.authentication_token,404, function(obj){
					done();
				});
			})
	 	});
	});

	it("Should NOT OK becouse rfq_id is a Not A Number", function (done) {
		login("/login", email, password, function(out){
			rfq_finalize(out.data[0].id, out.authentication_token, function(obj){
				var rfq_id=obj.partial_rfq[0].id;
				rfq_general_data(url, out.data[0].id, "invalid", out.authentication_token,404, function(obj){
					done();
				});
			})
	 	});
	});

	it("Should NOT OK becouse rfq_id not created by user_id", function (done) {
		login("/login", email, password, function(out){
			rfq_finalize(out.data[0].id, out.authentication_token, function(obj){
				var rfq_id=obj.partial_rfq[0].id;
				rfq_general_data(url, out.data[0].id, rfq_id, out.authentication_token,200, function(obj){
					done();
				});
			})
	 	});
	});


	it("Should NOT OK becouse user_id is a invalid", function (done) {
		login("/login", email, password, function(out){
			rfq_finalize(out.data[0].id, out.authentication_token, function(obj){
				var rfq_id=obj.partial_rfq[0].id;
				rfq_general_data(url, 010101010101011, rfq_id, out.authentication_token,404, function(obj){
					done();
				});
			})
	 	});
	});


});


describe('RFQ General Data Sales Agent Get call', function () {
	var url="/rfq_general_data_sales_agents";
	var parameter="";
	var token ="";
	var data="";
	it("Should OK all the valid data", function (done) {
		login("/login", email, password, function(out){
			rfq_finalize(out.data[0].id, out.authentication_token, function(obj){
				var rfq_id=obj.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token,200, function(obj){
					var country_id=obj.countries[0].id;
					rfq_general_data_sales_agents(url, user_id, country_id, out.authentication_token,200, function(obj){
						done();
					});
				});
			})
	 	});
	});

	it("Should  not OK becouse authentication_token not set in the header", function (done) {
		login("/login", email, password, function(out){
			rfq_finalize(out.data[0].id, out.authentication_token, function(obj){
				var rfq_id=obj.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token,200, function(obj){
					var country_id=obj.countries[0].id;
					var parameter=user_id+"/"+country_id;
					TokenNotSetTest(url, parameter, 404, function(){
						done();
					});
				});
			});
		});
	});

	it("Should NOT OK becouse authentication_token set in header but value not set", function (done) {
		login("/login", email, password, function(out){
			rfq_finalize(out.data[0].id, out.authentication_token, function(obj){
				var rfq_id=obj.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token,200, function(obj){
					var country_id=obj.countries[0].id;
					rfq_general_data_sales_agents(url, user_id, country_id, "",404, function(obj){
						done();
					});
				});
			})
	 	});
	});

	it("Should NOT OK becouse authentication_token set in header but value invalid set", function (done) {
		login("/login", email, password, function(out){
			rfq_finalize(out.data[0].id, out.authentication_token, function(obj){
				var rfq_id=obj.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token,200, function(obj){
					var country_id=obj.countries[0].id;
					rfq_general_data_sales_agents(url, user_id, country_id, "invalid", 404, function(obj){
						done();
					});
				});
			})
	 	});
	});


	it("Should NOT OK becouse user_id is a Not A Number", function (done) {
		login("/login", email, password, function(out){
			rfq_finalize(out.data[0].id, out.authentication_token, function(obj){
				var rfq_id=obj.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token,200, function(obj){
					var country_id=obj.countries[0].id;
					rfq_general_data_sales_agents(url, "not a number", country_id, out.authentication_token,404, function(obj){
						done();
					});
				});
			})
	 	});
	});

	it("Should NOT OK becouse country_id is a Not A Number", function (done) {
		login("/login", email, password, function(out){
			rfq_finalize(out.data[0].id, out.authentication_token, function(obj){
				var rfq_id=obj.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token,200, function(obj){
					var country_id=obj.countries[0].id;
					rfq_general_data_sales_agents(url, user_id, "not a number", out.authentication_token,404, function(obj){
						done();
					});
				});
			})
	 	});
	});

	it("Should NOT OK becouse user_id is a invalid", function (done) {
		login("/login", email, password, function(out){
			rfq_finalize(out.data[0].id, out.authentication_token, function(obj){
				var rfq_id=obj.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token,200, function(obj){
					var country_id=obj.countries[0].id;
					rfq_general_data_sales_agents(url, 01010101010101, country_id, out.authentication_token,404, function(obj){
						done();
					});
				});
			})
	 	});
	});
});


describe('RFQ General Data Sales persons Get call', function () {
	var url="/rfq_general_data_sales_persons";
	var parameter="";
	var token ="";
	var data="";
	it("Should OK all the valid data", function (done) {
		login("/login", email, password, function(out){
			rfq_finalize(out.data[0].id, out.authentication_token, function(obj){
				var rfq_id=obj.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token,200, function(obj){
					var country_id=obj.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(obj){
						var sales_hubs_id=obj.sales_agents[0].id;
						rfq_general_data_sales_persons(url, user_id, sales_hubs_id, out.authentication_token,200, function(obj){
							done();
						});
					});
				});
			})
	 	});
	});

	

	it("Should  not OK becouse authentication_token not set in the header", function (done) {
		login("/login", email, password, function(out){
			rfq_finalize(out.data[0].id, out.authentication_token, function(obj){
				var rfq_id=obj.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token,200, function(obj){
					var country_id=obj.countries[0].id;
					var sales_hubs_id=obj.sales_agents[0].id;
					var parameter=user_id+"/"+sales_hubs_id;
					TokenNotSetTest(url, parameter, 404, function(){
						done();
					});
				});
			})
	 	});
	});

	it("Should NOT OK becouse authentication_token set in header but value not set", function (done) {
		login("/login", email, password, function(out){
			rfq_finalize(out.data[0].id, out.authentication_token, function(obj){
				var rfq_id=obj.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token,200, function(obj){
					var country_id=obj.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(obj){
						var sales_hubs_id=obj.sales_agents[0].id;
						rfq_general_data_sales_persons(url, user_id, sales_hubs_id, "",404, function(obj){
							done();
						});
					});
				});
			})
	 	});
	});

	it("Should NOT OK becouse authentication_token set in header but value invalid set", function (done) {
		login("/login", email, password, function(out){
			rfq_finalize(out.data[0].id, out.authentication_token, function(obj){
				var rfq_id=obj.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token,200, function(obj){
					var country_id=obj.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(obj){
						var sales_hubs_id=obj.sales_agents[0].id;
						rfq_general_data_sales_persons(url, user_id, sales_hubs_id, "invalid",404, function(obj){
							done();
						});
					});
				});
			})
	 	});
	});


	it("Should NOT OK becouse user_id is a Not A Number", function (done) {
		login("/login", email, password, function(out){
			rfq_finalize(out.data[0].id, out.authentication_token, function(obj){
				var rfq_id=obj.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token,200, function(obj){
					var country_id=obj.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(obj){
						var sales_hubs_id=obj.sales_agents[0].id;
						rfq_general_data_sales_persons(url, "not a number", sales_hubs_id, out.authentication_token,404, function(obj){
							done();
						});
					});
				});
			})
	 	});
	});

	it("Should NOT OK becouse sales_hubs_id is a Not A Number", function (done) {
		login("/login", email, password, function(out){
			rfq_finalize(out.data[0].id, out.authentication_token, function(obj){
				var rfq_id=obj.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token,200, function(obj){
					var country_id=obj.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(obj){
						var sales_hubs_id=obj.sales_agents[0].id;
						rfq_general_data_sales_persons(url, user_id, "not a number", out.authentication_token,404, function(obj){
							done();
						});
					});
				});
			})
	 	});
	});

	it("Should NOT OK becouse user_id is a invalid", function (done) {
		login("/login", email, password, function(out){
			rfq_finalize(out.data[0].id, out.authentication_token, function(obj){
				var rfq_id=obj.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token,200, function(obj){
					var country_id=obj.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(obj){
						var sales_hubs_id=obj.sales_agents[0].id;
						rfq_general_data_sales_persons(url, 010101010101, sales_hubs_id, out.authentication_token,404, function(obj){
							done();
						});
					});
				});
			})
	 	});
	});

});


describe("Save RFQ General Data", function(){
	var url="/save_rfq_general_data";
	var parameter="";
	var token ="";
	var data="";
	it("Should OK all the valid data with is_bid is true", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 200, function(obj){
									// console.log(obj);
									done();
								});
						});
					});
				});
			
	 	});
	});

	it("Should NOT OK all the valid data with is_bid is false and sales_rejection_remarks_id not provide", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":0
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									// console.log(obj);
									done();
								});
						});
					});
				});
			
	 	});
	});

	it("Should OK all the valid data with is_bid is false and sales_rejection_remarks_id provide", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"sales_rejection_remarks_id":1,
											"is_bid":"0",
											};
								save_rfq_general_data(url, parameter, token, 200, function(obj){
									// console.log(obj);
									done();
								});
						});
					});
				});
			
	 	});
	});

	it("Should NOT OK becouse authentication_token not set in the header", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data_WithoutHeader(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	it("Should NOT OK becouse authentication_token set in the header but value is not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, "", 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	it("Should NOT OK becouse authentication_token set in the header but invalid", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, "invalid", 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});


	it("Should NOT OK becouse user_id not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	it("Should NOT OK becouse user_id define but value not set", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={"user_id": "",
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});
	
	it("Should NOT OK becouse user_id invalid", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={"user_id": "invalid",
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	it("Should NOT OK becouse sales_hub_id not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											// "sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	it("Should NOT OK becouse sales_hub_id define but value not set", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": "",
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	it("Should NOT OK becouse sales_person_id not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											// "sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	it("Should NOT OK becouse sales_person_id define value not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": "",
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	it("Should NOT OK becouse customers_id not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											// "customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	
	it("Should NOT OK becouse customers_id define but value not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": "",
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	
	it("Should NOT OK becouse customer_country not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											// "customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});


	it("Should NOT OK becouse customer_country define but value not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": "",
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	it("Should NOT OK becouse type_of_quote_id not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											// "type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	
	
	it("Should NOT OK becouse type_of_quote_id define but value not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": "",
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	
	it("Should NOT OK becouse date_rfq_in not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
							var month = dt.getMonth()+1;
							var day = dt.getDate();
							var year = dt.getFullYear();
							var today=year+'-'+month+'-'+day;
							var rqd=year+'-'+(month+2)%12+'-'+day;
						var parameter={
										"user_id": user_id,
										"sales_hub_id": general.sales_hubs[0].id,
										"sales_person_id": sales_person_id,
										"customers_id": general.customers[0].id,
										"customer_country": general.countries[0].id,
										"type_of_quote_id": general.type_of_quote[0].id,
										// "date_rfq_in": today,
										"sales_segments_id": general.sales_segments[0].id,
										"requested_quotation_date": rqd,
										"probability": 30,
										"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
										};
							save_rfq_general_data(url, parameter, token, 404, function(obj){
								done();
							});
						});
					});
				});
			
	 	});
	});


	it("Should NOT OK becouse date_rfq_in define but value not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": "",
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});


	it("Should NOT OK becouse sales_segments_id not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											// "sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});


	it("Should NOT OK becouse sales_segments_id defined but value not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": "",
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	
	
	it("Should NOT OK becouse requested_quotation_date not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											// "requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	

	it("Should NOT OK becouse requested_quotation_date define but value not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": "",
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	
	it("Should NOT OK becouse probability not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											// "probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	it("Should NOT OK becouse probability define but value not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": "",
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	it("Should NOT OK becouse rfq_status_id not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"channel_to_market":1,
											"is_bid":1
											// "rfq_status_id": "0"
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

		
	it("Should NOT OK becouse rfq_status_id define but value not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	it("Should NOT OK becouse sales_hub_id Non Numeric value", function (done) {
		 // ["user_id", "sales_hub_id", "sales_person_id", "customers_id", "customer_country",
		  // "type_of_quote_id", "date_rfq_in", "sales_segments_id",
		  //  "requested_quotation_date", "probability", "rfq_status_id"];
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": "non numeric",
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

		it("Should NOT OK becouse sales_person_id Non Numeric value", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": "non numeric",
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0"
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	
	it("Should NOT OK becouse customer_id Non Numeric value", function (done) {
		 // ["user_id", "sales_hub_id", "sales_person_id", "customers_id", "customer_country",
		  // "type_of_quote_id", "date_rfq_in", "sales_segments_id",
		  //  "requested_quotation_date", "probability", "rfq_status_id"];
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": "non Numeric",
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	it("Should NOT OK becouse customer_country Non Numeric value", function (done) {
		 // ["user_id", "sales_hub_id", "sales_person_id", "customers_id", "customer_country",
		  // "type_of_quote_id", "date_rfq_in", "sales_segments_id",
		  //  "requested_quotation_date", "probability", "rfq_status_id"];
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": "non Numeric",
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	
	it("Should NOT OK becouse type_of_quote_id Non Numeric value", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": "non numerica value",
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	it("Should NOT OK becouse sales_segments_id Non Numeric value", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": "non numeric value",
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	it("Should NOT OK becouse probability Non Numeric value", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": "non nemeric value",
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	it("Should NOT OK becouse rfq_status_id Non Numeric value", function (done) {
		 // ["user_id", "sales_hub_id", "sales_person_id", "customers_id", "customer_country",
		  // "type_of_quote_id", "date_rfq_in", "sales_segments_id",
		  //  "requested_quotation_date", "probability", "rfq_status_id"];
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "non numeric",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	it("Should OK When pass non manditory field installation_country", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"installation_country":general.countries[0].id,
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 200, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	it("Should OK When pass non manditory field project_name", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"project_name":"testing project Name",
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 200, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});


	it("Should OK When pass non manditory field sales_agents", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						var sales_agent_id=agent.sales_agents[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"sales_agents_id":sales_agent_id,
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 200, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	it("Should OK When pass non manditory field project_name", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"strategic_quote": 1,
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 200, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});


	it("Should OK When all the data with non manditory", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=agent.sales_agents[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"installation_country":general.countries[0].id,
											"project_name":"testing project Name",
											"sales_agents_id": agent.sales_agents[0].id,
											"strategic_quote": 1,
											"channel_to_market":1,
											"is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 200, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	it("Should NOT OK When all the data correct but is_bid not provide", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=agent.sales_agents[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"installation_country":general.countries[0].id,
											"project_name":"testing project Name",
											"sales_agents_id": agent.sales_agents[0].id,
											"strategic_quote": 1,
											"channel_to_market":1,
											// "is_bid":1
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});

	it("Should NOT OK When all the data correct but is_bid value not provide", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			
				var rfq_id=0;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=agent.sales_agents[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"installation_country":general.countries[0].id,
											"project_name":"testing project Name",
											"sales_agents_id": agent.sales_agents[0].id,
											"strategic_quote": 1,
											"channel_to_market":1,
											"is_bid":""
											};
								save_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			
	 	});
	});


});


// update FRQ General Data test cases


describe("Update RFQ General Data", function(){
	var url="/update_rfq_general_data";
	var parameter="";
	var token ="";
	var data="";
	it("Should OK all the valid data", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[1].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 40,
											"rfq_status_id": "1",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 200, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	it("Should NOT OK becouse authentication_token not set in the header", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data_WithoutHeader(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	it("Should NOT OK becouse authentication_token set in the header but value is not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, "", 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	it("Should NOT OK becouse authentication_token set in the header but invalid", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, "invalid", 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});


	it("Should NOT OK becouse user_id not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"rfq_id":rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	it("Should NOT OK becouse user_id define but value not set", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={"user_id": "",
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});
	
	it("Should NOT OK becouse user_id invalid", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={"user_id": "invalid",
											"rfq_id" :rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});


	
	// code

	it("Should NOT OK becouse rfq_id not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={"user_id": user_id,
											// "rfq_id":rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	it("Should NOT OK becouse rfq_id define but value not set", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={"user_id": user_id,
											"rfq_id": "",
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});
	
	it("Should NOT OK becouse rfq_id invalid", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={"user_id": user_id,
											"rfq_id" :"invalid",
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	// code



	it("Should NOT OK becouse sales_hub_id not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											// "sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	it("Should NOT OK becouse sales_hub_id define but value not set", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": "",
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	it("Should NOT OK becouse sales_person_id not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											// "sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	it("Should NOT OK becouse sales_person_id define value not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": "",
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	it("Should NOT OK becouse customers_id not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											// "customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	
	it("Should NOT OK becouse customers_id define but value not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": "",
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	
	it("Should NOT OK becouse customer_country not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											// "customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});


	it("Should NOT OK becouse customer_country define but value not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": "",
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	it("Should NOT OK becouse type_of_quote_id not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											// "type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	
	
	it("Should NOT OK becouse type_of_quote_id define but value not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": "",
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	
	it("Should NOT OK becouse date_rfq_in not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
							var month = dt.getMonth()+1;
							var day = dt.getDate();
							var year = dt.getFullYear();
							var today=year+'-'+month+'-'+day;
							var rqd=year+'-'+(month+2)%12+'-'+day;
						var parameter={
										"user_id": user_id,
										"rfq_id": rfq_id,
										"sales_hub_id": general.sales_hubs[0].id,
										"sales_person_id": sales_person_id,
										"customers_id": general.customers[0].id,
										"customer_country": general.countries[0].id,
										"type_of_quote_id": general.type_of_quote[0].id,
										// "date_rfq_in": today,
										"sales_segments_id": general.sales_segments[0].id,
										"requested_quotation_date": rqd,
										"probability": 30,
										"rfq_status_id": "0",
										"channel_to_market":1,
										"is_bid":1
										};
							update_rfq_general_data(url, parameter, token, 404, function(obj){
								done();
							});
						});
					});
				});
			})
	 	});
	});


	it("Should NOT OK becouse date_rfq_in define but value not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": "",
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});


	it("Should NOT OK becouse sales_segments_id not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											// "sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});


	it("Should NOT OK becouse sales_segments_id defined but value not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": "",
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	
	
	it("Should NOT OK becouse requested_quotation_date not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											// "requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	

	it("Should NOT OK becouse requested_quotation_date define but value not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": "",
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	
	it("Should NOT OK becouse probability not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											// "probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	it("Should NOT OK becouse probability define but value not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": "",
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	it("Should NOT OK becouse rfq_status_id not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"channel_to_market":1,
											"is_bid":1
											// "rfq_status_id": "0"
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

		
	it("Should NOT OK becouse rfq_status_id define but value not define", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	it("Should NOT OK becouse sales_hub_id Non Numeric value", function (done) {
		 // ["user_id", "sales_hub_id", "sales_person_id", "customers_id", "customer_country",
		  // "type_of_quote_id", "date_rfq_in", "sales_segments_id",
		  //  "requested_quotation_date", "probability", "rfq_status_id"];
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": "non numeric",
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

		it("Should NOT OK becouse sales_person_id Non Numeric value", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": "non numeric",
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	
	it("Should NOT OK becouse customer_id Non Numeric value", function (done) {
		 // ["user_id", "sales_hub_id", "sales_person_id", "customers_id", "customer_country",
		  // "type_of_quote_id", "date_rfq_in", "sales_segments_id",
		  //  "requested_quotation_date", "probability", "rfq_status_id"];
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": "non Numeric",
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	it("Should NOT OK becouse customer_country Non Numeric value", function (done) {
		 // ["user_id", "sales_hub_id", "sales_person_id", "customers_id", "customer_country",
		  // "type_of_quote_id", "date_rfq_in", "sales_segments_id",
		  //  "requested_quotation_date", "probability", "rfq_status_id"];
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": "non Numeric",
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	
	it("Should NOT OK becouse type_of_quote_id Non Numeric value", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": "non numerica value",
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	it("Should NOT OK becouse sales_segments_id Non Numeric value", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": "non numeric value",
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	it("Should NOT OK becouse probability Non Numeric value", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": "non nemeric value",
											"rfq_status_id": "0",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	it("Should NOT OK becouse rfq_status_id Non Numeric value", function (done) {
		 // ["user_id", "sales_hub_id", "sales_person_id", "customers_id", "customer_country",
		  // "type_of_quote_id", "date_rfq_in", "sales_segments_id",
		  //  "requested_quotation_date", "probability", "rfq_status_id"];
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "non numeric",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	it("Should OK When pass non manditory field installation_country", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"installation_country":general.countries[0].id,
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 200, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	it("Should OK When pass non manditory field project_name", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"project_name":"testing project Name",
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 200, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});


	it("Should OK When pass non manditory field sales_agents", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						var sales_agent_id=agent.sales_agents[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"sales_agents_id":sales_agent_id,
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 200, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	it("Should OK When pass non manditory field project_name", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=general.sales_hubs[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[0].id,
											"requested_quotation_date": rqd,
											"probability": 30,
											"rfq_status_id": "0",
											"strategic_quote": 1,
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 200, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});


	it("Should OK When all the data with non manditory", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=agent.sales_agents[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[1].id,
											"requested_quotation_date": rqd,
											"probability": 60,
											"rfq_status_id": "0",
											"installation_country":general.countries[1].id,
											"project_name":"testing project Name Updated",
											"sales_agents_id": agent.sales_agents[0].id,
											"strategic_quote": 1,
											"channel_to_market":1,
											"is_bid":1
											};
								update_rfq_general_data(url, parameter, token, 200, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	it("Should NOT OK When all the data correct but is_bid is false and sales_rejection_remarks_id not defined", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=agent.sales_agents[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[1].id,
											"requested_quotation_date": rqd,
											"probability": 60,
											"rfq_status_id": "0",
											"installation_country":general.countries[1].id,
											"project_name":"testing project Name Updated",
											"sales_agents_id": agent.sales_agents[0].id,
											"strategic_quote": 1,
											"channel_to_market":1,
											"is_bid":"0"
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	it("Should NOT OK When all the data correct but is_bid is false and sales_rejection_remarks_id value not defined", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=agent.sales_agents[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[1].id,
											"requested_quotation_date": rqd,
											"probability": 60,
											"rfq_status_id": "0",
											"installation_country":general.countries[1].id,
											"project_name":"testing project Name Updated",
											"sales_agents_id": agent.sales_agents[0].id,
											"strategic_quote": 1,
											"channel_to_market":1,
											"is_bid":"0",
											"sales_rejection_remarks_id":""
											};
								update_rfq_general_data(url, parameter, token, 404, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

	it("Should OK When all the data correct but is_bid is false and sales_rejection_remarks_id defined", function (done) {
		login("/login", email, password, function(out){
			token=out.authentication_token;
			rfq_finalize(out.data[0].id, out.authentication_token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var user_id=out.data[0].id;
				rfq_general_data("/rfq_general_data", user_id, rfq_id, out.authentication_token, 200, function(general){
					var country_id=general.countries[0].id;
					rfq_general_data_sales_agents("/rfq_general_data_sales_agents", user_id, country_id, out.authentication_token,200, function(agent){
						var sales_hubs_id=agent.sales_agents[0].id;
						rfq_general_data_sales_persons("/rfq_general_data_sales_persons", user_id, sales_hubs_id, out.authentication_token,200, function(sales_person){
							var sales_person_id=sales_person.sales_persons[0].id;
								var dt=new Date();
								var month = dt.getMonth()+1;
								var day = dt.getDate();
								var year = dt.getFullYear();
								var today=year+'-'+month+'-'+day;
								var rqd=year+'-'+(month+2)%12+'-'+day;
							var parameter={
											"user_id": user_id,
											"rfq_id": rfq_id,
											"sales_hub_id": general.sales_hubs[0].id,
											"sales_person_id": sales_person_id,
											"customers_id": general.customers[0].id,
											"customer_country": general.countries[0].id,
											"type_of_quote_id": general.type_of_quote[0].id,
											"date_rfq_in": today,
											"sales_segments_id": general.sales_segments[1].id,
											"requested_quotation_date": rqd,
											"probability": 60,
											"rfq_status_id": "0",
											"installation_country":general.countries[1].id,
											"project_name":"testing project Name Updated",
											"sales_agents_id": agent.sales_agents[0].id,
											"strategic_quote": 1,
											"channel_to_market":1,
											"is_bid":"0",
											"sales_rejection_remarks_id":1
											};
								update_rfq_general_data(url, parameter, token, 200, function(obj){
									done();
								});
						});
					});
				});
			})
	 	});
	});

});










function login(url, email, password, callback){
	supertest(app)
		.post('/login')
		.type('form')
		.field('email', email)
     	.field('password', password)
		.end(function (err, res) {
			if(err){
			}
			callback(res.body);
	});
}
// to get the rfq_id
function rfq_finalize(user_id, token, callback){
	supertest(app)
		.get('/rfq_finalize/'+user_id)
		.set('authentication_token', token)
		.end(function (err, res) {
			if(err){
			}
			callback(res.body);
	});
}
function rfq_general_data(url, user_id, rfq_id, token, status_code, callback){
	supertest(app)
		.get(url+'/'+user_id+'/'+rfq_id)
		.set('authentication_token', token)
		.expect(status_code)
		.end(function (err, res) {
			if(err){
			}
			// console.log(res.body);
			res.body.statusCode.should.equal(status_code);
			// console.log(res.body);
			callback(res.body);
	});
}


function rfq_general_data_sales_agents(url, user_id, country_id, token, status_code, callback){
	// console.log(country_id);
	supertest(app)
		.get(url+'/'+user_id+'/'+country_id)
		.set('authentication_token', token)
		.expect(status_code)
		.end(function (err, res) {
			if(err){
			}
			res.body.statusCode.should.equal(status_code);
			callback(res.body);
	});
}

function rfq_general_data_sales_persons(url, user_id, sales_hub_id, token, status_code, callback){
	supertest(app)
		.get(url+'/'+user_id+'/'+sales_hub_id)
		.set('authentication_token', token)
		.expect(status_code)
		.end(function (err, res) {
			if(err){
			}
			res.body.statusCode.should.equal(status_code);
			callback(res.body);
	});
}

function TokenNotSetTest(url, parameter, status_code, callback){
	supertest(app)
		.get(url+"/"+parameter)
		// .set('authentication_token', token)
		.expect(status_code)
		.end(function (err, res) {
			if(err){
			}
			res.body.statusCode.should.equal(status_code);
			callback();
	});
}


function save_rfq_general_data(url, parameter, token, status_code, callback){
	supertest(app)
		.post(url)
		.send(parameter)
		.set('authentication_token', token)
		.set('Content-Type', 'application/json')
		.expect(status_code)
		.end(function (err, res) {
			if(err){
			}
			// console.log(res.body);
			res.body.statusCode.should.equal(status_code);
			callback(res.body);
	});
}

function save_rfq_general_data_WithoutHeader(url, parameter, token, status_code, callback){
	supertest(app)
		.post(url)
		.send(parameter)
		// .set('authentication_token', token)
		.expect(status_code)
		.end(function (err, res) {
			if(err){
			}
			res.body.statusCode.should.equal(status_code);
			callback(res.body);
	});
}




function update_rfq_general_data(url, parameter, token, status_code, callback){
	supertest(app)
		.put(url)
		.send(parameter)
		.set('authentication_token', token)
		.set('Content-Type', 'application/json')
		.expect(status_code)
		.end(function (err, res) {
			if(err){
			}
			// console.log(res.body);
			res.body.statusCode.should.equal(status_code);
			callback(res.body);
	});
}

function update_rfq_general_data_WithoutHeader(url, parameter, token, status_code, callback){
	supertest(app)
		.put(url)
		.send(parameter)
		// .set('authentication_token', token)
		.expect(status_code)
		.end(function (err, res) {
			if(err){
			}
			res.body.statusCode.should.equal(status_code);
			callback(res.body);
	});
}
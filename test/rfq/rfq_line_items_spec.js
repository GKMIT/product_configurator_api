var app = require('../../helper/app');
var testConnection = require('../../helper/connection');

var should = require('should'),
	supertest = require('supertest');

	var global=require('../global/global_spec');
	var email="nitin.naik@cgglobal.com";
	var password="5e8ff9bf55ba3508199d22e984129be6";
describe('RFQ Line Items API Calls', function () {
		var email="nitin.naik@cgglobal.com";
		var password="5e8ff9bf55ba3508199d22e984129be6";
		var url="/rfq_new_line_item"

		it("Should ok All Correct Data", function (done) {
			login(email, password, function(user){
				var user_id=user.data[0].id;
				var token=user.authentication_token;
				getcall("/rfq_finalize", user_id, token, 200, function(rfq){
					var rfq_id=rfq.partial_rfq[0].id;
					var parameter=user_id+"/"+rfq_id;
					getcall(url, parameter, token, 200, function(line_item){
						done();
					});
				});
			});
		});

		it("Should not ok but token not define in the header", function (done) {
			login(email, password, function(user){
				var user_id=user.data[0].id;
				var token=user.authentication_token;
				getcall("/rfq_finalize", user_id, token, 200, function(rfq){
					var rfq_id=rfq.partial_rfq[0].id;
					var parameter=user_id+"/"+rfq_id;
					getcallWithoutToken(url, parameter, 404, function(line_item){
						done();
					});
				});
			});
		});


		it("Should not ok bcoz token value not set", function (done) {
			login(email, password, function(user){
				var user_id=user.data[0].id;
				var token=user.authentication_token;
				getcall("/rfq_finalize", user_id, token, 200, function(rfq){
					var rfq_id=rfq.partial_rfq[0].id;
					var parameter=user_id+"/"+rfq_id;
					token="";
					getcall(url, parameter, token, 404, function(line_item){
						done();
					});
				});
			});
		});

		it("Should not ok bcoz token value set but invalid", function (done) {
			login(email, password, function(user){
				var user_id=user.data[0].id;
				var token=user.authentication_token;
				getcall("/rfq_finalize", user_id, token, 200, function(rfq){
					var rfq_id=rfq.partial_rfq[0].id;
					var parameter=user_id+"/"+rfq_id;
					token="invalid";
					getcall(url, parameter, token, 404, function(line_item){
						done();
					});
				});
			});
		});

		it("Should not ok bcoz user_id value is invalid", function (done) {
			login(email, password, function(user){
				var user_id=user.data[0].id;
				var token=user.authentication_token;
				getcall("/rfq_finalize", user_id, token, 200, function(rfq){
					var rfq_id=rfq.partial_rfq[0].id;
					user_id="124785235548";
					var parameter=user_id+"/"+rfq_id;
					getcall(url, parameter, token, 404, function(line_item){
						done();
					});
				});
			});
		});

		it("Should not ok bcoz user_id value is non numeric", function (done) {
			login(email, password, function(user){
				var user_id=user.data[0].id;
				var token=user.authentication_token;
				getcall("/rfq_finalize", user_id, token, 200, function(rfq){
					var rfq_id=rfq.partial_rfq[0].id;
					user_id="nonNumeric";
					var parameter=user_id+"/"+rfq_id;
					getcall(url, parameter, token, 404, function(line_item){
						done();
					});
				});
			});
		});

		it("Should not ok bcoz rfq_id value is non numeric", function (done) {
			login(email, password, function(user){
				var user_id=user.data[0].id;
				var token=user.authentication_token;
				getcall("/rfq_finalize", user_id, token, 200, function(rfq){
					var rfq_id=rfq.partial_rfq[0].id;
					rfq_id="nonNumeric";
					var parameter=user_id+"/"+rfq_id;
					getcall(url, parameter, token, 404, function(line_item){
						done();
					});
				});
			});
		});

		it("Should not ok bcoz user_id not create the rfq_id", function (done) {
			login(email, password, function(user){
				var user_id=user.data[0].id;
				var token=user.authentication_token;
				getcall("/rfq_finalize", user_id, token, 200, function(rfq){
					var rfq_id=rfq.partial_rfq[0].id;
					rfq_id=32165498701201;
					var parameter=user_id+"/"+rfq_id;
					getcall(url, parameter, token, 401, function(line_item){
						done();
					});
				});
			});
		});


});


describe('All RFQ Line Items', function () {
	
	var url="/all_rfq_line_items"

	it("Should ok All Correct Data", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall(url, parameter, token, 200, function(line_item){
					done();
				});
			});
		});
	});

	it("Should not ok but token not define in the header", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcallWithoutToken(url, parameter, 404, function(line_item){
					done();
				});
			});
		});
	});


	it("Should not ok bcoz token value not set", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				token="";
				getcall(url, parameter, token, 404, function(line_item){
					done();
				});
			});
		});
	});

	it("Should not ok bcoz token value set but invalid", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				token="invalid";
				getcall(url, parameter, token, 404, function(line_item){
					done();
				});
			});
		});
	});


	it("Should not ok bcoz user_id value is invalid", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				user_id="1254789533";
				var parameter=user_id+"/"+rfq_id;
				getcall(url, parameter, token, 404, function(line_item){
					done();
				});
			});
		});
	});

	it("Should not ok bcoz user_id value is non numeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				user_id="nonNumeric";
				var parameter=user_id+"/"+rfq_id;
				getcall(url, parameter, token, 404, function(line_item){
					done();
				});
			});
		});
	});

	it("Should not ok bcoz rfq_id value is non numeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				rfq_id="nonNumeric";
				var parameter=user_id+"/"+rfq_id;
				getcall(url, parameter, token, 404, function(line_item){
					done();
				});
			});
		});
	});

	it("Should not ok bcoz user_id not create the rfq_id", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				rfq_id=32165498701201;
				var parameter=user_id+"/"+rfq_id;
				getcall(url, parameter, token, 401, function(line_item){
					done();
				});
			});
		});
	});

});

describe('Fetch Product Plants And Properties', function () {
	
	var url="/fetch_product_plants_properties"

	it("Should ok All Correct Data", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_product_lines", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall(url, parameter, token, 200, function(obj){
						done();
					});
				});
			});
		});
	});

	it("Should not ok becouse authentication_token not set", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_product_lines", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcallWithoutToken(url, parameter, 404, function(obj){
						done();
					});
				});
			});
		});
	});

	it("Should not ok authentication_token set but value not define", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_product_lines", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					token="";
					getcall(url, parameter, token, 404, function(obj){
						done();
					});
				});
			});
		});
	});

	it("Should not ok becouse authentication_token value invalid", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_product_lines", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					token="invalid";
					getcall(url, parameter, token, 404, function(obj){
						done();
					});
				});
			});
		});
	});

	it("Should not ok user_id is invalid", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_product_lines", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					user_id="00001212121240404";
					parameter=user_id+"/"+product_lines_id;
					getcall(url, parameter, token, 404, function(obj){
						done();
					});
				});
			});
		});
	});

	it("Should not ok becouse user_id is not numeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_product_lines", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					user_id="nonnumeric";
					parameter=user_id+"/"+product_lines_id;
					getcall(url, parameter, token, 404, function(obj){
						done();
					});
				});
			});
		});
	});

	it("Should not ok becouse product_lines_id is non numeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_product_lines", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					product_lines_id="nonNumeric";
					parameter=user_id+"/"+product_lines_id;
					getcall(url, parameter, token, 404, function(obj){
						done();
					});
				});
			});
		});
	});

});

describe("fetch_property_detail", function () {
    
	var url="/fetch_property_detail"

	it("Should ok BCOZ All Correct Data", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_product_lines", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var prop_id=prop.production_plants[0].id;
						parameter=user_id+"/"+prop_id;
						getcall(url, parameter, token, 200, function(prop){
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ authentication_token not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_product_lines", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var prop_id=prop.production_plants[0].id;
						parameter=user_id+"/"+prop_id;
						getcallWithoutToken(url, parameter, 404, function(prop){
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok authentication_token provide but invalid", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_product_lines", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var prop_id=prop.production_plants[0].id;
						parameter=user_id+"/"+prop_id;
						getcall(url, parameter, "invalid", 404, function(prop){
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ authentication_token provide but not define", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_product_lines", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var prop_id=prop.production_plants[0].id;
						parameter=user_id+"/"+prop_id;
						getcall(url, parameter, "", 404, function(prop){
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ user_id invalid ", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_product_lines", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var prop_id=prop.production_plants[0].id;
						parameter="0000"+"/"+prop_id;
						getcall(url, parameter, token, 404, function(prop){
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok user_id provide but nonNumeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_product_lines", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var prop_id=prop.production_plants[0].id;
						parameter="non_numeric"+"/"+prop_id;
						getcall(url, parameter, token, 404, function(prop){
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok plant_id provide but nonNumeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_product_lines", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var prop_id=prop.production_plants[0].id;
						parameter=user_id+"/"+"nonNumeric";
						getcall(url, parameter, token, 404, function(prop){
							done();
						});
					});
				});
			});
		});
	});

});


describe("fetch_rfq_line_items", function () {
    
	var url="/fetch_rfq_line_items"
	it("Should ok BCOZ All Correct Data", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/all_rfq_line_items", parameter, token, 200, function(rfq_lines){
					
					var rfq_lines_id=rfq_lines.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+rfq_id+"/"+rfq_lines_id;
					getcall(url, parameter, token, 200, function(line_items){
						done();
					});
				});
			});
		});
	});

	it("Should NOT OK BCOZ authentication_token not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/all_rfq_line_items", parameter, token, 200, function(rfq_lines){
					var rfq_lines_id=rfq_lines.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+rfq_id+"/"+rfq_lines_id;
					getcallWithoutToken(url, parameter, 404, function(line_items){
						done();
					});
				});
			});
		});
	});

	it("Should NOT OK BCOZ authentication_token provide but value not", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/all_rfq_line_items", parameter, token, 200, function(rfq_lines){
					var rfq_lines_id=rfq_lines.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+rfq_id+"/"+rfq_lines_id;
					getcall(url, parameter, "", 404, function(line_items){
						done();
					});
				});
			});
		});
	});

	it("Should NOT OK BCOZ invalid authentication_token provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/all_rfq_line_items", parameter, token, 200, function(rfq_lines){
					var rfq_lines_id=rfq_lines.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+rfq_id+"/"+rfq_lines_id;
					getcall(url, parameter, "invalid", 404, function(line_items){
						done();
					});
				});
			});
		});
	});

	it("Should NOT OK BCOZ user_id is nonNemeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/all_rfq_line_items", parameter, token, 200, function(rfq_lines){
					var rfq_lines_id=rfq_lines.selected_rfq_lines_items[0].id;
					parameter="nonNumeric"+"/"+rfq_id+"/"+rfq_lines_id;
					getcall(url, parameter, token, 404, function(line_items){
						done();
					});
				});
			});
		});
	});

	it("Should NOT OK BCOZ invalid user_id", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/all_rfq_line_items", parameter, token, 200, function(rfq_lines){
					var rfq_lines_id=rfq_lines.selected_rfq_lines_items[0].id;
					parameter="000000"+"/"+rfq_id+"/"+rfq_lines_id;
					getcall(url, parameter, token, 404, function(line_items){
						done();
					});
				});
			});
		});
	});


	it("Should NOT OK BCOZ rfq_id is nonNemeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/all_rfq_line_items", parameter, token, 200, function(rfq_lines){
					var rfq_lines_id=rfq_lines.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+"nonNumeric"+"/"+rfq_lines_id;
					getcall(url, parameter, token, 404, function(line_items){
						done();
					});
				});
			});
		});
	});

	it("Should NOT OK BCOZ invalid rfq_id", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/all_rfq_line_items", parameter, token, 200, function(rfq_lines){
					var rfq_lines_id=rfq_lines.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+"000000"+"/"+rfq_lines_id;
					getcall(url, parameter, token, 401, function(line_items){
						done();
					});
				});
			});
		});
	});

	it("Should NOT OK BCOZ rfq_lines_id is nonNemeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/all_rfq_line_items", parameter, token, 200, function(rfq_lines){
					var rfq_lines_id=rfq_lines.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+rfq_id+"/"+"nonNumeric";
					getcall(url, parameter, token, 404, function(line_items){
						done();
					});
				});
			});
		});
	});

	it("Should NOT OK BCOZ invalid rfq_lines_id", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/all_rfq_line_items", parameter, token, 200, function(rfq_lines){
					var rfq_lines_id=rfq_lines.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+rfq_id+"/"+"00000";
					getcall(url, parameter, token, 404, function(line_items){
						done();
					});
				});
			});
		});
	});

});



describe("save_line_item", function () {
    
	var url="/save_line_item"

	it("Should ok BCOZ All Correct Data blank technical_specifications array", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[]
									};
						Postcall(url, parameter, token, 200, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});
	
	it("Should ok BCOZ All Correct Data with technical_specifications", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				// console.log(rfq_id);
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall(url, parameter, token, 200, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ All Correct Data but technical_specifications not proper data", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "remark":"remakrs are bla bla.."}]
									};
						Postcall(url, parameter, token, 404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ technical_specifications not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									// "technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ technical_specifications not provide in the array format", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":""
									};
						Postcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});


	
	it("Should NOT ok BCOZ authentication_token not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						PostcallWithoutToken(url, parameter, 404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ authentication_token value not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall(url, parameter, "", 404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ authentication_token provide invalid", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall(url, parameter, "invalid", 404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ user_id not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
									// "user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ user_id provide but value not", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
									"user_id":"",
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ user_id value invalid provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
									"user_id":"0000000",
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ user_id provide but not a number", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
									"user_id":"invalid",
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});


	it("Should NOT ok BCOZ product_lines_id not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
									"user_id":user_id,
									// "product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ product_lines_id provide but value not", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":"",
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ product_lines_id provide but not a number", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":"nonNumeric",
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ plants_id not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									// "plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ plants_id provice but value not", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":"",
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ plants_id provide but non Numeric value", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":"nonNumeric",
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ rfq_id not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									// "rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ rfq_id provide but value not", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":"",
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ rfq_id provide but invalid", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":000000,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ rfq_id provide but value is not numeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":"nonNumeric",
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ number_of_units not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									// "number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ number_of_units provide but nonNumeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"invalid",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ number_of_units provide but value is 0", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":0,
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});


	it("Should NOT ok BCOZ rfq_status_id not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									// "rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ rfq_status_id provide but value not", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ rfq_status_id provide nut nonNumeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"nonNumeric",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});
	it("Should NOT ok BCOZ req_delivery_date not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									// "req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ req_delivery_date provide but value not", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

});

describe("update_line_item", function () {
	
	var url="/update_line_item"

	it("Should ok BCOZ All Correct Data blank technical_specifications array", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={"user_id":user_id,
									"product_lines_id":product_lines_id,
									"rfq_lines_id": rfq_line_items_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[]
									};
						Putcall(url, parameter, token, 200, function(prop){
							done();
						});
					});
				});
			});
		});
	});

	it("Should ok BCOZ All Correct Data with technical_specifications", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={"user_id":user_id,
									"product_lines_id":product_lines_id,
									"rfq_lines_id": rfq_line_items_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"updated value what ever !", "remark":"updated remakrs are bla bla.."}]
									};
						Putcall(url, parameter, token, 200, function(prop){
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ All Correct Data but technical_specifications not proper data", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={"user_id":user_id,
									"product_lines_id":product_lines_id,
									"rfq_lines_id": rfq_line_items_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "remark":"remakrs are bla bla.."}]
									};
						Putcall(url, parameter, token, 404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ technical_specifications not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"rfq_lines_id": rfq_line_items_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"req_delivery_date":"2014-10-10 12:00:00",
									// "technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Putcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ technical_specifications not provide in the array format", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"rfq_lines_id": rfq_line_items_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":""
									};
						Putcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});


	
	it("Should NOT ok BCOZ authentication_token not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={"user_id":user_id,
									"product_lines_id":product_lines_id,
									"rfq_lines_id": rfq_line_items_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						PutcallWithoutToken(url, parameter, 404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ authentication_token value not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={"user_id":user_id,
									"product_lines_id":product_lines_id,
									"rfq_lines_id": rfq_line_items_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Putcall(url, parameter, "", 404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ authentication_token provide invalid", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={"user_id":user_id,
									"product_lines_id":product_lines_id,
									"rfq_lines_id": rfq_line_items_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Putcall(url, parameter, "invalid", 404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ user_id not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
									// "user_id":user_id,
									"product_lines_id":product_lines_id,
									"rfq_lines_id": rfq_line_items_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Putcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ user_id provide but value not", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
									"user_id":"",
									"product_lines_id":product_lines_id,
									"rfq_lines_id": rfq_line_items_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Putcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ user_id value invalid provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
									"user_id":"0000000",
									"product_lines_id":product_lines_id,
									"rfq_lines_id": rfq_line_items_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Putcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ user_id provide but not a number", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
									"user_id":"invalid",
									"product_lines_id":product_lines_id,
									"rfq_lines_id": rfq_line_items_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Putcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});


	it("Should NOT ok BCOZ product_lines_id not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
									"user_id":user_id,
									// "product_lines_id":product_lines_id,
									"rfq_lines_id": rfq_line_items_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Putcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ product_lines_id provide but value not", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":"",
									"rfq_lines_id": rfq_line_items_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Putcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ product_lines_id provide but not a number", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":"nonNumeric",
									"rfq_lines_id": rfq_line_items_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Putcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ plants_id not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"rfq_lines_id": rfq_line_items_id,
									// "plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Putcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ plants_id provice but value not", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"rfq_lines_id": rfq_line_items_id,
									"plants_id":"",
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Putcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ plants_id provide but non Numeric value", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"rfq_lines_id": rfq_line_items_id,
									"plants_id":"nonNumeric",
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Putcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ rfq_id not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"rfq_lines_id": rfq_line_items_id,
									"plants_id":plants_id,
									// "rfq_id":rfq_id,
									"number_of_units":"12",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Putcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ rfq_id provide but value not", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"rfq_lines_id": rfq_line_items_id,
									"plants_id":plants_id,
									"rfq_id":"",
									"number_of_units":"12",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Putcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ rfq_id provide but invalid", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"rfq_lines_id": rfq_line_items_id,
									"plants_id":plants_id,
									"rfq_id":000000,
									"number_of_units":"12",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Putcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ rfq_id provide but value is not numeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"rfq_lines_id": rfq_line_items_id,
									"plants_id":plants_id,
									"rfq_id":"nonNumeric",
									"number_of_units":"12",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Putcall(url, parameter, token,404, function(prop){
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ number_of_units not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"rfq_lines_id": rfq_line_items_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									// "number_of_units":"12",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Putcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ number_of_units provide but nonNumeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"rfq_lines_id": rfq_line_items_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"invalid",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Putcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ number_of_units provide but value is 0", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"rfq_lines_id": rfq_line_items_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":0,
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Putcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});



	it("Should NOT ok BCOZ rfq_lines_id not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									// "rfq_lines_id": rfq_line_items_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":3,
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Putcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ rfq_lines_id provide but value not", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"rfq_lines_id": "",
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":3,
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Putcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

	it("Should NOT ok BCOZ rfq_lines_id provide nut nonNumeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						// parameter=user_id+"/"+plant_id;
						parameter={
							"user_id":user_id,
									"product_lines_id":product_lines_id,
									"rfq_lines_id": "nonNumeric",
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Putcall(url, parameter, token,404, function(prop){
							// console.log(prop);
							done();
						});
					});
				});
			});
		});
	});

});



describe("delete_line_item", function () {
    
	var url="/delete_line_item"

	it("Should ok BCOZ All the correct parameter provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					// parameter=user_id+"/"+product_lines_id;
					// console.log(rfq_line_items_id);
					parameter=user_id+"/"+rfq_line_items_id;
					deletecall(url, parameter, token, 200, function(obj){
						// console.log(prop);
						done();
					});
				});
			});
		});
	});

	it("Should NOT OK BCOZ authentication_token not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					// parameter=user_id+"/"+product_lines_id;
					// console.log(rfq_line_items_id);
					parameter=user_id+"/"+rfq_line_items_id;
					deletecallWithoutToken(url, parameter, 404, function(obj){
						// console.log(prop);
						done();
					});
				});
			});
		});
	});

	it("Should NOT OK BCOZ authentication_token provide but value not", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					// parameter=user_id+"/"+product_lines_id;
					// console.log(rfq_line_items_id);
					parameter=user_id+"/"+rfq_line_items_id;
					deletecall(url, parameter, "", 404, function(obj){
						// console.log(prop);
						done();
					});
				});
			});
		});
	});

	it("Should NOT OK BCOZ authentication_token provide but invalid value", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					// parameter=user_id+"/"+product_lines_id;
					// console.log(rfq_line_items_id);
					parameter=user_id+"/"+rfq_line_items_id;
					deletecall(url, parameter, "invalid", 404, function(obj){
						// console.log(prop);
						done();
					});
				});
			});
		});
	});

	it("Should NOT OK BCOZ user_id invalid provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					// parameter=user_id+"/"+product_lines_id;
					// console.log(rfq_line_items_id);
					parameter="00000"+"/"+rfq_line_items_id;
					deletecall(url, parameter, token, 404, function(obj){
						// console.log(prop);
						done();
					});
				});
			});
		});
	});

	it("Should NOT OK BCOZ user_id provide value is nonNumeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					// parameter=user_id+"/"+product_lines_id;
					// console.log(rfq_line_items_id);
					parameter="nonNumeric"+"/"+rfq_line_items_id;
					deletecall(url, parameter, token, 404, function(obj){
						// console.log(prop);
						done();
					});
				});
			});
		});
	});

	it("Should NOT OK BCOZ rfq_line_id invalid value provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					// parameter=user_id+"/"+product_lines_id;
					// console.log(rfq_line_items_id);
					parameter=user_id+"/"+"00000";
					deletecall(url, parameter, token, 401, function(obj){
						// console.log(prop);
						done();
					});
				});
			});
		});
	});

	it("Should NOT OK BCOZ rfq_lines_id provide value is nonNumeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					var rfq_line_items_id=line_item.selected_rfq_lines_items[0].id;
					// parameter=user_id+"/"+product_lines_id;
					// console.log(rfq_line_items_id);
					parameter=user_id+"/"+"nonNumeric";
					deletecall(url, parameter, token, 404, function(obj){
						done();
					});
				});
			});
		});
	});


});


describe("complete_rfq", function () {
	var url="/complete_rfq"

	it("Should ok BCOZ All the correct parameter provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				// console.log(rfq_id);
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						parameter={"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"2",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall("/save_line_item", parameter, token, 200, function(prop){
							// console.log();
							var parameter={"user_id":user_id, "rfq_id":rfq_id, "rfq_status_id":2}
							Putcall(url, parameter, token, 200, function(obj){
								done();
							});
						});
					});
				});
			});
		});
	});

	it("Should Not ok BCOZ All the correct parameter provide but token not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				// console.log(rfq_id);
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						parameter={"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall("/save_line_item", parameter, token, 200, function(prop){
							// console.log();
							var parameter={"user_id":user_id,"rfq_id":rfq_id, "rfq_status_id":2}
							PutcallWithoutToken(url, parameter, 404, function(obj){
								done();
							});
						});
					});
				});
			});
		});
	});

	it("Should Not ok BCOZ invalid token", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				// console.log(rfq_id);
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						parameter={"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall("/save_line_item", parameter, token, 200, function(prop){
							// console.log();
							var parameter={"user_id":user_id,"rfq_id":rfq_id, "rfq_status_id":2}
							Putcall(url, parameter, "token", 404, function(obj){
								done();
							});
						});
					});
				});
			});
		});
	});

	it("Should Not ok BCOZ invalid user_id", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				// console.log(rfq_id);
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						parameter={"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall("/save_line_item", parameter, token, 200, function(prop){
							// console.log();
							var parameter={"user_id":"10101010101","rfq_id":rfq_id, "rfq_status_id":2}
							Putcall(url, parameter, token, 404, function(obj){
								done();
							});
						});
					});
				});
			});
		});
	});

	it("Should NOT OK BCOZ user_id not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				// console.log(rfq_id);
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						parameter={"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall("/save_line_item", parameter, token, 200, function(prop){
							// console.log();
							var parameter={"rfq_id":rfq_id, "rfq_status_id":2}
							Putcall(url, parameter, token, 404, function(obj){
								done();
							});
						});
					});
				});
			});
		});
	});

	it("Should NOT OK BCOZ user_id proide but value not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				// console.log(rfq_id);
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						parameter={"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall("/save_line_item", parameter, token, 200, function(prop){
							// console.log();
							var parameter={"user_id":"","rfq_id":rfq_id, "rfq_status_id":2}
							Putcall(url, parameter, token, 404, function(obj){
								done();
							});
						});
					});
				});
			});
		});
	});

	it("Should Not ok user_id is nonNumeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				// console.log(rfq_id);
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						parameter={"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall("/save_line_item", parameter, token, 200, function(prop){
							// console.log();
							var parameter={"user_id":"Nan","rfq_id":rfq_id, "rfq_status_id":2}
							Putcall(url, parameter, token, 404, function(obj){
								done();
							});
						});
					});
				});
			});
		});
	});

	it("Should NOT OK BCOZ rfq_id field not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				// console.log(rfq_id);
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						parameter={"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall("/save_line_item", parameter, token, 200, function(prop){
							// console.log();
							var parameter={"user_id":user_id, "rfq_status_id":2}
							Putcall(url, parameter, token, 404, function(obj){
								done();
							});
						});
					});
				});
			});
		});
	});


	it("Should Not ok BCOZ rfq_id value not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				// console.log(rfq_id);
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						parameter={"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall("/save_line_item", parameter, token, 200, function(prop){
							// console.log();
							var parameter={"user_id":user_id,"rfq_id":"", "rfq_status_id":2}
							Putcall(url, parameter, token, 404, function(obj){
								done();
							});
						});
					});
				});
			});
		});
	});

	it("Should Not ok BCOZ rfq_id non Numeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				// console.log(rfq_id);
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						parameter={"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall("/save_line_item", parameter, token, 200, function(prop){
							// console.log();
							var parameter={"user_id":user_id,"rfq_id":"Nan", "rfq_status_id":2}
							Putcall(url, parameter, token, 404, function(obj){
								done();
							});
						});
					});
				});
			});
		});
	});

	it("Should Not ok BCOZ rfq_status_id not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				// console.log(rfq_id);
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						parameter={"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall("/save_line_item", parameter, token, 200, function(prop){
							// console.log();
							var parameter={"user_id":user_id,"rfq_id":rfq_id}
							Putcall(url, parameter, token, 404, function(obj){
								done();
							});
						});
					});
				});
			});
		});
	});

	it("Should Not ok BCOZ rfq_status_id value not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				// console.log(rfq_id);
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						parameter={"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall("/save_line_item", parameter, token, 200, function(prop){
							// console.log();
							var parameter={"user_id":user_id,"rfq_id":rfq_id, "rfq_status_id":""}
							Putcall(url, parameter, token, 404, function(obj){
								done();
							});
						});
					});
				});
			});
		});
	});

	it("Should Not ok BCOZ rfq_status_id is nonNumeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var parameter=user_id+"/"+rfq_id;
				// console.log(rfq_id);
				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
					var product_lines_id=line_item.product_lines[0].id;
					parameter=user_id+"/"+product_lines_id;
					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
						var plants_id=prop.production_plants[0].id;
						parameter={"user_id":user_id,
									"product_lines_id":product_lines_id,
									"plants_id":plants_id,
									"rfq_id":rfq_id,
									"number_of_units":"12",
									"rfq_status_id":"3",
									"req_delivery_date":"2014-10-10 12:00:00",
									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
									};
						Postcall("/save_line_item", parameter, token, 200, function(prop){
							// console.log();
							var parameter={"user_id":user_id,"rfq_id":rfq_id, "rfq_status_id":"Nan"}
							Putcall(url, parameter, token, 404, function(obj){
								done();
							});
						});
					});
				});
			});
		});
	});


});




function getcall(url, parameter, token, status, callback){
	supertest(app)
	.get(url+"/"+parameter)
	.set('authentication_token', token)
	.expect(status)
	.end(function (err, res) {
		// console.log(err);
		// console.log(res.body);
		res.body.statusCode.should.equal(status);
		callback(res.body);
	});
}

function getcallWithoutToken(url, parameter, status, callback){
	supertest(app)
		.get(url+"/"+parameter)
		.expect(status)
		.end(function (err, res) {
				res.body.statusCode.should.equal(status);
			callback(res.body);
		});
}

function login(email, password, callback){
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


function Postcall(url, parameter, token, status, callback){
	supertest(app)
		.post(url)
		.send(parameter)
		.set('authentication_token', token)
		.expect(status)
		.end(function (err, res) {
			if(err){
			}
			res.body.statusCode.should.equal(status);
			callback(res.body);
	});	
}

function PostcallWithoutToken(url, parameter, status, callback){
	supertest(app)
		.post(url)
		.send(parameter)
		// .set('authentication_token', token)
		.expect(status)
		.end(function (err, res) {
			if(err){
			}
			res.body.statusCode.should.equal(status);
			callback(res.body);
	});	
}

function Putcall(url, parameter, token, status, callback){
	supertest(app)
		.put(url)
		.send(parameter)
		.set('authentication_token', token)
		.expect(status)
		.end(function (err, res) {
			if(err){
			}
			res.body.statusCode.should.equal(status);
			callback(res.body);
	});	
}

function PutcallWithoutToken(url, parameter, status, callback){
	supertest(app)
		.put(url)
		.send(parameter)
		// .set('authentication_token', token)
		.expect(status)
		.end(function (err, res) {
			if(err){
			}
			res.body.statusCode.should.equal(status);
			callback(res.body);
	});	
}

function deletecall(url, parameter, token, status, callback){
	supertest(app)
	.delete(url+"/"+parameter)
	.set('authentication_token', token)
	.expect(status)
	.end(function (err, res) {
		// console.log(err);
		// console.log(res.body);
		res.body.statusCode.should.equal(status);
		callback(res.body);
	});
}

function deletecallWithoutToken(url, parameter, status, callback){
	supertest(app)
		.delete(url+"/"+parameter)
		.expect(status)
		.end(function (err, res) {
				res.body.statusCode.should.equal(status);
			callback(res.body);
		});
}
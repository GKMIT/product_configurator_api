var app = require('../../helper/app');
var testConnection = require('../../helper/connection');

var should = require('should'),
	supertest = require('supertest');

	var global=require('../global/global_spec');
	var email="nitin.naik@cgglobal.com";
	var password="5e8ff9bf55ba3508199d22e984129be6";

describe('tendering_teams_quotes API Calls', function () {

	var url="/tendering_teams_quotes"
	it("Should ok All Correct Data", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall(url, parameter, token, 200, function(rfq){
				// console.log(rfq);
				done();
			});
		});
	});

	it("Should NOT OK When token not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcallWithoutToken(url, parameter, 404, function(rfq){
				done();
			});
		});
	});

	it("Should NOT OK When invalid token pass", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall(url, parameter, "invalid_token", 404, function(rfq){
				done();
			});
		});
	});

	it("Should NOT OK When user_id not invalid provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter="101";
			getcall(url, parameter, token, 404, function(rfq){
				done();
			});
		});
	});

	it("Should NOT OK When NonNumeric user_id provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter="NonNumeric";
			getcall(url, parameter, token, 404, function(rfq){
				done();
			});
		});
	});
});

describe('tendering_fetch_particular_quote API Calls', function () {
	var url="/tendering_fetch_particular_quote"
	it("Should ok All Correct Data", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
			parameter=user_id+"/"+rfq.rfq[0].id;
			// console.log(parameter);
				getcall(url, parameter, token, 200, function(rfq){
					// console.log(rfq);
					done();
				});
			});
		});
	});

	it("Should NOT OK When token not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcallWithoutToken(url, parameter, 404, function(rfq){
					done();
				});
			});			
		});
	});

	it("Should NOT OK When invalid token provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall(url, parameter, "invalid", 404, function(rfq){
					done();
				});
			});			
		});
	});

	it("Should NOT OK When invalid user_id provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
			parameter="0000"+"/"+rfq.rfq[0].id;
				getcall(url, parameter, token, 404, function(rfq){
					done();
				});
			});			
		});
	});

	it("Should NOT OK When user_id NonNumeric provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
			parameter="NaN"+"/"+rfq.rfq[0].id;
				getcall(url, parameter, token, 404, function(rfq){
					done();
				});
			});			
		});
	});

	it("Should NOT OK When rfq_id NonNumeric provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
			parameter=user_id+"/"+"NaN";
				getcall(url, parameter, token, 404, function(rfq){
					done();
				});
			});			
		});
	});
});

describe('tendering_fetch_product_design_detail API Calls', function () {
	var url="/tendering_fetch_product_design_detail";
	it("Should ok All Correct Data", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					var properties=new Array();
					properties.push({"id":"2", "value":"Wind"});
					properties.push({"id":"3","value":"S0"});
					properties.push({"id":"5","value":"600"});
					properties.push({"id":"6","value":"1000"});
					properties.push({"id":"7","value":"800"});
					properties.push({"id":"14","value":"100"});
					properties.push({"id":"15","value":"100"});
					properties.push({"id":"17","value":"300"});
					
					parameter={"user_id": user_id, "rfq_id": rfq_id,
					 "rfq_lines_id": rfq.rfq_lines[0].id,
					 "properties":properties
					};

					Postcall(url, parameter, token, 200, function(design_data){
						done();
					});
				});
			});
		});
	});

	it("Should NOT OK becouse authentication_token not defined", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					var properties=new Array();
					properties.push({"id":"2", "value":"Wind"});
					properties.push({"id":"3","value":"S0"});
					properties.push({"id":"5","value":"600"});
					properties.push({"id":"6","value":"1000"});
					properties.push({"id":"7","value":"800"});
					properties.push({"id":"14","value":"100"});
					properties.push({"id":"15","value":"100"});
					properties.push({"id":"17","value":"300"});
					
					parameter={"user_id": user_id, "rfq_id": rfq_id,
					 "rfq_lines_id": rfq.rfq_lines[0].id,
					 "properties":properties
					};

					PostcallWithoutToken(url, parameter, 404, function(design_data){
						done();
					});
				});
			});
		});
	});

	it("Should NOT OK becouse authentication_token  define but value not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					var properties=new Array();
					properties.push({"id":"2", "value":"Wind"});
					properties.push({"id":"3","value":"S0"});
					properties.push({"id":"5","value":"600"});
					properties.push({"id":"6","value":"1000"});
					properties.push({"id":"7","value":"800"});
					properties.push({"id":"14","value":"100"});
					properties.push({"id":"15","value":"100"});
					properties.push({"id":"17","value":"300"});
					
					parameter={"user_id": user_id, "rfq_id": rfq_id,
					 "rfq_lines_id": rfq.rfq_lines[0].id,
					 "properties":properties
					};

					Postcall(url, parameter, "", 404, function(design_data){
						done();
					});
				});
			});
		});
	});

	it("Should Not Ok becouse invalid authentication_token provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					var properties=new Array();
					properties.push({"id":"2", "value":"Wind"});
					properties.push({"id":"3","value":"S0"});
					properties.push({"id":"5","value":"600"});
					properties.push({"id":"6","value":"1000"});
					properties.push({"id":"7","value":"800"});
					properties.push({"id":"14","value":"100"});
					properties.push({"id":"15","value":"100"});
					properties.push({"id":"17","value":"300"});
					
					parameter={"user_id": user_id, "rfq_id": rfq_id,
					 "rfq_lines_id": rfq.rfq_lines[0].id,
					 "properties":properties
					};

					Postcall(url, parameter, "invalid", 404, function(design_data){
						done();
					});
				});
			});
		});
	});

	it("Should Not Ok becouse user_id not defined", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					var properties=new Array();
					properties.push({"id":"2", "value":"Wind"});
					properties.push({"id":"3","value":"S0"});
					properties.push({"id":"5","value":"600"});
					properties.push({"id":"6","value":"1000"});
					properties.push({"id":"7","value":"800"});
					properties.push({"id":"14","value":"100"});
					properties.push({"id":"15","value":"100"});
					properties.push({"id":"17","value":"300"});
					
					parameter={"rfq_id": rfq_id,
					 "rfq_lines_id": rfq.rfq_lines[0].id,
					 "properties":properties
					};

					Postcall(url, parameter, token, 404, function(design_data){
						done();
					});
				});
			});
		});
	});

	it("Should Not Ok becouse user_id value not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					var properties=new Array();
					properties.push({"id":"2", "value":"Wind"});
					properties.push({"id":"3","value":"S0"});
					properties.push({"id":"5","value":"600"});
					properties.push({"id":"6","value":"1000"});
					properties.push({"id":"7","value":"800"});
					properties.push({"id":"14","value":"100"});
					properties.push({"id":"15","value":"100"});
					properties.push({"id":"17","value":"300"});
					
					parameter={"user_id": "", "rfq_id": rfq_id,
					 "rfq_lines_id": rfq.rfq_lines[0].id,
					 "properties":properties
					};

					Postcall(url, parameter, token, 404, function(design_data){
						done();
					});
				});
			});
		});
	});

	it("Should Not Ok becouse user_id is NonNumeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					var properties=new Array();
					properties.push({"id":"2", "value":"Wind"});
					properties.push({"id":"3","value":"S0"});
					properties.push({"id":"5","value":"600"});
					properties.push({"id":"6","value":"1000"});
					properties.push({"id":"7","value":"800"});
					properties.push({"id":"14","value":"100"});
					properties.push({"id":"15","value":"100"});
					properties.push({"id":"17","value":"300"});
					
					parameter={"user_id": "NaN", "rfq_id": rfq_id,
					 "rfq_lines_id": rfq.rfq_lines[0].id,
					 "properties":properties
					};

					Postcall(url, parameter, token, 404, function(design_data){
						done();
					});
				});
			});
		});
	});

	it("Should Not Ok becouse rfq_id not defined", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					var properties=new Array();
					properties.push({"id":"2", "value":"Wind"});
					properties.push({"id":"3","value":"S0"});
					properties.push({"id":"5","value":"600"});
					properties.push({"id":"6","value":"1000"});
					properties.push({"id":"7","value":"800"});
					properties.push({"id":"14","value":"100"});
					properties.push({"id":"15","value":"100"});
					properties.push({"id":"17","value":"300"});
					
					parameter={"user_id": user_id,
					 "rfq_lines_id": rfq.rfq_lines[0].id,
					 "properties":properties
					};

					Postcall(url, parameter, token, 404, function(design_data){
						done();
					});
				});
			});
		});
	});

	it("Should Not Ok Becouse rfq_id value not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					var properties=new Array();
					properties.push({"id":"2", "value":"Wind"});
					properties.push({"id":"3","value":"S0"});
					properties.push({"id":"5","value":"600"});
					properties.push({"id":"6","value":"1000"});
					properties.push({"id":"7","value":"800"});
					properties.push({"id":"14","value":"100"});
					properties.push({"id":"15","value":"100"});
					properties.push({"id":"17","value":"300"});
					
					parameter={"user_id": user_id, "rfq_id": "",
					 "rfq_lines_id": rfq.rfq_lines[0].id,
					 "properties":properties
					};

					Postcall(url, parameter, token, 404, function(design_data){
						done();
					});
				});
			});
		});
	});

	it("Should Not Ok Becouse rfq_id is NonNumeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					var properties=new Array();
					properties.push({"id":"2", "value":"Wind"});
					properties.push({"id":"3","value":"S0"});
					properties.push({"id":"5","value":"600"});
					properties.push({"id":"6","value":"1000"});
					properties.push({"id":"7","value":"800"});
					properties.push({"id":"14","value":"100"});
					properties.push({"id":"15","value":"100"});
					properties.push({"id":"17","value":"300"});
					
					parameter={"user_id": user_id, "rfq_id": "NaN",
					 "rfq_lines_id": rfq.rfq_lines[0].id,
					 "properties":properties
					};

					Postcall(url, parameter, token, 404, function(design_data){
						done();
					});
				});
			});
		});
	});

	it("Should Not Ok When rfq_lines_id not defined", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					var properties=new Array();
					properties.push({"id":"2", "value":"Wind"});
					properties.push({"id":"3","value":"S0"});
					properties.push({"id":"5","value":"600"});
					properties.push({"id":"6","value":"1000"});
					properties.push({"id":"7","value":"800"});
					properties.push({"id":"14","value":"100"});
					properties.push({"id":"15","value":"100"});
					properties.push({"id":"17","value":"300"});
					
					parameter={"user_id": user_id, "rfq_id": rfq_id,
					 "properties":properties
					};

					Postcall(url, parameter, token, 404, function(design_data){
						done();
					});
				});
			});
		});
	});

	it("Should Not Ok When rfq_lines_id value not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					var properties=new Array();
					properties.push({"id":"2", "value":"Wind"});
					properties.push({"id":"3","value":"S0"});
					properties.push({"id":"5","value":"600"});
					properties.push({"id":"6","value":"1000"});
					properties.push({"id":"7","value":"800"});
					properties.push({"id":"14","value":"100"});
					properties.push({"id":"15","value":"100"});
					properties.push({"id":"17","value":"300"});
					
					parameter={"user_id": user_id, "rfq_id": rfq_id,
					 "rfq_lines_id": "",
					 "properties":properties
					};

					Postcall(url, parameter, token, 404, function(design_data){
						done();
					});
				});
			});
		});
	});

	it("Should Not Ok When rfq_lines_id NonNumeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					var properties=new Array();
					properties.push({"id":"2", "value":"Wind"});
					properties.push({"id":"3","value":"S0"});
					properties.push({"id":"5","value":"600"});
					properties.push({"id":"6","value":"1000"});
					properties.push({"id":"7","value":"800"});
					properties.push({"id":"14","value":"100"});
					properties.push({"id":"15","value":"100"});
					properties.push({"id":"17","value":"300"});
					
					parameter={"user_id": user_id, "rfq_id": rfq_id,
					 "rfq_lines_id": "NaN",
					 "properties":properties
					};

					Postcall(url, parameter, token, 404, function(design_data){
						done();
					});
				});
			});
		});
	});

	it("Should Not Ok When properties not defined", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					var properties=new Array();
					properties.push({"id":"2", "value":"Wind"});
					properties.push({"id":"3","value":"S0"});
					properties.push({"id":"5","value":"600"});
					properties.push({"id":"6","value":"1000"});
					properties.push({"id":"7","value":"800"});
					properties.push({"id":"14","value":"100"});
					properties.push({"id":"15","value":"100"});
					properties.push({"id":"17","value":"300"});
					
					parameter={"user_id": user_id, "rfq_id": rfq_id,
					 "rfq_lines_id": rfq.rfq_lines[0].id
					};

					Postcall(url, parameter, token, 404, function(design_data){
						done();
					});
				});
			});
		});
	});

	it("Should Not Ok When properties value not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					var properties=new Array();
					properties.push({"id":"2", "value":"Wind"});
					properties.push({"id":"3","value":"S0"});
					properties.push({"id":"5","value":"600"});
					properties.push({"id":"6","value":"1000"});
					properties.push({"id":"7","value":"800"});
					properties.push({"id":"14","value":"100"});
					properties.push({"id":"15","value":"100"});
					properties.push({"id":"17","value":"300"});
					
					parameter={"user_id": user_id, "rfq_id": rfq_id,
					 "rfq_lines_id": rfq.rfq_lines[0].id,
					 "properties":""
					};

					Postcall(url, parameter, token, 404, function(design_data){
						done();
					});
				});
			});
		});
	});

	it("Should Not Ok When properties value not array", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					var properties=new Array();
					properties.push({"id":"2", "value":"Wind"});
					properties.push({"id":"3","value":"S0"});
					properties.push({"id":"5","value":"600"});
					properties.push({"id":"6","value":"1000"});
					properties.push({"id":"7","value":"800"});
					properties.push({"id":"14","value":"100"});
					properties.push({"id":"15","value":"100"});
					properties.push({"id":"17","value":"300"});
					
					parameter={"user_id": user_id, "rfq_id": rfq_id,
					 "rfq_lines_id": rfq.rfq_lines[0].id,
					 "properties":"NonArray"
					};

					Postcall(url, parameter, token, 404, function(design_data){
						done();
					});
				});
			});
		});
	});

	it("Should Not Ok When properties array length is 0", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					var properties=new Array();
					// properties.push({"id":"2", "value":"Wind"});
					// properties.push({"id":"3","value":"S0"});
					// properties.push({"id":"5","value":"600"});
					// properties.push({"id":"6","value":"1000"});
					// properties.push({"id":"7","value":"800"});
					// properties.push({"id":"14","value":"100"});
					// properties.push({"id":"15","value":"100"});
					// properties.push({"id":"17","value":"300"});
					
					parameter={"user_id": user_id, "rfq_id": rfq_id,
					 "rfq_lines_id": rfq.rfq_lines[0].id,
					 "properties":properties
					};

					Postcall(url, parameter, token, 404, function(design_data){
						done();
					});
				});
			});
		});
	});

	it("Should Not Ok When properties invalid id value pair in array", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					var properties=new Array();
					properties.push({"id":"2", "value":"Wind"});
					properties.push({"id":"3","value":"S0"});
					properties.push({"id":"5","value":"600"});
					properties.push({"id":"6","value":"1000"});
					properties.push({"id":"7","value":"800"});
					properties.push({"id":"14","value":"100"});
					properties.push({"id":"15","value":"100"});
					properties.push({"id":"17"});
					
					parameter={"user_id": user_id, "rfq_id": rfq_id,
					 "rfq_lines_id": rfq.rfq_lines[0].id,
					 "properties":properties
					};

					Postcall(url, parameter, token, 404, function(design_data){
						done();
					});
				});
			});
		});
	});

});

describe('tendering_fetch_particular_design API Calls', function () {
	var url="/tendering_fetch_particular_design";
	it("Should ok All Correct Data", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					var properties=new Array();
					properties.push({"id":"2", "value":"Wind"});
					properties.push({"id":"3","value":"S0"});
					properties.push({"id":"5","value":"600"});
					properties.push({"id":"6","value":"1000"});
					properties.push({"id":"7","value":"800"});
					properties.push({"id":"14","value":"100"});
					properties.push({"id":"15","value":"100"});
					properties.push({"id":"17","value":"300"});
					
					parameter={"user_id": user_id, "rfq_id": rfq_id,
					 "rfq_lines_id": rfq.rfq_lines[0].id,
					 "properties":properties
					};

					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
						getcall(url, parameter, token, 200, function(design_info){
							done();
						});
					});
				});
			});
		});
	});
});

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
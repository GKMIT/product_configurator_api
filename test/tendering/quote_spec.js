var app = require('../../helper/app');
var testConnection = require('../../helper/connection');

var should = require('should'),
	supertest = require('supertest');

	var global=require('../global/global_spec');
	var email="nitin.naik@cgglobal.com";
	var password="5e8ff9bf55ba3508199d22e984129be6";

// describe('tendering_teams_quotes API Calls', function () {

// 	var url="/tendering_teams_quotes"
// 	it("Should ok All Correct Data", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall(url, parameter, token, 200, function(rfq){
// 				// console.log(rfq);
// 				done();
// 			});
// 		});
// 	});

// 	it("Should NOT OK When token not provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcallWithoutToken(url, parameter, 404, function(rfq){
// 				done();
// 			});
// 		});
// 	});

// 	it("Should NOT OK When invalid token pass", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall(url, parameter, "invalid_token", 404, function(rfq){
// 				done();
// 			});
// 		});
// 	});

// 	it("Should NOT OK When user_id not invalid provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter="101";
// 			getcall(url, parameter, token, 404, function(rfq){
// 				done();
// 			});
// 		});
// 	});

// 	it("Should NOT OK When NonNumeric user_id provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter="NonNumeric";
// 			getcall(url, parameter, token, 404, function(rfq){
// 				done();
// 			});
// 		});
// 	});
// });

// describe('tendering_fetch_particular_quote API Calls', function () {
// 	var url="/tendering_fetch_particular_quote"
// 	it("Should ok All Correct Data", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 			// console.log(parameter);
// 				getcall(url, parameter, token, 200, function(rfq){
// 					// console.log(rfq);
// 					done();
// 				});
// 			});
// 		});
// 	});

// 	it("Should NOT OK When token not provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcallWithoutToken(url, parameter, 404, function(rfq){
// 					done();
// 				});
// 			});			
// 		});
// 	});

// 	it("Should NOT OK When invalid token provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall(url, parameter, "invalid", 404, function(rfq){
// 					done();
// 				});
// 			});			
// 		});
// 	});

// 	it("Should NOT OK When invalid user_id provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 			parameter="0000"+"/"+rfq.rfq[0].id;
// 				getcall(url, parameter, token, 404, function(rfq){
// 					done();
// 				});
// 			});			
// 		});
// 	});

// 	it("Should NOT OK When user_id NonNumeric provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 			parameter="NaN"+"/"+rfq.rfq[0].id;
// 				getcall(url, parameter, token, 404, function(rfq){
// 					done();
// 				});
// 			});			
// 		});
// 	});

// 	it("Should NOT OK When rfq_id NonNumeric provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 			parameter=user_id+"/"+"NaN";
// 				getcall(url, parameter, token, 404, function(rfq){
// 					done();
// 				});
// 			});			
// 		});
// 	});
// });

// describe('tendering_fetch_product_design_detail API Calls', function () {
// 	var url="/tendering_fetch_product_design_detail";
// 	this.timeout(15000);
// 	it("Should ok All Correct Data", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall(url, parameter, token, 200, function(design_data){
// 						done();
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should NOT OK becouse authentication_token not defined", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					PostcallWithoutToken(url, parameter, 404, function(design_data){
// 						done();
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should NOT OK becouse authentication_token  define but value not provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall(url, parameter, "", 404, function(design_data){
// 						done();
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok becouse invalid authentication_token provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall(url, parameter, "invalid", 404, function(design_data){
// 						done();
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok becouse user_id not defined", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall(url, parameter, token, 404, function(design_data){
// 						done();
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok becouse user_id value not provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": "", "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall(url, parameter, token, 404, function(design_data){
// 						done();
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok becouse user_id is NonNumeric", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": "NaN", "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall(url, parameter, token, 404, function(design_data){
// 						done();
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok becouse rfq_id not defined", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall(url, parameter, token, 404, function(design_data){
// 						done();
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok Becouse rfq_id value not provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": "",
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall(url, parameter, token, 404, function(design_data){
// 						done();
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok Becouse rfq_id is NonNumeric", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": "NaN",
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall(url, parameter, token, 404, function(design_data){
// 						done();
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok When rfq_lines_id not defined", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "properties":properties
// 					};

// 					Postcall(url, parameter, token, 404, function(design_data){
// 						done();
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok When rfq_lines_id value not provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": "",
// 					 "properties":properties
// 					};

// 					Postcall(url, parameter, token, 404, function(design_data){
// 						done();
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok When rfq_lines_id NonNumeric", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": "NaN",
// 					 "properties":properties
// 					};

// 					Postcall(url, parameter, token, 404, function(design_data){
// 						done();
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok When properties not defined", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id
// 					};

// 					Postcall(url, parameter, token, 404, function(design_data){
// 						done();
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok When properties value not provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":""
// 					};

// 					Postcall(url, parameter, token, 404, function(design_data){
// 						done();
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok When properties value not array", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":"NonArray"
// 					};

// 					Postcall(url, parameter, token, 404, function(design_data){
// 						done();
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok When properties array length is 0", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					// properties.push({"id":"2", "value":"Wind"});
// 					// properties.push({"id":"3","value":"S0"});
// 					// properties.push({"id":"5","value":"600"});
// 					// properties.push({"id":"6","value":"1000"});
// 					// properties.push({"id":"7","value":"800"});
// 					// properties.push({"id":"14","value":"100"});
// 					// properties.push({"id":"15","value":"100"});
// 					// properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall(url, parameter, token, 404, function(design_data){
// 						done();
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok When properties without manditory properties", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					// properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall(url, parameter, token, 422, function(design_data){
// 						done();
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok When properties invalid id value pair in array", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall(url, parameter, token, 404, function(design_data){
// 						done();
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok When mandatory properties not provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					// properties.push({"id":"2", "value":"Wind"});
// 					// properties.push({"id":"3","value":"S0"});
// 					// properties.push({"id":"5","value":"600"});
// 					// properties.push({"id":"6","value":"1000"});
// 					// properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17", "value": "300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall(url, parameter, token, 422, function(design_data){
// 						done();
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Ok but data not found When equals properties not match", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"blind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17", "value": "300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall(url, parameter, token, 200, function(design_data){
// 						design_data.product_designs.length.should.equal(0);
// 						done();
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Ok but data not found When range properties not match in the range value", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"1000"});
// 					properties.push({"id":"17", "value": "300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall(url, parameter, token, 200, function(design_data){
// 						design_data.product_designs.length.should.equal(0);
// 						done();
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Ok but data not found When range properties not provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};
// 					Postcall(url, parameter, token, 200, function(design_data){
// 						done();
// 					});
// 				});
// 			});
// 		});
// 	});

// });

// describe('tendering_fetch_particular_design API Calls', function () {
// 	var url="/tendering_fetch_particular_design";
// 	this.timeout(15000);
// 	it("Should ok All Correct Data", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};
// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall(url, parameter, token, 200, function(design_info){
// 							done();
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});
// 	it("Should Not Ok Without authentication_token", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcallWithoutToken(url, parameter, 404, function(design_info){
// 							done();
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});
// 	it("Should Not ok with invalid authentication_token", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall(url, parameter, "", 404, function(design_info){
// 							done();
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not ok when authentication_token value not provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall(url, parameter, "", 404, function(design_info){
// 							done();
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not ok when user_id NonNumeric provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter="invalid"+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall(url, parameter, token, 404, function(design_info){
// 							done();
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});
// 	it("Should Not ok when user_id invalid provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter="00000"+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall(url, parameter, token, 404, function(design_info){
// 							done();
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not ok when product_designs_id invalid provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+"0000"+"/"+rfq.rfq_lines[0].id;
// 						getcall(url, parameter, token, 404, function(design_info){
// 							done();
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});
// 	it("Should Not ok when product_designs_id NonNumeric provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+"NaN"+"/"+rfq.rfq_lines[0].id;
// 						getcall(url, parameter, token, 404, function(design_info){
// 							done();
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});
// 	it("Should Not ok when rfq_lines_id invalid provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+00000;
// 						getcall(url, parameter, token, 404, function(design_info){
// 							done();
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});
// 	it("Should Not ok when rfq_lines_id NonNumeric provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter="invalid"+"/"+design_data.product_designs[0].id+"/"+"NaN";
// 						getcall(url, parameter, token, 404, function(design_info){
// 							done();
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});

// });

// describe('tendering_submit_rfq_lines API Calls', function () {
// 	var url="/tendering_submit_rfq_lines";
// 	this.timeout(15000);
// 	it("Should ok All Correct Data", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
// 							parameter={"user_id":user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[0].id, "product_designs_id": design_data.product_designs[0].id, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
// 							Putcall(url, parameter, token, 200, function(info){
// 								done();
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok When authentication_token not provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
// 							parameter={"user_id":user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[0].id, "product_designs_id": design_data.product_designs[0].id, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
// 							PutcallWithoutToken(url, parameter, 404, function(info){
// 								done();
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok authentication_token value not provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
// 							parameter={"user_id":user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[0].id, "product_designs_id": design_data.product_designs[0].id, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
// 							Putcall(url, parameter, "", 404, function(info){
// 								done();
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok when invalid authentication_token provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
// 							parameter={"user_id":user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[0].id, "product_designs_id": design_data.product_designs[0].id, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
// 							Putcall(url, parameter, "invalid", 404, function(info){
// 								done();
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok when user_id not provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
// 							parameter={"rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[0].id, "product_designs_id": design_data.product_designs[0].id, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
// 							Putcall(url, parameter, token, 404, function(info){
// 								done();
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});
// 	it("Should Not Ok when user_id value not provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
// 							parameter={"user_id":"", "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[0].id, "product_designs_id": design_data.product_designs[0].id, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
// 							Putcall(url, parameter, token, 404, function(info){
// 								done();
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});
// 	it("Should Not Ok when NonNumeric user_id provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
// 							parameter={"user_id":"NaN", "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[0].id, "product_designs_id": design_data.product_designs[0].id, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
// 							Putcall(url, parameter, token, 404, function(info){
// 								done();
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});
// 	it("Should Not Ok when invalid user_id provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
// 							parameter={"user_id":"0000", "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[0].id, "product_designs_id": design_data.product_designs[0].id, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
// 							Putcall(url, parameter, token, 404, function(info){
// 								done();
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok when rfq_id not provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
// 							parameter={"user_id":user_id, "rfq_lines_id": rfq.rfq_lines[0].id, "product_designs_id": design_data.product_designs[0].id, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
// 							Putcall(url, parameter, token, 404, function(info){
// 								done();
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok when rfq_id NonNumeric provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
// 							parameter={"user_id":user_id, "rfq_id": "NaN", "rfq_lines_id": rfq.rfq_lines[0].id, "product_designs_id": design_data.product_designs[0].id, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
// 							Putcall(url, parameter, token, 404, function(info){
// 								done();
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});
// 	it("Should Not Ok when invalid rfq_id provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
// 							parameter={"user_id":user_id, "rfq_id": "0000", "rfq_lines_id": rfq.rfq_lines[0].id, "product_designs_id": design_data.product_designs[0].id, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
// 							Putcall(url, parameter, token, 400, function(info){
// 								done();
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok when rfq_id value not provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
// 							parameter={"user_id":user_id, "rfq_id": "", "rfq_lines_id": rfq.rfq_lines[0].id, "product_designs_id": design_data.product_designs[0].id, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
// 							Putcall(url, parameter, token, 404, function(info){
// 								done();
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok when rfq_lines_id not provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
// 							parameter={"user_id":user_id, "rfq_id": rfq_id, "product_designs_id": design_data.product_designs[0].id, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
// 							Putcall(url, parameter, token, 404, function(info){
// 								done();
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok when rfq_lines_id value not provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
// 							parameter={"user_id":user_id, "rfq_id": rfq_id, "rfq_lines_id": "", "product_designs_id": design_data.product_designs[0].id, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
// 							Putcall(url, parameter, token, 404, function(info){
// 								done();
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok when rfq_lines_id invalid value provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
// 							parameter={"user_id":user_id, "rfq_id": rfq_id, "rfq_lines_id": "0000", "product_designs_id": design_data.product_designs[0].id, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
// 							Putcall(url, parameter, token, 400, function(info){
// 								done();
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok when product_designs_id not provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
// 							parameter={"user_id":user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[0].id, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
// 							Putcall(url, parameter, token, 404, function(info){
// 								done();
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok when product_designs_id value not provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
// 							parameter={"user_id":user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[0].id, "product_designs_id": "", "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
// 							Putcall(url, parameter, token, 404, function(info){
// 								done();
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok when product_designs_id NonNumeric value provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
// 							parameter={"user_id":user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[0].id, "product_designs_id": "NaN", "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
// 							Putcall(url, parameter, token, 404, function(info){
// 								done();
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});

// 	xit("Should Not Ok when product_designs_id invalid provide");
// 	// it("Should Not Ok when product_designs_id invalid provide", function (done) {
// 	// 	login(email, password, function(user){
// 	// 		var user_id=user.data[0].id;
// 	// 		var token=user.authentication_token;
// 	// 		var parameter=user_id;
// 	// 		getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 	// 			var rfq_id=rfq.rfq[0].id;
// 	// 		parameter=user_id+"/"+rfq.rfq[0].id;
// 	// 			getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 	// 				var properties=new Array();
// 	// 				properties.push({"id":"2", "value":"Wind"});
// 	// 				properties.push({"id":"3","value":"S0"});
// 	// 				properties.push({"id":"5","value":"600"});
// 	// 				properties.push({"id":"6","value":"1000"});
// 	// 				properties.push({"id":"7","value":"800"});
// 	// 				properties.push({"id":"14","value":"100"});
// 	// 				properties.push({"id":"15","value":"100"});
// 	// 				properties.push({"id":"17","value":"300"});
					
// 	// 				parameter={"user_id": user_id, "rfq_id": rfq_id,
// 	// 				 "rfq_lines_id": rfq.rfq_lines[0].id,
// 	// 				 "properties":properties
// 	// 				};

// 	// 				Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 	// 					parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 	// 					getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
// 	// 						parameter={"user_id":user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[0].id, "product_designs_id": "0000", "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
// 	// 						Putcall(url, parameter, token, 400, function(info){
// 	// 							done();
// 	// 						});
// 	// 					});
// 	// 				});
// 	// 			});
// 	// 		});
// 	// 	});
// 	// });

// 	it("Should Not Ok when sales_price not provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
// 							parameter={"user_id":user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[0].id, "product_designs_id": design_data.product_designs[0].id, "confirmed_delivery_date": 10};
// 							Putcall(url, parameter, token, 404, function(info){
// 								done();
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok when sales_price value not provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
// 							parameter={"user_id":user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[0].id, "product_designs_id": design_data.product_designs[0].id, "sales_price": "", "confirmed_delivery_date": 10};
// 							Putcall(url, parameter, token, 404, function(info){
// 								done();
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok when sales_price NonNumeric value provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
// 							parameter={"user_id":user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[0].id, "product_designs_id": design_data.product_designs[0].id, "sales_price": "NaN", "confirmed_delivery_date": 10};
// 							Putcall(url, parameter, token, 404, function(info){
// 								done();
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});

// 	xit("Should Not Ok when sales_price invalid value provide");
// 	// it("Should Not Ok when sales_price invalid value provide", function (done) {
// 	// 	login(email, password, function(user){
// 	// 		var user_id=user.data[0].id;
// 	// 		var token=user.authentication_token;
// 	// 		var parameter=user_id;
// 	// 		getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 	// 			var rfq_id=rfq.rfq[0].id;
// 	// 		parameter=user_id+"/"+rfq.rfq[0].id;
// 	// 			getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 	// 				var properties=new Array();
// 	// 				properties.push({"id":"2", "value":"Wind"});
// 	// 				properties.push({"id":"3","value":"S0"});
// 	// 				properties.push({"id":"5","value":"600"});
// 	// 				properties.push({"id":"6","value":"1000"});
// 	// 				properties.push({"id":"7","value":"800"});
// 	// 				properties.push({"id":"14","value":"100"});
// 	// 				properties.push({"id":"15","value":"100"});
// 	// 				properties.push({"id":"17","value":"300"});
					
// 	// 				parameter={"user_id": user_id, "rfq_id": rfq_id,
// 	// 				 "rfq_lines_id": rfq.rfq_lines[0].id,
// 	// 				 "properties":properties
// 	// 				};

// 	// 				Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 	// 					parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 	// 					getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
// 	// 						parameter={"user_id":user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[0].id, "product_designs_id": "0000", "sales_price": "0000", "confirmed_delivery_date": 10};
// 	// 						Putcall(url, parameter, token, 404, function(info){
// 	// 							done();
// 	// 						});
// 	// 					});
// 	// 				});
// 	// 			});
// 	// 		});
// 	// 	});
// 	// });

// 	it("Should Not Ok when confirmed_delivery_date not provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
// 							parameter={"user_id":user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[0].id, "product_designs_id": design_data.product_designs[0].id, "sales_price": design_info.design[0].minimum_price};
// 							Putcall(url, parameter, token, 404, function(info){
// 								done();
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok when confirmed_delivery_date value not provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
// 							parameter={"user_id":user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[0].id, "product_designs_id": design_data.product_designs[0].id, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": ""};
// 							Putcall(url, parameter, token, 404, function(info){
// 								done();
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok when confirmed_delivery_date NonNumeric value provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
// 							parameter={"user_id":user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[0].id, "product_designs_id": design_data.product_designs[0].id, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": "NaN"};
// 							Putcall(url, parameter, token, 404, function(info){
// 								done();
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});

// 	it("Should Not Ok when confirmed_delivery_date invalid value provide", function (done) {
// 		login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			var parameter=user_id;
// 			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
// 				var rfq_id=rfq.rfq[0].id;
// 			parameter=user_id+"/"+rfq.rfq[0].id;
// 				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
// 					var properties=new Array();
// 					properties.push({"id":"2", "value":"Wind"});
// 					properties.push({"id":"3","value":"S0"});
// 					properties.push({"id":"5","value":"600"});
// 					properties.push({"id":"6","value":"1000"});
// 					properties.push({"id":"7","value":"800"});
// 					properties.push({"id":"14","value":"100"});
// 					properties.push({"id":"15","value":"100"});
// 					properties.push({"id":"17","value":"300"});
					
// 					parameter={"user_id": user_id, "rfq_id": rfq_id,
// 					 "rfq_lines_id": rfq.rfq_lines[0].id,
// 					 "properties":properties
// 					};

// 					Postcall("/tendering_fetch_product_design_detail", parameter, token, 200, function(design_data){
// 						parameter=user_id+"/"+design_data.product_designs[0].id+"/"+rfq.rfq_lines[0].id;
// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
// 							parameter={"user_id":user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[0].id, "product_designs_id": "0000", "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 0000};
// 							Putcall(url, parameter, token, 404, function(info){
// 								done();
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});

// });

describe('tendering_submit_rfq_to_sales API Calls', function () {
	var url="/tendering_submit_rfq_to_sales";
	this.timeout(15000);
	// it("Should ok All Correct Data", function (done) {
	// 	login(email, password, function(user){
	// 		var user_id=user.data[0].id;
	// 		var token=user.authentication_token;
	// 		var parameter=user_id;
	// 		getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
	// 			var rfq_id=rfq.rfq[0].id;
	// 		parameter=user_id+"/"+rfq.rfq[0].id;
	// 			getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
	// 				var properties=new Array();
	// 				properties.push({"id":"2", "value":"Wind"});
	// 				properties.push({"id":"3","value":"S0"});
	// 				properties.push({"id":"5","value":"600"});
	// 				properties.push({"id":"6","value":"1000"});
	// 				properties.push({"id":"7","value":"800"});
	// 				properties.push({"id":"14","value":"100"});
	// 				properties.push({"id":"15","value":"100"});
	// 				properties.push({"id":"17","value":"300"});
					
	// 				counter_1=0;
	// 				counter_2=0;
	// 				counter_3=0;
	// 				counter_4=0;
	// 				for (var i = 0; i < rfq.rfq_lines.length; i++) {
	// 					parameter=user_id+"/6/"+rfq.rfq_lines[counter_1].id;
	// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
	// 							parameter={"user_id": user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[counter_2].id, "product_designs_id": 6, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
	// 							Putcall("/tendering_submit_rfq_lines", parameter, token, 200, function(info){
	// 								counter_3++;
	// 								if(counter_3==rfq.rfq_lines.length){
	// 									parameter={"user_id":user_id, "rfq_id": rfq_id, "rfq_status_id":5};
	// 									Putcall(url, parameter, token, 200, function(info){
	// 										done();
	// 									});
	// 								}
	// 							});
	// 							counter_2++;
	// 						});
	// 					counter_1++;
	// 				};
	// 			});
	// 		});
	// 	});
	// });

	it("Should NOT OK When authentication_token not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					counter_1=0;
					counter_2=0;
					counter_3=0;
					counter_4=0;
					for (var i = 0; i < rfq.rfq_lines.length; i++) {
						parameter=user_id+"/6/"+rfq.rfq_lines[counter_1].id;
							getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
								parameter={"user_id": user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[counter_2].id, "product_designs_id": 6, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
								Putcall("/tendering_submit_rfq_lines", parameter, token, 200, function(info){
									counter_3++;
									if(counter_3==rfq.rfq_lines.length){
										parameter={"user_id":user_id, "rfq_id": rfq_id, "rfq_status_id":5};
										PutcallWithoutToken(url, parameter, 404, function(info){
											done();
										});
									}
								});
								counter_2++;
							});
						counter_1++;
					};
				});
			});
		});
	});
	
	it("Should NOT OK When invalid authentication_token provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					
					counter_1=0;
					counter_2=0;
					counter_3=0;
					counter_4=0;
					for (var i = 0; i < rfq.rfq_lines.length; i++) {
						parameter=user_id+"/6/"+rfq.rfq_lines[counter_1].id;
							getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
								parameter={"user_id": user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[counter_2].id, "product_designs_id": 6, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
								Putcall("/tendering_submit_rfq_lines", parameter, token, 200, function(info){
									counter_3++;
									if(counter_3==rfq.rfq_lines.length){
										parameter={"user_id":user_id, "rfq_id": rfq_id, "rfq_status_id":5};
										Putcall(url, parameter, "invalid", 404, function(info){
											done();
										});
									}
								});
								counter_2++;
							});
						counter_1++;
					};
				});
			});
		});
	});
	it("Should NOT OK When authentication_token value null", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					
					counter_1=0;
					counter_2=0;
					counter_3=0;
					counter_4=0;
					for (var i = 0; i < rfq.rfq_lines.length; i++) {
						parameter=user_id+"/6/"+rfq.rfq_lines[counter_1].id;
							getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
								parameter={"user_id": user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[counter_2].id, "product_designs_id": 6, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
								Putcall("/tendering_submit_rfq_lines", parameter, token, 200, function(info){
									counter_3++;
									if(counter_3==rfq.rfq_lines.length){
										parameter={"user_id":user_id, "rfq_id": rfq_id, "rfq_status_id":5};
										Putcall(url, parameter, "", 404, function(info){
											done();
										});
									}
								});
								counter_2++;
							});
						counter_1++;
					};
				});
			});
		});
	});

	it("Should NOT OK When rfq_id not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					
					counter_1=0;
					counter_2=0;
					counter_3=0;
					counter_4=0;
					for (var i = 0; i < rfq.rfq_lines.length; i++) {
						parameter=user_id+"/6/"+rfq.rfq_lines[counter_1].id;
							getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
								parameter={"user_id": user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[counter_2].id, "product_designs_id": 6, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
								Putcall("/tendering_submit_rfq_lines", parameter, token, 200, function(info){
									counter_3++;
									if(counter_3==rfq.rfq_lines.length){
										parameter={"user_id":user_id, "rfq_status_id":5};
										Putcall(url, parameter, token, 404, function(info){
											done();
										});
									}
								});
								counter_2++;
							});
						counter_1++;
					};
				});
			});
		});
	});

	// it("Should NOT OK When invalid rfq_id provide", function (done) {
	// 	login(email, password, function(user){
	// 		var user_id=user.data[0].id;
	// 		var token=user.authentication_token;
	// 		var parameter=user_id;
	// 		getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
	// 			var rfq_id=rfq.rfq[0].id;
	// 		parameter=user_id+"/"+rfq.rfq[0].id;
	// 			getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					
	// 				counter_1=0;
	// 				counter_2=0;
	// 				counter_3=0;
	// 				counter_4=0;
	// 				for (var i = 0; i < rfq.rfq_lines.length; i++) {
	// 					parameter=user_id+"/6/"+rfq.rfq_lines[counter_1].id;
	// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
	// 							parameter={"user_id": user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[counter_2].id, "product_designs_id": 6, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
	// 							Putcall("/tendering_submit_rfq_lines", parameter, token, 200, function(info){
	// 								counter_3++;
	// 								if(counter_3==rfq.rfq_lines.length){
	// 									parameter={"user_id":user_id, "rfq_id": "0000", "rfq_status_id":5};
	// 									Putcall(url, parameter, token, 404, function(info){
	// 										done();
	// 									});
	// 								}
	// 							});
	// 							counter_2++;
	// 						});
	// 					counter_1++;
	// 				};
	// 			});
	// 		});
	// 	});
	// });

	xit("Should NOT OK When null rfq_id provide");
	// it("Should NOT OK When null rfq_id provide", function (done) {
	// 	login(email, password, function(user){
	// 		var user_id=user.data[0].id;
	// 		var token=user.authentication_token;
	// 		var parameter=user_id;
	// 		getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
	// 			var rfq_id=rfq.rfq[0].id;
	// 		parameter=user_id+"/"+rfq.rfq[0].id;
	// 			getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					
	// 				counter_1=0;
	// 				counter_2=0;
	// 				counter_3=0;
	// 				counter_4=0;
	// 				for (var i = 0; i < rfq.rfq_lines.length; i++) {
	// 					parameter=user_id+"/6/"+rfq.rfq_lines[counter_1].id;
	// 						getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
	// 							parameter={"user_id": user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[counter_2].id, "product_designs_id": 6, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
	// 							Putcall("/tendering_submit_rfq_lines", parameter, token, 200, function(info){
	// 								counter_3++;
	// 								if(counter_3==rfq.rfq_lines.length){
	// 									parameter={"user_id":user_id, "rfq_id": "", "rfq_status_id":5};
	// 									Putcall(url, parameter, token, 404, function(info){
	// 										done();
	// 									});
	// 								}
	// 							});
	// 							counter_2++;
	// 						});
	// 					counter_1++;
	// 				};
	// 			});
	// 		});
	// 	});
	// });

	it("Should NOT OK When NonNumeric rfq_id provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					
					counter_1=0;
					counter_2=0;
					counter_3=0;
					counter_4=0;
					for (var i = 0; i < rfq.rfq_lines.length; i++) {
						parameter=user_id+"/6/"+rfq.rfq_lines[counter_1].id;
							getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
								parameter={"user_id": user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[counter_2].id, "product_designs_id": 6, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
								Putcall("/tendering_submit_rfq_lines", parameter, token, 200, function(info){
									counter_3++;
									if(counter_3==rfq.rfq_lines.length){
										parameter={"user_id":user_id, "rfq_id": "NaN", "rfq_status_id":5};
										Putcall(url, parameter, token, 404, function(info){
											done();
										});
									}
								});
								counter_2++;
							});
						counter_1++;
					};
				});
			});
		});
	});

	it("Should NOT OK When user_id not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					
					counter_1=0;
					counter_2=0;
					counter_3=0;
					counter_4=0;
					for (var i = 0; i < rfq.rfq_lines.length; i++) {
						parameter=user_id+"/6/"+rfq.rfq_lines[counter_1].id;
							getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
								parameter={"user_id": user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[counter_2].id, "product_designs_id": 6, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
								Putcall("/tendering_submit_rfq_lines", parameter, token, 200, function(info){
									counter_3++;
									if(counter_3==rfq.rfq_lines.length){
										parameter={"rfq_id": rfq_id, "rfq_status_id":5};
										Putcall(url, parameter, token, 404, function(info){
											done();
										});
									}
								});
								counter_2++;
							});
						counter_1++;
					};
				});
			});
		});
	});

	it("Should NOT OK When NonNumeric user_id provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					
					counter_1=0;
					counter_2=0;
					counter_3=0;
					counter_4=0;
					for (var i = 0; i < rfq.rfq_lines.length; i++) {
						parameter=user_id+"/6/"+rfq.rfq_lines[counter_1].id;
							getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
								parameter={"user_id": user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[counter_2].id, "product_designs_id": 6, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
								Putcall("/tendering_submit_rfq_lines", parameter, token, 200, function(info){
									counter_3++;
									if(counter_3==rfq.rfq_lines.length){
										parameter={"user_id":"NaN", "rfq_id": rfq_id, "rfq_status_id":5};
										Putcall(url, parameter, token, 404, function(info){
											done();
										});
									}
								});
								counter_2++;
							});
						counter_1++;
					};
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
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					
					counter_1=0;
					counter_2=0;
					counter_3=0;
					counter_4=0;
					for (var i = 0; i < rfq.rfq_lines.length; i++) {
						parameter=user_id+"/6/"+rfq.rfq_lines[counter_1].id;
							getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
								parameter={"user_id": user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[counter_2].id, "product_designs_id": 6, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
								Putcall("/tendering_submit_rfq_lines", parameter, token, 200, function(info){
									counter_3++;
									if(counter_3==rfq.rfq_lines.length){
										parameter={"user_id":"00000", "rfq_id": rfq_id, "rfq_status_id":5};
										Putcall(url, parameter, token, 404, function(info){
											done();
										});
									}
								});
								counter_2++;
							});
						counter_1++;
					};
				});
			});
		});
	});

	it("Should NOT OK When rfq_status_id not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					
					counter_1=0;
					counter_2=0;
					counter_3=0;
					counter_4=0;
					for (var i = 0; i < rfq.rfq_lines.length; i++) {
						parameter=user_id+"/6/"+rfq.rfq_lines[counter_1].id;
							getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
								parameter={"user_id": user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[counter_2].id, "product_designs_id": 6, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
								Putcall("/tendering_submit_rfq_lines", parameter, token, 200, function(info){
									counter_3++;
									if(counter_3==rfq.rfq_lines.length){
										parameter={"user_id":user_id, "rfq_id": rfq_id};
										Putcall(url, parameter, token, 404, function(info){
											done();
										});
									}
								});
								counter_2++;
							});
						counter_1++;
					};
				});
			});
		});
	});

	it("Should NOT OK When rfq_status_id value null provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					
					counter_1=0;
					counter_2=0;
					counter_3=0;
					counter_4=0;
					for (var i = 0; i < rfq.rfq_lines.length; i++) {
						parameter=user_id+"/6/"+rfq.rfq_lines[counter_1].id;
							getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
								parameter={"user_id": user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[counter_2].id, "product_designs_id": 6, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
								Putcall("/tendering_submit_rfq_lines", parameter, token, 200, function(info){
									counter_3++;
									if(counter_3==rfq.rfq_lines.length){
										parameter={"user_id":user_id, "rfq_id": rfq_id, "rfq_status_id":""};
										Putcall(url, parameter, token, 404, function(info){
											done();
										});
									}
								});
								counter_2++;
							});
						counter_1++;
					};
				});
			});
		});
	});
	
	it("Should NOT OK When rfq_status_id NonNumeric provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					
					counter_1=0;
					counter_2=0;
					counter_3=0;
					counter_4=0;
					for (var i = 0; i < rfq.rfq_lines.length; i++) {
						parameter=user_id+"/6/"+rfq.rfq_lines[counter_1].id;
							getcall("/tendering_fetch_particular_design", parameter, token, 200, function(design_info){
								parameter={"user_id": user_id, "rfq_id": rfq_id, "rfq_lines_id": rfq.rfq_lines[counter_2].id, "product_designs_id": 6, "sales_price": design_info.design[0].minimum_price, "confirmed_delivery_date": 10};
								Putcall("/tendering_submit_rfq_lines", parameter, token, 200, function(info){
									counter_3++;
									if(counter_3==rfq.rfq_lines.length){
										parameter={"user_id":user_id, "rfq_id": rfq_id, "rfq_status_id":"NaN"};
										Putcall(url, parameter, token, 404, function(info){
											done();
										});
									}
								});
								counter_2++;
							});
						counter_1++;
					};
				});
			});
		});
	});

});

function syncr(callback){
	callback(callback);
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
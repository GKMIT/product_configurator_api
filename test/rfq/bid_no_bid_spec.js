var app = require('../../helper/app');
var testConnection = require('../../helper/connection');

var should = require('should'),
	supertest = require('supertest');

	var global=require('../global/global_spec');
	var email="nitin.naik@cgglobal.com";
	var password="5e8ff9bf55ba3508199d22e984129be6";

// beforeEach(function() {
//    login(email, password, function(user){
// 			var user_id=user.data[0].id;
// 			var token=user.authentication_token;
// 			getcall("/rfq_finalize", user_id, token, 200, function(rfq){
// 				var rfq_id=rfq.partial_rfq[0].id;
// 				var parameter=user_id+"/"+rfq_id;
// 				// console.log(rfq_id);
// 				getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
// 					var product_lines_id=line_item.product_lines[0].id;
// 					parameter=user_id+"/"+product_lines_id;
// 					getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
// 						var plants_id=prop.production_plants[0].id;
// 						parameter={"user_id":user_id,
// 									"product_lines_id":product_lines_id,
// 									"plants_id":plants_id,
// 									"rfq_id":rfq_id,
// 									"number_of_units":"12",
// 									"rfq_status_id":"3",
// 									"req_delivery_date":"2014-10-10 12:00:00",
// 									"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
// 									};
// 						Postcall("/save_line_item", parameter, token, 200, function(prop){
// 							// console.log(rfq_id);
// 							var parameter={"user_id":user_id,"rfq_id":rfq_id, "rfq_status_id":2}
// 							supertest(app)
// 								.post(url)
// 								.send(parameter)
// 								.set('authentication_token', token)
// 								.expect(status)
// 								.end(function (err, res) {
// 									// if(err){
// 									// }
// 									// res.body.statusCode.should.equal(status);
// 									// callback(res.body);
// 									console.log("b4 run");
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// })

// afterEach(function() {
//     // console.log('after every test :: removing user from the system');
//     //  user = null;
// })

beforeEach( function(){ 
	console.log('beforeEach');
	// login(email, password, function(user){
	// 		var user_id=user.data[0].id;
	// 		var token=user.authentication_token;
	// 		getcall("/rfq_finalize", user_id, token, 200, function(rfq){
	// 			var rfq_id=rfq.partial_rfq[0].id;
	// 			var parameter=user_id+"/"+rfq_id;
	// 			// console.log(rfq_id);
	// 			getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
	// 				var product_lines_id=line_item.product_lines[0].id;
	// 				parameter=user_id+"/"+product_lines_id;
	// 				getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
	// 					var plants_id=prop.production_plants[0].id;
	// 					parameter={"user_id":user_id,
	// 								"product_lines_id":product_lines_id,
	// 								"plants_id":plants_id,
	// 								"rfq_id":rfq_id,
	// 								"number_of_units":"12",
	// 								"rfq_status_id":"3",
	// 								"req_delivery_date":"2014-10-10 12:00:00",
	// 								"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
	// 								};
	// 					Postcall("/save_line_item", parameter, token, 200, function(prop){
	// 						// console.log(rfq_id);
	// 						var parameter={"user_id":user_id,"rfq_id":rfq_id, "rfq_status_id":2}
	// 						supertest(app)
	// 							.post(url)
	// 							.send(parameter)
	// 							.set('authentication_token', token)
	// 							.expect(status)
	// 							.end(function (err, res) {
	// 								// if(err){
	// 								// }
	// 								// res.body.statusCode.should.equal(status);
	// 								// callback(res.body);
	// 								console.log("b4 run");
	// 						});
	// 					});
	// 				});
	// 			});
	// 		});
	// 	});
 });

describe('ready_rfq_bid API Calls', function () {

	// before(function() {
	//    login(email, password, function(user){
	// 		var user_id=user.data[0].id;
	// 		var token=user.authentication_token;
	// 		getcall("/rfq_finalize", user_id, token, 200, function(rfq){
	// 			var rfq_id=rfq.partial_rfq[0].id;
	// 			var parameter=user_id+"/"+rfq_id;
	// 			// console.log(rfq_id);
	// 			getcall("/rfq_new_line_item", parameter, token, 200, function(line_item){
	// 				var product_lines_id=line_item.product_lines[0].id;
	// 				parameter=user_id+"/"+product_lines_id;
	// 				getcall("/fetch_product_plants_properties", parameter, token, 200, function(prop){
	// 					var plants_id=prop.production_plants[0].id;
	// 					parameter={"user_id":user_id,
	// 								"product_lines_id":product_lines_id,
	// 								"plants_id":plants_id,
	// 								"rfq_id":rfq_id,
	// 								"number_of_units":"12",
	// 								"rfq_status_id":"3",
	// 								"req_delivery_date":"2014-10-10 12:00:00",
	// 								"technical_specifications":[{"product_properties_id":1, "value":"value are what ever !", "remark":"remakrs are bla bla.."}]
	// 								};
	// 					Postcall("/save_line_item", parameter, token, 200, function(prop){
	// 						// console.log(rfq_id);
	// 						var parameter={"user_id":user_id,"rfq_id":rfq_id, "rfq_status_id":2}
	// 						supertest(app)
	// 							.post(url)
	// 							.send(parameter)
	// 							.set('authentication_token', token)
	// 							.expect(status)
	// 							.end(function (err, res) {
	// 								// if(err){
	// 								// }
	// 								// res.body.statusCode.should.equal(status);
	// 								// callback(res.body);
	// 								console.log("b4 run");
	// 						});
	// 					});
	// 				});
	// 			});
	// 		});
	// 	});
	// })

	var url="/ready_rfq_bid"
	it("Should ok All Correct Data", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall(url, parameter, token, 200, function(rfq){
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



describe('ready_rfq_bid_detail API Calls', function () {
	var url="/ready_rfq_bid_detail"
	it("Should ok All Correct Data", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall(url, parameter, token, 200, function(rfq_detail){
					done();
				});
			});
		});
	});

	it("Should Not ok When token not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcallWithoutToken(url, parameter, 404, function(rfq_detail){
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
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall(url, parameter, "invalid", 404, function(rfq_detail){
					done();
				});
			});
		});
	});

	it("Should Not ok When token value not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall(url, parameter, "", 404, function(rfq_detail){
					done();
				});
			});
		});
	});

	it("Should Not ok When invalid user_id provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter="0000"+"/"+rfq.rfq[0].id;
				getcall(url, parameter, token, 404, function(rfq_detail){
					done();
				});
			});
		});
	});


	it("Should Not ok When user_id is NonNumeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter="Nan"+"/"+rfq.rfq[0].id;
				getcall(url, parameter, token, 404, function(rfq_detail){
					done();
				});
			});
		});
	});

	it("Should Not ok When rfq_id is NonNumeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+"Nan";
				getcall(url, parameter, token, 404, function(rfq_detail){
					done();
				});
			});
		});
	});

	it("Should Not ok When rfq_id is invalid", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+"0000";
				getcall(url, parameter, token, 401, function(rfq_detail){
					done();
				});
			});
		});
	});

});

// save_rfq_questions

describe('save_rfq_questions API Call', function () {
	var url="/save_rfq_questions"
	it("Should ok All Correct Data", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall(url, parameter, token, 200, function(obj){
							done();
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When token not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						PostcallWithoutToken(url, parameter, 404, function(obj){
							done();
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When authentication_token value not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall(url, parameter, "", 404, function(obj){
							done();
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When authentication_token value invalid", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall(url, parameter, "invalid", 404, function(obj){
							done();
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When user_id provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall(url, parameter, token, 404, function(obj){
							done();
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When user_id value not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':"", 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall(url, parameter, token, 404 , function(obj){
							done();
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When invalid user_id provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':"0000", 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall(url, parameter, token, 404, function(obj){
							done();
						});
					}
				});
			});
		});
	});


	it("Should NOT OK When user_id value NonNumeric provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':"Nan", 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall(url, parameter, token, 404, function(obj){
							done();
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When rfq_id not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'questions':questions};
						Postcall(url, parameter, token, 404, function(obj){
							done();
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When rfq_id value not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': "", 'questions':questions};
						Postcall(url, parameter, token, 404, function(obj){
							done();
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When NonNumeric rfq_id provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': "Nan", 'questions':questions};
						Postcall(url, parameter, token, 404, function(obj){
							done();
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When questions not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id};
						Postcall(url, parameter, token, 404, function(obj){
							done();
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When questions value not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':''};
						Postcall(url, parameter, token, 404, function(obj){
							done();
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When question non Array field provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':"Hello"};
						Postcall(url, parameter, token, 404, function(obj){
							done();
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When question array not proper means like : in array question_id field provide but value field not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall(url, parameter, token, 404, function(obj){
							done();
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When question array not proper means like :in array question_id field's value not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': '', 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall(url, parameter, token, 404, function(obj){
							done();
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When question array not proper means like :in array value field nonNumeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 'NaN'};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall(url, parameter, token, 404, function(obj){
							done();
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When question array not proper means like :in array question_id nonNumeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': "NaN", 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall(url, parameter, token, 404, function(obj){
							done();
						});
					}
				});
			});
		});
	});

});

// full_rfq_detail/:user_id/:rfq_id
describe('full_rfq_detail API Calls', function () {
	var url="/full_rfq_detail"
	it("Should ok All Correct Data", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall(url, parameter, token, 200, function(rfq_detail){
					done();
				});
			});
		});
	});

	it("Should Not ok When token not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcallWithoutToken(url, parameter, 404, function(rfq_detail){
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
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall(url, parameter, "invalid", 404, function(rfq_detail){
					done();
				});
			});
		});
	});

	it("Should Not ok When token value not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall(url, parameter, "", 404, function(rfq_detail){
					done();
				});
			});
		});
	});

	it("Should Not ok When invalid user_id provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter="0000"+"/"+rfq.rfq[0].id;
				getcall(url, parameter, token, 404, function(rfq_detail){
					done();
				});
			});
		});
	});


	it("Should Not ok When user_id is NonNumeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter="Nan"+"/"+rfq.rfq[0].id;
				getcall(url, parameter, token, 404, function(rfq_detail){
					done();
				});
			});
		});
	});

	it("Should Not ok When rfq_id is NonNumeric", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+"Nan";
				getcall(url, parameter, token, 404, function(rfq_detail){
					done();
				});
			});
		});
	});

	it("Should Not ok When rfq_id is invalid", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+"0000";
				getcall(url, parameter, token, 401, function(rfq_detail){
					done();
				});
			});
		});
	});
});

describe('rfq_bid_submit API Call', function () {
	var url="/rfq_bid_submit"
	
	it("Should NOT OK When authentication_token not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter={'user_id': user_id, 'rfq_id': rfq.rfq[0].id, 'rfq_status_id': 4};
							PutcallWithoutToken(url, parameter, 404, function(obj){
								done();
							});
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When authentication_token value not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter={'user_id': user_id, 'rfq_id': rfq.rfq[0].id, 'rfq_status_id': 4};
							Putcall(url, parameter, "", 404, function(obj){
								done();
							});
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When rfq_id provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter={'user_id': user_id, 'rfq_status_id': 4};
							Putcall(url, parameter, token, 404, function(obj){
								done();
							});
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When rfq_id value not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter={'user_id': user_id, 'rfq_id': '', 'rfq_status_id': 4};
							Putcall(url, parameter, token, 404, function(obj){
								done();
							});
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When rfq_id value NonNumeric provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter={'user_id': user_id, 'rfq_id': 'NaN', 'rfq_status_id': 4};
							Putcall(url, parameter, token, 404, function(obj){
								done();
							});
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When rfq_status_id not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter={'user_id': user_id, 'rfq_id': rfq.rfq[0].id};
							Putcall(url, parameter, token, 404, function(obj){
								done();
							});
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When rfq_status_id value not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter={'user_id': user_id, 'rfq_id': rfq.rfq[0].id, 'rfq_status_id': ''};
							Putcall(url, parameter, token, 404, function(obj){
								done();
							});
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When rfq_status_id value NonNumeric provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter={'user_id': user_id, 'rfq_id': rfq.rfq[0].id, 'rfq_status_id': 'NaN'};
							Putcall(url, parameter, token, 404, function(obj){
								done();
							});
						});
					}
				});
			});
		});
	});
	
	it("Should ok All Correct Data", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter={'user_id': user_id, 'rfq_id': rfq.rfq[0].id, 'rfq_status_id': 4};
							Putcall(url, parameter, token, 200, function(obj){
								done();
							});
						});
					}
				});
			});
		});
	});


});

describe('get_rejection_remarks API Calls', function () {
	var url="/get_rejection_remarks"
	it("Should ok All Correct Data", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall(url, parameter, token, 200, function(rfq){
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

describe('rfq_no_bid_submit API Call', function () {
	var url="/rfq_no_bid_submit";
	
	it("Should NOT OK When authentication_token not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter=user_id;
							getcall("/get_rejection_remarks", parameter, token, 200, function(rfq_remarks){
								parameter={'user_id': user_id, 'rfq_id': rfq.rfq[0].id, 'rfq_status_id': 3, 'rejection_remarks_id': rfq_remarks.rejection_remarks[0].id, 'estimated_sales_price':'4500'};
								PutcallWithoutToken(url, parameter, 404, function(obj){
									done();
								});
							});
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When authentication_token value not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter=user_id;
							getcall("/get_rejection_remarks", parameter, token, 200, function(rfq_remarks){
								parameter={'user_id': user_id, 'rfq_id': rfq.rfq[0].id, 'rfq_status_id': 3, 'rejection_remarks_id': rfq_remarks.rejection_remarks[0].id, 'estimated_sales_price':'4500'};
								Putcall(url, parameter, "", 404, function(obj){
									done();
								});
							});
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When authentication_token invalid provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter=user_id;
							getcall("/get_rejection_remarks", parameter, token, 200, function(rfq_remarks){
								parameter={'user_id': user_id, 'rfq_id': rfq.rfq[0].id, 'rfq_status_id': 3, 'rejection_remarks_id': rfq_remarks.rejection_remarks[0].id, 'estimated_sales_price':'4500'};
								Putcall(url, parameter, "invalid_token", 404, function(obj){
									done();
								});
							});
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When user_id not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter=user_id;
							getcall("/get_rejection_remarks", parameter, token, 200, function(rfq_remarks){
								parameter={'rfq_id': rfq.rfq[0].id, 'rfq_status_id': 3, 'rejection_remarks_id': rfq_remarks.rejection_remarks[0].id, 'estimated_sales_price':'4500'};
								Putcall(url, parameter, token, 404, function(obj){
									done();
								});
							});
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When user_id value not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter=user_id;
							getcall("/get_rejection_remarks", parameter, token, 200, function(rfq_remarks){
								parameter={'user_id': '', 'rfq_id': rfq.rfq[0].id, 'rfq_status_id': 3, 'rejection_remarks_id': rfq_remarks.rejection_remarks[0].id, 'estimated_sales_price':'4500'};
								Putcall(url, parameter, token, 404, function(obj){
									done();
								});
							});
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When user_id value NonNumeric provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter=user_id;
							getcall("/get_rejection_remarks", parameter, token, 200, function(rfq_remarks){
								parameter={'user_id': 'NaN', 'rfq_id': rfq.rfq[0].id, 'rfq_status_id': 3, 'rejection_remarks_id': rfq_remarks.rejection_remarks[0].id, 'estimated_sales_price':'4500'};
								Putcall(url, parameter, token, 404, function(obj){
									done();
								});
							});
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When user_id value invalid provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter=user_id;
							getcall("/get_rejection_remarks", parameter, token, 200, function(rfq_remarks){
								parameter={'user_id': '0000', 'rfq_id': rfq.rfq[0].id, 'rfq_status_id': 3, 'rejection_remarks_id': rfq_remarks.rejection_remarks[0].id, 'estimated_sales_price':'4500'};
								Putcall(url, parameter, token, 404, function(obj){
									done();
								});
							});
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When rfq_id not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter=user_id;
							getcall("/get_rejection_remarks", parameter, token, 200, function(rfq_remarks){
								parameter={'user_id':user_id, 'rfq_status_id': 3, 'rejection_remarks_id': rfq_remarks.rejection_remarks[0].id, 'estimated_sales_price':'4500'};
								Putcall(url, parameter, token, 404, function(obj){
									done();
								});
							});
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When rfq_id value not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter=user_id;
							getcall("/get_rejection_remarks", parameter, token, 200, function(rfq_remarks){
								parameter={'user_id':user_id, 'rfq_id': '', 'rfq_status_id': 3, 'rejection_remarks_id': rfq_remarks.rejection_remarks[0].id, 'estimated_sales_price':'4500'};
								Putcall(url, parameter, token, 404, function(obj){
									done();
								});
							});
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When rfq_id value NonNumeric provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter=user_id;
							getcall("/get_rejection_remarks", parameter, token, 200, function(rfq_remarks){
								parameter={'user_id':user_id, 'rfq_id': 'NaN', 'rfq_status_id': 3, 'rejection_remarks_id': rfq_remarks.rejection_remarks[0].id, 'estimated_sales_price':'4500'};
								Putcall(url, parameter, token, 404, function(obj){
									done();
								});
							});
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When rfq_status_id not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter=user_id;
							getcall("/get_rejection_remarks", parameter, token, 200, function(rfq_remarks){
								parameter={'user_id':user_id, 'rfq_id':rfq.rfq[0].id, 'rejection_remarks_id': rfq_remarks.rejection_remarks[0].id, 'estimated_sales_price':'4500'};
								Putcall(url, parameter, token, 404, function(obj){
									done();
								});
							});
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When rfq_status_id value not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter=user_id;
							getcall("/get_rejection_remarks", parameter, token, 200, function(rfq_remarks){
								parameter={'user_id':user_id, 'rfq_id':rfq.rfq[0].id, 'rfq_status_id': '', 'rejection_remarks_id': rfq_remarks.rejection_remarks[0].id, 'estimated_sales_price':'4500'};
								Putcall(url, parameter, token, 404, function(obj){
									done();
								});
							});
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When rfq_status_id value NonNumeric provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter=user_id;
							getcall("/get_rejection_remarks", parameter, token, 200, function(rfq_remarks){
								parameter={'user_id':user_id, 'rfq_id':rfq.rfq[0].id, 'rfq_status_id': 'NaN', 'rejection_remarks_id': rfq_remarks.rejection_remarks[0].id, 'estimated_sales_price':'4500'};
								Putcall(url, parameter, token, 404, function(obj){
									done();
								});
							});
						});
					}
				});
			});
		});
	});


	it("Should NOT OK When rejection_remarks_id not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter=user_id;
							getcall("/get_rejection_remarks", parameter, token, 200, function(rfq_remarks){
								parameter={'user_id':user_id, 'rfq_id':rfq.rfq[0].id, 'rfq_status_id': 3, 'estimated_sales_price':'4500'};
								Putcall(url, parameter, token, 404, function(obj){
									done();
								});
							});
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When rejection_remarks_id value not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter=user_id;
							getcall("/get_rejection_remarks", parameter, token, 200, function(rfq_remarks){
								parameter={'user_id':user_id, 'rfq_id':rfq.rfq[0].id, 'rfq_status_id': 3, 'rejection_remarks_id': '', 'estimated_sales_price':'4500'};
								Putcall(url, parameter, token, 404, function(obj){
									done();
								});
							});
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When rejection_remarks_id value NonNumeric provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter=user_id;
							getcall("/get_rejection_remarks", parameter, token, 200, function(rfq_remarks){
								parameter={'user_id':user_id, 'rfq_id':rfq.rfq[0].id, 'rfq_status_id': 3, 'rejection_remarks_id': 'NaN', 'estimated_sales_price':'4500'};
								Putcall(url, parameter, token, 404, function(obj){
									done();
								});
							});
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When estimated_sales_price not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter=user_id;
							getcall("/get_rejection_remarks", parameter, token, 200, function(rfq_remarks){
								parameter={'user_id':user_id, 'rfq_id':rfq.rfq[0].id, 'rfq_status_id': 3, 'rejection_remarks_id': rfq_remarks.rejection_remarks[0].id};
								Putcall(url, parameter, token, 404, function(obj){
									done();
								});
							});
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When estimated_sales_price value not provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter=user_id;
							getcall("/get_rejection_remarks", parameter, token, 200, function(rfq_remarks){
								parameter={'user_id':user_id, 'rfq_id':rfq.rfq[0].id, 'rfq_status_id': 3, 'rejection_remarks_id': rfq_remarks.rejection_remarks[0].id, 'estimated_sales_price':''};
								Putcall(url, parameter, token, 404, function(obj){
									done();
								});
							});
						});
					}
				});
			});
		});
	});

	it("Should NOT OK When estimated_sales_price value NonNumeric provide", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/ready_rfq_bid", parameter, token, 200, function(rfq){
				 parameter=user_id+"/"+rfq.rfq[0].id;
				getcall("/ready_rfq_bid_detail", parameter, token, 200, function(rfq_detail){
					var questions = new Array();
					for (var i = 0; i < rfq_detail.rfq_questions.length; i++) {
						questions[i]={'question_id': rfq_detail.rfq_questions[i].id, 'value': 1};
					
					};
						if(i==rfq_detail.rfq_questions.length){
						parameter={'user_id':user_id, 'rfq_id': rfq.rfq[0].id, 'questions':questions};
						Postcall("/save_rfq_questions", parameter, token, 200, function(obj){
							parameter=user_id;
							getcall("/get_rejection_remarks", parameter, token, 200, function(rfq_remarks){
								parameter={'user_id':user_id, 'rfq_id':rfq.rfq[0].id, 'rfq_status_id': 3, 'rejection_remarks_id': rfq_remarks.rejection_remarks[0].id, 'estimated_sales_price':'NaN'};
								Putcall(url, parameter, token, 404, function(obj){
									done();
								});
							});
						});
					}
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
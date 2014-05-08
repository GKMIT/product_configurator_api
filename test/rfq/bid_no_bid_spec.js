var app = require('../../helper/app');
var testConnection = require('../../helper/connection');

var should = require('should'),
	supertest = require('supertest');

	var global=require('../global/global_spec');
	var email="nitin.naik@cgglobal.com";
	var password="5e8ff9bf55ba3508199d22e984129be6";


describe('ready_rfq_bid API Calls', function () {
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
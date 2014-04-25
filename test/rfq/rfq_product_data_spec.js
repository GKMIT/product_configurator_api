var app = require('../../helper/app');
var testConnection = require('../../helper/connection');

var should = require('should'),
	supertest = require('supertest');

// test cases for the product data
describe('RFQ Product Data', function () {
	it('should return not ok parameter authentication_token not provide',
			function (done) {
	      	var email="govindaraj.sethuraman@cgglobal.com"
	     	var password="5e8ff9bf55ba3508199d22e984129be6";
			login(email, password, function(user){
				var token=user.authentication_token;
				var user_id=user.data[0].id;
				rfq_finalize(user_id, token, function(rfq){
					var rfq_id=rfq.partial_rfq[0].id;
					var url="/rfq_new_line_item";
					var parameter=user_id+"/"+rfq_id;
					getcallWithoutToken(url, parameter, 404, function(obj){
						done();
					});
				});
			});	
	});

	it('should return not ok parameter authentication_token provide but value not provide',
			function (done) {
  			var email="govindaraj.sethuraman@cgglobal.com"
	     	var password="5e8ff9bf55ba3508199d22e984129be6";
			login(email, password, function(user){
				var token=user.authentication_token;
				var user_id=user.data[0].id;
				rfq_finalize(user_id, token, function(rfq){
					var rfq_id=rfq.partial_rfq[0].id;
					var url="/rfq_new_line_item";
					var parameter=user_id+"/"+rfq_id;
					token="";
					getcall(url, parameter, token, 404, function(obj){
						done();
					});
				});
			});
	});

	it('should return not ok parameter invalid authentication_token provide',
			function (done) {
  			var email="govindaraj.sethuraman@cgglobal.com"
	     	var password="5e8ff9bf55ba3508199d22e984129be6";
			login(email, password, function(user){
				var token=user.authentication_token;
				var user_id=user.data[0].id;
				rfq_finalize(user_id, token, function(rfq){
					var rfq_id=rfq.partial_rfq[0].id;
					var url="/rfq_new_line_item";
					var parameter=user_id+"/"+rfq_id;
					token="invalid";
					getcall(url, parameter, token, 404, function(obj){
						done();
					});
				});
			});
	});

	it('should return not ok parameter invalid user_id provide',
			function (done) {
  			var email="govindaraj.sethuraman@cgglobal.com"
	     	var password="5e8ff9bf55ba3508199d22e984129be6";
			login(email, password, function(user){
				var token=user.authentication_token;
				var user_id=user.data[0].id;
				rfq_finalize(user_id, token, function(rfq){
					var rfq_id=rfq.partial_rfq[0].id;
					var url="/rfq_new_line_item";
					user_id="non";
					var parameter=user_id+"/"+rfq_id;
					token="";
					getcall(url, parameter, token, 404, function(obj){
						done();
					});
				});
			});
	});

	it('should return not ok parameter invalid rfq_id provide',
			function (done) {
  			var email="govindaraj.sethuraman@cgglobal.com"
	     	var password="5e8ff9bf55ba3508199d22e984129be6";
			login(email, password, function(user){
				var token=user.authentication_token;
				var user_id=user.data[0].id;
				rfq_finalize(user_id, token, function(rfq){
					var rfq_id=rfq.partial_rfq[0].id;
					var url="/rfq_new_line_item";
					user_id="non";
					var parameter=user_id+"/"+"non Numeric";
					token="";
					getcall(url, parameter, token, 404, function(obj){
						done();
					});
				});
			});
	});

	it('should return not ok parameter rfq_id is not created_by this user_id',
			function (done) {
  			var email="govindaraj.sethuraman@cgglobal.com"
	     	var password="5e8ff9bf55ba3508199d22e984129be6";
			login(email, password, function(user){
				var token=user.authentication_token;
				var user_id=user.data[0].id;
				rfq_finalize(user_id, token, function(rfq){
					var rfq_id=rfq.partial_rfq[0].id;
					var url="/rfq_new_line_item";
					user_id="1010101010101010101010101010101";
					var parameter=user_id+"/"+rfq_id;
					token="";
					getcall(url, parameter, token, 404, function(obj){
						done();
					});
				});
			});
	});

	it('should return ok all parameter provide',
			function (done) {
  			var email="govindaraj.sethuraman@cgglobal.com"
	     	var password="5e8ff9bf55ba3508199d22e984129be6";
			login(email, password, function(user){
				var token=user.authentication_token;
				var user_id=user.data[0].id;
				rfq_finalize(user_id, token, function(rfq){
					var rfq_id=rfq.partial_rfq[0].id;
					var url="/rfq_new_line_item";
					var parameter=user_id+"/"+rfq_id;
					getcall(url, parameter, token, 200, function(obj){
						done();
					});
				});
			});

	});

});


// test cases for GET tendering teams data 
describe('RFQ Product tendering teams Data', function () {
	it('should return not ok parameter authentication_token not provide',
			function (done) {
  			var email="govindaraj.sethuraman@cgglobal.com"
	     	var password="5e8ff9bf55ba3508199d22e984129be6";
			login(email, password, function(user){
				var token=user.authentication_token;
				var user_id=user.data[0].id;
				rfq_finalize(user_id, token, function(rfq){
					var rfq_id=rfq.partial_rfq[0].id;
					var url="/rfq_tendering_teams";
					var parameter=user_id+"/"+rfq_id;
					getcall("/rfq_new_line_item", parameter, token, 200, function(product){
						var product_line_id=product.product_lines[0].id;
						parameter=user_id+"/"+product_line_id;
						getcallWithoutToken(url, parameter, 404, function(obj){
							done();
						});
					});
				});
			});
	});

	it('should return not ok parameter authentication_token provide but value not provide',
			function (done) {
  			var email="govindaraj.sethuraman@cgglobal.com"
	     	var password="5e8ff9bf55ba3508199d22e984129be6";
			login(email, password, function(user){
				var token=user.authentication_token;
				var user_id=user.data[0].id;
				rfq_finalize(user_id, token, function(rfq){
					var rfq_id=rfq.partial_rfq[0].id;
					var url="/rfq_tendering_teams";
					var parameter=user_id+"/"+rfq_id;
					getcall("/rfq_new_line_item", parameter, token, 200, function(product){
						var product_line_id=product.product_lines[0].id;
						parameter=user_id+"/"+product_line_id;
						token="";
						getcall(url, parameter, token, 404, function(obj){
							done();
						});
					});
				});
			});
	});

	it('should return not ok parameter invalid authentication_token provide',
			function (done) {
  			var email="govindaraj.sethuraman@cgglobal.com"
	     	var password="5e8ff9bf55ba3508199d22e984129be6";
			login(email, password, function(user){
				var token=user.authentication_token;
				var user_id=user.data[0].id;
				rfq_finalize(user_id, token, function(rfq){
					var rfq_id=rfq.partial_rfq[0].id;
					var url="/rfq_tendering_teams";
					var parameter=user_id+"/"+rfq_id;
					getcall("/rfq_new_line_item", parameter, token, 200, function(product){
						var product_line_id=product.product_lines[0].id;
						parameter=user_id+"/"+product_line_id;
						token="invalid";
						getcall(url, parameter, token, 404, function(obj){
							done();
						});
					});
				});
			});
	});

	it('should return not ok parameter invalid user_id provide',
			function (done) {
  			var email="govindaraj.sethuraman@cgglobal.com"
	     	var password="5e8ff9bf55ba3508199d22e984129be6";
			login(email, password, function(user){
				var token=user.authentication_token;
				var user_id=user.data[0].id;
				rfq_finalize(user_id, token, function(rfq){
					var rfq_id=rfq.partial_rfq[0].id;
					var url="/rfq_tendering_teams";
					var parameter=user_id+"/"+rfq_id;
					getcall("/rfq_new_line_item", parameter, token, 200, function(product){
						var product_line_id=product.product_lines[0].id;
						user_id="invalid";
						parameter=user_id+"/"+product_line_id;
						getcall(url, parameter, token, 404, function(obj){
							done();
						});
					});
				});
			});
	});

	it('should return not ok parameter invalid product_lines_id provide',
			function (done) {
  			var email="govindaraj.sethuraman@cgglobal.com"
	     	var password="5e8ff9bf55ba3508199d22e984129be6";
			login(email, password, function(user){
				var token=user.authentication_token;
				var user_id=user.data[0].id;
				rfq_finalize(user_id, token, function(rfq){
					var rfq_id=rfq.partial_rfq[0].id;
					var url="/rfq_tendering_teams";
					var parameter=user_id+"/"+rfq_id;
					getcall("/rfq_new_line_item", parameter, token, 200, function(product){
						var product_line_id="invalid";
						parameter=user_id+"/"+product_line_id;
						getcall(url, parameter, token, 404, function(obj){
							done();
						});
					});
				});
			});
	});

	it('should return ok all parameter provide',
			function (done) {
  			var email="govindaraj.sethuraman@cgglobal.com"
	     	var password="5e8ff9bf55ba3508199d22e984129be6";
			login(email, password, function(user){
				var token=user.authentication_token;
				var user_id=user.data[0].id;
				rfq_finalize(user_id, token, function(rfq){
					var rfq_id=rfq.partial_rfq[0].id;
					var url="/rfq_tendering_teams";
					var parameter=user_id+"/"+rfq_id;
					getcall("/rfq_new_line_item", parameter, token, 200, function(product){
						var product_line_id=product.product_lines[0].id;
						parameter=user_id+"/"+product_line_id;
						getcall(url, parameter, token, 200, function(obj){
							done();
						});
					});
				});
			});
	});

});



// test cases for GET tendering teams Members data 
describe('RFQ Product tendering teams Members Data', function () {
	it('should return not ok parameter authentication_token not provide',
			function (done) {
  			var email="govindaraj.sethuraman@cgglobal.com"
	     	var password="5e8ff9bf55ba3508199d22e984129be6";
			login(email, password, function(user){
				var token=user.authentication_token;
				var user_id=user.data[0].id;
				rfq_finalize(user_id, token, function(rfq){
					var rfq_id=rfq.partial_rfq[0].id;
					var url="/rfq_tendering_teams_members";
					var parameter=user_id+"/"+rfq_id;
					getcall("/rfq_new_line_item", parameter, token, 200, function(product){
						var product_line_id=product.product_lines[0].id;
						parameter=user_id+"/"+product_line_id;
						getcall("/rfq_tendering_teams", parameter, token, 200, function(product){
							var team_id = product.tendering_teams[0].id;
							parameter=user_id+"/"+team_id;
							getcallWithoutToken(url, parameter, 404, function(obj){
								done();
							});
						});
					});
				});
			});
	});

	it('should return not ok parameter authentication_token provide but value not provide',
			function (done) {
  			var email="govindaraj.sethuraman@cgglobal.com"
	     	var password="5e8ff9bf55ba3508199d22e984129be6";
			login(email, password, function(user){
				var token=user.authentication_token;
				var user_id=user.data[0].id;
				rfq_finalize(user_id, token, function(rfq){
					var rfq_id=rfq.partial_rfq[0].id;
					var url="/rfq_tendering_teams_members";
					var parameter=user_id+"/"+rfq_id;
					getcall("/rfq_new_line_item", parameter, token, 200, function(product){
						var product_line_id=product.product_lines[0].id;
						parameter=user_id+"/"+product_line_id;
						getcall("/rfq_tendering_teams", parameter, token, 200, function(product){
							var team_id = product.tendering_teams[0].id;
							parameter=user_id+"/"+team_id;
							token="";
							getcall(url, parameter, token, 404, function(obj){
								done();
							});
						});
					});
				});
			});
	});

	it('should return not ok parameter invalid authentication_token provide',
			function (done) {
  			var email="govindaraj.sethuraman@cgglobal.com"
	     	var password="5e8ff9bf55ba3508199d22e984129be6";
			login(email, password, function(user){
				var token=user.authentication_token;
				var user_id=user.data[0].id;
				rfq_finalize(user_id, token, function(rfq){
					var rfq_id=rfq.partial_rfq[0].id;
					var url="/rfq_tendering_teams_members";
					var parameter=user_id+"/"+rfq_id;
					getcall("/rfq_new_line_item", parameter, token, 200, function(product){
						var product_line_id=product.product_lines[0].id;
						parameter=user_id+"/"+product_line_id;
						getcall("/rfq_tendering_teams", parameter, token, 200, function(product){
							var team_id = product.tendering_teams[0].id;
							parameter=user_id+"/"+team_id;
							token="invalid";
							getcall(url, parameter, token, 404, function(obj){
								done();
							});
						});
					});
				});
			});
	});

	it('should return not ok parameter invalid user_id provide',
			function (done) {
  			var email="govindaraj.sethuraman@cgglobal.com"
	     	var password="5e8ff9bf55ba3508199d22e984129be6";
			login(email, password, function(user){
				var token=user.authentication_token;
				var user_id=user.data[0].id;
				rfq_finalize(user_id, token, function(rfq){
					var rfq_id=rfq.partial_rfq[0].id;
					var url="/rfq_tendering_teams_members";
					var parameter=user_id+"/"+rfq_id;
					getcall("/rfq_new_line_item", parameter, token, 200, function(product){
						var product_line_id=product.product_lines[0].id;
						parameter=user_id+"/"+product_line_id;
						getcall("/rfq_tendering_teams", parameter, token, 200, function(product){
							var team_id = product.tendering_teams[0].id;
							user_id="invalid";
							parameter=user_id+"/"+team_id;
							getcall(url, parameter, token, 404, function(obj){
								done();
							});
						});
					});
				});
			});
	});

	it('should return not ok parameter invalid tendering_teams_id provide',
			function (done) {
  			var email="govindaraj.sethuraman@cgglobal.com"
	     	var password="5e8ff9bf55ba3508199d22e984129be6";
			login(email, password, function(user){
				var token=user.authentication_token;
				var user_id=user.data[0].id;
				rfq_finalize(user_id, token, function(rfq){
					var rfq_id=rfq.partial_rfq[0].id;
					var url="/rfq_tendering_teams_members";
					var parameter=user_id+"/"+rfq_id;
					getcall("/rfq_new_line_item", parameter, token, 200, function(product){
						var product_line_id=product.product_lines[0].id;
						parameter=user_id+"/"+product_line_id;
						getcall("/rfq_tendering_teams", parameter, token, 200, function(product){
							var team_id = product.tendering_teams[0].id;
							team_id="invalid";
							parameter=user_id+"/"+team_id;
							getcall(url, parameter, token, 404, function(obj){
								done();
							});
						});
					});
				});
			});
	});

	it('should return ok all parameter provide',function (done) {
		var email="govindaraj.sethuraman@cgglobal.com"
     	var password="5e8ff9bf55ba3508199d22e984129be6";
		login(email, password, function(user){
			var token=user.authentication_token;
			var user_id=user.data[0].id;
			rfq_finalize(user_id, token, function(rfq){
				var rfq_id=rfq.partial_rfq[0].id;
				var url="/rfq_tendering_teams_members";
				var parameter=user_id+"/"+rfq_id;
				getcall("/rfq_new_line_item", parameter, token, 200, function(product){
					var product_line_id=product.product_lines[0].id;
					parameter=user_id+"/"+product_line_id;
					getcall("/rfq_tendering_teams", parameter, token, 200, function(product){
						var team_id = product.tendering_teams[0].id;
						parameter=user_id+"/"+team_id;
						getcall(url, parameter, token, 200, function(obj){
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

function getcall(url, parameter, token, status, callback){
	supertest(app)
		.get(url+"/"+parameter)
		.set('authentication_token', token)
		.expect(status)
		.end(function (err, res) {
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
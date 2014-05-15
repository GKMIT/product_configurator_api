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
	var url="/tendering_fetch_product_design_detail"
	it("Should ok All Correct Data", function (done) {
		login(email, password, function(user){
			var user_id=user.data[0].id;
			var token=user.authentication_token;
			var parameter=user_id;
			getcall("/tendering_teams_quotes", parameter, token, 200, function(rfq){
				// console.log(rfq);
				var rfq_id=rfq.rfq[0].id;
			parameter=user_id+"/"+rfq.rfq[0].id;
			// console.log(parameter);
				getcall("/tendering_fetch_particular_quote", parameter, token, 200, function(rfq){
					// console.log(rfq.rfq[0].id);
					var equalfilter=new Array();
					var rangefilter=new Array();
					for (var i = 0; i < rfq.rfq_lines[0].rfq_lines_technical_specs.length; i++) {
						equalfilter.push({"id" :rfq.rfq_lines[0].rfq_lines_technical_specs[i].product_properties_id, "value": 20+i});
					};

					equalfilter.push({"id" :3, "value": "0"});
					// equalfilter.push({"id" :3, "value": "5"});
					// equalfilter.push({"id" :6, "value": 5});
					// equalfilter.push({"id" :6, "value": 5});

					// rangefilter.push({"id" :18, "value": "20"});
					rangefilter.push({"id" :19, "value": 830});

					parameter={"user_id": user_id, "rfq_id": rfq_id,
					 "rfq_lines_id": rfq.rfq_lines[i].id,
					 "equalfilter":equalfilter,
					 "rangefilter":rangefilter
					};
					console.log(parameter);

					Postcall(url, parameter, token, 200, function(design_data){
						// console.log("yoyoyoyo");
						console.log(design_data);
						done();
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
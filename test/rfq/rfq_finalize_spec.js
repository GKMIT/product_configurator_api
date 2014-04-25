var app = require('../../helper/app');
var testConnection = require('../../helper/connection');

var should = require('should'),
	supertest = require('supertest');

describe("finalize RFQ", function () {
	var email="govindaraj.sethuraman@cgglobal.com";
	var password="5e8ff9bf55ba3508199d22e984129be6";
	var url="/rfq_finalize";
	var parameter="";
	var token ="";
	var user_id="";
	var token="";
	var isToken="";
	rfq_finalizeCase("Should OK all correct data", email, password, parameter, token, isToken, user_id, url, 200);
	rfq_finalizeCase("Should not ok becouse authentication_token not deinfed in header", email, password, parameter, token, "undefined", user_id, url, 404);
	rfq_finalizeCase("Should not ok becouse authentication_token set but value not provide", email, password, parameter, token, "NULL", user_id, url, 404);
	rfq_finalizeCase("Should not ok becouse authentication_token invalid set in the header", email, password, parameter, "invalid", isToken, user_id, url, 404);
	rfq_finalizeCase("Should not ok becouse user_id invalid but numeric", email, password, parameter, token, isToken, 000000000, url, 404);
	rfq_finalizeCase("Should not ok becouse user_id AND authentication_token not provide", email, password, parameter, token, isToken, 12, url, 404);
	rfq_finalizeCase("Should not ok becouse parameter not provide", email, password, "NOT_PROVIDE", token, isToken, user_id, url, 404);
});




function rfq_finalizeCase(caseName, email, password, parameter, token_invalid, isToken, user_id, url, code){
	if(isToken=="NULL"){
		it(caseName, function (done) {
		supertest(app)
		.post('/login')
		.type('form')
		.field('email', email)
     	.field('password', password)
		.end(function (err, res) {
			if(err){
			}
			token=res.body.authentication_token+token_invalid;
			parameter="/"+res.body.data[0].id+user_id;
			supertest(app)
			.get(url+parameter)
			.set('authentication_token', '')
			.expect(code)
			.end(function (err, res) {
				if(err){
				}
					res.body.statusCode.should.equal(code);
				done();
			});
		});
	});
	}
	else if(isToken=="undefined"){
		it(caseName, function (done) {
		supertest(app)
		.post('/login')
		.type('form')
		.field('email', email)
     	.field('password', password)
		.end(function (err, res) {
			if(err){
			}
			token=res.body.authentication_token+token_invalid;
			parameter="/"+res.body.data[0].id+user_id;
			supertest(app)
			.get(url+parameter)
			// .set('authentication_token', token)
			.expect(code)
			.end(function (err, res) {
				if(err){
				}
					res.body.statusCode.should.equal(code);
				done();
			});
		});
	});

	}
	else if(parameter=="NOT_PROVIDE"){
		it(caseName, function (done) {
		supertest(app)
		.post('/login')
		.type('form')
		.field('email', email)
     	.field('password', password)
		.end(function (err, res) {
			if(err){
			}
			token=res.body.authentication_token+token_invalid;
			parameter="/"+res.body.data[0].id+user_id;
			supertest(app)
			.get(url)
			// .set('authentication_token', token)
			.expect(code)
			.end(function (err, res) {
				if(err){
				}
					res.status.should.equal(code);
				done();
			});
		});
	});

	}
	else{
		it(caseName, function (done) {
		supertest(app)
		.post('/login')
		.type('form')
		.field('email', email)
     	.field('password', password)
		.end(function (err, res) {
			if(err){
			}
			token=res.body.authentication_token+token_invalid;
			parameter="/"+res.body.data[0].id+user_id;
			supertest(app)
			.get(url+parameter)
			.set('authentication_token', token)
			.expect(code)
			.end(function (err, res) {
				if(err){
				}
					res.body.statusCode.should.equal(code);
				done();
			});
		});
	});
	}
};



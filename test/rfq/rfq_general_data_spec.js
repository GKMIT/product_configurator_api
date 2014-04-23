var app = require('../../helper/app');
var testConnection = require('../../helper/connection');

var should = require('should'),
	supertest = require('supertest');

	// var global = require("../global/global_spec");
	var general = require("../global/general");

// test cases for the general data of the rfq creation

describe('finalize RFQ', function () {
	var email="govindaraj.sethuraman@cgglobal.com";
	var password="5e8ff9bf55ba3508199d22e984129be6";
	var url="/rfq_finalize";
	var parameter="";
	var token ="";
	it("Should OK all the valid data in finalize rfq", function (done) {
		var data=login("/login", email, password);
		console.log(data);
		// done();
	});
});








function login(url, email, password){
	supertest(app)
		.post('/login')
		.type('form')
		.field('email', email)
     	.field('password', password)
		.end(function (err, res) {
			if(err){
			}
			token=res.body.authentication_token;
			parameter="/"+res.body.data[0].id;
			console.log(res.body);
			return JSON.stringify(res.body);
	});
}
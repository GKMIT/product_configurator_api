var app = require('../../helper/app');
var testConnection = require('../../helper/connection');

var should = require('should'),
	supertest = require('supertest');

	var general = require("../global/general");

// test cases for the general data of the rfq creation

describe('RFQ General Data', function () {
	var email="govindaraj.sethuraman@cgglobal.com";
	var password="5e8ff9bf55ba3508199d22e984129be6";
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
	var email="govindaraj.sethuraman@cgglobal.com";
	var password="5e8ff9bf55ba3508199d22e984129be6";
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
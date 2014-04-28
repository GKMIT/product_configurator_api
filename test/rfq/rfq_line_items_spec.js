var app = require('../../helper/app');
var testConnection = require('../../helper/connection');

var should = require('should'),
	supertest = require('supertest');

	var global=require('../global/global_spec');

describe('RFQ Line Items API Calls', function () {
		var email="govindaraj.sethuraman@cgglobal.com";
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
	var email="govindaraj.sethuraman@cgglobal.com";
	var password="5e8ff9bf55ba3508199d22e984129be6";
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
	var email="govindaraj.sethuraman@cgglobal.com";
	var password="5e8ff9bf55ba3508199d22e984129be6";
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
    // it('Should be pending')
    xit('Should be disabled, i.e not appear on the list')
});




function getcall(url, parameter, token, status, callback){
	supertest(app)
	.get(url+"/"+parameter)
	.set('authentication_token', token)
	.expect(status)
	.end(function (err, res) {
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
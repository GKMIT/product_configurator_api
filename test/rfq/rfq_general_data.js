var app = require('../../helper/app');
var testConnection = require('../../helper/connection');

var should = require('should'),
	supertest = require('supertest');

	// function login(){
	// 	var email="";
	// 	var password="";

	// }

describe('RFQ General Product Data', function () {

	it('should return valid user_id and authentication_token',
		function (done) {
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			// .expect(200)
			.end(function (err, res) {
				// res.status.should.equal(200);

				if(err){
					// assert.ok(value, message);
					done();
				}
				else{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					// console.log(res.body);
					// console.log(id);
					supertest(app)
					.get('/rfq_general_data/'+id)
					.set('authentication_token', token)
					.expect(200)
					.end(function (err, res) {
						res.status.should.equal(200);
						done();
					});
				}
				// done();
			});
	});


	it('should return not ok for incorrect user_id but correct authentication_token', 
		function (done) {
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			// .expect(200)
			.end(function (err, res) {
				// res.status.should.equal(200);

				if(err){
					// assert.ok(value, message);
					done();
				}
				else{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					user_id=0;
					supertest(app)
					.get('/rfq_general_data/'+user_id)
					.set('authentication_token', token)
					.expect(404)
					.end(function (err, res) {
						res.status.should.equal(404);
						done();
					});
				}
				// done();
			});
	});

	it('should return not ok for incorrect authentication_token but user_id is correct', 
		function (done) {
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			// .expect(200)
			.end(function (err, res) {

				if(err){
					done();
				}
				else{
					var token=res.body.authentication_token;
					var token ="0";
					var user_id=res.body.data[0].id;
					user_id=0;
					supertest(app)
					.get('/rfq_general_data/'+user_id)
					.set('authentication_token', token)
					.expect(404)
					.end(function (err, res) {
						res.status.should.equal(404);
						done();
					});
				}
				// done();
			});
	});

	it('should return not ok for incorrect user_id and authentication_token', 
		function (done) {
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			// .expect(200)
			.end(function (err, res) {
				// res.status.should.equal(200);

				if(err){
					// assert.ok(value, message);
					done();
				}
				else{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					var token="dfsd";
					user_id=0;
					supertest(app)
					.get('/rfq_general_data/'+user_id)
					.set('authentication_token', token)
					.expect(404)
					.end(function (err, res) {
						res.status.should.equal(404);
						done();
					});
				}
				// done();
			});
	});

	it('should return not ok for correct user_id and  but authentication_token not set int he header', 
		function (done) {
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			// .expect(200)
			.end(function (err, res) {
				// res.status.should.equal(200);

				if(err){
					// assert.ok(value, message);
					done();
				}
				else{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					
					supertest(app)
					.get('/rfq_general_data/'+user_id)
					// .set('authentication_token', token)
					.expect(404)
					.end(function (err, res) {
						res.status.should.equal(404);
						done();
					});
				}
				// done();
			});
	});

	it('should return not ok for correct authentication_token but user id not set int he header', 
		function (done) {
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			// .expect(200)
			.end(function (err, res) {
				// res.status.should.equal(200);

				if(err){
					// assert.ok(value, message);
					done();
				}
				else{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					
					supertest(app)
					.get('/rfq_general_data/'+user_id)
					// .set('authentication_token', token)
					.expect(404)
					.end(function (err, res){
						res.status.should.equal(404);
						done();
					});
				}
				// done();
			});
	});


});




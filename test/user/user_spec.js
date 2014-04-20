var app = require('../../helper/app');
var testConnection = require('../../helper/connection');

var should = require('should'),
	request = require('supertest');

describe('Login call test', function () {
	
	it('should return ok for correct login', 
	function (done) {
		request(app)
		.post('/login')
		.type('form')
      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
		.expect(200)
		.end(function (err, res) {
			if(err){
				done();
			}
			else{
			res.body.statusCode.should.equal(200);
			done();	
			}
		});
	});
	
	
	it('should return not ok for incorrect email AND password', 
	function (done) {
		request(app)
		.post('/login')
		.type('form')
      	.field('email', 'incorrect@cgglobal.com')
     	.field('password', 'incorrect')
		.expect(200)
		.end(function (err, res) {
			if(err){
				done();
			}
			else{
				res.body.statusCode.should.equal(404);
				done();
			}
		});
	});
	
	
	it('should return not ok for incorrect email format', 
	function (done) {
		request(app)
		.post('/login')
		.type('form')
      	.field('email', 'incorrectformat')
     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
		.expect(200)
		.end(function (err, res) {
			if(err){
				done();
			}
			else{
				res.body.statusCode.should.equal(422);
				done();
			}
		});
	});
	
	it('should return not ok for parameter email not provided', 
	function (done) {
		request(app)
		.post('/login')
		.type('form')
     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
		.expect(200)
		.end(function (err, res) {
			res.body.statusCode.should.equal(404);
			done();
		});
	});
	
	it('should return not ok for parameter password not provided', 
	function (done) {
		request(app)
		.post('/login')
		.type('form')
      	.field('email', 'incorrect@cgglobal.com')
		.expect(200)
		.end(function (err, res) {
			if(err){
				done();
			}
			else{
				res.body.statusCode.should.equal(404);
				done();
			}
		});
	});

	it('should return not ok for email value null', 
	function (done) {
		request(app)
		.post('/login')
		.type('form')
      	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
      	.field('email', '')
		.expect(200)
		.end(function (err, res) {
			if(err){
				done();
			}
			else{
				res.body.statusCode.should.equal(404);
				done();
			}
		});
	});

	it('should return not ok for password value null', 
	function (done) {
		request(app)
		.post('/login')
		.type('form')
      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
      	.field('password', '')
		.expect(200)
		.end(function (err, res) {
			if(err){
				done();
			}
			else{
				res.body.statusCode.should.equal(404);
				done();
			}
		});
	});
	it('should return ok for the user is sales person', 
	function (done) {
		request(app)
		.post('/login')
		.type('form')
      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
      	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
		.expect(200)
		.end(function (err, res) {
			if(err){
				done();
			}
			else{
				res.body.statusCode.should.equal(200);
				done();
			}
		});
	});
	it('should return ok for the user is tendering person', 
	function (done) {
		request(app)
		.post('/login')
		.type('form')
      	.field('email', 'patricia.broeckhoven@cgglobal.com')
      	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
		.expect(200)
		.end(function (err, res) {
			if(err){
				done();
			}
			else{
				res.body.statusCode.should.equal(200);
				done();
			}
		});
	});
	it('should return ok for the user is admin person', 
	function (done) {
		request(app)
		.post('/login')
		.type('form')
      	.field('email', 'mario.roegiers@cgglobal.com')
      	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
		.expect(200)
		.end(function (err, res) {
			if(err){
				done();
			}
			else{
				res.body.statusCode.should.equal(200);
				done();
			}
		});
	});
	it('should return ok for the user is sales person as well as tendering person', 
	function (done) {
		request(app)
		.post('/login')
		.type('form')
      	.field('email', 'mario.roegiers@cgglobal.com')
      	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
		.expect(200)
		.end(function (err, res) {
			if(err){
				done();
			}
			else{
				res.body.statusCode.should.equal(200);
				done();
			}
		});
	});
	it('should return not ok for the user is enable but user not assign any privilages like : sales, tendering, admin', 
	function (done) {
		request(app)
		.post('/login')
		.type('form')
      	.field('email', 'jayantkumar.kulkarni@cgglobal.com')
      	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
		.expect(401)
		.end(function (err, res) {
			if(err){
				done();
			}
			else{
				res.body.statusCode.should.equal(401);
				done();
			}
		});
	});
	it('should return not ok for the user is disable', 
	function (done) {
		request(app)
		.post('/login')
		.type('form')
      	.field('email', 'jayantkumar.kulkarni@cgglobal.com')
      	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
		.expect(401)
		.end(function (err, res) {
			if(err){
				done();
			}
			else{
				res.body.statusCode.should.equal(401);
				done();
			}
		});
	});
});
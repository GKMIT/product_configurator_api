var app = require('../../helper/app');
var testConnection = require('../../helper/connection');

var should = require('should'),
	supertest = require('supertest');

describe('Login ', function () {

	it('should return ok for correct login', 
	function (done) {
		supertest(app)
		.post('/login')
		.type('form')
      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
		.expect(200)
		.end(function (err, res) {
			res.status.should.equal(200);
			done();
		});
	});

	it('should return not ok for incorrect email', 
	function (done) {
		supertest(app)
		.post('/login')
		.type('form')
      	.field('email', 'incorrect@cgglobal.com')
     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
		.expect(404)
		.end(function (err, res) {
			res.status.should.equal(404);
			done();
		});
	});

	it('should return not ok for incorrect Password', 
	function (done) {
		supertest(app)
		.post('/login')
		.type('form')
      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
     	.field('password', 'incorrect')
		.expect(404)
		.end(function (err, res) {
			res.status.should.equal(404);
			done();
		});
	});

	it('should return not ok for incorrect email as well as password', 
	function (done) {
		supertest(app)
		.post('/login')
		.type('form')
      	.field('email', 'incorrect@cgglobal.com')
     	.field('password', 'incorrect')
		.expect(404)
		.end(function (err, res) {
			res.status.should.equal(404);
			done();
		});
	});

	it('should return not ok for incorrect email format', 
	function (done) {
		supertest(app)
		.post('/login')
		.type('form')
      	.field('email', 'incorrectformat')
     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
		.expect(422)
		.end(function (err, res) {
			res.status.should.equal(422);
			done();
		});
	});

	it('should return not ok for parameter email not provided', 
	function (done) {
		supertest(app)
		.post('/login')
		.type('form')
     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
		.expect(422)
		.end(function (err, res) {
			res.status.should.equal(422);
			done();
		});
	});

	it('should return not ok for parameter password not provided', 
	function (done) {
		supertest(app)
		.post('/login')
		.type('form')
      	.field('email', 'incorrect@cgglobal.com')
		.expect(422)
		.end(function (err, res) {
			res.status.should.equal(422);
			done();
		});
	});

	it('should return not ok for parameter email value not provided', 
	function (done) {
		supertest(app)
		.post('/login')
		.type('form')
      	.field('email', '')
      	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
		.expect(422)
		.end(function (err, res) {
			res.status.should.equal(422);
			done();
		});
	});

	it('should return not ok for parameter password value not provided', 
	function (done) {
		supertest(app)
		.post('/login')
		.type('form')
      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
      	.field('password', '')
		.expect(422)
		.end(function (err, res) {
			res.status.should.equal(422);
			done();
		});
	});



});
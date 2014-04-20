var app = require('../../helper/app');
var testConnection = require('../../helper/connection');

var should = require('should'),
	supertest = require('supertest');

// test cases for the general data of the rfq creation

describe('RFQ General Data', function () {
	it('should return valid user_id and authentication_token',
			function (done) {
  			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else{
					var token=res.body.authentication_token;;
					var user_id=res.body.data[0].id;
					supertest(app)
					.get('/rfq_general_data/'+user_id+'/'+0)
					.set('authentication_token', token)
					.expect(200)
					.end(function (err, res) {
						if(err){
						}
						else{
							res.body.statusCode.should.equal(200);
						}
						done();
					});
				}
			});
	});


	it('should return not ok for incorrect authentication_token', 
		function (done) {
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token="incorrect_totoken";
					var user_id=res.body.data[0].id;

					user_id=0;
					supertest(app)
					.get('/rfq_general_data/'+user_id+"/"+1)
					.set('authentication_token', token)
					.expect(404)
					.end(function (err, res) 
					{
						if(err){
						}
						else{
							res.body.statusCode.should.equal(404);
						}
						done();
					});
				}
			});
	});

	it('should return not ok for parameter authentication_token not set in the header', 
		function (done) {
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var user_id=res.body.data[0].id;
					user_id=0;
					supertest(app)
					.get('/rfq_general_data/'+user_id+"/"+1)
					.expect(404)
					.end(function (err, res) 
					{
						if(err){
						}
						else{
							res.body.statusCode.should.equal(404);
						}
						done();
					});
				}
			});
	});

	it('should return not ok for parameter user_id value not not set', 
		function (done) {
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					user_id=0;
					supertest(app)
					.get('/rfq_general_data/'+' '+'/'+1)
					.set('authentication_token', token)
					.expect(404)
					.end(function (err, res) 
					{
						if(err){
						}
						else{
							res.body.statusCode.should.equal(404);
						}
						done();
					});
				}
		});
	});


	it('should return not ok for parameter user_id not not defined', 
		function (done) {
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var user_id=res.body.data[0].id;
					var token=res.body.authentication_token;
					user_id=0;
					supertest(app)
					.get('/rfq_general_data/ /'+1)
					.set('authentication_token', token)
					.expect(404)
					.end(function (err, res) 
					{
						if(err){
						}
						else{
							res.body.statusCode.should.equal(404);
						}
						done();
					});
				}
			});
	});

	it('should return not ok for user_id invalid', 
		function (done) {
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
					// done();
				}
				else
				{
					var user_id="invalid";
					var token=res.body.authentication_token;
					user_id=0;
					supertest(app)
					.get('/rfq_general_data/'+user_id+'/'+1)
					.set('authentication_token', token)
					.expect(401)
					.end(function (err, res) 
					{
						if(err){
						}
						else{
							res.body.statusCode.should.equal(401);
						}
						done();
					});
				}
			});
	});

	it('should return not ok for paramter rfq_id not defined', 
		function (done) {
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var user_id=res.body.data[0].id;
					var token=res.body.authentication_token;
					user_id=0;
					supertest(app)
					.get('/rfq_general_data/'+user_id+'/')
					.set('authentication_token', token)
					.expect(401)
					.end(function (err, res) 
					{
						if(err){
						}
						else{
							res.body.statusCode.should.equal(401);
						}
						done();
					});
				}
			});
	});


	it('should return not ok for paramter rfq_id value not defined', 
		function (done) {
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var user_id=res.body.data[0].id;
					var token=res.body.authentication_token;
					user_id=0;
					supertest(app)
					.get('/rfq_general_data/'+user_id)
					.set('authentication_token', token)
					.expect(401)
					.end(function (err, res) 
					{
						if(err){
						}
						else{
							res.body.statusCode.should.equal(401);
						}
						done();
					});
				}
			});
	});

	it('should return not ok for paramter rfq_id value defined but invalid', 
		function (done) {
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var user_id=res.body.data[0].id;
					var token=res.body.authentication_token;
					user_id=0;
					supertest(app)
					.get('/rfq_general_data/'+user_id+'/0')
					.set('authentication_token', token)
					.expect(401)
					.end(function (err, res) 
					{
						if(err){
						}
						else{
							res.body.statusCode.should.equal(401);
						}
						done();
					});
				}
			});
		});

});


// another api test for the rfq_general_data_sales_agents


describe('RFQ General Data Get Agents', function () {

	it('should return ok for valid user_id and authentication_token', 
		function (done) {
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var user_id=res.body.data[0].id;
					var token=res.body.authentication_token;
					supertest(app)
					.get('/rfq_general_data_sales_agents/'+user_id+"/"+1)
					.set('authentication_token', token)
					.expect(200)
					.end(function (err, res) 
					{
						res.body.statusCode.should.equal(200);
						done();
					});
				}
			});
		});



	it('should return should not ok parameter authentication_token not defined in header', 
		function (done) {
		supertest(app)
		.post('/login')
		.type('form')
      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
		.end(function (err, res) {
			if(err){
			}
			else
			{
				var user_id=res.body.data[0].id;
				var token=res.body.authentication_token;
				supertest(app)
				.get('/rfq_general_data_sales_agents/'+user_id+"/"+1)
				// .set('authentication_token', token)
				.expect(404)
				.end(function (err, res) 
				{
					res.body.statusCode.should.equal(404);	
					done();
				});
			}
		});
	});

	

	it('should return should not ok parameter authentication_token defined in header but value not set',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var id=res.body.data[0].id;
					supertest(app)
					.get('/rfq_general_data_sales_agents/'+id+"/"+1)
					.set('authentication_token', '')
					.expect(404)
					.end(function (err, res) {						
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter country_id not define',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.get('/rfq_general_data_sales_agents/'+id+"/")
					.set('authentication_token', token)
					.expect(404)
					.end(function (err, res) {						
						res.status.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter country_id define but value not define',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.get('/rfq_general_data_sales_agents/'+id+"/"+" ")
					.set('authentication_token', token)
					.expect(404)
					.end(function (err, res) {
						res.status.should.equal(404);
						done();
					});
				}
			});
	});


	it('should return should not ok parameter user_id not define',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.get('/rfq_general_data_sales_agents//'+1)
					.set('authentication_token', token)
					.expect(404)
					.end(function (err, res) {
						res.status.should.equal(404);
						done();
					});
				}
			});
	});


	it('should return should not ok parameter user_id defin but value not define',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.get('/rfq_general_data_sales_agents/'+""+"/"+1)
					.set('authentication_token', token)
					.expect(404)
					.end(function (err, res) {
						res.status.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter user_id define but value is invalid',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.get('/rfq_general_data_sales_agents/'+"invalid"+"/"+1)
					.set('authentication_token', token)
					.expect(404)
					.end(function (err, res) {
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter token define in header but value is invalid',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.get('/rfq_general_data_sales_agents/'+id+"/"+1)
					.set('authentication_token', 'invalid')
					.expect(404)
					.end(function (err, res) {
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});
});

// another api test for the GET sales persons



describe('RFQ General Data Get Sales Persons', function () {
	var sales_hub_id=1;

	it('should return ok for valid user_id and authentication_token', 
		function (done) {
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var user_id=res.body.data[0].id;
					var token=res.body.authentication_token;
					supertest(app)
					.get('/rfq_general_data_sales_persons/'+user_id+"/"+sales_hub_id)
					.set('authentication_token', token)
					.expect(200)
					.end(function (err, res) 
					{
						res.body.statusCode.should.equal(200);
						done();
					});
				}
			});
		});



	it('should return should not ok parameter authentication_token not defined in header', 
		function (done) {
		supertest(app)
		.post('/login')
		.type('form')
      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
		.end(function (err, res) {
			if(err){
			}
			else
			{
				var user_id=res.body.data[0].id;
				var token=res.body.authentication_token;
				supertest(app)
				.get('/rfq_general_data_sales_persons/'+user_id+"/"+sales_hub_id)
				// .set('authentication_token', token)
				.expect(404)
				.end(function (err, res) 
				{
					res.body.statusCode.should.equal(404);	
					done();
				});
			}
		});
	});

	

	it('should return should not ok parameter authentication_token defined in header but value not set',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var user_id=res.body.data[0].id;
					supertest(app)
					.get('/rfq_general_data_sales_persons/'+user_id+"/"+sales_hub_id)
					.set('authentication_token', '')
					.expect(404)
					.end(function (err, res) {						
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter country_id not define',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.get('/rfq_general_data_sales_persons/'+user_id+"/")
					.set('authentication_token', token)
					.expect(404)
					.end(function (err, res) {						
						res.status.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter country_id define but value not define',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.get('/rfq_general_data_sales_persons/'+user_id+"/"+" ")
					.set('authentication_token', token)
					.expect(404)
					.end(function (err, res) {
						res.status.should.equal(404);
						done();
					});
				}
			});
	});


	it('should return should not ok parameter user_id not define',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.get('/rfq_general_data_sales_persons//'+sales_hub_id)
					.set('authentication_token', token)
					.expect(404)
					.end(function (err, res) {
						res.status.should.equal(404);
						done();
					});
				}
			});
	});


	it('should return should not ok parameter user_id define but value not define',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.get('/rfq_general_data_sales_persons/'+""+"/"+sales_hub_id)
					.set('authentication_token', token)
					.expect(404)
					.end(function (err, res) {
						res.status.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter user_id define but value is invalid',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.get('/rfq_general_data_sales_persons/'+"invalid"+"/"+sales_hub_id)
					.set('authentication_token', token)
					.expect(404)
					.end(function (err, res) {
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter token define in header but value is invalid',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.get('/rfq_general_data_sales_persons/'+user_id+"/"+sales_hub_id)
					.set('authentication_token', 'invalid')
					.expect(404)
					.end(function (err, res) {
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});
});

// another api test for the save New RFQ General Data

describe('Save New RFQ General Data', function () {

	it('should return should not ok parameter authentication_token not defined in header', 
		function (done) {
		supertest(app)
		.post('/login')
		.type('form')
      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
		.end(function (err, res) {
			if(err){
			}
			else
			{
				var user_id=res.body.data[0].id;
				var token=res.body.authentication_token;
				supertest(app)
				.post('/save_rfq_general_data/')
				.type('form')
				// .set('authentication_token', token)
				.field('user_id', user_id)
				.expect(404)
				.end(function (err, res) 
				{
					res.body.statusCode.should.equal(404);	
					done();
				});
			}
		});
	});

	it('should return should not ok parameter authentication_token defined in header but value not set',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var user_id=res.body.data[0].id;
					supertest(app)
					.post('/save_rfq_general_data/')
					.set('authentication_token', '')
					.type('form')
					.field('user_id', user_id)
					.expect(404)
					.end(function (err, res) {						
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter user_id not define',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.post('/save_rfq_general_data/')
					.set('authentication_token', '')
					.expect(404)
					.end(function (err, res) {
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter user_id define but value not define',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.post('/save_rfq_general_data/')
					.set('authentication_token', '')
					.type('form')
					.field('user_id', '')
					.expect(404)
					.end(function (err, res) {
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter user_id invalid',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.post('/save_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('user_id', 'invalid')
					.expect(404)
					.end(function (err, res) {
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter authentication_token define but value invalid',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.post('/save_rfq_general_data/')
					.set('authentication_token', 'invalid')
					.type('form')
					.field('user_id', id)
					.expect(404)
					.end(function (err, res) {
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});


// here

	it('should return should ok parameter save New RFQ with all required field',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.post('/save_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', id)
					.field('probability', 40)

					.expect(200)
					.end(function (err, res) {
						
						res.body.statusCode.should.equal(200);
						done();
					});
				}
			});
	});


	it('should return should not ok parameter required field sales_hub_id value is null',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.post('/save_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('sales_hub_id', '')
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', id)
					.field('probability', 40)

					.expect(404)
					.end(function (err, res) {
						// console.log(res.body);
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter required field sales_hub_id not define',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.post('/save_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					// .field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', id)
					.field('probability', 40)

					.expect(404)
					.end(function (err, res) {
						// console.log(res.body);
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});



	it('should return should not ok parameter required field sales_person_id value is null',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.post('/save_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('sales_hub_id', 1)
					.field('sales_person_id', '')
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', id)
					.field('probability', 40)
					.expect(404)
					.end(function (err, res) {
						// console.log(res.body);
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter required field sales_person_id not define',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.post('/save_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('sales_hub_id', 1)
					// .field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', id)
					.field('probability', 40)

					.expect(404)
					.end(function (err, res) {
						// console.log(res.body);
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});


	it('should return should not ok parameter required field customers_id value is null',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.post('/save_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', '')
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', id)
					.field('probability', 40)

					.expect(404)
					.end(function (err, res) {
						// console.log(res.body);
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter required field customers_id not define',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.post('/save_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					// .field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', id)
					.field('probability', 40)

					.expect(404)
					.end(function (err, res) {
						// console.log(res.body);
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter required field customer_country value is null',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.post('/save_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', '')
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', id)
					.field('probability', 40)

					.expect(404)
					.end(function (err, res) {
						// console.log(res.body);
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter required field customer_country not define',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.post('/save_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', id)
					.field('probability', 40)

					.expect(404)
					.end(function (err, res) {
						// console.log(res.body);
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});
	

	it('should return should not ok parameter required field type_of_quote_id value is null',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.post('/save_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', '')
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', id)
					.field('probability', 40)

					.expect(404)
					.end(function (err, res) {
						// console.log(res.body);
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter required field type_of_quote_id not define',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.post('/save_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					// .field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', id)
					.field('probability', 40)

					.expect(404)
					.end(function (err, res) {
						// console.log(res.body);
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter required field date_rfq_in value is null',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.post('/save_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', id)
					.field('probability', 40)

					.expect(404)
					.end(function (err, res) {
						// console.log(res.body);
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter required field date_rfq_in not define',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.post('/save_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					// .field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', id)
					.field('probability', 40)

					.expect(404)
					.end(function (err, res) {
						// console.log(res.body);
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter required field sales_segments_id value is null',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.post('/save_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('sales_hub_id', '')
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', '')
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', id)
					.field('probability', 40)

					.expect(404)
					.end(function (err, res) {
						// console.log(res.body);
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter required field sales_segments_id not define',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.post('/save_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					// .field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', id)
					.field('probability', 40)

					.expect(404)
					.end(function (err, res) {
						// console.log(res.body);
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});


	it('should return should not ok parameter required field requested_quotation_date value is null',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.post('/save_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '')
					.field('user_id', id)
					.field('probability', 40)

					.expect(404)
					.end(function (err, res) {
						// console.log(res.body);
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter required field requested_quotation_date not define',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.post('/save_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					// .field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', id)
					.field('probability', 40)

					.expect(404)
					.end(function (err, res) {
						// console.log(res.body);
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	
	it('should return should not ok parameter required field probability value is null',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.post('/save_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('sales_hub_id', '')
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', id)
					.field('probability', '')

					.expect(404)
					.end(function (err, res) {
						// console.log(res.body);
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter required field probability not define',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.post('/save_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', id)
					// .field('probability', 40)

					.expect(404)
					.end(function (err, res) {
						// console.log(res.body);
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});


	it('should return should ok save RFQ  all detail with  mandatory Field',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var id=res.body.data[0].id;
					supertest(app)
					.post('/save_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', id)
					.field('probability', 40)
					.field('sales_agents_id', 1)
					.field('project_name', 'Project Name 1')
					.field('installation_country', 2)

					.expect(200)
					.end(function (err, res) {
						// console.log(res.body);
						res.body.statusCode.should.equal(200);
						done();
					});
				}
			});
	});

	

});


// test cases for the update rfq 

describe('Update Partial RFQ General Data', function () {

	it('should return should not ok parameter authentication_token not defined in header', 
		function (done) {
		supertest(app)
		.post('/login')
		.type('form')
      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
		.end(function (err, res) {
			if(err){
			}
			else
			{
				var user_id=res.body.data[0].id;
				var token=res.body.authentication_token;
				supertest(app)
				.put('/update_rfq_general_data/')
				// .set('authentication_token', token)
				.type('form')
					.field('rfq_id', 20)
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', user_id)
					.field('probability', 40)
					.field('sales_agents_id', 1)
					.field('project_name', 'Project Name 1')
					.field('installation_country', 2)
				.expect(404)
				.end(function (err, res) 
				{
					// console.log(res.body);
					res.body.statusCode.should.equal(404);	
					done();
				});
			}
		});
	});

	it('should return should not ok parameter authentication_token defined in header but value not set',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var user_id=res.body.data[0].id;
					supertest(app)
					.put('/update_rfq_general_data/')
					.set('authentication_token', '')
					.type('form')
					.field('rfq_id', 20)
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', user_id)
					.field('probability', 40)
					.field('sales_agents_id', 1)
					.field('project_name', 'Project Name 1')
					.field('installation_country', 2)
					.expect(404)
					.end(function (err, res) {						
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter user_id not define',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.put('/update_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('rfq_id', 20)
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					// .field('user_id', user_id)
					.field('probability', 40)
					.field('sales_agents_id', 1)
					.field('project_name', 'Project Name 1')
					.field('installation_country', 2)
					.expect(404)
					.end(function (err, res) {						
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	
	it('should return should not ok authentication_token invalid provided',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.put('/update_rfq_general_data/')
					.set('authentication_token', "invalid")
					.type('form')
					.field('rfq_id', 20)
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', user_id)
					.field('probability', 40)
					.field('sales_agents_id', 1)
					.field('project_name', 'Project Name 1')
					.field('installation_country', 2)
					.expect(404)
					.end(function (err, res) {						
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter user_id invalid provided',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.put('/update_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('rfq_id', 20)
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', "invalid")
					.field('probability', 40)
					.field('sales_agents_id', 1)
					.field('project_name', 'Project Name 1')
					.field('installation_country', 2)
					.expect(404)
					.end(function (err, res) {						
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});


	it('should return should ok all parameter provided',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.put('/update_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('rfq_id', 20)
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', user_id)
					.field('probability', 40)
					.field('sales_agents_id', 1)
					.field('project_name', 'Project Name 1')
					.field('installation_country', 2)
					.expect(200)
					.end(function (err, res) {						
						res.body.statusCode.should.equal(200);
						done();
					});
				}
			});
	});


	it('should return should not ok parameter user_id define but value not set',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.put('/update_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('rfq_id', 20)
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', '')
					.field('probability', 40)
					.field('sales_agents_id', 1)
					.field('project_name', 'Project Name 1')
					.field('installation_country', 2)
					.expect(404)
					.end(function (err, res) {						
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});


	it('should return should not ok rfq update by who did not create',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.put('/update_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('rfq_id', 1)
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', user_id)
					.field('probability', 40)
					.field('sales_agents_id', 1)
					.field('project_name', 'Project Name 1')
					.field('installation_country', 2)
					.expect(401)
					.end(function (err, res) {	
					// console.log(res.body);					
						res.body.statusCode.should.equal(401);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter sales_hub_id is not defined',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.put('/update_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('rfq_id', 20)
					// .field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', user_id)
					.field('probability', 40)
					.field('sales_agents_id', 1)
					.field('project_name', 'Project Name 1')
					.field('installation_country', 2)
					.expect(404)
					.end(function (err, res) {	
					// console.log(res.body);					
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter sales_hub_id is defined but value is not defined',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.put('/update_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('rfq_id', 20)
					.field('sales_hub_id', '')
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', user_id)
					.field('probability', 40)
					.field('sales_agents_id', 1)
					.field('project_name', 'Project Name 1')
					.field('installation_country', 2)
					.expect(404)
					.end(function (err, res) {	
					// console.log(res.body);					
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});


	it('should return should not ok parameter sales_person_id is not defined',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.put('/update_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('rfq_id', 20)
					.field('sales_hub_id', 1)
					// .field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', user_id)
					.field('probability', 40)
					.field('sales_agents_id', 1)
					.field('project_name', 'Project Name 1')
					.field('installation_country', 2)
					.expect(404)
					.end(function (err, res) {	
					// console.log(res.body);					
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter sales_person_id is defined but value is not defined',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.put('/update_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('rfq_id', 20)
					.field('sales_hub_id', 1)
					.field('sales_person_id', '')
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', user_id)
					.field('probability', 40)
					.field('sales_agents_id', 1)
					.field('project_name', 'Project Name 1')
					.field('installation_country', 2)
					.expect(404)
					.end(function (err, res) {	
					// console.log(res.body);					
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});


	it('should return should not ok parameter customers_id is not defined',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.put('/update_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('rfq_id', 20)
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					// .field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', user_id)
					.field('probability', 40)
					.field('sales_agents_id', 1)
					.field('project_name', 'Project Name 1')
					.field('installation_country', 2)
					.expect(404)
					.end(function (err, res) {	
					// console.log(res.body);					
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter customers_id is defined but value is not defined',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.put('/update_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('rfq_id', 20)
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', '')
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', user_id)
					.field('probability', 40)
					.field('sales_agents_id', 1)
					.field('project_name', 'Project Name 1')
					.field('installation_country', 2)
					.expect(404)
					.end(function (err, res) {	
					// console.log(res.body);					
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});


	it('should return should not ok parameter customer_country is not defined',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.put('/update_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('rfq_id', 20)
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					// .field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', user_id)
					.field('probability', 40)
					.field('sales_agents_id', 1)
					.field('project_name', 'Project Name 1')
					.field('installation_country', 2)
					.expect(404)
					.end(function (err, res) {	
					// console.log(res.body);					
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter customer_country is defined but value is not defined',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.put('/update_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('rfq_id', 20)
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', '')
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', user_id)
					.field('probability', 40)
					.field('sales_agents_id', 1)
					.field('project_name', 'Project Name 1')
					.field('installation_country', 2)
					.expect(404)
					.end(function (err, res) {	
					// console.log(res.body);					
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});


	it('should return should not ok parameter type_of_quote_id is not defined',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.put('/update_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('rfq_id', 20)
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					// .field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', user_id)
					.field('probability', 40)
					.field('sales_agents_id', 1)
					.field('project_name', 'Project Name 1')
					.field('installation_country', 2)
					.expect(404)
					.end(function (err, res) {	
					// console.log(res.body);					
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter type_of_quote_id is defined but value is not defined',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.put('/update_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('rfq_id', 20)
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', '')
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', user_id)
					.field('probability', 40)
					.field('sales_agents_id', 1)
					.field('project_name', 'Project Name 1')
					.field('installation_country', 2)
					.expect(404)
					.end(function (err, res) {	
					// console.log(res.body);					
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter date_rfq_in is not defined',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.put('/update_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('rfq_id', 20)
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					// .field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', user_id)
					.field('probability', 40)
					.field('sales_agents_id', 1)
					.field('project_name', 'Project Name 1')
					.field('installation_country', 2)
					.expect(404)
					.end(function (err, res) {	
					// console.log(res.body);					
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter date_rfq_in is defined but value is not defined',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.put('/update_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('rfq_id', 20)
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', user_id)
					.field('probability', 40)
					.field('sales_agents_id', 1)
					.field('project_name', 'Project Name 1')
					.field('installation_country', 2)
					.expect(404)
					.end(function (err, res) {	
					// console.log(res.body);					
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});


	it('should return should not ok parameter sales_segments_id is not defined',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.put('/update_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('rfq_id', 20)
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					// .field('sales_segments_id', '')
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', user_id)
					.field('probability', 40)
					.field('sales_agents_id', 1)
					.field('project_name', 'Project Name 1')
					.field('installation_country', 2)
					.expect(404)
					.end(function (err, res) {	
					// console.log(res.body);					
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter sales_segments_id is defined but value is not defined',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.put('/update_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('rfq_id', 20)
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', '1')
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', '')
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', user_id)
					.field('probability', 40)
					.field('sales_agents_id', 1)
					.field('project_name', 'Project Name 1')
					.field('installation_country', 2)
					.expect(404)
					.end(function (err, res) {	
					// console.log(res.body);					
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter requested_quotation_date is not defined',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.put('/update_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('rfq_id', 20)
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					// .field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', user_id)
					.field('probability', 40)
					.field('sales_agents_id', 1)
					.field('project_name', 'Project Name 1')
					.field('installation_country', 2)
					.expect(404)
					.end(function (err, res) {	
					// console.log(res.body);					
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter requested_quotation_date is defined but value is not defined',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.put('/update_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('rfq_id', 20)
					.field('sales_hub_id', 1)
					.field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '')
					.field('user_id', user_id)
					.field('probability', 40)
					.field('sales_agents_id', 1)
					.field('project_name', 'Project Name 1')
					.field('installation_country', 2)
					.expect(404)
					.end(function (err, res) {	
					// console.log(res.body);					
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter probability is not defined',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.put('/update_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('rfq_id', 20)
					.field('sales_hub_id', 1)
					// .field('sales_person_id', 10)
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', user_id)
					// .field('probability', 40)
					.field('sales_agents_id', 1)
					.field('project_name', 'Project Name 1')
					.field('installation_country', 2)
					.expect(404)
					.end(function (err, res) {	
					// console.log(res.body);					
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});

	it('should return should not ok parameter probability is defined but value is not defined',
		function (done) 
		{
			supertest(app)
			.post('/login')
			.type('form')
	      	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	     	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
			.end(function (err, res) {
				if(err){
				}
				else
				{
					var token=res.body.authentication_token;
					var user_id=res.body.data[0].id;
					supertest(app)
					.put('/update_rfq_general_data/')
					.set('authentication_token', token)
					.type('form')
					.field('rfq_id', 20)
					.field('sales_hub_id', 1)
					.field('sales_person_id', '')
					.field('customers_id', 1)
					.field('customer_country', 1)
					.field('type_of_quote_id', 1)
					.field('date_rfq_in', '2014-04-30 12:00:00')
					.field('sales_segments_id', 3)
					.field('requested_quotation_date', '2014-04-30 12:00:00')
					.field('user_id', user_id)
					.field('probability', '')
					.field('sales_agents_id', 1)
					.field('project_name', 'Project Name 1')
					.field('installation_country', 2)
					.expect(404)
					.end(function (err, res) {	
					// console.log(res.body);					
						res.body.statusCode.should.equal(404);
						done();
					});
				}
			});
	});



	// it('should return should not ok parameter user_id define but value not define',
	// 	function (done) 
	// 	{
	// 		supertest(app)
	// 		.put('/login')
	// 		.type('form')
	//       	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	//      	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
	// 		.end(function (err, res) {
	// 			if(err){
	// 			}
	// 			else
	// 			{
	// 				var token=res.body.authentication_token;
	// 				var id=res.body.data[0].id;
	// 				supertest(app)
	// 				.post('/update_rfq_general_data/')
	// 				.set('authentication_token', '')
	// 				.type('form')
	// 				.field('rfq_id', 20)
	// 				.field('sales_hub_id', 1)
	// 				.field('sales_person_id', 10)
	// 				.field('customers_id', 1)
	// 				.field('customer_country', 1)
	// 				.field('type_of_quote_id', 1)
	// 				.field('date_rfq_in', '2014-04-30 12:00:00')
	// 				.field('sales_segments_id', 3)
	// 				.field('requested_quotation_date', '2014-04-30 12:00:00')
	// 				.field('user_id', '')
	// 				.field('probability', 40)
	// 				.field('sales_agents_id', 1)
	// 				.field('project_name', 'Project Name 1')
	// 				.field('installation_country', 2)
	// 				.expect(404)
	// 				.end(function (err, res) {
	// 					res.body.statusCode.should.equal(404);
	// 					done();
	// 				});
	// 			}
	// 		});
	// });

	// it('should return should not ok parameter user_id invalid',
	// 	function (done) 
	// 	{
	// 		supertest(app)
	// 		.put('/login')
	// 		.type('form')
	//       	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	//      	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
	// 		.end(function (err, res) {
	// 			if(err){
	// 			}
	// 			else
	// 			{
	// 				var token=res.body.authentication_token;
	// 				var user_id=res.body.data[0].id;
	// 				supertest(app)
	// 				.post('/update_rfq_general_data/')
	// 				.set('authentication_token', token)
	// 				.type('form')
	// 				.field('rfq_id', 20)
	// 				.field('sales_hub_id', 1)
	// 				.field('sales_person_id', 10)
	// 				.field('customers_id', 1)
	// 				.field('customer_country', 1)
	// 				.field('type_of_quote_id', 1)
	// 				.field('date_rfq_in', '2014-04-30 12:00:00')
	// 				.field('sales_segments_id', 3)
	// 				.field('requested_quotation_date', '2014-04-30 12:00:00')
	// 				.field('user_id', 'invalid')
	// 				.field('probability', 40)
	// 				.field('sales_agents_id', 1)
	// 				.field('project_name', 'Project Name 1')
	// 				.field('installation_country', 2)
	// 				.expect(404)
	// 				.end(function (err, res) {
	// 					res.body.statusCode.should.equal(404);
	// 					done();
	// 				});
	// 			}
	// 		});
	// });

	// it('should return should not ok parameter authentication_token define but value invalid',
	// 	function (done) 
	// 	{
	// 		supertest(app)
	// 		.put('/login')
	// 		.type('form')
	//       	.field('email', 'govindaraj.sethuraman@cgglobal.com')
	//      	.field('password', '5e8ff9bf55ba3508199d22e984129be6')
	// 		.end(function (err, res) {
	// 			if(err){
	// 			}
	// 			else
	// 			{
	// 				var token=res.body.authentication_token;
	// 				var id=res.body.data[0].id;
	// 				supertest(app)
	// 				.post('/update_rfq_general_data/')
	// 				.set('authentication_token', 'invalid')
	// 				.type('form')
	// 				.field('user_id', id)
	// 				.expect(404)
	// 				.end(function (err, res) {
	// 					res.body.statusCode.should.equal(404);
	// 					done();
	// 				});
	// 			}
	// 		});
	// });
});
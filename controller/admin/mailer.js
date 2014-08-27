function sendEmail(){
	var nodemailer = require('nodemailer');

	// create reusable transporter object using SMTP transport
	var transporter = nodemailer.createTransport({
	    service: 'Gmail',
	    auth: {
	        user: smtpConfig.email,
	        pass: smtpConfig.password
	    }
	});
	console.log(nodemailer);
	var mailOptions = {
	    from: 'From Admin ✔ <paliwal.ck@gmail.com>', // sender address
	    to: 'paliwal.ck@gmail.com', // list of receivers seprated by comma also
	    subject: 'Hello ✔', // Subject line
	    text: 'Hello world ✔', // plaintext body
	    html: '<b>Hello world ✔</b>' // html body
	};
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	    }else{
	        console.log('Message sent: ' + info.response);
	    }
	    console.log(error);
	    console.log(info);
	});
}
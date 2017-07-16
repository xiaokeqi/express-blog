var express = require('express');
var router = express.Router();
var blogDao = require('../model/blog.js');
router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});
router.get('/getBlog', function(req, res) {
	blogDao.find({}, function(dbres){
		res.send({
			data:dbres,
			status:0,
			message:''
		});
	});

});

router.get('/getContent', function(req, res) {
	blogDao.find({title:req.query.title}, function(dbres){
		res.send({
			data:dbres[0],
			status:0,
			message:''
		});
	});

});

router.post('/addBlog', function(req, res) {
	if(req.sesstion.user){
		blogDao.insert({
			title:req.body.title,
			content:req.body.content
		}, function(){
			res.send({
				data:'',
				status:0,
				message:''
			});
		});
	}else{
		res.redirect('/login');
	}
	
	
});

router.post('/delBlog', function(req, res) {
	if(req.sesstion.user){
		blogDao.delete({
			title:req.body.title,
		}, function(){
			res.send({
				data:'',
				status:0,
				message:''
			});
		});
	}else{
		res.redirect('/login');
	}
	
});

router.post('/editBlog', function(req, res) {
	if(req.sesstion.user){
		blogDao.update({
			title:req.body.title,
		}, {'$set':{'content':req.body.content}},function(){
			res.send({
				data:'',
				status:0,
				message:''
			});
		});
	}else{
		res.redirect('/login');
	}
	
});

router.post('/login', function(req, res){
	let user = {
		username:req.body.username,
		password:req.body.password
	};
	if(user.username =='lidandan' && user.password == '11223344'){
		req.sesstion.user = user;
		res.send({
			data:'',
			status:0,
			message:''
		});
	}
})

module.exports = router;
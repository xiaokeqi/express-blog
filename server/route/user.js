var express = require('express');
var router = express.Router();
var blogDao = require('../model/blog.js');
router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});
router.get('/getBlog', function(req, res) {
	blogDao.find(function(dbres){
		res.send({
			data:dbres,
			status:0,
			message:''
		});
	});

});

router.post('/addBlog', function(req, res) {
	console.log(req.body);	
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
	
});

module.exports = router;
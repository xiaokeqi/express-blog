var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});
// define the home page route
router.get('/getBlog', function(req, res) {
	var blog = {
		"status": 0,
		"message": "dandan",
		"data": [{
			"name": "闭包",
			"generateTime": "20170910",
			"editTime": "20171010"
		}, {
			"name": "原型练",
			"generateTime": "20170910",
			"editTime": "20171010"
		}, {
			"name": "Promise",
			"generateTime": "20170910",
			"editTime": "20171010"
		}, {
			"name": "Canvas动画",
			"generateTime": "20170910",
			"editTime": "20171010"
		}]
	};
	res.send(blog);
});

router.get('/about', function(req, res) {
	res.send('关于');
});

module.exports = router;
var express = require('express');
var app = express();

app.get('*',(req, res) =>{
	res.send('dandan');
});

app.listen(3000,()=>{
	console.log('listen at http://localhost:3000');
})
var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var fs = require('fs');
var url = require('url');

//创建express实例
var app = express();

app.use(express.static(path.resolve('.')));

//index page
app.get('/', function(req, res) {
	res.redirect('/main/index.html');
});

app.get('/main/index.html', function(req, res) {
	var query = url.parse(req.url, true).query;
	if (Object.keys(query).length == 2 && query.code) {
		res.redirect('/main/index.html?code=' + query.code);
	} else {
		res.redirect('/main/index.html')
	}

})

app.listen(process.env.PORT || 3000);

console.log('Listening on 3000');

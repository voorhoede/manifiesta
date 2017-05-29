var express = require( 'express' ) ;
var nunjucks = require( 'nunjucks' ) ;
var path = require("path");
var app = express() ;

app.set('port', (process.env.PORT || 5000));

nunjucks.configure('src', {
    autoescape: true,
    express: app
});

app.use(express.static(__dirname + '/src'));

app.get('*', function(req, res) {
    res.render('index.html');
});

app.listen(app.get('port'), function() {});
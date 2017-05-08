var express = require('express');
var bodyParser = require('body-parser');
var path = require("path");
var app = express();

app.set('port', (process.env.PORT || 5000));
app.set('views', path.join(__dirname, '/src'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/src'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('*', function(req, res) {
    res.render('index.ejs');
});

app.listen(app.get('port'), function() {});

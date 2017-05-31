const express = require('express'),
    nunjucks = require('nunjucks'),
    path = require('path'),
    app = express();

app.set('port', (process.env.PORT || 5000));

nunjucks.configure('src', {
    autoescape: true,
    express: app
});

app.use(express.static(__dirname + '/static'));

app.get('*', function (req, res) {
    res.render('index.html');
});

app.listen(app.get('port'), function () {});
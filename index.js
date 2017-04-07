const cheerio = require('cheerio');
const express = require('express');
const path = require('path');
const rp = require('request-promise');
const URL = require('url').URL;

const app = express();
const config = {
    baseDir: 'src/',
    port: process.env.PORT || 3378
};

/**
 * Pretty URLs:
 * - redirect URLs with pattern `path/to/page/index.html` to `path/to/page/` and maintain search parameters (`?param=value` etc)
 */
app.use('*/index.html', (req, res) => res.redirect(301, `${path.dirname(req.originalUrl)}/${urlParser.parse(req.originalUrl).search}`));

app.use((req, res, next) => { res.removeHeader('X-Powered-By'); next(); });
app.use(express.static(path.join(__dirname, config.baseDir), { lastModified: false }));

app.get('/manifest', (req, res, next) => {
    fetchManifestFromPage(req.query.url)
        .then(manifest => res.json({ data: manifest }))
        .catch(err => res.json({ error: 'Error while fetching manifest' }));
});

app.listen(config.port, (err) => {
    err ? console.error(err) : console.log(`app running on http://localhost:${config.port}`);
});

function fetchManifestFromPage(pageUrl) {
    return rp(pageUrl)
        .then(html => {
            const $ = cheerio.load(html);
            const manifestUrl = $('link[rel="manifest"]').attr('href');
            return (new URL(manifestUrl, pageUrl)).href;
        })
        .then(manifestUrl => rp(manifestUrl))
        .then(data => JSON.parse(data));
}
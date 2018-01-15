const express = require('express');
const path = require('path');
const fetchApi = require('./fetchApi');
const logger = require('./logger');
const port = 9001;

module.exports = function startServer() {

    const app = express();

    app.use(express.static(path.join(__dirname, '../build')));

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../build', 'index.html'));
    });

    app.get('/api/:resource', function (req, res) {
        const { resource } = req.params;
        fetchApi(resource, req.query)
            .then(r => res.json(r));
    });

    logger.info(`listening on port ${port}}`);
    app.listen(port);

    return app;
};

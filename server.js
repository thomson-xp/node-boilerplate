// ========================
// Get the packages we need
// ========================

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const fs = require('fs');

const config = require('dotenv').config();
if (config.error) {
	throw config.error;
}

// const i18n = require('./core/language');
const response = require('./core/response');
// const platforms = require('./core/platforms');
const logger = require('./core/logs');
const cors = require('./core/cors');
const { appModules } = require('./app.module');

// =======================
// Configuration
// =======================

const app = express();

const port = process.env.PORT || 5001;
app.use(helmet());
// app.set(i18n);
app.use(cors);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ limit:'50mb',extended: true }));
app.use(bodyParser.json());
app.use(response);
app.use(logger());

// =======================
// Dynamic route loading
// =======================

if (Array.isArray(appModules)) {
	for (let mod of appModules) {
		let modPath = `./app/${mod}/${mod}.router.js`;

		if (!fs.existsSync(modPath)) {
			throw new Error(`Dependency module ${modPath} not found`);
		}

		let parts = require(modPath);
		let basepath = parts.path || mod;

		app.use(`/${basepath}`, parts.routes());
	}
}


app.get('*', (req, res) => res.status(200).message('GET').return());
app.post('*', (req, res) => res.status(200).message('POST').return());
app.put('*', (req, res) => res.status(200).message('PUT').return());



// =======================
// Start the server
// =======================

app.listen(port, () => console.log(`
===============================================
App is up and running on http://0.0.0.0:${port}
===============================================
`));

module.exports = app;

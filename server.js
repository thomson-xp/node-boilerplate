// ========================
// Get the packages we need
// ========================

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const fs = require('fs');
const http = require('http');
const https = require('https');

const config = require('dotenv').config();
if (config.error) {
	throw config.error;
}

const privateKey = fs.readFileSync('client-key.pem', 'utf8');
const certificate = fs.readFileSync('client-cert.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	passphrase: '9090'
};

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

const HTTPPORT = Number(process.env.PORT) || 5001;
const HTTPSPORT = HTTPPORT + 1;

app.use(helmet());
// app.set(i18n);
app.use(cors);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
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


app.get('*', (req, res) => {
	console.log(req.originalUrl);
	res.status(200).message('GET').return();
});

app.post('*', (req, res) => {
	console.log(req.originalUrl);
	res.status(200).message('POST').return();
});

app.put('*', (req, res) => {
	console.log(req.originalUrl);
	res.status(200).message('PUT').return();
});



// =======================
// Start the server
// =======================

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(HTTPPORT, () => console.log(`
===============================================
HTTP App is up and running on http://0.0.0.0:${HTTPPORT}
===============================================
`));

httpsServer.listen(HTTPSPORT, () => console.log(`
===============================================
HTTPS App is up and running on https://0.0.0.0:${HTTPSPORT}
===============================================
`));

module.exports = app;

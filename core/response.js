const fs = require('fs');
const status = require('./httpstatus');
const GLOBAL = require('../helpers/global.helper');

const response = (req, res, next) => {

	res.message = (text) => {
		if (typeof text === 'string') {
			let messages = {};
			
			let language = req.headers['x-language'] || 'en';
			if(GLOBAL.LANGUAGES.indexOf(language.toLowerCase().trim()) === -1) language = 'en';

			const languageFile = `${__dirname}/../messages/${language.toLowerCase().trim()}.json`;
			if (fs.existsSync(languageFile)) {
				messages = require(languageFile);
			}

			res.responseMessage = messages[text] || text;
		}
		return res;
	};

	res.return = (data) => {
		const message = res.responseMessage || status[res.statusCode];
		res.send({ message, status: res.statusCode, data });
	};
	
	res.error = (error) => {
		const message = res.responseMessage || status[res.statusCode];
		res.send({ message, status: res.statusCode, error });
	};

	next();
};

module.exports = response;
const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url = 'https://api.darksky.net/forecast/3337375d6a3cea3a16cac66c6feb4cf4/' + latitude + ',' + longitude + '?units=si';

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather services!', undefined);
		} else if (body.error) {
			callback('Unable to find location!', undefined);
		} else {
			callback(undefined, body.daily.data[0].summary + ' It is currently ' + Math.round(body.currently.temperature) + '°C out. There is a ' + body.currently.precipProbability + '% chance of rain.');
		};
	});
};

module.exports = forecast;

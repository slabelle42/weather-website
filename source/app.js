const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: "Secret Weather App",
		name: 'me :)'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: "me :)",
		image: '/img/me.jpg'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'me :)',
		text: "Work in progress..."
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
		//return évite de se retrouver avec 2 res.send
		//ce qui entrainerait une erreur
			error: "You must provide an address."
		});
	};

	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
	//attribuer une valeur par défaut à l'objet destructuré permet de s'assurer
	//que le code fonctionne même si l'adresse indiquée est invalide (ex : '!')
		if (error) {
			return res.send({ error });
		};

		forecast(latitude, longitude, (error, data) => {
			if (error) {
				return res.send({ error });
			};

			res.send({
				location,
				forecast: data
			});
		});
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: "me ;)",
		errorMsg: 'Help article not found.'
	})
});

app.get('/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'me :)',
		errorMsg: 'Page not found.'
	})
});

app.listen(3000, () => {
	console.log('Server is up on port 3000.');
});

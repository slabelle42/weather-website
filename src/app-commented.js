const path = require('path');
//simplifie l'utilisation des chemins d'accès
const express = require('express');
//express est une fonction (sans argument), pas un objet

console.log(__dirname); //pour connaître le chemin d'accès du dossier
console.log(__filename); //pour connaître le chemin d'accès du fichier

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
//crée une variable comportant le chemin d'accès pour le dossier public

app.use(express.static(publicDirectoryPath));
//permet d'utiliser le code HTLM situé à l'adresse indiquée par la variable

app.get('', (req, res) => { //req : requête, res : résultat
	res.send('<h1>Weather station</h1>');
});
//permet d'indiquer au serveur ce qu'il faut faire dans une situation donnée
//premier argument : le chemin, l'URL (app.com, app.com/help...)
//second argument : une callback fonction qui décrit l'action à effectuer
//il est possible de passer du code HTML comme ci-dessus

app.get('/help', (req, res) => {
	res.send({
		page: 'Help',
		code: 42
	});
});
//un nouveau app.get() par nouveau chemin
//il est également possible de passer du code json

app.get('/about', (req, res) => {
	res.send('<h1>About page.</h1> Yep.');
});

app.get('/weather', (req, res) => {
	res.send(["Here you'll find the weather.", {
		city: 'Paris',
		forecast: "Rainy, as always"
	}]);
});
//utiliser un tableau pour res.send() plusieurs éléments

app.listen(3000, () => {
	console.log('Server is up on port 3000.');
});
//démarre le serveur 3000, un port en local par défaut

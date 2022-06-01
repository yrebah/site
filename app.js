// Imports
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Static files
app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/mjs', express.static(__dirname + '/public/mjs'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/json', express.static(__dirname + '/public/json'));

// Set Views
app.set('views', './views');
app.set('view engine', 'ejs');

// Data page from main.json
const main_json = fs.readFileSync('./public/json/main.json')
const main_json_parsed = JSON.parse(main_json)

const data_header = main_json_parsed.header
const data_mainMenu = main_json_parsed.mainMenu
const data_socialBar = main_json_parsed.socialBar
const data_footer = main_json_parsed.footer

// page Home
app.get('', (req, res) => {
    res.render('index', {
        title: 'Accueil',
        h1: "Accueil",
        data_header,
        data_mainMenu,
        data_socialBar,
        data_footer
    })
})

// page About
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'A propos',
        h1: "A propos",
        data_header,
        data_mainMenu,
        data_socialBar,
        data_footer
    })
})

// page 404
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Erreur 404'
    })
})

// Listen on port 3000
app.listen(port, () => console.info(`listening on port ${port}`))
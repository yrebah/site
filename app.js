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
app.use('/css', express.static(__dirname + '/public/dist/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/mjs', express.static(__dirname + '/public/mjs'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/svg', express.static(__dirname + '/public/svg'));
app.use('/json', express.static(__dirname + '/public/json'));

// Set Views
app.set('views', './views');
app.set('view engine', 'ejs');

// Data page from main.json
const main_json = fs.readFileSync('./public/json/main.json');
const main_json_parsed = JSON.parse(main_json);

const data_site = main_json_parsed.site
const data_404 = main_json_parsed.page404
const data_header = main_json_parsed.header
const data_mainMenu = main_json_parsed.mainMenu
const data_social = main_json_parsed.social
const data_footer = main_json_parsed.footer
const data_searchBar = main_json_parsed.searchBar

const user = "yoann@gmail.com"
const user_initial = user.substring(0,1)

// page Home
app.get('', (req, res) => {
    res.render('index', {
        title: `${data_site.title} - Accueil`,
        h1: "Accueil",
        data_site,
        data_header,
        data_mainMenu,
        data_social,
        data_footer,
        data_searchBar,
        user,
        user_initial
    })
})

// page About
app.get('/about', (req, res) => {
    res.render('about', {
        title: `${data_site.title} - A propos`,
        h1: "A propos",
        data_site,
        data_header,
        data_mainMenu,
        data_social,
        data_footer,
        data_searchBar,
        user,
        user_initial
    })
})

// page login
app.get('/login', (req, res) => {
    res.render('login', {
        title: `${data_site.title} - Connexion`,
        h1: `Se connecter à ${data_site.title}`,
        data_site
    })
})

// page register
app.get('/register', (req, res) => {
    res.render('register', {
        title: `${data_site.title} - Créer un compte`,
        h1: `Créer un compte sur ${data_site.title}`,
        data_site
    })
})

// page forgot-password
app.get('/forgot-password', (req, res) => {
    res.render('forgot-password', {
        title: `${data_site.title} - Mot de passe oublié`,
        h1: `Renouveler votre mot de passe ${data_site.title}`,
        data_site
    })
})

// page account-details
app.get('/account-details', (req, res) => {
    res.render('account-details', {
        title: `${data_site.title} - Détails du compte`,
        h1: `Détails de votre compte ${data_site.title}`,
        data_site
    })
})

// page 404
app.get('*', (req, res) => {
    res.render('404', {
        title: `${data_site.title} - 404`,
        data_site,
        data_404
    })
})

// Listen on port 3000
app.listen(port, () => console.info(`listening on port ${port}`))
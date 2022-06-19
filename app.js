// Imports
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import fs from 'fs';
import bodyParser from 'body-parser';
import { queries } from "./controller/db.js";
import { tools } from "./controller/tools.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// app use
app.use(bodyParser.urlencoded({ extended: false }))
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

let userName = await queries.USER.GetName('5')
userName = userName[0].name

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
        userName
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
        userName
    })
})

// login
app.get('/login', (req, res) => {
    res.render('login', {
        title: `${data_site.title} - Connexion`,
        h1: `Se connecter à ${data_site.title}`,
        data_site
    })
})

app.post('/login', (req, res) => {

    let data = {
        name: req.body.name,
        password: req.body.password
    }

    if(tools.LoginValidator(data)) {
        console.log('register ok')
    }

})

// register
app.get('/register', (req, res) => {
    res.render('register', {
        title: `${data_site.title} - Créer un compte`,
        h1: `Créer un compte sur ${data_site.title}`,
        data_site
    })
})

app.post('/register', (req, res) => {

    let data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    }

    if(tools.RegisterValidator(data)) {
        console.log('register ok')
    }

})

// forgot-password
app.get('/forgot-password', (req, res) => {

    res.render('forgot-password', {
        title: `${data_site.title} - Mot de passe oublié`,
        h1: `Renouveler votre mot de passe ${data_site.title}`,
        data_site
    })
})

app.post('/forgot-password', (req, res) => {

    let data = {
        email: req.body.email
    }

    if(tools.ForgotPasswordValidator(data)) {
        console.log('register ok')
    }
})

// profile
app.get('/profile', (req, res) => {
    res.render('profile', {
        title: `${data_site.title} - Détails du compte`,
        h1: `Détails de votre compte ${data_site.title}`,
        data_site,
        userName
    })
})

app.post('/profile', (req, res) => {

    let data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    if(tools.ProfileValidator(data)) {
        console.log('register ok')
    }
})

// 404
app.get('*', (req, res) => {
    res.render('404', {
        title: `${data_site.title} - 404`,
        data_site,
        data_404
    })
})

// Listen on port 3000
app.listen(port, () => console.info(`listening on http://localhost:${port}`))
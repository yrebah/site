// Imports
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import session from 'express-session';
import fs from 'fs';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import { signToken, validateToken } from './controller/JWT.js'
import { queries } from "./controller/db.js";
import { tools } from "./controller/tools.js";
import { mainData } from "./controller/mainData.js";
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT;

// app use
app.use(cookieParser());
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

let user_obj = {
    id: null,
    name: null,
    email: null
}

// page Home
app.get('', validateToken, (req, res) => {
    res.render('index', {
        title: `${mainData.data_site.title} - Accueil`,
        h1: "Accueil",
        data_site: mainData.data_site,
        data_header: mainData.data_header,
        data_mainMenu: mainData.data_mainMenu,
        data_social: mainData.data_social,
        data_footer: mainData.data_footer,
        data_searchBar: mainData.data_searchBar,
        user_obj
    })
})

// page About
app.get('/about', (req, res) => {
    res.render('about', {
        title: `${mainData.data_site.title} - A propos`,
        h1: "A propos",
        data_site: mainData.data_site,
        data_header: mainData.data_header,
        data_mainMenu: mainData.data_mainMenu,
        data_social: mainData.data_social,
        data_footer: mainData.data_footer,
        data_searchBar: mainData.data_searchBar,
        user_obj
    })
})

// login
app.get('/login', (req, res) => {
    res.render('login', {
        title: `${mainData.data_site.title} - Connexion`,
        h1: `Se connecter à ${mainData.data_site.title}`,
        data_site: mainData.data_site
    })
})

app.post('/login', async (req, res) => {

    let data = {
        name: !tools.IsEmpty(req.body.name) ? req.body.name : null,
        password: tools.IsPassword(req.body.password) ? req.body.password : null,
        message: ''
    }

    if (!tools.LoginValidator(data)) {
        res.redirect(`/login`)
    } else {
        const user = await queries.USER.GetUserByName(process.env.USERS_TABLE, data.name)

        if (user.length == 0) {
            data.message = 'error'
            const urlParams = btoa(JSON.stringify(data))
            res.redirect(`/login?${urlParams}`)
        } else {
            const password = await queries.USER.GetPasswordByName(process.env.USERS_TABLE, data.name)
            if (password.length == 0) {
                data.message = 'error'
                const urlParams = btoa(JSON.stringify(data))
                res.redirect(`/login?${urlParams}`)
            } else {
                bcrypt.compare(data.password, password[0].password).then((match) => {
                    if (!match) {
                        data.message = 'error'
                        const urlParams = btoa(JSON.stringify(data))
                        res.redirect(`/login?${urlParams}`)
                    } else {
                        const accessToken = signToken(user[0].name, user[0].id)
                        res.cookie('access-token', accessToken, {
                            maxAge: 60*60*24*30*100,
                            httpOnly: true
                        })
                        user_obj = { id: user[0].id, name: user[0].name, email: user[0].email }
                        res.redirect(`/`)
                    }
                })
            }
        }
    }
})

// register
app.get('/register', (req, res) => {
    res.render('register', {
        title: `${mainData.data_site.title} - Créer un compte`,
        h1: `Créer un compte sur ${mainData.data_site.title}`,
        data_site: mainData.data_site
    })
})

app.post('/register', async (req, res) => {

    let data = {
        name: !tools.IsEmpty(req.body.name) ? req.body.name : null,
        email: tools.IsMail(req.body.email) ? req.body.email : null,
        password: tools.IsPassword(req.body.password) ? req.body.password : null,
        confirmPassword: tools.IsSameValue(req.body.password, req.body.confirmPassword) ? req.body.confirmPassword : null
    }

    if (!tools.RegisterValidator(data)) {
        const urlParams = btoa(JSON.stringify(data))
        res.redirect(`/register?${urlParams}`)
    }

    const alreadyRegister = await queries.USER.AlreadyRegister(process.env.USERS_TABLE, req.body.email)

    if (alreadyRegister.length > 0) {
        res.redirect(`/user-already-exist`)
    } else {
        const hashedPassword = await bcrypt.hash(data.password, 10)
        queries.USER.Register(process.env.USERS_TABLE, req.body.name, req.body.email, hashedPassword)
        res.redirect(`/register-success`)
    }
})

// register-success
app.get('/register-success', (req, res) => {
    res.render('register-success', {
        title: `${mainData.data_site.title} - Compte créé avec succès !`,
        h1: `Votre compte ${mainData.data_site.title} a été créé avec succès !`,
        data_site: mainData.data_site
    })
})

// user-already-exist
app.get('/user-already-exist', (req, res) => {
    res.render('user-already-exist', {
        title: `${mainData.data_site.title} - Erreur lors de la création du compte`,
        h1: `L'adresse mail renseignée correpond déjà à un compte ${mainData.data_site.title}`,
        data_site: mainData.data_site
    })
})

// forgot-password
app.get('/forgot-password', (req, res) => {

    res.render('forgot-password', {
        title: `${mainData.data_site.title} - Mot de passe oublié`,
        h1: `Renouveler votre mot de passe ${mainData.data_site.title}`,
        data_site: mainData.data_site
    })
})

app.post('/forgot-password', (req, res) => {

    let data = {
        email: req.body.email
    }

    if (tools.ForgotPasswordValidator(data)) {
        console.log('register ok')
    }
})

// profile
app.get('/profile', validateToken, (req, res) => {
    res.render('profile', {
        title: `${mainData.data_site.title} - Détails du compte`,
        h1: `Détails de votre compte ${mainData.data_site.title}`,
        data_site: mainData.data_site,
        user_obj
    })
})

app.post('/profile', (req, res) => {

    let data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    if (tools.ProfileValidator(data)) {
        console.log('register ok')
    }
})

// 404
app.get('*', (req, res) => {
    res.render('404', {
        title: `${mainData.data_site.title} - 404`,
        data_site: mainData.data_site,
        data_404: mainData.data_404
    })
})

// Listen on port 3000
app.listen(port, () => console.info(`listening on http://localhost:${port}`))
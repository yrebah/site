// Imports
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import SpotifyWebApi from 'spotify-web-api-node';
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
app.use('/class', express.static(__dirname + '/public/class'));
app.use('/controller', express.static(__dirname + '/controller'));
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

// index
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
        data_faq: mainData.data_faq,
        user_obj
    })
})

// -------------------------------------------------------------------------------------------

// settings
app.get('/settings', validateToken, (req, res) => {
    res.render('settings', {
        title: `${mainData.data_site.title} - Paramètres`,
        h1: "Paramètres",
        data_site: mainData.data_site,
        data_settings: mainData.data_settings
    })
})

// -------------------------------------------------------------------------------------------

// about
app.get('/about', validateToken, (req, res) => {
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

// -------------------------------------------------------------------------------------------

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

    if (!tools.LoginValidator(data)) res.redirect(`/login`)
    else {
        const user = await queries.USER.GetUserByName(process.env.USERS_TABLE, data.name)

        if (user.length == 0) {
            data.message = 'error'
            tools.RedirectWithParameters(res, 'login', data)
        } else {
            const password = await queries.USER.GetPasswordByName(process.env.USERS_TABLE, data.name)
            if (password.length == 0) {
                data.message = 'error'
                tools.RedirectWithParameters(res, 'login', data)
            } else {
                bcrypt.compare(data.password, password[0].password).then((match) => {
                    if (!match) {
                        data.message = 'error'
                        tools.RedirectWithParameters(res, 'login', data)
                    } else {
                        const accessToken = signToken(user[0].name, user[0].id)
                        res.cookie('access-token', accessToken, {
                            maxAge: 60 * 60 * 24 * 30 * 100,
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

// -------------------------------------------------------------------------------------------

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

    if (!tools.RegisterValidator(data)) tools.RedirectWithParameters(res, 'register', data)
    else {
        const alreadyRegister = await queries.USER.AlreadyRegister(process.env.USERS_TABLE, req.body.email)

        if (alreadyRegister.length > 0) {
            res.redirect(`/user-already-exist`)
        } else {
            const hashedPassword = await bcrypt.hash(data.password, 10)
            queries.USER.Register(process.env.USERS_TABLE, req.body.name, req.body.email, hashedPassword)
            res.redirect(`/register-success`)
        }
    }
})

// -------------------------------------------------------------------------------------------

// register-success
app.get('/register-success', validateToken, (req, res) => {
    res.render('register-success', {
        title: `${mainData.data_site.title} - Compte créé avec succès !`,
        h1: `Votre compte ${mainData.data_site.title}`,
        h1Subtitle: `a été créé avec succès !`,
        data_site: mainData.data_site
    })
})

// -------------------------------------------------------------------------------------------

// user-already-exist
app.get('/user-already-exist', (req, res) => {
    res.render('user-already-exist', {
        title: `${mainData.data_site.title} - Erreur lors de la création du compte`,
        h1: `L'adresse mail renseignée correpond déjà à un compte ${mainData.data_site.title}`,
        data_site: mainData.data_site
    })
})

// -------------------------------------------------------------------------------------------

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

// -------------------------------------------------------------------------------------------

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

// -------------------------------------------------------------------------------------------

// spotify
app.get('/spotify', validateToken, (req, res) => {
    res.render('spotify', {
        title: `${mainData.data_site.title} - Spotify`,
        data_site: mainData.data_site,
        data_header: mainData.data_header,
        data_mainMenu: mainData.data_mainMenu,
        data_social: mainData.data_social,
        data_footer: mainData.data_footer,
        data_searchBar: mainData.data_searchBar,
        user_obj
    })
})

// const spotifyApi = new SpotifyWebApi({
//     clientId: process.env.SPOTIFY_CLIENT_ID,
//     clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
//     redirectUri: 'http://localhost:3000/'
// })

// const initSpotifyApi = async (callback) => {
//     const access_token = await spotifyApi.clientCredentialsGrant()
//     spotifyApi.setAccessToken(access_token.body.access_token)
//     callback()
// }

// export const spotifyApiTools = {
//     GetArtistAlbums: async (key, callback) => {
//         initSpotifyApi(() => {
//             spotifyApi.getArtistAlbums(key).then((data) => {
//                 callback(data.body)
//             })
//         })
//     },
//     SearchArtists: async (value, callback) => {
//         initSpotifyApi(() => {
//             spotifyApi.searchArtists(value).then((data) => {
//                 callback(data.body)
//             })
//         })
//     },
//     GetListArtistName: async (value, callback) => {
//         initSpotifyApi(() => {
//             spotifyApi.searchArtists(value).then((data) => {
//                 const result = data.body.artists.items
//                 result.forEach((elem) => {
//                     callback(elem.name)
//                 })
//             })
//         })
//     },
//     SearchTracks: async (value, callback) => {
//         initSpotifyApi(() => {
//             spotifyApi.searchTracks(value).then((data) => {
//                 callback(data.body)
//             })
//         })
//     }
// }

// -------------------------------------------------------------------------------------------

// 404

app.get('*', validateToken, (req, res) => {
    res.render('404', {
        title: `${mainData.data_site.title} - 404`,
        data_site: mainData.data_site,
        data_404: mainData.data_404
    })
})

// -------------------------------------------------------------------------------------------

// theme
app.get('/theme', validateToken, (req, res) => {
    res.render('theme', {
        title: `${mainData.data_site.title} - Thème`,
        data_site: mainData.data_site,
        data_theme: mainData.data_theme
    })
})

// -------------------------------------------------------------------------------------------

// Listen on port 3000
app.listen(port, () => console.info(`listening on http://localhost:${port}`))
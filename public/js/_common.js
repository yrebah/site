// _common.js

import { _Loader } from "../class/_loader.js";
import { _Popin } from "../class/_popin.js";
import { _Headband } from "../class/_headband.js";
import { _Fireworks } from "../class/_fireworks.js";
import { _Colors } from "../class/_colors.js";
import { _Charts } from "../class/_charts.js";
import { _Window } from "../class/_window.js";
// import { spotifyApiTools } from "app.js";

// Spotify ----------------------------

// export const Spotify = {
//     GetArtistAlbums: (key, callback) => {
//         const spotify = new _Spotify()
//         spotify.GetArtistAlbums(key, callback)
//     },
//     SearchArtists: (value, callback) => {
//         const spotify = new _Spotify()
//         spotify.SearchArtists(value, callback)
//     },
//     GetListArtistName: (value, callback) => {
//         const spotify = new _Spotify()
//         spotify.GetListArtistName(value, callback)
//     },
//     SearchTracks: (value, callback) => {
//         const spotify = new _Spotify()
//         spotify.SearchTracks(value, callback)
//     }
// }

// Window ----------------------------

export const Window = {
    Append: (id, container, path) => {
        const window = new _Window(id, container, path)
        window.Append()
    },
    Show: (id, container, path) => {
        const window = new _Window(id, container, path)
        window.Show()
    },
    Hide: (id, container, path) => {
        const window = new _Window(id, container, path)
        window.Hide()
    },
    Remove: (id, container, path) => {
        const window = new _Window(id, container, path)
        window.Remove()
    }
}

// Charts ----------------------------

export const Charts = {
    Bar: (id, container, data) => {
        const charts = new _Charts(id, container, data)
        return charts.Bar()
    }
}

// Colors ----------------------------

export const Colors = {
    GetColors: () => {
        const colors = new _Colors()
        return colors.GetColors()
    },
    GetRandomColor: () => {
        const colors = new _Colors()
        return colors.GetRandomColor()
    }
}

// Loader ----------------------------

export const Loader = {
    Show: (id, container) => {
        const loader = new _Loader(id, container)
        loader.Show()
    },
    Hide: (id) => {
        const loader = new _Loader(id)
        loader.Hide()
    }
}

// example :

// Loader.Show('loader', 'body')
// setTimeout(() => {
//     Loader.Hide('#loader')
// }, 2000)

// Popin ----------------------------

export const Popin = {
    Show: (props) => {
        const popin = new _Popin({
            id: props.id,
            title: props.title,
            content: props.content,
            footer: props.footer,
            container: props.container
        })
        popin.ShowPopin()
    }
}

// example :

// Popin.Show({
//     id: "popin",
//     title: "Popin de test",
//     content: "contenu de la popin",
//     footer: "Footer popin",
//     container: "body"
// })

// Notification ----------------------------

export const Notify = async (props) => {

    const createNotif = () => {

        const notification = new Notification(props.title, {
            body: props.message,
            icon: props.icon
        })

        setTimeout(() => {
            notification.close()
        }, 10000)

        if (props.redirect != null) {
            notification.addEventListener('click', () => {
                window.open(props.redirect, '_blank');
            })
        }
    }

    let granted = false

    if (Notification.permission === 'granted') {
        granted = true;
    } else if (Notification.permission !== 'denied') {
        let permission = await Notification.requestPermission();
        granted = permission === 'granted' ? true : false
    }

    if (granted) createNotif()
}

// example :

// Notify({
//     title: "Hello World !",
//     message: "Message de la notification",
//     icon: "",
//     redirect: "/"
// })

// Headband ----------------------------

export const Headband = {
    Show: (id, container, message, type) => {
        const headband = new _Headband(id, container, message, type)
        headband.Show()
    },
    Hide: (id) => {
        const headband = new _Headband(id)
        headband.Hide()
    }
}

// example :

// Headband.Show(
//     'Headband', 
//     'main',
//     'Ceci est un message quelconque',
//     'error'
// )
// setTimeout(() => {
//     Headband.Hide('#Headband')
// }, 2000)

// Fireworks ----------------------------

export const Fireworks = {
    Show: (id, container) => {
        const fireworks = new _Fireworks(id, container)
        fireworks.Show()
    },
    Hide: (id) => {
        const fireworks = new _Fireworks(id)
        fireworks.Hide()
    }
}

// example :

// Fireworks.Show(
//     'Fireworks',
//     'main'
// )
// setTimeout(() => {
//     Fireworks.Hide('#Fireworks')
// }, 2000)
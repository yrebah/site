// _init.js

import { _Theme } from "../class/_theme.js";
import { _Header } from "../class/_header.js";
import { _MainMenu } from "../class/_mainMenu.js";
import { _Loader } from "../class/_loader.js";
import { _SearchBar } from "../class/_searchBar.js";
import { _Popin } from "../class/_popin.js";

const theme = new _Theme('light')
const header = new _Header()
const mainMenu = new _MainMenu()
const searchBar = new _SearchBar()

$(document).ready(() => {

    // Theme
    theme.ApplyTheme()
    theme.SetFunctions()

    // MainMenu
    mainMenu.SetFunctions()

    // Header
    header.SetFunctions()

    // SearchBar
    searchBar.SetFunctions()
})

// Loader ----------------------------

export const Loader = {
    Show: (id, container) => {
        const loader = new _Loader(id, container)
        loader.ShowLoader()
    },
    Hide: (id) => {
        const loader = new _Loader(id)
        loader.HideLoader()
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
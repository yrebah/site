// _init.js

import { Theme } from "../class/_theme.js";
import { Header } from "../class/_header.js";
import { MainMenu } from "../class/_mainMenu.js";
import { Loader } from "../class/_loader.js";
import { SearchBar } from "../class/_searchBar.js";
import { Popin } from "../class/_popin.js";

const theme = new Theme('light')
const header = new Header()
const mainMenu = new MainMenu()
const searchBar = new SearchBar()

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

export const ShowLoader = (id, container) => {
    const loader = new Loader(id, container)
    loader.ShowLoader()
}

export const HideLoader = (id) => {
    const loader = new Loader(id)
    loader.HideLoader()
}

// Popin ----------------------------

export const ShowPopin = (props) => {
    const popin = new Popin({
        id : props.id,
        title : props.title,
        content : props.content,
        footer : props.footer,
        container : container
    })
    popin.ShowPopin()
}

export const HidePopin = (id) => {
    const popin = new Popin(id)
    popin.HidePopin()
}

// Notification ----------------------------

export const ShowNotification = async (props) => {

    const getNotif = () => {

        const notification = new Notification(props.title, {
            body: props.message,
            icon: props.icon
        })

        setTimeout(() => {
            notification.close()
        }, 10000)

        if (redirect != null) {
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

    if (granted) getNotif()
}
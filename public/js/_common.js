// _common.js

import { _Loader } from "../class/_loader.js";
import { _Popin } from "../class/_popin.js";
import { _Headband } from "../class/_headband.js";

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
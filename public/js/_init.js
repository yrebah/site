// _init.js

import { Theme } from "../class/_theme.js";
import { Loader } from "../class/_loader.js";

$(document).ready(() => {
    // Theme
    theme.ApplyTheme()
    set_btnThemeFunctions()
    // MainMenu
    set_btnMainMenuFunctions()
    set_mainMenuFunctions()
    // Header
    set_linkHeaderFunctions()
    // SearchBar
    set_searchBarFunctions()
    set_btnSearchFunctions()
})

// Theme ----------------------------

const theme = new Theme('light')

const set_btnThemeFunctions = () => {
    $('#moon').click(() => {
        theme.SetTheme('dark')
    })
    $('#sun').click(() => {
        theme.SetTheme('light')
    })
}

// Loader ----------------------------

export const ShowLoader = (id, container) => {
    const loader = new Loader(id, container)
    loader.ShowLoader()
}

export const HideLoader = (id) => {
    const loader = new Loader(id)
    loader.HideLoader()
}

// Header ----------------------------

const set_btnMainMenuFunctions = () => {
    $('#btn-main-menu').click(() => {
        open_mainMenu()
    })
}

const set_linkHeaderFunctions = () => {
    let links = document.querySelectorAll('.header .link');
    links.forEach(elem => {
        elem.addEventListener('click', function () {
            links.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

const set_btnSearchFunctions = () => {
    $('#search').click(() => {
        open_mainMenu()
        setTimeout(() => {
            $('#search-bar-input').focus()
        }, 350)
    })
}

// MainMenu ----------------------------

const set_mainMenuFunctions = () => {

    $('#btn-close-main-menu').click(() => {
        close_mainMenu()
    })

    $('.main-menu-outside').click(() => {
        close_mainMenu()
    })

    $('.main-menu-link').click(() => {
        setTimeout(() => {
            close_mainMenu()
        }, 150)
    })

    $('#btn-user').click(() => {
        $(location).prop('href', 'login')
    })

    $('#btn-user-authentified').click(() => {
        console.log('vers détails mon compte')
    })
}

const open_mainMenu = () => {
    $('.main-menu').addClass('active')
    $('.main-menu-outside').addClass('active')
    $('body').css('overflow', 'hidden')
}

const close_mainMenu = () => {
    $('.main-menu').removeClass('active')
    $('.main-menu-outside').removeClass('active')
    $('body').css('overflow', 'auto')
}

// SearchBar ----------------------------

const set_searchBarFunctions = () => {

    $('.search-bar input').focus(() => {
        $('.search-bar').addClass('active')
        $('.main-menu-row').addClass('active')
        $('.search-bar nav').addClass('active')
    })

    $('.search-bar input').blur(() => {
        setTimeout(() => {
            $('.search-bar').removeClass('active')
            $('.main-menu-row').removeClass('active')
            $('.search-bar nav').removeClass('active')
        }, 150)
    })
}

// Popin ----------------------------

const get_popin = (props) => {

    const global =
        `<div class="popin global">
            <div class="popin-wrapper">
                <div class="popin-header">
                    <div class="popin-cross">&times;</div>
                    <h4>${props.title}</h4>
                </div>
                <div class="popin-content slim-scrollbar">${props.content}</div>
                <div class="popin-footer">${props.footer}</div>
            </div>
        </div>`

    const specific =
        `<div class="popin specific">
            <div class="popin-wrapper">
                <div class="popin-header">
                    <div class="popin-cross">&times;</div>
                    <h4>${props.title}</h4>
                </div>
                <div class="popin-content slim-scrollbar">${props.content}</div>
                <div class="popin-footer">${props.footer}</div>
            </div>
        </div>`

    if (props.container == 'body') {
        $('body').append(global)
    } else {
        $(`${props.container}`).append(specific)
    }

    set_popinFunctions()

}

const set_popinFunctions = () => {
    $('.popin, .popin-cross').click(() => {
        $('.popin').remove()
    }).children().click(() => {
        return false
    })
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
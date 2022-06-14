// _init.js

import { Theme } from "../components/_theme.js";

const theme = new Theme('light')

$(document).ready(() => {
    // Theme
    theme.ApplyTheme()
    set_btnThemeFunctions()
    set_btnMainMenuFunctions()
    set_mainMenuFunctions()
    set_linkHeaderFunctions()
    set_searchBarFunctions()
    set_btnSearchFunctions()
    check_userIsAuthentified()
})

// Theme ----------------------------
const set_btnThemeFunctions = () => {
    $('#moon').click(() => {
        theme.SetTheme('dark')
    })
    $('#sun').click(() => {
        theme.SetTheme('light')
    })
}

// LOADER

const get_loader = (id, container) => {

    const global =
        `<div id="${id}" class="loader global">
            <div class="container">
                <div class="circle">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        </div>`

    const specific =
        `<div id="${id}" class="loader specific">
            <div class="container">
                <div class="circle">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        </div>`

    if (container == 'body') {
        $('body').append(global)
    } else {
        $(`${container}`).append(specific)
    }
}

const remove_loader = (id) => {
    $(`${id}`).remove()
}

// --------------------------------------

// HEADER

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

// --------------------------------------

// MAIN MENU

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

const check_userIsAuthentified = () => {
    if(localStorage.getItem('user_authentified') == true) {
        
    } else {

    }
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

// --------------------------------------

// SEARCH BAR

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

// POPIN

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

// --------------------------------------

// NOTIFICATION

const get_notification = async (props) => {

    const showNotification = () => {

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

    if (granted) showNotification()
}
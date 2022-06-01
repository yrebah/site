// _init.js

$(document).ready(() => {

    set_btnThemeFunctions()
    set_btnMainMenuFunctions()
    set_mainMenuFunctions()

    apply_theme()
    set_modalFunctions()
    get_loader('loader', 'body')

    setTimeout(() => {
        remove_loader('#loader')
    }, 3000)

})

// THEME

const apply_theme = () => {
    if (localStorage.getItem('theme') != null) {
        switch (localStorage.getItem('theme')) {
            case 'light':
                $('#moon').show()
                $('#sun').hide()
                $('*').removeClass('dark-mode')
                break;
            case 'dark':
                $('#moon').hide()
                $('#sun').show()
                $('body').addClass('dark-mode')
                break;
        }
    } else {
        set_theme('light')
    }
}

const set_theme = (value) => {
    localStorage.setItem('theme', value)
    apply_theme()
}

// --------------------------------------

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

const set_btnThemeFunctions = () => {
    $('#moon').click(() => {
        set_theme('dark')
    })
    $('#sun').click(() => {
        set_theme('light')
    })
}

const set_btnMainMenuFunctions = () => {
    $('#btn-main-menu').click(() => {
        open_mainMenu()
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
}

const open_mainMenu = () => {
    $('.main-menu').addClass('active')
}

const close_mainMenu = () => {
    $('.main-menu').removeClass('active')
}

// --------------------------------------

// MODAL

const get_modal = (container, title, content, footer) => {
    const global =
        `<div class="modal global active">
            <div class="container">
                <div class="modal-header">${title}</div>
                <div class="modal-content">${content}</div>
                <div class="modal-footer">${footer}</div>
            </div>
        </div>`

    const specific =
        `<div class="modal specific active">
            <div class="container">
                <div class="modal-header">${title}</div>
                <div class="modal-content">${content}</div>
                <div class="modal-footer">${footer}</div>
            </div>
        </div>`

    if (container == 'body') {
        $('body').append(global)
    } else {
        $(`${container}`).append(specific)
    }

    set_modalFunctions()
}

const set_modalFunctions = () => {
    $('.modal').click(() => {
        $('.modal').removeClass('active')
    }).children().click(() => {
        return false
    })
}

// --------------------------------------

// NOTIFICATION

const notification = async (title, message, icon, redirect) => {

    const showNotification = () => {

        const notification = new Notification(title, {
            body: message,
            icon: ""
        })

        setTimeout(() => {
            notification.close()
        }, 10000)

        if (redirect != null) {
            notification.addEventListener('click', () => {
                window.open(redirect, '_blank');
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
// _init.js

$(document).ready(() => {
    apply_theme()
    set_btnThemeFunctions()
    set_btnMainMenuFunctions()
    set_mainMenuFunctions()
    set_linkHeaderFunctions()
    set_searchBarFunctions()
    set_btnSearchFunctions()
})

// THEME

const apply_theme = () => {
    if (localStorage.getItem('theme') != null) {
        switch (localStorage.getItem('theme')) {
            case 'light':
                $('#moon').show()
                $('#sun').hide()
                $('body').removeClass('dark-mode')
                break;
            case 'dark':
                $('#moon').hide()
                $('#sun').show()
                $('body').addClass('dark-mode')
                break;
        }
    } else {
        set_theme('dark')
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

    $('#btn-user-account').click(() => {
        $(location).prop('href', 'my-account')
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

const get_popin = (container, title, content, footer) => {

    const global =
        `<div class="popin global active">
            <div class="popin-wrapper">
                <div class="popin-header">
                    <h4>${title}</h4>
                </div>
                <div class="popin-content slim-scrollbar">${content}</div>
                <div class="popin-footer">${footer}</div>
            </div>
        </div>`

    const specific =
        `<div class="popin specific active">
            <div class="popin-wrapper">
                <div class="popin-header">
                    <h4>${title}</h4>
                </div>
                <div class="popin-content slim-scrollbar">${content}</div>
                <div class="popin-footer">${footer}</div>
            </div>
        </div>`

    if (container == 'body') {
        $('body').append(global)
    } else {
        $(`${container}`).append(specific)
    }

    set_popinFunctions()
}

const set_popinFunctions = () => {

    $('body').css('overflow', 'hidden')

    $('.popin').click(() => {
        $('.popin').removeClass('active')
        setTimeout(() =>{
            $('.popin').remove()
            $('body').css('overflow', 'auto')
        }, 500)
    }).children().click(() => {
        return false
    })
}

// --------------------------------------

// NOTIFICATION

const get_notification = async (title, message, redirect, icon) => {

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
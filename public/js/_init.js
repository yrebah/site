// _init.js

$(document).ready(() => {

    get_header()
    get_mainMenu()
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

const get_header = () => {
    $('#header').append(
        `<section>
            <button id="btn-main-menu" class="btn btn-icon" title="Menu principal">
                <i class="fa-solid fa-bars"></i>
            </button>
        </section>
        <section>
            <ul id="header-list-links"></ul>
        </section>
        <section>
            <button id="sun" class="btn btn-icon" title="Thème Light">
                <i class="fa-solid fa-sun"></i>
            </button>
            <button id="moon" class="btn btn-icon" title="Thème Dark">
                <i class="fa-solid fa-moon"></i>
            </button>
        </section>`
    )

    get_headerLinks()
    set_btnThemeFunctions()
    set_btnMainMenuFunctions()
}

const get_headerLinks = () => {
    $.getJSON('./json/main.json', (data) => {
        data.header.forEach((elem) => {
            $('#header-list-links').append(
                `<li>
                    <div>
                        <a class="header-link" title="${elem.title}" href="${elem.href}" target="${elem.target}">${elem.text}</a>
                    </div>
                </li>`
            )
        })
    });
}

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

const get_mainMenu = () => {
    $('#main-menu').append(
        `<div class="container">
            <div class="main-menu-header">
                <h4>Menu</h4>
                <i class="fa-solid fa-chevron-down"></i>
            </div>
                <div class="main-menu-content">
                    <ul id="main-menu-list"></ul>
                </div>
                <div class="main-menu-footer">
                    <i id="btn-user-account" class="fa-solid fa-circle-user" title="Mon compte"></i>
                    <i id="btn-user-settings" class="fa-solid fa-gear" title="Paramètres"></i>
                </div>
            </div>
        <div class="main-menu-outside"></div>`
    )

    get_mainMenuLinks()
}

const get_mainMenuLinks = () => {
    $.getJSON('./json/main.json', (data) => {
        data.mainMenu.forEach((elem) => {
            $('#main-menu-list').append(
                `<li>
                    <div>
                        <a class="main-menu-link" title="${elem.title}" href="${elem.href}" target="${elem.target}">${elem.text}</a>
                    </div>
                </li>`
            )
        })
        set_mainMenuFunctions()
    })
}

const set_mainMenuFunctions = () => {

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
// _init.js

$(document).ready(() => {
    apply_theme()
    set_btnThemeFunctions()
})

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

const set_btnThemeFunctions = () => {
    $('#moon').click(() => {
        set_theme('dark')
    })
    $('#sun').click(() => {
        set_theme('light')
    })
}

const get_loader = (id, container) => {

    const loaderGlobal = 
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

    const loaderSpecific = 
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

    if(container == 'body') {
        $('body').append(loaderGlobal)
    } else {
        $(`${container}`).append(loaderSpecific)
    }
}

const remove_loader = (id) => {
    $(`${id}`).remove()
}
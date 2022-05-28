// _init.js

$(document).ready(() => {
    set_defaultTheme()
    apply_theme()
    set_btnThemeFunctions()
})

const apply_theme = () => {
    if (localStorage.getItem('theme') != null) {
        switch (localStorage.getItem('theme')) {
            case 'light':
                $('#moon').show()
                $('#sun').hide()
                break;
            case 'dark':
                $('#moon').hide()
                $('#sun').show()
                break;
        }
    }
}

const set_defaultTheme = () => {
    if (localStorage.getItem('theme') == null) {
        set_theme('light')
    }
}

const set_theme = (value) => {
    localStorage.setItem('theme', value)
    apply_theme()
}

const set_btnThemeFunctions = () => {
    $('#moon').click(() =>{
        set_theme('dark')
    })
    $('#sun').click(() =>{
        set_theme('light')
    })
}
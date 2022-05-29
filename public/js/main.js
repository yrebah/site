// main.js

$(document).ready(() => {
    get_loader('loader', 'body')

    setTimeout(() => {
        remove_loader('#loader')
    }, 6000)
})
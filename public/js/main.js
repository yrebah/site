// main.js

// ---- WRITE YOUR FUNCTIONS HERE ----

$(document).ready(() => {
    get_loader('loader', 'body')
    setTimeout(() => {
        remove_loader('#loader')
    }, 1500)
})
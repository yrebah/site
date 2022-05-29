// main.js

$(document).ready(() => {
    console.log('start')

    get_loader('loader', 'body')

    setTimeout(() =>{
        remove_loader('#loader')
    },3000)
})
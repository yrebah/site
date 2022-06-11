// index.js

// ---- WRITE YOUR FUNCTIONS HERE ----

$(document).ready(() => {
    get_loader('loader', 'body')
    setTimeout(() => {
        remove_loader('#loader')
    }, 3000)

    $('#btn-test').click(() =>{
        get_popin(
            'body',
            'Titre du popin de test',
            'Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world ! Contenu du popin... hello world !',
            'footer du popin'
        )
    })
})
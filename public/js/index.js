// index.js

// ---- WRITE YOUR FUNCTIONS HERE ----

$(document).ready(() => {
    
    get_loader('loader', 'body')
    setTimeout(() => {
        remove_loader('#loader')
    }, 3000)

    $('#btn-test').click(() =>{
        get_popin({
            container: 'body',
            title: 'Titre du popin de test',
            content: 'Contenu du popin. Contenu du popin. Contenu du popin. Contenu du popin. Contenu du popin. Contenu du popin. Contenu du popin. ',
            footer: 'Footer du popin'
        })
    })

})
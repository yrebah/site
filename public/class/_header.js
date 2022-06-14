// _header.js

import { MainMenu } from "./_mainMenu.js"
const mainMenu = new MainMenu()

export class Header {

    SetFunctions() {
        this.SetLinkFunctions()
        this.SetBtnSearchFunctions()
        this.SetBtnLogin()
        this.SetBtnUserAuthenticated()
        this.SetBtnMainMenu()
    }

    SetLinkFunctions() {
        let links = document.querySelectorAll('.header-link');
        links.forEach(elem => {
            elem.addEventListener('click', (e) => {
                links.forEach(link => link.classList.remove('active'))
                e.target.classList.add('active')
            })
        })
    }

    SetBtnSearchFunctions() {
        $('#search').click(() => {
            mainMenu.Open()
            setTimeout(() => {
                $('#search-bar-input').focus()
            }, 350)
        })
    }

    SetBtnLogin() {
        $('#btn-login').click(() => {
            $(location).prop('href', 'login')
        })
    }

    SetBtnUserAuthenticated() {
        $('#btn-user-authenticated').click(() => {
            console.log('vers détails mon compte')
        })
    }

    SetBtnMainMenu() {
        $('#btn-main-menu').click(() => {
            mainMenu.Open()
        })
    }
}
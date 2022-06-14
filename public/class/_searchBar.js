// _searchBar.js

import { MainMenu } from "./_mainMenu.js"
const mainMenu = new MainMenu()

export class SearchBar {

    SetFunctions() {
        this.SetFocusBlur()
    }

    SetFocusBlur() {
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
}
// _mainMenu.js

import { _Window } from "./_window.js";

export class _MainMenu {

    SetFunctions() {
        this.SetBtnClose()
        this.SetOutside()
        this.SetLinks()
        this.SetBtnUserSettings()
    }

    SetBtnUserSettings() {
        $('#btn-user-settings').click(() => {
            this.Close()
            const window = new _Window(
                'window-settings', 
                'body',
                '/settings'
            )
            window.Show()
        })
    }

    SetBtnClose() {
        $('#btn-close-main-menu').click(() => {
            this.Close()
        })
    }

    SetOutside() {
        $('.main-menu-outside').click(() => {
            this.Close()
        })
    }

    SetLinks() {
        $('.main-menu-link').click(() => {
            setTimeout(() => {
                this.Close()
            }, 150)
        })
    }

    Open() {
        $('.main-menu').addClass('active')
        $('.main-menu-outside').addClass('active')
        $('body').css('overflow', 'hidden')
    }

    Close() {
        $('.main-menu').removeClass('active')
        $('.main-menu-outside').removeClass('active')
        $('body').css('overflow', 'auto')
    }
}
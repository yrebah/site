// _mainMenu.js

export class _MainMenu {

    SetFunctions() {
        this.SetBtnClose()
        this.SetOutside()
        this.SetLinks()
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
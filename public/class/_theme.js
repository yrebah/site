// _theme.js

export class _Theme {

    constructor(defaultTheme) {
        this.defaultTheme = defaultTheme
    }

    SetFunctions() {
        $('#moon').click(() => {
            this.SetTheme('dark')
        })
        $('#sun').click(() => {
            this.SetTheme('light')
        })
    }

    ApplyTheme() {
        if(this.GetTheme() != null) {
            this.SetThemeBody(this.GetTheme())
            switch (this.GetTheme()) {
                case 'light':
                    this.ShowBtnDarkMode()
                    break;
                case 'dark':
                    this.ShowBtnLightMode()
                    break;
            }

        } else {
            this.SetTheme(this.defaultTheme)
        }
    }

    GetTheme() {
        return localStorage.getItem('theme')
    }

    SetTheme(value) {
        localStorage.setItem('theme', value)
        this.ApplyTheme()
    }

    SetThemeBody(value) {
        $('body').attr('data-theme', value)
    }

    ShowBtnLightMode() {
        $('#moon').hide()
        $('#sun').show()
    }

    ShowBtnDarkMode() {
        $('#moon').show()
        $('#sun').hide()
    }

}
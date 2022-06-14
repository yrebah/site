// _theme.js

export class Theme {

    constructor(defaultTheme) {
        this.defaultTheme = defaultTheme
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
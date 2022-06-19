// _profile.js

export class _Profile {

    SetFunctions() {
        this.TogglePassword()
    }

    TogglePassword() {
        $('#password').focus(() => {
            $('#password').prop("type", "text")
        })
        $('#password').blur(() => {
            $('#password').prop("type", "password")
        })
    }

}
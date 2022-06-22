// _register.js

import { _Headband } from "./_headband.js";

export class _Register {

    SetFunctions() { }

    SetErrorFields(url) {

        const urlParams = url.split("?")[1] ?? null

        if (urlParams == null) return
        else {

            const result = JSON.parse(atob(urlParams))

            $('[name="name"]').val(result.name)
            $('[name="email"]').val(result.email)
            $('[name="password"]').val(result.password)
            $('[name="confirmPassword"]').val(result.confirmPassword)

            if (result.name == null) {
                $('[name="name"]').addClass('input-error')
            }
            if (result.email == null) {
                $('[name="email"]').addClass('input-error')
            }
            if (result.password == null) {
                $('[name="password"]').addClass('input-error')
            }
            if (result.confirmPassword == null) {
                $('[name="confirmPassword"]').addClass('input-error')
            }

            const headband = new _Headband(
                'error-register',
                'main',
                "Veuillez corriger le(s) champs indiqué(s) en rouge",
                'error'
            )

            headband.Show()
        }

    }
}
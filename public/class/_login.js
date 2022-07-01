// _login.js

import { _Headband } from "./_headband.js";

export class _Login {

    SetFunctions() {}

    SetErrorFields(url) {

        const urlParams = url.split("?")[1] ?? null

        if (urlParams == null) return
        else {

            const result = JSON.parse(atob(urlParams))

            $('[name="name"]').val(result.name)
            $('[name="password"]').val(result.password)

            if(result.message == 'error') {
                $('[name="name"]').addClass('input-error')
                $('[name="password"]').addClass('input-error')

                const headband = new _Headband(
                    'error-login',
                    'main',
                    "Identifiant et/ou mot de passe incorrect",
                    'error'
                )
    
                headband.Show()
    
                setTimeout(() => {
                    headband.Hide()
                },5000)
            }
        }

    }

}
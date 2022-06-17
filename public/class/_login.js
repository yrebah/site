// _login.js

import { _Common } from "./_common.js"

const common = new _Common()

export class _Login {

    SetFunctions() {
        this.SetSubmitForm()
    }

    SetSubmitForm() {
        $('#login-form').submit((e)=>{

            e.preventDefault()

            $('#name').removeClass('input-error')
            $('#password').removeClass('input-error')

            if(!common.IsEmpty($('#name').val()) || !common.IsEmpty($('#password').val())) {
                console.log('logged !')
            } else {
                $('#name').addClass('input-error')
                $('#password').addClass('input-error')
            }
        })
    }

}
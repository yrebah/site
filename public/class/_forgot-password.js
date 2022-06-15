// _forgot-password.js

import { _Common } from "./_common.js"

const common = new _Common()

export class _ForgotPassword {

    SetFunctions() {
        this.SetBtnSendMail()
    }

    SetBtnSendMail() {
        $('#btn-send-mail').click(()=>{
            if (common.IsMail($('#mail').val())) {
                $('#mail').removeClass('input-error')
    
                this.CheckExistantMail()
    
            } else {
                $('#mail').addClass('input-error')
            }
        })
    }

    CheckExistantMail() {
        if(true) {
            this.SendMail()
        }
    }

    SendMail() {
        console.log('mail sent to fnoeifn@gmail.com !')
    }

}
// _account-details.js

import { _Common } from "./_common.js"

const common = new _Common()

export class _AccountDetails {

    SetFunctions() {
        this.TogglePassword()
        this.SetBtnAddChanges()
    }

    TogglePassword() {
        $('#password').focus(() => {
            $('#password').prop("type", "text")
        })
        $('#password').blur(() => {
            $('#password').prop("type", "password")
        })
    }

    SetBtnAddChanges() {
        $('#btn-add-changes').click(() => {

            if ($('#identifier').val() && $('#mail').val() && $('#password').val()) {

                if (!common.IsEmpty($('#identifier').val())) {
                    $('#identifier').removeClass('input-error')

                    if (common.IsMail($('#mail').val())) {
                        $('#mail').removeClass('input-error')

                        if (common.IsPassword($('#password').val())) {
                            $('#password').removeClass('input-error')

                            this.AddChanges()

                        } else {
                            $('#password').addClass('input-error')
                        }
                    } else {
                        $('#mail').addClass('input-error')
                    }
                } else {
                    $('#identifier').addClass('input-error')
                }
            } else {
                $('#identifier').addClass('input-error')
                $('#password').addClass('input-error')
                $('#mail').addClass('input-error')
            }
        })
    }

    AddChanges() {
        console.log('Add changes !')
    }

}
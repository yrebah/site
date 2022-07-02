// register-success.js

import { _RegisterSuccess } from "../class/_register-success.js";
import { Fireworks } from '../js/_common.js'

const registerSuccess = new _RegisterSuccess();

$(document).ready(() => {
    registerSuccess.SetFunctions()
    Fireworks.Show('fireworks', 'body')
    $('#span-value-time').html(time_delay)
    set_autoredirect()
})

let time_delay = 6

const set_autoredirect = () => {
    setInterval(() =>{
        time_delay --
        $('#span-value-time').html(time_delay)
        if(time_delay == 0) {
            $(location).prop('href', '/login')
        }
    }, 1000)
}
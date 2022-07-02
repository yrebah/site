// register-success.js

import { _RegisterSuccess } from "../class/_register-success.js";
import { Fireworks } from '../js/_common.js'

const registerSuccess = new _RegisterSuccess();

$(document).ready(() => {
    registerSuccess.SetFunctions()
    Fireworks.Show('fireworks', 'body')
})
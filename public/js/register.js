// register.js

import { _Register } from "../class/_register.js";

const register = new _Register();

$(document).ready(() => {
    register.SetFunctions()
    register.SetErrorFields(window.location.href)
})
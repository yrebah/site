// index.js

import { ShowLoader, HideLoader } from "./_init.js";

$(document).ready(() => {

    ShowLoader('loader', 'body')
    setTimeout(() => {
        HideLoader('#loader')
    },2000)

})
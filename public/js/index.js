// index.js

import { ShowLoader, HideLoader, ShowPopin, HidePopin, ShowNotification } from "./_init.js";

$(document).ready(() => {

    ShowLoader('loader', 'body')
    setTimeout(() => {
        HideLoader('#loader')
    },2000)

})
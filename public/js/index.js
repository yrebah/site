// index.js

import { Loader, Popin, Notify } from "./_common.js";

$(document).ready(() => {

    Loader.Show('loader', 'body')
    setTimeout(() => {
        Loader.Hide('#loader')
    }, 2000)

})
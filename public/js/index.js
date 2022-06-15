// index.js

import { Loader, Popin, Notify } from "./_init.js";

$(document).ready(() => {

    Loader.Show('loader', 'body')
    setTimeout(() => {
        Loader.Hide('#loader')
    }, 2000)

})
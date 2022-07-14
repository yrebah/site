// index.js

import { Loader, Popin, Notify, Headband, Colors, Charts } from "./_common.js";

const data = [
    {
        "value": 220,
        "percent": 54,
        "label": "Coucou",
        "href": "http://www.google.com"
    },
    {
        "value": 140,
        "percent": 44,
        "label": "Coucou"
    },
    {
        "value": 50,
        "percent": 14,
        "label": "Coucou"
    },
    {
        "value": 80,
        "percent": 64,
        "label": "Coucou"
    }
]

$(document).ready(() => {

    Loader.Show('loader', 'body')
    setTimeout(() => {
        Loader.Hide('#loader')
    }, 2000)

    Charts.Bar('charts', '#content-chart', data)

})
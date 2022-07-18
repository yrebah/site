// spotify.js

import { Loader, Popin, Notify, Headband, Colors, Charts } from "./_common.js";
import { _Spotify } from "../class/_spotify.js";

const spotify = new _Spotify()

$(document).ready(() => {
    spotify.SetFunctions()
})
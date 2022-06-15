// theme.js

import { _Theme } from "../class/_theme.js";

const theme = new _Theme('light');

$(document).ready(() => {
    theme.ApplyTheme()
    theme.SetFunctions()
})
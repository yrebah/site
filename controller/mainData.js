import fs from 'fs';

// Data page from main.json
const main_json = fs.readFileSync('./public/json/main.json')
const main_json_parsed = JSON.parse(main_json)

export const mainData = {
    data_site : main_json_parsed.site,
    data_404 : main_json_parsed.page404,
    data_header : main_json_parsed.header,
    data_mainMenu : main_json_parsed.mainMenu,
    data_social : main_json_parsed.social,
    data_footer : main_json_parsed.footer,
    data_searchBar : main_json_parsed.searchBar,
    data_settings : main_json_parsed.settings,
    data_faq : main_json_parsed.faq
}
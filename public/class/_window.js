// _Window.js

export class _Window {

    constructor(id, container, path) {
        this.id = id
        this.container = container
        this.path = path
        this.defaultContainer = 'body'
    }

    SetFunctions() {
        $(`.close-settings`).click(() => {
            this.Hide()
        })
    }

    Component(){

        let html = ''

        if (this.container == this.defaultContainer) {
            html = 
            `<div id="${this.id}" class="window global">
                <div class="header-window">
                    <i class="fa-solid fa-chevron-down close-settings"></i>
                </div>
                <div id="${this.id}-content" class="content slim-scrollbar"></div>
            </div>`
        } else {
            html = 
            `<div id="${this.id}" class="window specific">
                <div class="header-window">
                    <i class="fa-solid fa-chevron-down close-settings"></i>
                </div>
                <div id="${this.id}-content" class="content slim-scrollbar"></div>
            </div>`
        }
        
        return html
    }

    LoadContent() {
        $(`#${this.id}-content`).load(this.path)
    }

    Append() {
        if (this.container == this.defaultContainer) {
            $('body').append(this.Component())
        } else {
            $(this.container).append(this.Component())
        }
        this.LoadContent()
        this.SetFunctions()
    }

    Show() {
        setTimeout(() => {
            $(`#${this.id}`).addClass('active')
        }, 100)
        
    }

    Hide() {
        setTimeout(() => {
            $(`#${this.id}`).removeClass('active')
        }, 100)
    }

    Remove() {
        setTimeout(() => {
            $(`#${this.id}`).remove()
        }, 100)
    }
}
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

    Show() {
        if (this.container == this.defaultContainer) {
            $('body').append(
                `<div id="${this.id}" class="window global">
                    <div class="header-window">
                        <i class="fa-solid fa-chevron-down close-settings"></i>
                    </div>
                    <div id="${this.id}-content" class="content slim-scrollbar"></div>
                </div>`
            )
            $(`#${this.id}-content`).load(this.path)
        } else {
            $(this.container).append(
                `<div id="${this.id}" class="window specific">
                    <div class="header-window">
                        <i class="fa-solid fa-chevron-down close-settings"></i>
                    </div>
                    <div id="${this.id}-content" class="content slim-scrollbar"></div>
                </div>`
            )
            $(`#${this.id}-content`).load(this.path)
        }
        this.SetFunctions()
    }

    Hide() {
        setTimeout(() => {
            $(`#${this.id}`).remove()
        }, 150)
    }
}
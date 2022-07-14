// _Window.js

export class _Window {

    constructor(id, container) {
        this.id = id
        this.container = container
        this.defaultContainer = 'body'
    }

    Show() {
        if (this.container == this.defaultContainer) {
            $('body').append(
                `<div id="${this.id}" class="window global">
                    <div class="header-window">
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                    <div class="content slim-scrollbar"></div>
                </div>`
            )
        } else {
            $(this.container).append(
                `<div id="${this.id}" class="window specific">
                    <div class="header-window">
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                    <div class="content slim-scrollbar"></div>
                </div>`
            )
        }
    }

    Hide() {
        $(`#${this.id}`).remove()
    }
}
// _Fireworks.js

export class _Fireworks {

    constructor(id, container) {
        this.id = id
        this.container = container
        this.defaultContainer = 'body'
    }

    Show() {
        if (this.container == this.defaultContainer) {
            $('body').append(
                `<div id="${this.id}" class="fireworks ${this.type} global">
                    <div class="before"></div>
                    <div class="after"></div>
                </div>`
            )
        } else {
            $(this.container).append(
                `<div id="${this.id}" class="fireworks ${this.type} specific">
                    <div class="before"></div>
                    <div class="after"></div>
                </div>`
            )
        }
    }

    Hide() {
        $(`#${this.id}`).remove()
    }
}
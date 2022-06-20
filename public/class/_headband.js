// _headband.js

export class _Headband {

    constructor(id, container, message, type) {
        this.id = id
        this.container = container
        this.message = message
        this.type = type
        this.defaultContainer = 'body'
    }

    Show() {
        if (this.container == this.defaultContainer) {
            $('body').append(
                `<div id="${this.id}" class="headband ${this.type} global">
                    <div class="message">
                        ${this.message}
                    </div>
                </div>`
            )
        } else {
            $(this.container).append(
                `<div id="${this.id}" class="headband ${this.type} specific">
                    <div class="message">
                        ${this.message}
                    </div>
                </div>`
            )
        }
    }

    Hide() {
        $(this.id).remove()
    }
}
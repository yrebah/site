// _loader.js

export class Loader {

    constructor(id, container) {
        this.id = id
        this.container = container
        this.defaultContainer = 'body'
    }

    ShowLoader() {
        if (this.container == this.defaultContainer) {
            $('body').append(
                `<div id="${this.id}" class="loader global">
                    <div class="container">
                        <div class="circle">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </div>
                    </div>
                </div>`
            )
        } else {
            $(this.container).append(
                `<div id="${this.id}" class="loader specific">
                    <div class="container">
                        <div class="circle">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </div>
                    </div>
                </div>`
            )
        }
    }

    HideLoader() {
        $(this.id).remove()
    }
}
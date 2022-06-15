// _popin.js

export class _Popin {

    constructor(props) {
        this.id = props.id
        this.title = props.title
        this.content = props.content
        this.footer = props.footer
        this.container = props.container
        this.defaultContainer = 'body'
    }

    SetFunctions() {
        this.SetClose()
    }

    SetClose() {
        $('.popin, .popin-cross').click(() => {
            this.HidePopin()
        }).children().click(() => {
            return false
        })
    }

    ShowPopin() {
        if (this.container == this.defaultContainer) {
            $('body').append(
                `<div id="${this.id}" class="popin global">
                    <div class="popin-wrapper">
                        <div class="popin-header">
                            <div class="popin-cross">&times;</div>
                            <h4>${this.title}</h4>
                        </div>
                        <div class="popin-content slim-scrollbar">${this.content}</div>
                        <div class="popin-footer">${this.footer}</div>
                    </div>
                </div>`
            )
        } else {
            $(this.container).append(
                `<div id="${this.id}" class="popin specific">
                    <div class="popin-wrapper">
                        <div class="popin-header">
                            <div class="popin-cross">&times;</div>
                            <h4>${this.title}</h4>
                        </div>
                        <div class="popin-content slim-scrollbar">${this.content}</div>
                        <div class="popin-footer">${this.footer}</div>
                    </div>
                </div>`
            )
        }

        this.SetFunctions()
    }

    HidePopin() {
        $(`#${this.id}`).remove()
    }
}
// _Charts.js

import { _Colors } from "./_colors.js"
const colors = new _Colors()

export class _Charts {

    constructor(id, container, data) {
        this.id = id
        this.container = container
        this.data = data
    }

    Bar() {

        $(`${this.container}`).append(
            `<div class="charts">
                <div id="${this.id}" class="container-chart --bar"></div>
            </div>`
        )

        this.data.forEach((elem) => {

            $(`#${this.id}`).append(
                `<div class="container-bar" title="${elem.percent}%, valeur : ${elem.value}">
                    <div style="height:${elem.percent}%;" class="bar" data-value="${elem.value}" data-percent="${elem.percent}" data-label="${elem.label}">
                        <a class="link-layer" href="${elem.href != null ? elem.href : '#'}" target="_blank"></a>
                        <div class="header-value">${elem.value}</div>
                        <div class="middle-value">${elem.percent}%</div>
                        <div class="footer-value">${elem.label}</div>
                    </div>
                </div>`
            )
        })

        let bars = $('.charts .--bar .container-bar .bar')

        for (var i = 0; i < bars.length; i++) {
            if (bars[i].getAttribute('data-percent')) {
                bars[i].style.height = `${bars[i].getAttribute('data-percent')}%`
                bars[i].style.background = `${colors.GetColors()[i]}`
            }
        }

        const containerBar = document.querySelectorAll('.charts .--bar .container-bar')

        containerBar.forEach((elem)=>{
            elem.addEventListener('mouseenter',(e)=>{
                this.SetLowlight()
                elem.classList.add('highlight')
            })
            elem.addEventListener('mouseleave',(e)=>{
                this.UnsetLowlight()
            })
        })
    }

    SetLowlight() {
        document.querySelectorAll('.charts .--bar .container-bar').forEach((elem)=>{
            elem.classList.add('lowlight')
        })
    }

    UnsetLowlight() {
        document.querySelectorAll('.charts .--bar .container-bar').forEach((elem)=>{
            elem.classList.remove('lowlight')
            elem.classList.remove('highlight')
        })
    }
}
// _settings.js

export class _Settings {

    SetFunctions() {
        this.DefaultLoad()
        this.SetLinks()
        this.SetSelect()
        this.SetDefaultActiveLink()
        this.SetActiveLink()
    }

    Load(container, path) {
        $(container).load(path)
    }

    DefaultLoad(){
        this.Load(
            document.querySelector('.right-side'),
            document.querySelector('.links-settings').getAttribute('data-path')
        )
    }

    SetLinks() {
        document.querySelectorAll('.links-settings').forEach((link) => {
            link.addEventListener('click', (e) => {
                this.Load(
                    document.querySelector('.right-side'),
                    e.target.getAttribute('data-path')
                )
            })
        })
    }

    SetActiveLink() {
        document.querySelectorAll('.links-settings').forEach((link) => {
            link.addEventListener('click', (e) => {
                this.UnsetActiveLink()
                e.target.classList.add('active')
            })
        })
    }

    UnsetActiveLink() {
        document.querySelectorAll('.links-settings').forEach((link) => {
            link.classList.remove('active')
        })
    }

    SetDefaultActiveLink() {
        document.querySelector('.links-settings').classList.add('active')
    }

    SetSelect() {
        document.querySelector('.select-settings').addEventListener('change', (e) => {
            this.Load(
                document.querySelector('.right-side'),
                e.target.selectedOptions[0].getAttribute('data-path')
            )
        })
    }
}
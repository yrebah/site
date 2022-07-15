// _settings.js

export class _Settings {

    SetFunctions() {
        document.querySelectorAll('.links-settings').forEach((link)=>{
            link.addEventListener('click', (e)=>{
                this.Load(
                    document.querySelector('.right-side'),
                    e.target.getAttribute('data-path')
                )
            })
        })
    }

    Load(container, path) {
        $(container).load(path)
    }
}
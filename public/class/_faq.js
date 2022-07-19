// _faq.js

export class _Faq {

    SetFunctions() {
        this.SetToggle()
    }

    SetToggle() {
        document.querySelectorAll('.faq .container').forEach((elem) => {
            elem.addEventListener('click', (e) => {
                if (elem.querySelector('.faq-response').classList.contains('active')) {
                    elem.querySelector('.faq-response').classList.remove('active')
                    elem.querySelector('.faq-question i').classList.remove('active')
                } else {
                    elem.querySelector('.faq-response').classList.add('active')
                    elem.querySelector('.faq-question i').classList.add('active')
                }
            })
        })
    }
}
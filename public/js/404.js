// 404.js

$(document).ready(()=>{
    $('#span-value-time').html(time_delay)
    set_autoredirect()
})

let time_delay = 9

const set_autoredirect = () => {
    setInterval(() =>{
        time_delay --
        $('#span-value-time').html(time_delay)
        if(time_delay == 0) {
            $(location).prop('href', '/')
        }
    }, 1000)
}
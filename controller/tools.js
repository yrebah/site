// common tools
export const tools = {
    IsEmpty: (data) => {
        return data.length == 0
    },
    IsMail: (data) => {
        const regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        return regex.test(data)
    },
    IsTel: (data) => {
        const regex = new RegExp(/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/)
        return regex.test(data)
    },
    IsPassword: (data) => {
        const regex = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/)
        return regex.test(data)
    },
    LoginValidator: (data) => {
        if (data == null) return
        else {
            return data.name != '' && data.password != ''
        }
    },
    RegisterValidator: (data) => {
        if (data == null) return
        if (data.name != '' && data.email != '' && data.password != '' && data.confirmPassword != '') {
            if (tools.IsMail(data.email) && data.password == data.confirmPassword) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    },
    ProfileValidator: (data) => {
        if (data == null) return
        if (data.name != '' && data.email != '' && data.password != '') {
            if (tools.IsMail(data.email) && tools.IsMail(data.password)) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    },
    ForgotPasswordValidator: (data) => {
        if (data == null) return
        if (data.email != '') {
            return tools.IsMail(data.email)
        } else {
            return false
        }
    }
}
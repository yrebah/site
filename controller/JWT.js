import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// create token
export const signToken = (name, id) => {
    const token = jwt.sign({user: name, id: id}, process.env.JWT_SECRET)
    return token
}

// verify token
export const verifyToken = (name, id) => {
    const token = jwt.verify({user: name, id: id}, process.env.JWT_SECRET)
    return token
}

// is authorized by token (middleware)
export const authByToken = (req, res, next) => {

    const { authorization } = req.headers

    if(authorization) {
        const token = authorization.split(' ')[1]
        const result = jwt.verify(token, process.env.JWT_SECRET)

        req.user = result
        next()

    } else {
        res.redirect(`/login`)
    }
}

export const verifyJWT = (req, res, next) => {

    const token = req.headers["x-access-token"]

    if(!token) res.send('Token is null')
    else {
        jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
            if(err) res.json({auth: false, message: 'Auth failed'})
            else {
                req.userId = decoded.id
                next()
            }
        })
    }
}

export const validateToken = (req, res, next) => {

    const accessToken = req.cookies['access-token']

    if(!accessToken) {
        res.redirect(`/login`)
    } else {
        try{
            const valideToken = jwt.verify(accessToken, process.env.JWT_SECRET)
            if(valideToken) {
                req.authenticated = true
                return next()
            }
        } catch(err){
            res.redirect(`/login?${btoa(err)}`)
        }
    }
}
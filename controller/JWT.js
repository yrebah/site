import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const createToken = (name, id) => {
    const accessToken = jwt.sign({user: name, id: id}, process.env.JWT_SECRET)
    return accessToken
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

    const accessToken = req.cookies('access-token')

    if(!accessToken) return res.status(400).json({status: 'user not connected'})

    try{

        const valideToken = jwt.verify(accessToken, process.env.JWT_SECRET)

        if(valideToken) {
            req.authenticated = true
            return next()
        }

    } catch(err){
        console.log(err)
    }
}
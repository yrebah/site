import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const createToken = (name, id) => {
    const accessToken = jwt.sign({user: name, id: id}, process.env.JWT_SECRET)
    return accessToken
}
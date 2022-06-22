import mysql from 'promise-mysql';
import 'dotenv/config';

// database connection
const dbConnection = async () => {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    })
}

// queries
export const queries = {

    COMMON: {
        GetAll: async (table) => {
            const db = await dbConnection()
            const result = await db.query(`SELECT * FROM ${table}`)
            await db.end()
            return result
        },
        GetById: async (table, id) => {
            const db = await dbConnection()
            const result = await db.query(`SELECT * FROM ${table} WHERE id = ${id}`)
            await db.end()
            return result
        },
        GetByIds: async (table, ids) => {
            const db = await dbConnection()
            const result = await db.query(`SELECT * FROM ${table} WHERE id IN (${ids})`)
            await db.end()
            return result
        },
        GetAllContains: async (table, column, content) => {
            const db = await dbConnection()
            const result = await db.query(`SELECT * FROM ${table} WHERE ${column} LIKE '%${content}%'`)
            await db.end()
            return result
        },
        Delete: async (table, id) => {
            const db = await dbConnection()
            db.query(`DELETE FROM ${table} WHERE id = ${id}`)
            await db.end()
        }
    },

    USER: {
        Register: async (name, email, password) => {
            const db = await dbConnection()
            await db.query(`INSERT INTO users_x79 (name, email, password) values ('${name}', '${email}', '${password}')`)
            await db.end()
        },
        AlreadyRegister: async (email) => {
            const db = await dbConnection()
            const result = await db.query(`SELECT * FROM users_x79 WHERE email = '${email}'`)
            await db.end()
            return result
        },
        GetNameById: async(id) => {
            const db = await dbConnection()
            const result = await db.query(`SELECT name FROM users_x79 WHERE id = ${id}`)
            await db.end()
            return result
        },
        GetEmailById: async(id) => {
            const db = await dbConnection()
            const result = await db.query(`SELECT email FROM users_x79 WHERE id = ${id}`)
            await db.end()
            return result
        },
        GetPasswordById: async(id) => {
            const db = await dbConnection()
            const result = await db.query(`SELECT password FROM users_x79 WHERE id = ${id}`)
            await db.end()
            return result
        },
        UpdateNameById: async (name, id) => {
            const db = await dbConnection()
            db.query(`UPDATE users_x79 SET name = '${name}' WHERE id = ${id}`)
            await db.end()
        },
        UpdateEmailById: async (email, id) => {
            const db = await dbConnection()
            db.query(`UPDATE users_x79 SET email = '${email}' WHERE id = '${id}'`)
            await db.end()
        },
        UpdatePasswordById: async (password, id) => {
            const db = await dbConnection()
            db.query(`UPDATE users_x79 SET password = '${password}' WHERE id = ${id}`)
            await db.end()
        }
    }
}
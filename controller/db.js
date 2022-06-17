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
        UpdateName: async (name, id) => {
            const db = await dbConnection()
            db.query(`UPDATE users_x79 SET name = '${name}' WHERE id = ${id}`)
            await db.end()
        },
        UpdateEmail: async (email, id) => {
            const db = await dbConnection()
            db.query(`UPDATE users_x79 SET email = '${email}' WHERE id = '${id}'`)
            await db.end()
        },
        UpdatePassword: async (password, id) => {
            const db = await dbConnection()
            db.query(`UPDATE users_x79 SET password = '${password}' WHERE id = ${id}`)
            await db.end()
        }
    }
}
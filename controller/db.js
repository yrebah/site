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
        Register: async (table, name, email, password) => {
            const db = await dbConnection()
            await db.query(`INSERT INTO ${table} (name, email, password) values ('${name}', '${email}', '${password}')`)
            await db.end()
        },
        AlreadyRegister: async (table, email) => {
            const db = await dbConnection()
            const result = await db.query(`SELECT * FROM ${table} WHERE email = '${email}'`)
            await db.end()
            return result
        },
        GetUserByName: async(table, name) => {
            const db = await dbConnection()
            const result = await db.query(`SELECT * FROM ${table} WHERE name = '${name}'`)
            await db.end()
            return result
        },
        GetNameById: async(table, id) => {
            const db = await dbConnection()
            const result = await db.query(`SELECT name FROM ${table} WHERE id = '${id}'`)
            await db.end()
            return result
        },
        GetEmailById: async(table, id) => {
            const db = await dbConnection()
            const result = await db.query(`SELECT email FROM ${table} WHERE id = '${id}'`)
            await db.end()
            return result
        },
        GetPasswordByName: async(table, name) => {
            const db = await dbConnection()
            const result = await db.query(`SELECT password FROM ${table} WHERE name = '${name}'`)
            await db.end()
            return result
        },
        GetPasswordById: async(table, id) => {
            const db = await dbConnection()
            const result = await db.query(`SELECT password FROM ${table} WHERE id = '${id}'`)
            await db.end()
            return result
        },
        UpdateNameById: async (table, name, id) => {
            const db = await dbConnection()
            db.query(`UPDATE ${table} SET name = '${name}' WHERE id = '${id}'`)
            await db.end()
        },
        UpdateEmailById: async (table, email, id) => {
            const db = await dbConnection()
            db.query(`UPDATE ${table} SET email = '${email}' WHERE id = '${id}'`)
            await db.end()
        },
        UpdatePasswordById: async (table, password, id) => {
            const db = await dbConnection()
            db.query(`UPDATE ${table} SET password = '${password}' WHERE id = '${id}'`)
            await db.end()
        }
    }
}
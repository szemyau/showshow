import { config } from 'dotenv';
import { Client } from 'pg';
import { env } from "./env";

config()

export const client = new Client({
    database: env.DB_NAME,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
})

//add catch error by chloe on 6 Aug 
client.connect().catch(err => {
    console.error('Failed to connect to database: ' + err)
    process.exit(1)
})
import dotenv from 'dotenv'
import populateEnv from 'populate-env'

dotenv.config()

// add port 
export let env = {
  DB_NAME: '',
  DB_USERNAME: '',
  DB_PASSWORD: '',
  PORT: 8000,
}

populateEnv(env, { mode: 'halt' })
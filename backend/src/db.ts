import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = process.env.ENVIROMENT === 'local'
  ? new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT),
  })
  : new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

export default pool;

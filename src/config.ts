import dotenv from 'dotenv'

dotenv.config()
export const db_string : string = process.env.DB_STRING!;
export const jwt_secret : string= process.env.JWT_SECRET!;

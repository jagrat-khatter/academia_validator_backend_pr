import dotenv from 'dotenv'

dotenv.config()
export const db_string : string = process.env.DB_STRING!;
export const jwt_secret : string = process.env.JWT_SECRET!;
export const salt1 : string = process.env.SALT1!;
export const salt2 : string = process.env.SALT2!;

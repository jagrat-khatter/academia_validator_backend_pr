import Router from 'express'
import {cbse_class12_db} from '../db/db';
const router = Router()
import type {Request , Response , NextFunction} from 'express'

router.get('/' ,async (req:Request , res:Response)=>{
    try 
    {
        const body = req.body;
        const marks: Array<{ [key: string]: unknown }> = [];
        

        return res.status(200).json({message : "Succeed"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : "Internal Server error"});
    }
})

//module.exports = { class12_router: router }; or use
export const class12_router = router;
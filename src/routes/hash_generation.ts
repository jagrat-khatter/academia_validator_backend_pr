import Router from 'express'
import {salt1 , salt2} from '../config'
import {blake3} from 'hash-wasm'
const router = Router();

import {Request , Response , NextFunction} from 'express'

router.get('/create' , async (req: Request ,res: Response)=>{
    const currentDate = new Date();
    try 
    {
        const str = req.body.text;
        const num = currentDate.getTime(); // to protect precision

        const numStr = num.toString();
        const finalStr : string = numStr + salt1 + str + salt2;
        const hash = await blake3(finalStr);

        

        return res.status(200).json({hash : hash , originTime : num});
    }
    catch(err){
        return res.status(500).json({message : "Internal Server Error"});
    }

})

export const hash_router = router;
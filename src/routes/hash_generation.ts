import Router from 'express'
import {salt1 , salt2} from '../config'
import {blake3} from 'hash-wasm'
import {hash_DB} from '../db/db'
const router = Router();

import {Request , Response , NextFunction} from 'express'

router.get('/create' , async (req: Request ,res: Response)=>{
    const currentDate = new Date();
    try 
    {
        const str = req.body.string;
        const num = currentDate.getTime(); // to protect precision

        const numStr = num.toString();
        const finalStr : string = numStr + salt1 + str + salt2;
        const hash = await blake3(finalStr);

        
        await hash_DB.create({
            originTime : num ,
            hash : hash
        })
        return res.status(200).json({hash : hash , originTime : num});
    }
    catch(err){
        
        return res.status(500).json({message : "Internal Server Error"});
    }

})

router.post('/test' ,async (req: Request , res: Response)=>{
    try
    {
        const text = req.body.text;
        const hash = req.body.hash;
        const originTime = req.body.originTime;

        console.log(text);

        const numStr = originTime.toString();
        const finalStr : string = numStr + salt1 + text + salt2;
        const hashT = await blake3(finalStr);

        console.log(hashT);
        console.log(hash);
        console.log(originTime);

        if(hashT!=hash) return res.status(200).json({message : "Hash does not match!"});

        const response = await hash_DB.findOne({
            originTime : originTime ,
            hash : hash
        })
        
        
        if(! response) return res.status(200).json({message : "Hash does not match!"});
        else return res.status(200).json({message : "Successfuly verified via Cryptographic hash"});

    }
    catch(err){
        return res.status(500).json({message : "Internal server error"});
    }
})

export const hash_router = router;
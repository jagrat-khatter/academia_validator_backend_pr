import Router from 'express'
import {cbse_class12_db} from '../db/db';
const router = Router()
import type {Request , Response , NextFunction} from 'express'
import isEqual from 'lodash/isEqual'
const func = (x : { [key: string]: string })=>{
    
    return { subjectCode: x["SUB. CODE"] ? x["SUB. CODE"] : undefined,
            subject: x["SUBJECT"] ? x["SUBJECT"] : undefined ,
            theory: x["THEORY"] ? parseInt(x["THEORY"]) : undefined ,
            internal: x["I A/ PR. PR."] ? parseInt(x["I A/ PR. PR."]) : undefined,
            total: x["TOTAL"] ? parseInt(x["TOTAL"]) : undefined,
            totalInWords: x["TOTAL (IN WORDS)"] ? x["TOTAL (IN WORDS)"] : undefined,
            positionalGrade: x["POSITIONAL GRADE"] ? x["POSITIONAL GRADE"] : undefined
     };
}
const func2 = (x: any) => {
    const { _id, ...rest } = x;
    return rest;
};
const removeUndefined = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map(removeUndefined);
    } else if (obj !== null && typeof obj === 'object') {
        return Object.fromEntries(
            Object.entries(obj)
                .filter(([_, v]) => v !== undefined)
                .map(([k, v]) => [k, removeUndefined(v)])
        );
    }
    return obj;
};

router.post('/create' ,async (req:Request , res:Response)=>{
    try 
    {
        const body = req.body;
        let marks: Array<{ [key: string]: unknown }> =req.body.Marks.map(func);
        
        
        const finalBody = {
            certificateNo :  body["Certificate No."] ? body["Certificate No."] : undefined ,
            regNo : body["Regn. No."] ? body["Regn. No."] :  undefined,
            studentName : body["Student's Name"],
            rollNo: body["Roll No."],
            dob : body["Date of Birth"] ? body["Date of Birth"] : undefined,
            fatherGuardianName : body["Father's / Guardian's Name"] ,
            motherName : body["Mother's Name"] ,
            schoolName : body["School Name"] ,
            schoolCode : body["School Code"] ,
            marks : marks,
            dated: body["Dated"] ,
            result : body["Result"] 
        }
        await cbse_class12_db.create(finalBody);

        
        return res.status(200).json(finalBody);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : "Internal Server error"});
    }
})
router.get('/test' ,async (req: Request, res)=>{
    try 
    {
        const body = req.body ;
        let marks: Array<{ [key: string]: unknown }> =req.body.Marks.map(func);
        const rawBody = {
            certificateNo :  body["Certificate No."] ? body["Certificate No."] : undefined ,
            regNo : body["Regn. No."] ? body["Regn. No."] :  undefined,
            studentName : body["Student's Name"],
            rollNo: body["Roll No."],
            dob : body["Date of Birth"] ? body["Date of Birth"] : undefined,
            fatherGuardianName : body["Father's / Guardian's Name"] ,
            motherName : body["Mother's Name"] ,
            schoolName : body["School Name"] ,
            schoolCode : body["School Code"] ,
            marks : marks ,
            dated: body["Dated"] ,
            result : body["Result"] 
        }

        // console.log(rawBody);
        const finalBody = removeUndefined (rawBody);
        console.log(finalBody);
        const response = await cbse_class12_db.findOne({
            rollNo: finalBody.rollNo,
            studentName: finalBody.studentName  
        });

        // marks array should exactly match with 
        if(response) {
            // Convert each subdocument to a plain object and then process with func
            // const response2 = response.toObject();
            const responseMarks = response.marks.map((item: any)=>func2(item.toObject()));
            console.log(responseMarks);
            const areEqual = isEqual(responseMarks , finalBody.marks);
            if(!areEqual) return res.status(200).json({message : "Marks do not match with rollNo and student name"});
            


            if(!!response) return res.status(200).json({message : "Success"});
        }
        else return res.status(200).json({message : "Validation failed"});

    }
    catch(err){
        return res.status(500).json({message : "Internal Server error"});
    }
})


//module.exports = { class12_router: router }; or use
export const class12_router = router;
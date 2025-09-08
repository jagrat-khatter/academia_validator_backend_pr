import Router from 'express'
import {cbse_class12_db} from '../db/db';
const router = Router()
import type {Request , Response , NextFunction} from 'express'
const func = (x : { [key: string]: string })=>{
    
    return { subjectCode: x["SUB. CODE"],
            subject: x["SUBJECT"] ,
            theory: x["THEORY"] ? parseInt(x["THEORY"]) : undefined,
            internal: x["I A/ PR. PR."] ? parseInt(x["I A/ PR. PR."]) : undefined,
            total: x["TOTAL"] ? parseInt(x["TOTAL"]) : undefined,
            totalInWords: x["TOTAL (IN WORDS)"],
            positionalGrade: x["POSITIONAL GRADE"]
     };
}

router.get('/create' ,async (req:Request , res:Response)=>{
    try 
    {
        const body = req.body;
        let marks: Array<{ [key: string]: unknown }> =req.body.Marks.map(func);
        
        
        const finalBody = {
            certificateNo :  body["Certificate No."] || "" ,
            regNo : body["Regn. No."] || "",
            studentName : body["Student's Name"],
            rollNo: body["Roll No."],
            dob : body["Date of Birth"] ,
            fatherGuardianName : body["Father's / Guardian's Name"] ,
            motherName : body["Mother's Name"] ,
            schoolName : body["School Name"] ,
            schoolCode : body["School Code"] ,
            marks : marks,
            dated: body["Dated"] ,
            result : body["Result"] 
        }
        cbse_class12_db.create(finalBody);


        return res.status(200).json();
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : "Internal Server error"});
    }
})


//module.exports = { class12_router: router }; or use
export const class12_router = router;
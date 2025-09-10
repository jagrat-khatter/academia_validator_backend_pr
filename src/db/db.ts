import mongoose from 'mongoose'
import { db_string } from '../config';

mongoose.connect(db_string);
const markSchema = new mongoose.Schema({
    subjectCode: {type: String , required: true},
    subject: {type: String , required: false} ,
    theory: {type: Number , required: false} ,
    internal: {type: Number , required: false} ,
    total: {type: Number , required: false} ,
    totalInWords: {type: String, required: false} ,
    positionalGrade: {type: String , required: false}
})

const schema1 = new mongoose.Schema({
    certificateNo : {type: String , required : false , unique: false } ,
    regNo : {type: String , required: false, unique : false} ,
    studentName : {type : String , required: true , minlength: 1, maxlength: 50} ,
    rollNo: {type : String , required: true , minlength: 1, maxlength : 25} ,
    dob : {type : String , required: false ,maxlength : 10} ,
    fatherGuardianName : {type : String , required: true , minlength: 1, maxlength: 50} ,
    motherName : {type : String , required: true , minlength: 1, maxlength: 50} ,
    schoolName : {type : String , required: true , minlength: 1, maxlength: 120} ,
    schoolCode : {type : String , required: false } ,
    marks : {type : [markSchema] , required: true} ,
    dated: {type : String , required: true , minlength:10 , maxlength : 10} ,
    result : {type: String , required : true , maxlength : 50} 
})


const cbse_class12_db = mongoose.model('cbse_class12' , schema1);

export {cbse_class12_db} ;
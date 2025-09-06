import mongoose from 'mongoose'
import { db_string } from '../config.js';

mongoose.connect(db_string);

const schema1 = new mongoose.Schema({
    document_category : {type: String , required : true , unique: false , trim: true} ,
    document_no : {type: String , required: true , unique : true} ,
    name : {type : String , required: true , minlength: 1, maxlength: 50} ,
    roll_no : {type : String , required: true , minlength: 1, maxlength : 25} ,
    dob : {type : String , required: true , minlength:10 , maxlength : 10} ,
    father_name : {type : String , required: true , minlength: 1, maxlength: 50} ,
    mothers_name : {type : String , required: true , minlength: 1, maxlength: 50} ,
    school_name : {type : String , required: true , minlength: 1, maxlength: 120} ,
    marks : {type : Map, of:Number} ,
    doc_date : {type : String , required: true , minlength:10 , maxlength : 10} ,
    result : {type: String , required : true , maxlength : 20}
})

const cbse_class12 = mongoose.model('cbse_class12' , schema1);

export {cbse_class12} ;
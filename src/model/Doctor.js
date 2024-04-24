import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    field:{
        type:String,
        required:true
    },
    remaining_patient:
    [
        {
            patients_email:{
                type:String
            },
            patients_name:{
                type:String
            }
        }
    ],
    ratings:{
        type:Number,
        default:0
    },
    visited_patients:{
        type:Number,
        default:0
    },
    schedule:[
        {
            day:{
                type:String
            },
            time:{
                type:String
            }
        }
    ]
    
    

})

const doctor = mongoose.models.doctors || mongoose.model("doctors", doctorSchema);

export default doctor;
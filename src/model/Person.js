import mongoose from "mongoose";

const PersonSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    access_token:{
        type:String,
    },
    isDoc:{
        type:Boolean,
        default:false
    }
    

})

const Person = mongoose.models.Persons || mongoose.model("Persons", PersonSchema);

export default Person;
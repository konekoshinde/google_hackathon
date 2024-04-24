import { connect } from "@/dbconfig/dbconfig";
import doctor from "@/model/Doctor";
import axios from "axios";

export const POST=async(req)=>{
    const request=await req.json();
    try{
        connect();
        const specialist=await axios.post('/model',{
            "symptoms":request.symptoms
        })
        
        const Doctor=await doctor.find({field:specialist.data.result});
        return Response.json({"doctor":Doctor,"field":specialist.data.result})
        
    }
    catch(e){
        console.log(e);
    }
    return Response.json("ok")
}
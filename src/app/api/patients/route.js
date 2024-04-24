import { connect } from "@/dbconfig/dbconfig";
import doctor from "@/model/Doctor";

export const POST=async(req)=>{
    const request=await req.json();
    try{
        connect();
        const Doctor=await doctor.findOne({email:request.email});
        if(request.action=="setRatings"){
        
            const new_rating=((( (Doctor.ratings/5)*(Doctor.visited_patients)*5)+request.rate)/((Doctor.visited_patients+1)*5) )*5;


        
            const updatedEmails=Doctor.remaining_patient.filter(i=>i.patients_email!==request.patient_email);
            await doctor.findOneAndUpdate({email:request.email},{$set:{ratings:new_rating,
                visited_patients:Doctor.visited_patients+1,
                remaining_patient:updatedEmails
            }})
            return Response.json("ok")
        }
        else if(request.action=="getPatients"){
            return Response.json(Doctor.remaining_patient)
        }
        else{
            await doctor.findOneAndUpdate({email:request.email},{$push:{remaining_patient:{patients_email:request.patient_email,patients_name:request.patient_name}}})
            return Response.json("ok")
        }
        
    }
    
    
    catch(e){
        console.log(e);
    }
    return Response.json("ok")
}
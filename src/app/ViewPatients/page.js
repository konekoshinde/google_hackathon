'use client';
import React, {useState } from 'react'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';

function Page() {
    const [patient,setPatient]=useState([]);
    const[currpatient,setCurrpatient]=useState("");
    const[rate,setrate]=useState(0);
    const router=useRouter();
    const session=useSession();

    async function getpatient(){
        let result= await axios.post('api/patients',{
            action: "getPatients",
            email:session.data.userdata.email
        });
        // console.log(result)
        setPatient(result.data)

    }

    async function submit(i){
        await axios.post('api/patients',{
            action:"setRatings",
            rate:i,
            email:session.data.userdata.email,
            patient_email: currpatient
        })
        alert("thankyou for response redirecting to the main page")
        router.push('/')
    }
    const number=[1,2,3,4,5]
    return (
        <div className='h-screen text-center p-10 m-10'>
            <button className="px-5 mt-5 text-xl font-thin" onClick={()=>router.push('/')}>Main Page</button>
        

        
            <button onClick={()=>getpatient()} className=' bg-blue-800 text-white font-bold text-2xl p-4 mx-10 hover:rounded-full hover:border-2 hover:border-red-300'
            >GET PATIENTS</button>
            {patient.length>0 && patient.map((i,ind)=>{
                return(
                    <li key={ind} className='hover:font-bold py-1 max-sm:px-2 m-10 text-blue-500 text-lg'>
                        {i.patients_name}
                        <button className=' bg-blue-500 text-white font-bold text-xl p-2 mx-4 hover:rounded-full hover:border-2 hover:border-red-300'
                        onClick={()=>{
                            let ans=prompt("enter email of patient");
                            if(ans===i.patients_email){
                                setrate(true)
                                setCurrpatient(i.patients_email)
                            }else{
                                alert("invalid")
                            }
                        }}>Get Ratings</button>
                    </li>
                )
            })}
            {rate>0 && number.map((i,ind)=>{
                return (
                <li key={ind}>
                    <button onClick={()=>submit(i)} className='bg-blue-200 p-1 my-1 hover:border-4 hover:border-red-200'>{i}</button>
                </li>
                
                )
            })}
        </div>
    )
}

export default Page

'use client';
import { useState } from "react";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const options=['skin',' continuous_sneezing', ' blurred_and_distorted_vision',' cramps', 
              ' pain_during_bowel_movements','shivering','low appetite/weight loss','urine issues',
              ' depression',' stomach_pain', ' acidity',' vomiting',' chest_pain',' yellowish_skin',
              ' passage_of_gases',' indigestion',' high_fever',' irregular_sugar_level',' sunken_eyes',
              ' diarrhoea',' breathlessness',' headache',' nausea',' stiff_neck',' back_pain',' muscle_pain',
              ' neck_pain',' joint_pain',' muscle_weakness',' knee_pain',' lack_of_concentration',' anxiety',
              ' mild_fever',' cough',' obesity',' constipation',' fast_heart_rate']


export default function Home() {
  const [symptoms,setSymptoms]=useState([]);
  const[doc,setDocs]=useState();
  const session=useSession();
  const router=useRouter();
  
  async function submit(){
    const res=await axios.post('/api/getdoc',{
      symptoms: symptoms
    })
    alert('we got your back')
    setDocs(res.data.doctor)
    
  }
  
  async function getAppointment(i){
    await axios.post('/api/patients',{
      "action":"getAppointment",
      "email":i,
      "patient_name":session.data.userdata.name,
      "patient_email":session.data.userdata.email
    })
    alert('booked successfully')
  }
  console.log(session)

  return(
    <div >
      <div className="px-5 mt-5 text-xl font-thin">
        
        {session && session.status ==="authenticated" &&
        <div className=" flex gap-10">
          <div>
          <button className="hover:border-2 border-blue-700 p-1 rounded bg-blue-300  text-white" onClick={()=>router.push('/Register')} >Register</button>
          </div>
        
        { session?.data?.userdata?.isDoc &&
          <button className="hover:border-2 border-blue-700 p-1 rounded bg-blue-500 text-white " onClick={()=>router.push('/ViewPatients')}>View Patients</button>}

        <button onClick={()=>{
          router.push("https://accounts.google.com/Logout");signOut();}}>signout
        </button>
        </div>
        }

        {session && session.status==="unauthenticated" && <div>
        <button className="hover:border-2 border-blue-700 p-1 rounded " onClick={()=>signIn('google')}>Signin</button>
        </div>}


      </div>
      <div className="bg-blue-400 text-8xl text-white font-bold p-20 my-10 flex justify-center max-sm:text-2xl">
        <h1 className="bg-blue-600 p-10">Healthcare for Good 
          <br/>
        Today, Tomorrow. Always</h1>
      </div>

      <div className="p-10 text-blue-600 ">
      <button className=" text-3xl bg-blue-100 hover:border-red-300 hover:border-4 text-blue-700 font-semibold mx-32 " onClick={()=>submit()}>SEARCH FOR DOCTORS</button>
      <br/>
      <br/>
      <div className="flex flex-row justify-between mx-32">


      <div className="flex flex-col">
        {options.map((i,ind)=>{
          return (
            <li key={ind} className="hover:font-bold p-2 ">
              <input id="checkbox" onChange={(e)=>{
                if(e.target.checked){
                  setSymptoms([...symptoms,ind])
                }
                else setSymptoms(s => s.filter(item => item !== ind))
              }} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded focus:ring-blue-500 dark:focus:ring-blue-600
              dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
              
              {i}
            </li>
          )
        })}
      </div>
      <div>
      {doc && doc.map((i,ind)=>{
        return (<li key={ind} className="bg-blue-500 text-white text-xl m-2 p-2">
          email-----{i.email}
          <br/> ratings---{i.ratings} ----- visited patients---{i.visited_patients}
          <br/>
          {i.schedule.map((a,b)=>
          {
            return (
              <div>
                {a.day}-----{a.time}
              </div>
            )
          }
        )}
          <button className="bg-blue-700 text-white font-bold text-xl p-2 mx-4 hover:rounded-full hover:border-2 hover:border-red-300 " onClick={()=>{
            if(session && session.status==="unauthenticated"){
              signIn('google')
            }
            getAppointment(i.email)
          }}>book appointment</button>
        </li>)
      })}
      </div>
      </div>
      </div>
      
      
      </div>
  )
}

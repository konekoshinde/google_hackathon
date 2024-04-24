'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const options=['Allergist','Cardiologist','Common Cold','Dermatologist',
'Endocrinologist','Gastroenterologist','Gynecologist','Neurologist','Osteoarthristis',
'Otolaryngologist','Pediatrician','Phlebologist','Pulmonologist']
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function Register() {
    const [specialisation,setspecialisation]=useState("");
    const [day,setDay]=useState([]);

    const router=useRouter();
    const session=useSession();



    if(session && session.status==="authenticated"){

        async function submit(){
            console.log(specialisation,day)
            if(specialisation && day){
                await session.update({"field":specialisation,"day":day})
                alert("successfully saved the data")
                router.push('/')
            }else{
                alert("please enter complete data")
            }
        }
        return(
            <div>
                <button className="px-5 mt-5 text-xl font-thin" onClick={()=>router.push('/')}>Main Page</button>
                    <h1 className='m-2 flex text-center justify-center bg-blue-600 p-10 max-sm:p-2 text-white font-bold text-5xl max-sm:text-2xl'>select your specialisation</h1>
                    <button onClick={()=>submit()} className=' bg-blue-800 text-white font-bold text-2xl p-4 mx-10 hover:rounded-full hover:border-2 hover:border-red-300'>submit</button>
                        <div className='flex flex-row p-10 mx-10 text-blue-400 text-xl gap-x-32 hover:cursor-pointer'>
                    <br/>
                    <br/>
                    <div className='flex flex-col'>

                    {options.map((i,ind)=>{
                        return (
                            <li key={ind} className='hover:font-bold py-1 max-sm:px-2'>
                                <input id="default-radio-1"
                                onChange={(e)=>{
                                    if(e.target.checked){
                                        setspecialisation(ind)
                                    }
                                }} type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                {i}
                            </li>
                        )
                    })}
                
                    </div>
                    <div className='flex flex-col'>

                    {weekdays.map((i,ind)=>{
                        return (
                            <li key={ind} className='hover:font-bold flex justify-between '>

                                <input id="checkbox" onChange={(e)=>{
                                    if(e.target.checked)setDay([...day,{"day":i,"time":"10:00:00"}]);
                                    else setDay(day => day.filter(item => item.day !== i))
                                    
                                }} type="checkbox" value="" className="w-4 h-4 mx-10 text-blue-600 bg-gray-100 rounded focus:ring-blue-500 dark:focus:ring-blue-600
                                dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                               {i}
                               
                               <input type="time" className='border-black border-2 mx-10' id="appt" defaultValue="10:00:00"  onChange={(e)=> 
                               setDay(day.map(item =>
                                item.day === i? { ...day, time:e.target.value } : item
                            ))}/>

                            </li>
                        )
                    })}
                </div>
                </div>
                

                
            </div>
        )

    }
    
}



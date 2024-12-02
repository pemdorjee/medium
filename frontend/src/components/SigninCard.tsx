

import {  SigninInput } from '@pemdorjee11/medium-common';
import  { ChangeEvent, useState } from 'react'
import axios from 'axios';
import AuthHeader from './AuthHeader';
import { BACKEND_URL } from '../config';
import {  useNavigate } from 'react-router-dom';


function SigninCard() {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SigninInput>({
        
        email: "",
        password: ""
    })
    async function sendRequest () {
     try{
        
        const response = await axios.post (`${BACKEND_URL}/api/v1/user/signin`, postInputs)
        const jwt = response.data;
        localStorage.setItem("token", jwt);
        navigate('/blogs')
     }catch(error){
        alert ("user does not exist")
     }
    }
  return (
    <div className=' h-screen flex justify-center flex-col'>
        <div className='flex justify-center'>
           <div className='max-w-xl flex flex-col justify-center'>
                <AuthHeader type="signin"/>
                <div className='flex justify-between flex-col' >

                 
                    <LabelledInput label='Email' placeholder='Your email' onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }} />
                    <LabelledInput label='Password' type="password" placeholder='Your password' onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                    <button type="button" onClick={sendRequest} className=" mt-8 text-white  hover:bg-gray-900 flex 
                    justify-center focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg
                     text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
                      dark:focus:ring-gray-700 dark:border-gray-700">Login</button>
                
                </div>
           </div>


        </div>
        
    </div>
  )
}

interface LabelledInputTypes {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type? : string
}
function LabelledInput ({ label, placeholder , onChange, type}: LabelledInputTypes){
    return <div>
    <label  className="block mb-2 text-md  font-semibold text-gray-900 pt-2 "> {label}</label>
    <input onChange= {onChange} type={type || "text"}  id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 " placeholder={placeholder} required />
</div>

}


export default SigninCard
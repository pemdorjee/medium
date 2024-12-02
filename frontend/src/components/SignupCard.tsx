

import {  SignupInput } from '@pemdorjee11/medium-common';
import  { ChangeEvent, useState } from 'react'

import AuthHeader from './AuthHeader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';

function SignupCard() {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })
    async function sendRequest () {
        try{
            console.log("hello from sendrequest")
            console.log(postInputs)
            const response = await axios.post (`${BACKEND_URL}/api/v1/user/signup`,postInputs)
            console.log(axios.defaults.baseURL);
            const jwt = response.data;
            console.log(jwt)
            localStorage.setItem("token", jwt);
            navigate('/blogs')
        }catch(error){
           alert("invalid inputs")
        }
    }
  return (
    <div className=' h-screen flex justify-center flex-col'>
        <div className='flex justify-center'>
           <div className='max-w-xl flex flex-col justify-center'>
               <AuthHeader type="signup"/>
                <div className='flex justify-between flex-col' >

                  <LabelledInput label='Name' placeholder='John Sharma' onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} />   
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
                    <button type="submit" onClick={sendRequest} className=" mt-8 text-white  hover:bg-gray-900 
                    flex justify-center focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium 
                    rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
                     dark:focus:ring-gray-700 dark:border-gray-700">Signup</button>
                
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
    <label  className="block mb-2 text-md font-semibold text-gray-900 pt-2 "> {label}</label>
    <input onChange= {onChange} type={type || "text"}   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 " placeholder={placeholder} required />
</div>

}

export default SignupCard
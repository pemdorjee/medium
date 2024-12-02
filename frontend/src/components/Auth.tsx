

// import {  SignupInput } from '@pemdorjee11/medium-common';
// import  { ChangeEvent, useState } from 'react'

// import AuthHeader from './AuthHeader';
import SigninCard from './SigninCard';
import SignupCard from './SignupCard';

function Auth({type} : {type: "signup" | "signin"}) {
    
  return <div>
    {type ==="signin" ? <SigninCard/> : <SignupCard/>}
  </div>
    
 
}

export default Auth
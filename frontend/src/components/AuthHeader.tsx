
import { Link } from 'react-router-dom'

function AuthHeader({type}: {type: "signin" | "signup"}) {
  return (<div>
    <div className='px-10 pb-10'>
    <div className='text-3xl font-extrabold '>
            Create an account
        </div>
    <div className='text-slate-500'>
       {type === "signin"? "Don't have an account ? " : "Already have an account ? " } 
        <Link className='pl-2' to={type === "signin"? "/signup" : "/signin"}>{type == "signin" ? "Signup" : "Login"}</Link>
    </div>
    </div>
    </div>
  )
}

export default AuthHeader
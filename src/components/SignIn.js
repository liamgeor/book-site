import React, {useState} from 'react';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


export default function SignIn() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

 const onChange = (e) =>{
   setFormData((prevState) =>({
      ...prevState,
      [e.target.id]: e.target.value
   }))
 }

 const {email, password} = formData;

 const onSubmit = async(e) =>{
   e.preventDefault();

   try {
    const auth = getAuth();

    const userCredentials = await signInWithEmailAndPassword(auth, email, password)
 
    if(userCredentials.user){
      navigate('/')
    }
   } catch (error) {
     console.log(error);
   }
 }

  return(
    <div>Sign In
      <form onSubmit={onSubmit}>
      <div className="flex flex-col p-2 w-60">
          <input className="m-2 shadow  rounded p-1" type="email" placeholder="email" onChange={onChange} id='email' value={email}/>
          <input className="m-2 shadow  rounded p-1" type={showPassword ? 'text' : 'password'} value={password} onChange={onChange} id="password" placeholder='password' />
          <div className='flex flex-row justify-between'>
            <button type="button" className="m-2 shadow  rounded p-1" onClick={() => setShowPassword((prevState) => !prevState)}>Show Password</button>
            <button className="m-2 p-2 shadow  rounded p-1">Sign In</button>
          </div>
        </div>
      </form>
    </div>
  )
}

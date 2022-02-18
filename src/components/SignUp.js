import React, {useState} from 'react';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {db} from '../firebase.config'
import {doc, setDoc, serverTimestamp} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'

export default function SignUp() {
  const [formData, setFormData] = useState({
    admin: false,
    current_book: '',
    email: '',
    email_verified: 'false',
    first_name: '',
    followers: [],
    following: [],
    last_name: '',
    lists: [],
    profile_pic: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false);  

 const onChange = (e) =>{
   setFormData((prevState) =>({
      ...prevState,
      [e.target.id]: e.target.value
   }))
 }

 const navigate = useNavigate();

 const {email, password, first_name, last_name} = formData;

 const onSubmit = async(e) =>{
   e.preventDefault();

   try{
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayfirst_name: first_name,
      })


      const formDataCopy = {...formData}

      delete formDataCopy.password

      formDataCopy.create_date = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
   }catch(error){
    console.log(error)
   }
 }


  return(
    <div >Sign Up
      <form onSubmit={onSubmit}>
        <div className="flex flex-col p-2 w-60">
          <input className="m-2 shadow  rounded p-1" type="first_name" placeholder="First Name" onChange={onChange} id='first_name' value={first_name}/>
          <input className="m-2 shadow  rounded p-1" type="last_name" placeholder="Last Name" onChange={onChange} id='last_name' value={last_name}/>
          <input className="m-2 shadow  rounded p-1" type="email" placeholder="email" onChange={onChange} id='email' value={email}/>
          <input className="m-2 shadow  rounded p-1" type={showPassword ? 'text' : 'password'} value={password} onChange={onChange} id="password" placeholder='password' />
          <div className='flex flex-row justify-between'>
            <button type="button" className="m-2 shadow  rounded p-1" onClick={() => setShowPassword((prevState) => !prevState)}>Show Password</button>
            <button className="m-2 p-2 shadow  rounded p-1">Sign Up</button>
          </div>
        </div>
        
      </form>
    </div>
  )
}

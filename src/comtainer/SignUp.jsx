import React, { useState } from 'react'
import { Logo } from '../assets'
import {UserAuthInput} from '../components'
import { FaEnvelope, FaGit, FaGithub } from 'react-icons/fa'
import { MdPassword } from 'react-icons/md'
import { AnimatePresence, motion } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc'
import { signINWithGithub, signINWithGoogle, signInWithGoogle } from '../utils/helpers'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase.config'
import { fadeInOut } from '../animations'
import { GoogleSignIn } from '../utils/helpers'

const SignUp = () => {

  // for passing email and password props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [getEmailValidationStatus, setGetEmailValidationStatus] = useState(false)

  // to change login signup button accordingly
  const [isLogin, setIsLogin] = useState(false)

  // for handeling alert message
  const [alert, setAlert] = useState(false)

  // to show the alert message
  const [alertMsg, setalertMsg] = useState('')
  
  // this function is for action for email validation status

  // The createNewUser function is responsible for creating a new user account using Firebase Authentication's createUserWithEmailAndPassword method. It ensures that the email provided has passed validation checks before attempting to create the account. If successful, it logs the user credentials to the console; otherwise, it logs any errors encountered during the process.


  const createNewUser = async() => {
    if(getEmailValidationStatus){
      await createUserWithEmailAndPassword(auth,email,password).then
      // then got a promise with user credential

      // if got usercredential
      // on auth state change will be triggered -> ince authenticated user will be navigated to the needed screen
      (userCred => {
        console.log(userCred);
      }).catch((err)=>console.log(err))
    }
  }

  const loginWithEmailPassword = async() => {
    // if true
    if(getEmailValidationStatus)
      {
        await signInWithEmailAndPassword(auth,email,password).then
        (userCred => {
          if(userCred){
            console.log(userCred);
          }
          // we need to use this message as alert message if user does not exist and trying to login
        }).catch((err)=>{console.log(err.message)
        if(err.message.includes('invalid-credential')){
          setAlert(true)
          setalertMsg('User not found')
        }

        setInterval(()=>{
          setAlert(false)
        },4000)
      })
      }
  }

  return (
    <div
    className=' w-full py-6'
    >
      {/* Logo Div */}
      <img
      className=' object-contain w-32 opacity-50 h-auto'
       src={Logo} alt="" />

       {/* Heading div */}
       <div className=' w-full flex flex-col items-center justify-center py-8'>

        <p className=' py-12 text-2xl text-primaryText'>Join With Us!🤩</p>

         {/* Form Div */}
       <div className=' px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8'>
        
        {/* email */}
        <UserAuthInput 
        label='Email' 
        placeholder='Email' 
        isPass={false}
        key='Email'
        setStateFunction={setEmail}
        // passing component as prop
        Icon={FaEnvelope}
        setGetEmailValidationStatus = {setGetEmailValidationStatus}
        />

        {/* password */}
        <UserAuthInput 
        label='Password' 
        placeholder='Password' 
        isPass={true} 
        key='Password' 
        setStateFunction={setPassword}
        Icon={MdPassword}/>

        {/* alert message section */}

        {/* <AnimatePresence> is typically used in conjunction with conditional rendering to animate components based on their presence in the DOM.*/}
        <AnimatePresence>
          {alert && (
            <motion.p
            key={'AlertMessage'}
            // bring the rest animation
            {...fadeInOut} 
            className=' text-red-500'>

              {/* show the alert message */}
            {alertMsg}
            </motion.p>

          )}
        </AnimatePresence>


        {/* login button */}
        {
          !isLogin?(
            <motion.div 
            onClick={createNewUser}
            whileTap={{scale:0.9}} className='flex items-center justify-center w-full py-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500'>
          <p className=' text-xl text-white'>Sign Up</p>
        </motion.div>
          ):
          <motion.div 
          onClick={loginWithEmailPassword}
          whileTap={{scale:0.9}} className='flex items-center justify-center w-full py-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500'>
          <p className=' text-xl text-white'>Login</p>
        </motion.div>

        }
        {/* account text section */}

        {
          !isLogin?(
            <p className=' text-sm text-primaryText flex items-center justify-center gap-3'>Already Have an account ! 
            <span 
            // toggling signup login 
            onClick={()=>setIsLogin(!isLogin)}
            className=' text-emerald-500 cursor-pointer'>
            Login Here
            </span>
            </p>
          ):
          <p className=' text-sm text-primaryText flex items-center justify-center gap-3'>Dont Have an account ! 
          <span 
          onClick={()=>setIsLogin(!isLogin)}
          className=' text-emerald-500 cursor-pointer'>
            Create Here
            </span></p>
        }


        {/* or section */}

        <div className=' flex items-center justify-center gap-12'>
          <div className=' h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24'></div>
          <p className=' text-sm text-[rgba(256,256,256,0.2)]'>OR</p>
          <div className=' h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24'></div>
        </div>

         {/* sign in with google */}

         <motion.div 

        //  coming from helpers.js utils
         onClick={signInWithGoogle} 
         whileTap={{scale:0.9}} className=' flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full
         py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer'>
          <FcGoogle className=' text-3xl'/>
          <p className=' text-xl text-white'>Sign in with Google</p>
         </motion.div>

         {/* or section */}

        <div className=' flex items-center justify-center gap-12'>
          <div className=' h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24'></div>
          <p className=' text-sm text-[rgba(256,256,256,0.2)]'>OR</p>
          <div className=' h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24'></div>
        </div>

        {/* sign in with github */}

        <motion.div 
        onClick={signINWithGithub}
        whileTap={{scale:0.9}} className=' flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full
         py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer'>
          <FaGithub className=' text-3xl text-white'/>
          <p className=' text-xl text-white'>Sign in with Github</p>
         </motion.div>


       </div>

       </div>

     
    </div>
  )
}

export default SignUp
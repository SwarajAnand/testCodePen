// email and inputs
import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import {motion} from 'framer-motion'

const UserAuthInput = ({
  label,
  placeholder,
  isPass,
  setStateFunction,
  Icon,
  setGetEmailValidationStatus
}) => {
  // to get the values of input
  const [value, setValue] = useState("");

//   for whether or not password display
  const [showPass, setShowPass] = useState(true)

  const [isEmailValid, setIsEmailValid] = useState(false)


//   to handle input change / bringing red border in email field
  const handleTextChange = (e) => {
    setValue(e.target.value)

    // setting states in pass,email functions are in setStatefunction
    setStateFunction(e.target.value)

    if(placeholder === 'Email'){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        // returns true/false
        const status = emailRegex.test(value) 

        // while typing email do border red if invalid -> for that purpose
        setIsEmailValid(status)

        // to send the vali status to the signup page 
        setGetEmailValidationStatus(status)

        console.log(setStateFunction);
    }
  }
  return (
    <div className=" flex flex-col items-start justify-start gap-1">
      <label className=" text-sm text-gray-300">{label}</label>

      {/* email*/}
      <div
        className={` flex items-center justify-center gap-3 w-full md:w-96 rounded-md px-4 py-1 bg-gray-200 ${!isEmailValid && placeholder==='Email' && value.length>0 && 'border-2 border-red-500'}`}
      >
        {/* email icon */}

        <Icon className=" text-text555 text-2xl" />

        {/* input */}
        <input
          type={isPass && showPass ? "password" : "text"}
          placeholder={placeholder}
          className=" flex-1 w-full h-full py-2 outline-none border-none bg-transparent text-text555 text-lg"
          value={value}
          // state value will be updated and instantly displayed over there
          onChange={handleTextChange}
        />

        {/* password  icon visible only if isPass is false*/}
        {isPass && (
          <motion.div onClick={()=>setShowPass(!showPass)} whileTap={{scale:0.9}} className=" cursor-pointer">
            {showPass?(
                 <FaEyeSlash className=" text-text555 text-2xl" />
            ):(
                <FaEye className=" text-text555 text-2xl" />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserAuthInput;

import React, { useState } from 'react'
import {HiChevronDoubleLeft} from 'react-icons/hi2'
import {motion} from 'framer-motion'
import {Logo} from '../assets'
import { Link, Route, Routes} from 'react-router-dom'
import {MdHome} from 'react-icons/md'
import {FaSearchengin} from 'react-icons/fa6'
import {Projects,SignUp} from '../comtainer'
import { useDispatch, useSelector } from 'react-redux'
import { UserProfileDetails } from '../components'
import { SET_SEARCH_TERM } from '../context/actions/searchActions'

const Home = () => {
 
  const [isSideMenu, setisSideMenu] = useState(false)

  // home nav object should be displayed only on user state

  // we need to set user state from the redux store

  // useselector helps to select state from the redux store

  // find state.user go inside if found
  const user = useSelector((state) => state.user?.user)

  const searchTerm = useSelector((state)=>
    //   If state.searchTerm?.searchTerm exists and is truthy (not null or undefined), it is returned (state.searchTerm.searchTerm).
// If state.searchTerm or state.searchTerm.searchTerm is null or undefined, an empty string '' is returned
    state.searchTerm?.searchTerm?state.searchTerm?.searchTerm:''
  )


  const dispatch = useDispatch()

  
  console.log(user);
 
  return (
    <>
    <div
    className={`w-2 ${isSideMenu? 'w-2': 'flex-[.2] xl:flex[.2]'} min-h-screen max-h-screen relative  bg-secondary px-3 py-6 flex-col items-center justify-start gap-4 transition-all duration-200 ease-in-out`}
    >
      {/* anchor section */}
      <motion.div
      whileTap={{scale: 0.9}}
      // menu is true/false sidebar will appear accordingly on clicking
      onClick={()=>setisSideMenu(!isSideMenu)}
       className=' h-8 w-8 bg-secondary rounded-tr-lg rounded-br-lg absolute -right-6 flex items-center justify-center cursor-pointer'>
        <HiChevronDoubleLeft className='text-white text-xl'/>
      </motion.div>

      <div className=' overflow-hidden w-full flex flex-col gap-4'>


        {/* logo */}
      <Link to={'/home'}>
      <img src={Logo} alt="" className=' object-contain w-72 h-auto' />
      </Link>


      {/* start coding */}
      <Link to={'/newproject'}>
      <div className=' px-6 py-3 flex items-center justify-center rounded-xl border border-gray-400 cursor-pointer group hover:border-gray-200'>
        <p className=' text-gray-400 group-hover:text-gray-200 capitalize'>Start Coding</p>
      </div>
      </Link>


      {/* home nav */}

      {/* only when user is there then only show the home link */}

      {user && (
        <Link to={'/home/projects'} className='flex items-center justify-center gap-6'>
          <MdHome className=' text-primaryText text-xl'/>
          <p className='text-primaryText text-lg'>Home</p>
        </Link>
      )}

      </div>
    </div>

    <div className=' flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex flex-col items-start justify-start px-4 md:px-12 py-4 md:py-12'>

      {/* top section*/}

      <div className=' w-full flex items-center justify-between gap-3'>

        {/* search */}
        <div className=' bg-secondary w-full px-4 py-3 rounded-md flex items-center justify-center gap-3'>
          <FaSearchengin className=' text-2xl text-primaryText'/>
          <input type="text"
          value={searchTerm}
          onChange={(e)=> dispatch(SET_SEARCH_TERM(e.target.value))}
          className=' flex px-4 py-1 text-xl bg-transparent outline-none border-none text-primaryText placeholder:text-gray-600'
          placeholder='Search here...'
           />
        </div>
        
       {/* profile section */}
        {!user && (
          <motion.div
          whileTap={{scale:0.9}}
          className='flex items-center justify-center gap-3'
          >
            <Link
            className=' bg-emerald-500 px-6 py-2 rounded-md text-white text-lg cursor-pointer hover:bg-emerald-700'
            to={'/home/auth'}
            >SignUp
            </Link>
          </motion.div>
        )}

        {/* show user details here */}
        {user && <UserProfileDetails/>}
      </div>

      {/* Bottom section */}
      <div className=' w-full'>
        <Routes>
          {/*/*  means anything after home/ example home/abc it will take to projects
          
          /auth means take to signup*/}
          <Route path='/*' element={<Projects/>}/>
          <Route path='/auth' element={<SignUp/>}/>
        </Routes>
      </div>
    </div>

    </>
  )
}

export default Home
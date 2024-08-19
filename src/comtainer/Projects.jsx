import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { MdDelete, MdDeleteSweep, MdEdit } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { db } from '../config/firebase.config'
import { deleteDoc, doc } from 'firebase/firestore'

// gets the projects from the state first
// That means we need to push the project to the state first in redux store
// so somewhere we need to get the data
const Projects = () => {

  const projects = useSelector((state)=>state.projects?.projects)

  // when you type anything in searchbar, you need to set the state in searchTerm object in redux for filtering it or else store empty string

  const searchTerm = useSelector((state)=>
  //  if searchTerm object is there in state.searchTerm then set the state to searchTerm or else empty string and the fetch
    state.searchTerm?.searchTerm?state.searchTerm?.searchTerm:''
  )

  // console.log(searchTerm);

  // filtering projects
  const [filtered, setfiltered] = useState(null)

  // whenever searchTerm changes, filter
  useEffect(()=>{
    // means if it will filter according to the letter
    if(searchTerm.length>0)
      {
        setfiltered(
        projects?.filter(project => {
          const lowerCaseItem = project?.title.toLowerCase()
          return searchTerm
          .split('')  //makes array of character
          .every((letter)=> lowerCaseItem.includes(letter)) //every method helps to iterate over the letters one by one
        })
      )
      }

      else{
        setfiltered(null)
      }
  },[searchTerm])
  return (
    <div
    className=' w-full py-6 flex items-center justify-center gap-6 flex-wrap'>
      {filtered ? <>
        {filtered && 
        filtered.map((project,index)=>(
        <ProjectCard key={project.id} project={project} index={index}/>
      ))}
      </> : 

      <>
        {projects && projects.map((project,index)=>(
        <ProjectCard key={project.id} project={project} index={index}/>
      ))}
      </>}
      </div>
  )
}

// project card
const ProjectCard = ({project,index,onDelete}) => {

  // console.log(project.id)

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/newproject/${project.id}`);
  };

  const handleDeleteClick = async () => {
    try {
      await deleteDoc(doc(db, 'Projects', project.id));
      onDelete(project.id);  // Notify parent component about deletion
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };



  const userEmailFirstChar =project?.user[0]?.email ? project?.user[0].email.charAt(0) : project?.user[0].displayName.charAt(0)
  
  return(
    <motion.div key={index} 
    className=' w-full cursor-pointer md:w-[450px] h-[375px] bg-secondary rounded-md p-4 flex flex-col items-center justify-center gap-4'
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    transition={{duration:0.5, delay: index*0.1}}
    >
    {/* display output */}
      <div
              className=" bg-primary w-full h-full rounded-md overflow-hidden"
              style={{ overflow: "hidden", height: "100%" }}
            >
              {/* combine all the outputs and load it into an inframe */}
              <iframe
                title="Result"
                srcDoc={project.output}
                style={{ border: "none", width: "100%", height: "100%" }}
              />
            </div>

            {/* image name and icons etc */}
            <div className=' flex items-center justify-start gap-3 w-full'>

              {/* image */}
              <div className='w-14 h-14 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500'>
              {project?.user[0]?.photoURL ? (
          <motion.img
            whileHover={{ scale: 1.2 }}
            src={project?.user[0].photoURL}
            // alt={user[0].displayName[0]|| 'User Photo'}
            className='w-full h-full object-cover'
          />
        ) : (
          <p className='text-xl text-white font-semibold capitalize'>
            {project?.user[0]?.displayName ? project?.user[0].displayName.charAt(0) : userEmailFirstChar || 'U'}
          </p>
        )}
        </div>
        
        <div>
          <p className=' text-white text-lg capitalize'>{project.title}</p>
          <p className=' text-primaryText text-sm capitalize'>
            {
              project?.user[0].displayName
              ? project?.user[0].displayName
              : `${project?.user.email.split('@')[0]}`
            }
          </p>
        </div>

        {/* collection */}

        {/* edit button */}
        <motion.div className=' cursor-pointer ml-auto'
        whileTap={{scale: 0.9}}
        onClick={handleEditClick}
        >
          {/* saving option
        <MdBookmark className=' text-primaryText text-3xl'/> */}
          <MdEdit className='text-primaryText text-3xl' />
        </motion.div>

        <motion.div className=' cursor-pointer ml-auto'
        whileTap={{scale: 0.9}}
        >
          {/* saving option
        <MdBookmark className=' text-primaryText text-3xl'/> */}
          <MdDelete className='text-primaryText text-3xl'
          onClick={handleDeleteClick}
           />
        </motion.div>

            </div>
    </motion.div>
  )
}

export default Projects
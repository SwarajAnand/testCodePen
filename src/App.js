import React, { useEffect, useState } from "react";
import { Navigate, Route,Routes, useNavigate } from "react-router-dom";
import { Home, NewProject } from "./comtainer";
import { auth, db } from "./config/firebase.config";
import {  QuerySnapshot, collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { Spinner } from "./components";
import { useDispatch } from "react-redux";
import {SET_USER} from './context/actions/userActions'
import {SET_PROJECTS} from './context/actions/projectActions'

const App = () => {

  const dispatch = useDispatch()
  
  const navigate = useNavigate()

  //while loading is happening by the mean time we need to push the data to the redux store

  // create state to monitor loading
  const [isLoading, setIsLoading] = useState(true)
  // to get that authentication information

  // This useEffect hook listens for changes in authentication state using Firebase's onAuthStateChanged method. If a user is authenticated, their information is logged. Otherwise, they are redirected to the authentication page.

  useEffect(()=>{
    // check authentication state
    const unsubscribe = auth.onAuthStateChanged(userCred => {
      if(userCred){
        // userdata
        // console.log(userCred?.providerData[0]);

        // store the data in firestore
        setDoc(doc(db,'users',userCred.uid), userCred?.providerData[0]).then(()=>{
          // dispatch the action to the redux store and after that specif ui changes can be done
          dispatch(SET_USER(userCred?.providerData))
          navigate('/home/projects',{replace:true})
        })
      }
      else{
        // replace:true -> replace the entire route
        navigate('/home/projects',{replace:true})
      }

      setInterval(()=>{
        setIsLoading(false)
      },2000)
    })

    // since the unsubscribe is constantly being running, to avoid we need to clean up the listener event
    return () => unsubscribe
  },[])

  // push the projects data in firestore
  useEffect(()=>{
    const projectQuery = query(
      // supply database and collection name
      collection(db,'Projects'),
      // newly created project will be in the top
      orderBy('id','desc')
    )

    // querysnapshot is the event listener, whenever you are making any changes in firestore collection it will be reflected
    const unsubscribe = onSnapshot(projectQuery,(QuerySnapshot => {
      // get data from Querysnapshots and store into projectList
      const projectsList = QuerySnapshot.docs.map(doc => doc.data())
      // dispatch the process
      dispatch(SET_PROJECTS(projectsList))
    }))

    // Unsubscribe from the query when component unmounts
    return unsubscribe
  },[])



  return (
    <>{isLoading
      ? 
      <div
      className=" w-screen h-screen flex items-center justify-center overflow-hidden"
      >
        <Spinner/>
      </div>
      :
      <div className=" w-screen h-screen flex items-start justify-start overflow-hidden">
      <Routes>
        {/* Initial route */}
        <Route path='/home/*' element={<Home/>}/>

        {/* load newproject vomponent for the following route */}
        <Route path="/newproject/:id" element={<NewProject/>}/>

        <Route path="/newproject" element={<NewProject/>}/>

        {/* navigate to home */}
        <Route path="*" element={<Navigate to={'/home'}/>} />
      </Routes>
    </div>
    }</>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import { FaChevronDown, FaCss3, FaHtml5, FaJs } from "react-icons/fa";
import { FcSettings } from "react-icons/fc";
import SplitPane from "react-split-pane";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { Link, useParams } from "react-router-dom";
import { Logo } from "../assets";
import { AnimatePresence,motion } from "framer-motion";
import { MdCheck, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { Alert, UserProfileDetails } from "../components";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";

const NewProject = () => {

  // Access `id` from `useParams`
  const { id } = useParams();
  console.log(id);
  

    // show alert that project is saved
    const [alert, setAlert] = useState(false)

  // 3 states for html,css,js codemirror
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");

// to toggle the edit
const [isTitle, setisTitle] = useState(false)

// to give title in input field
const [title, setTitle] = useState('Untitled')

// to get the user object from the redux store
const user = useSelector((state)=> state.user.user)

useEffect(() => {
  if (id) {
    const fetchProjectData = async () => {
      try {
        const projectDoc = await getDoc(doc(db, 'Projects', id));
        if (projectDoc.exists()) {
          const projectData = projectDoc.data();
          setHtml(projectData.html);
          setCss(projectData.css);
          setJs(projectData.js);
          setOutput(projectData.output);
          setTitle(projectData.title);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching project data: ", error);
      }
    };

    fetchProjectData();
  }
}, [id]);

  useEffect(() => {
    updateOutput();
  }, [html, css, js]);

  //   This function will be executed everytime there is a change in html css and js state using useeffect hook
  //   basically whatever the code I am typing , those codes will be replaced in these positions, then combining it below and pushed it into the state setOutput.This output should be updated in bottom result section
  const updateOutput = () => {
    const combinedOutput = `
    <html>
          <head>
            <style>${css}</style>
          </head>
        <body>
           ${html}
        <script>${js}</script>
        </body>
    </html>
        `;

    setOutput(combinedOutput);
  };

//   save to firebase
// It generates a unique ID for the document using Date.now() and stores it in the variable id.
/*It creates a _doc object containing the project details, including id, title, html, css, js, output, and user.
It uses Firestore's setDoc function to save this document to the "Projects" collection with the generated ID.
If the document is successfully saved, it sets the alert state to true, indicating that the project is saved.
It uses setInterval to automatically set the alert state back to false after 2000 milliseconds (2 seconds), effectively hiding the alert message.*/ 

const saveProgram = async() => {
    // const id = `${Date.now()}`
    // const id = id || `${Date.now()}`
    const uniqueId = id || Date.now().toString(); // Use Date.now() and convert it to string

    const _doc = {
        id:uniqueId,
        title:title,
        html:html,
        css:css,
        js:js,
        output:output,
        user:user
    }

    await setDoc(doc(db, 'Projects',id), _doc).then((res)=>{setAlert(true)

    }).catch((err)=>console.log(err))

    setInterval(()=>{
        setAlert(false)
    },2000)
}

  // for getting output

  const [output, setOutput] = useState("");
  return (
    <>
      <div className=" w-screen h-screen flex flex-col items-start justify-start overflow-hidden">
        {/* alert section */}

        <AnimatePresence>
            {alert && <Alert status = {'Success'} alertMsg = {'Project Saved ...'}/>}
        </AnimatePresence>

        {/* header section */}
        <header className=" w-full flex items-center justify-between px-12 py-4">
          <div className=" flex items-center justify-center gap-6">
            <Link to={"/home"}>
              <img src={Logo} alt="" className=" object-contain w-72 h-auto" />
            </Link>

            <div className=" flex flex-col items-start justify-start">
                {/* title */}
                <div className=" flex items-center justify-center gap-3">
                    <AnimatePresence>
                        {isTitle? <>
                        <motion.input key={'TitleInput'} type="text" placeholder="Your Title" value={title}
                        onChange={(e)=> setTitle(e.target.value)}
                        className=" px-3 py-2 rounded-md bg-transparent text-primaryText text-base outline-none border-none"
                        />
                        </> : 
                        <>
                        <motion.p key={'titleLabel'} className=" px-3 py-2 text-white text-lg"> 
                            {title}
                            {/* Untitle */}
                        </motion.p>
                        </>}
                    </AnimatePresence>

                    {/* show checkbox or edit option */}
                    <AnimatePresence>
                        {isTitle? <>
                        <motion key={'MdCheck'} whileTap={{scale:0.9}} className=' cursor-pointer' onClick={()=>setisTitle(false)} >
                            <MdCheck className=" text-2xl text-emerald-500"/>
                        </motion>
                        </> : 
                        <>
                        <motion key={'MdEdit'} whileTap={{scale:0.9}} className=' cursor-pointer' onClick={()=>setisTitle(true)} >
                            <MdEdit className=" text-2xl text-primaryText"/>
                        </motion>
                        </>}
                    </AnimatePresence>
                </div>
                {/* follow */}

                <div className=" flex items-center justify-center px-3 -mt-2 gap-2">
                    <p className=" text-primaryText text-sm">
                        {user[0]?.displayName ? user[0].displayName : `${user[0]?.email.split('@')[0]}`}
                    </p>
                    <motion.p whileTap={{scale:0.9}} className=" text-[10px] bg-emerald-500 rounded-sm px-2 py-[1px] text-primary font-semibold cursor-pointer">
                        + Follow
                    </motion.p>
                </div>
            </div>
          </div>

          {/* user section */}

          {/* if user exists show the user profile details */}

          {user && (
                      <div className=" flex items-center justify-center gap-4">
                      <motion.button 
                    //   save these to firebase
                    onClick={saveProgram}
                      whileTap={{scale:0.9}}
                      className=" px-4 py-4 bg-primaryText cursor-pointer text-base text-primary font-semibold rounded-md">
                          Save
                      </motion.button>
                      <UserProfileDetails/>
                 </div>
          )}

         
        </header>

        {/* coding section */}
        <div>
          {/* horizontal section */}
          <SplitPane
            split="horizontal"
            minSize={100}
            maxSize={-100}
            defaultSize={"50%"}
          >
            {/* top coding section */}
            <SplitPane split="vertical" minSize={500}>
              {/* html code */}
              <div className=" w-full h-full flex flex-col items-start justify-start">
                <div className=" w-full flex items-center justify-between">
                  {/* HTML icon */}
                  <div className=" bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                    <FaHtml5 className=" text-xl text-red-500" />
                    <p className=" text-primaryText font-semibold">HTML</p>
                  </div>

                  {/* setting icon */}
                  <div className=" cursor-pointer flex items-center justify-center gap-5 px-4">
                    <FcSettings className=" text-xl" />
                    <FaChevronDown className=" text-xl text-primaryText" />
                  </div>
                </div>

                {/* code mirror */}
                <div className=" w-full px-2">
                  <CodeMirror
                    value={html}
                    height="600px"
                    extensions={[javascript({ jsx: true })]}
                    onChange={(value, viewUpdate) => {
                      setHtml(value);
                    }}
                    // codemirror prop
                    theme={"dark"}
                  />
                  ;
                </div>
              </div>

              <SplitPane split="vertical" minSize={500}>
                {/* css code */}
                <div className=" w-full h-full flex flex-col items-start justify-start">
                  <div className=" w-full flex items-center justify-between">
                    {/* HTML icon */}
                    <div className=" bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                      <FaCss3 className=" text-xl text-sky-500" />
                      <p className=" text-primaryText font-semibold">CSS</p>
                    </div>

                    {/* setting icon */}
                    <div className=" cursor-pointer flex items-center justify-center gap-5 px-4">
                      <FcSettings className=" text-xl" />
                      <FaChevronDown className=" text-xl text-primaryText" />
                    </div>
                  </div>
                  <div className=" w-full px-2">
                    <CodeMirror
                      value={css}
                      height="600px"
                      extensions={[javascript({ jsx: true })]}
                      onChange={(value, viewUpdate) => {
                        setCss(value);
                      }}
                      // codemirror prop
                      theme={"dark"}
                    />
                    ;
                  </div>
                </div>

                {/* js code */}
                <div className=" w-full h-full flex flex-col items-start justify-start">
                  <div className=" w-full flex items-center justify-between">
                    {/* HTML icon */}
                    <div className=" bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                      <FaJs className=" text-xl text-yellow-500" />
                      <p className=" text-primaryText font-semibold">JS</p>
                    </div>

                    {/* setting icon */}
                    <div className=" cursor-pointer flex items-center justify-center gap-5 px-4">
                      <FcSettings className=" text-xl" />
                      <FaChevronDown className=" text-xl text-primaryText" />
                    </div>
                  </div>
                  <div className=" w-full px-2">
                    <CodeMirror
                      value={js}
                      height="600px"
                      extensions={[javascript({ jsx: true })]}
                      // the onChange event typically receives the new value directly as its argument, rather than an event object like e.target.value. This is because the value is controlled by the component itself, so there's no need to extract it from an event object.
                      onChange={(value, viewUpdate) => {
                        setJs(value);
                      }}
                      // codemirror prop
                      theme={"dark"}
                    />
                    ;
                  </div>
                </div>
              </SplitPane>
            </SplitPane>

            {/* bottom result section */}
            <div
              className=" bg-white"
              style={{ overflow: "hidden", height: "100%" }}
            >
              {/* combine all the outputs and load it into an inframe */}
              <iframe
                title="Result"
                srcDoc={output}
                style={{ border: "none", width: "100%", height: "100%" }}
              />
            </div>
          </SplitPane>
        </div>
      </div>
    </>
  );
};

export default NewProject;

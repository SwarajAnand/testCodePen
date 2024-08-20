import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MdCheck, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { FaHtml5, FaCss3, FaJs } from "react-icons/fa";
import { Alert, UserProfileDetails } from "../components";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";
import CodeEditor from "./CodeEditor";
import { Logo } from "../assets";

const NewProject = () => {
  const { id } = useParams();
  const [alert, setAlert] = useState(false);
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [isTitle, setIsTitle] = useState(false);
  const [title, setTitle] = useState("Untitled");
  const user = useSelector((state) => state?.user?.user);
  const [output, setOutput] = useState("");

  const navigate = useNavigate();

  console.log(id);

  useEffect(() => {
    if (id) {
      const fetchProjectData = async () => {
        try {
          console.log("Fetching project with ID:", id);
          const projectDoc = await getDoc(doc(db, "Projects", id));
          if (projectDoc.exists()) {
            const projectData = projectDoc.data();
            console.log("Project data fetched:", projectData);
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
    } else {
      console.log("No ID provided, skipping fetch.");
      // navigate("/home")
    }
  }, [id]);

  useEffect(() => {
    updateOutput();
  }, [html, css, js]);

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

  const saveProgram = async () => {
    const uniqueId = id || Date.now().toString();
    const _doc = {
      id: uniqueId,
      title: title,
      html: html,
      css: css,
      js: js,
      output: output,
      user: user,
    };

    console.log("Saving document with data:", _doc);

    await setDoc(doc(db, "Projects", uniqueId), _doc)
      .then(() => {
        setAlert(true);
        console.log("Document saved successfully");
      })
      .catch((err) => console.log("Error saving document:", err));

    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <AnimatePresence>
          {alert && <Alert status={"Success"} alertMsg={"Project Saved ..."} />}
        </AnimatePresence>

        <header className="w-full flex items-center justify-between px-12 py-4">
          <div className="flex items-center justify-center gap-6">
            <Link to={"/home"}>
              <img src={Logo} alt="" className="object-contain w-72 h-auto" />
            </Link>

            <div className="flex flex-col items-start justify-start">
              <div className="flex items-center justify-center gap-3">
                <AnimatePresence>
                  {isTitle ? (
                    <motion.input
                      key={"TitleInput"}
                      type="text"
                      placeholder="Your Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="px-3 py-2 rounded-md bg-transparent text-primaryText text-base outline-none border-none"
                    />
                  ) : (
                    <motion.p
                      key={"titleLabel"}
                      className="px-3 py-2 text-white text-lg"
                    >
                      {title}
                    </motion.p>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {isTitle ? (
                    <motion
                      key={"MdCheck"}
                      whileTap={{ scale: 0.9 }}
                      className="cursor-pointer"
                      onClick={() => setIsTitle(false)}
                    >
                      <MdCheck className="text-2xl text-emerald-500" />
                    </motion>
                  ) : (
                    <motion
                      key={"MdEdit"}
                      whileTap={{ scale: 0.9 }}
                      className="cursor-pointer"
                      onClick={() => setIsTitle(true)}
                    >
                      <MdEdit className="text-2xl text-primaryText" />
                    </motion>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-center px-3 -mt-2 gap-2">
                <p className="text-primaryText text-sm">
                  {user[0]?.displayName
                    ? user[0]?.displayName
                    : `${user[0]?.email.split("@")[0]}`}
                </p>
                <motion.p
                  whileTap={{ scale: 0.9 }}
                  className="text-[10px] bg-emerald-500 rounded-sm px-2 py-[1px] text-primary font-semibold cursor-pointer"
                >
                  + Follow
                </motion.p>
              </div>
            </div>
          </div>

          {user && (
            <div className="flex items-center justify-center gap-4">
              <motion.button
                onClick={saveProgram}
                whileTap={{ scale: 0.9 }}
                className="px-4 py-4 bg-primaryText cursor-pointer text-base text-primary font-semibold rounded-md"
              >
                Save
              </motion.button>
              <UserProfileDetails />
            </div>
          )}
        </header>

        {user && (
          <div>
            <div className="flex w-full justify-between">
              {/* all code section start here */}
              <div className="flex w-full">
                <CodeEditor
                  language={{
                    name: "HTML",
                    icon: <FaHtml5 className="text-xl text-red-500" />,
                  }}
                  value={html}
                  onChange={(value) => setHtml(value)}
                />
                <CodeEditor
                  language={{
                    name: "CSS",
                    icon: <FaCss3 className="text-xl text-sky-500" />,
                  }}
                  value={css}
                  onChange={(value) => setCss(value)}
                />
                <CodeEditor
                  language={{
                    name: "JS",
                    icon: <FaJs className="text-xl text-yellow-500" />,
                  }}
                  value={js}
                  onChange={(value) => setJs(value)}
                />
              </div>
            </div>

            {/* output section start here */}
            <div className="w-full border-l-2 border-l-primaryText bg-white">
              <div className="w-full ">
                <iframe
                  srcDoc={output}
                  title="output"
                  sandbox="allow-scripts"
                  frameBorder="0"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NewProject;

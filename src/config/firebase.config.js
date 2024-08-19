// firebase configuration

import {getApps, getApp, initializeApp} from 'firebase/app'
import {getAuth, GithubAuthProvider, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey:process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId:process.env.REACT_APP_PROJECTID,
    storageBucket:process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId:process.env.REACT_APP_MESSAGESENDERID,
    appId: process.env.REACT_APP_APPID
  };

// if app exists get that app, if not initialize new app using firebase config
  const app = getApps.length>0 ? getApp() : initializeApp(firebaseConfig)

//   get auth information
const auth = getAuth(app)

const provider = new GoogleAuthProvider();
const provider2 = new GithubAuthProvider();

// database initialization
const db = getFirestore(app)

export {app, auth, db,provider,provider2}


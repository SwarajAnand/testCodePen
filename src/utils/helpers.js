// for sign in with google

import { GithubAuthProvider, GoogleAuthProvider, signInWithRedirect,signInWithPopup,signOut } from "firebase/auth";
import { auth,provider, provider2 } from "../config/firebase.config";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import { SET_USER_NULL } from "../context/actions/userActions";
import { useNavigate } from "react-router-dom";

// created new instance of provider info
const googleProvider = new GoogleAuthProvider();

const githubProvider = new GithubAuthProvider()


// signInWithRedirect(auth, googleProvider) initiates the sign-in process with Google using Firebase Authentication. When this function is called, it redirects the user to Google's sign-in page where they can enter their credentials.

// Once the sign-in process is complete, the then() method is invoked. If the sign-in is successful, the userCred parameter contains the user's credentials. Then, window.location.reload() is called.

// window.location.reload() is a JavaScript method that reloads the current page. In this context, it likely serves to refresh the application after the user signs in with Google. This can be useful for updating the UI or applying changes to the application state based on the user's authentication status.

// export const signINWithGoogle = async () => {
//   // this auth object will get all the information about the authenticated providers
//   await signInWithRedirect(auth, googleProvider).then((userCred) => {
//     window.location.reload();
//   });
// };


// google signIn --->

// export const GoogleSignIn = () => {
 export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = provider.credentialFromResult(result);
        const token = credential.accessToken;
        // console.log(token);

        // The signed-in user info.
        const user = result?.user;
        console.log('User:', user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // const email = error.customData?.email;
        // const credential = provider?.credentialFromError(error);
        console.error('Error:', errorCode, errorMessage);
      });
  };
// }


// export const signINWithGithub = async () => {
//     await signInWithRedirect(auth, githubProvider).then((userCred) => {
//       window.location.reload();
//     });
//   };
  

// github -->

export const signINWithGithub = () => {
  signInWithPopup(auth, githubProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = githubProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result?.user;
      console.log('User:', user);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // const email = error.customData?.email;
      // const credential = provider?.credentialFromError(error);
      console.error('Error:', errorCode, errorMessage);
    });
};

export const Menus = [
  {id: uuidv4(), name: 'Projects', uri: '/home/projects'},
  {id: uuidv4(), name: 'Profile', uri: '/home/profile'}
]


// sign out the user out of application and reload the page
export const signOutAction = async() => {
  await auth.signOut().then(()=>{
    window.location.reload()
  })
}


// export const signOutAction = () => {
//   signOut(auth).then(() => {
//     console.log("User signed out successfully.");
//     // Redirect to login page or perform other actions
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     // dispatch(SET_USER_NULL)
//     navigate('/projects')

//   }).catch((error) => {
//     console.error("Error signing out:", error);
//   });
// };
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment = {
    production: false,
 firebase : {
  apiKey: "AIzaSyCjZckKOaPAwmpTrAIm1D58YoCiPmiCX0c",
  authDomain: "datafrontend-a1b25.firebaseapp.com",
  databaseURL: "https://datafrontend-a1b25-default-rtdb.firebaseio.com",
  projectId: "datafrontend-a1b25",
  storageBucket: "datafrontend-a1b25.appspot.com",
  messagingSenderId: "14913972128",
  appId: "1:14913972128:web:6bc551aaebc45879ebe6c5",
  measurementId: "G-XWG09DCD0J"
},
};
// Initialize Firebase
const app = initializeApp(environment.firebase);
const analytics = getAnalytics(app);
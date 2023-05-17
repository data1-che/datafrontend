import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment = {
    production: false,
    firebaseConfig : {
    apiKey: "AIzaSyBulj7Y90ntOn9UA8y7IYyJZ0tjFPcDks8",
    authDomain: "d1-frontend.firebaseapp.com",
    projectId: "d1-frontend",
    storageBucket: "d1-frontend.appspot.com",
    messagingSenderId: "905114017898",
    appId: "1:905114017898:web:fd4071aef1c52f039d2a13",
    measurementId: "G-RT071R3GD0"
    },
};
//const app = initializeApp( environment.firebaseConfig );
//const analytics = getAnalytics(app);

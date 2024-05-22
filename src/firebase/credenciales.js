// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwsb8htero8OOfsSk3tEatubsJJzGqyx0",
  authDomain: "testing-984d1.firebaseapp.com",
  projectId: "testing-984d1",
  storageBucket: "testing-984d1.appspot.com",
  messagingSenderId: "32407230719",
  appId: "1:32407230719:web:4ef0984c877232a6dd54ca"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
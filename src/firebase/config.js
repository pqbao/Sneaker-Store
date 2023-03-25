import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBae9S9NwLL8ezf2uruupdU5IkybyxRFHg",
  authDomain: "sneakerdatabase-4b508.firebaseapp.com",
  projectId: "sneakerdatabase-4b508",
  storageBucket: "sneakerdatabase-4b508.appspot.com",
  messagingSenderId: "394390015731",
  appId: "1:394390015731:web:4ef3850b1d3ead79977186"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app)


export default app;
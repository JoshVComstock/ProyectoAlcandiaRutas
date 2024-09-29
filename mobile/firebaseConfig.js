import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDb9K3Rymrs0lgq7AkUvGgkD7q_GDHRw6k",
  authDomain: "rutaalcaldia-5ba28.firebaseapp.com",
  projectId: "rutaalcaldia-5ba28",
  storageBucket: "rutaalcaldia-5ba28.appspot.com",
  messagingSenderId: "1050901120422",
  appId: "1:1050901120422:web:e0689267f70b20dcdabb67",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { app, db };

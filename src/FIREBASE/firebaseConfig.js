import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

//console.log(process.env)

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Se configuran las variables a utilizar:
const autorizacion = getAuth()
const baseDatos = getFirestore()
const googleAuth = new GoogleAuthProvider()

//Debo exportar las constantes de arriba que se van a utilizar en varios archivos:
export { autorizacion, baseDatos, googleAuth }
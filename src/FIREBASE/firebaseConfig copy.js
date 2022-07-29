import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBU25ZvRxd_bb0EyX463Sg9DghvHGn639Q",
  authDomain: "journalapp-bf6c3.firebaseapp.com",
  projectId: "journalapp-bf6c3",
  storageBucket: "journalapp-bf6c3.appspot.com",
  messagingSenderId: "232381453317",
  appId: "1:232381453317:web:940cb7fd9a2a2e615f386c"
};

const firebaseConfigTesting = {
  apiKey: "AIzaSyDE9x-t2y51SR2dO91sZKn2Cn_0uWyj2P8",
  authDomain: "journalapp-testing-dcc6b.firebaseapp.com",
  projectId: "journalapp-testing-dcc6b",
  storageBucket: "journalapp-testing-dcc6b.appspot.com",
  messagingSenderId: "986479744405",
  appId: "1:986479744405:web:3a4da77cec7b3df06e929c"
};

// Initialize Firebase
//Ambiente de Pruebas Tests. Explicaciòn video 284 Min 4:
//console.log('process.env: ', process.env);
if ( process.env.NODE_ENV === 'test') {
  initializeApp(firebaseConfigTesting);
} else if ( process.env.NODE_ENV === 'development' ) {
  initializeApp(firebaseConfig);
}


// Se configuran las variables a utilizar:
const autorizacion = getAuth()
const baseDatos = getFirestore()
const googleAuth = new GoogleAuthProvider()



//Debo exportar las constantes de arriba que se van a utilizar en varios archivos:
export { autorizacion, baseDatos, googleAuth }
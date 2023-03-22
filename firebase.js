
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyATNVgZmprp-qQl9ZytOijfToFabZU51GE",
    authDomain: "todoapp-ca71d.firebaseapp.com",
    projectId: "todoapp-ca71d",
    storageBucket: "todoapp-ca71d.appspot.com",
    messagingSenderId: "93799141888",
    appId: "1:93799141888:web:1df8321e0bd683acf8fee5",
    measurementId: "G-PH6NJHQ2B0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

// firebase.initializeApp(firebaseConfig);
// firebase.firestore();
// firebase.getAuth(app);
// firebase.getFirestore();
// firebase.firestore();

// export default firebase;

export {
    auth,
    db
   
    
}
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";


const initializeauthentic = () => {
    initializeApp(firebaseConfig);
}

export default initializeauthentic;
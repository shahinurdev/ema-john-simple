import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './fireBase.config';
export const initializeLoggingFramework=()=>{
    firebase.initializeApp(firebaseConfig)
}
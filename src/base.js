// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import {getStorage} from "firebase/storage"

import "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDaht6PlWfe5n7AMssRCnni7A0q1cMd74o",

  authDomain: "nbs-storage.firebaseapp.com",

  projectId: "nbs-storage",

  storageBucket: "nbs-storage.appspot.com",

  messagingSenderId: "208365900422",

  appId: "1:208365900422:web:51b9b3f97c0f536caa7707",

  measurementId: "G-4T0DQWM9K7"

};



export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)

const analytics = getAnalytics(app); 
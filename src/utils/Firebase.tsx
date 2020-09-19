import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBO-Agv105CEytAAkx02Q_o8_xGMUd3wQY",
  authDomain: "stoxbie.firebaseapp.com",
  databaseURL: "https://stoxbie.firebaseio.com",
  projectId: "stoxbie",
  storageBucket: "stoxbie.appspot.com",
  messagingSenderId: "299347152861",
  appId: "1:299347152861:web:9b54d925ecdc5f0e633034",
  measurementId: "G-CHXVT3FCLD",
};

firebase.initializeApp(
  firebaseConfig,
);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();

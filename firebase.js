// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyD38zFt2GnqP00RNi2WW0lYWuNhGiVHvmM",
	authDomain: "signal-copy-ed2ab.firebaseapp.com",
	projectId: "signal-copy-ed2ab",
	storageBucket: "signal-copy-ed2ab.appspot.com",
	messagingSenderId: "854353103383",
	appId: "1:854353103383:web:a1915f212b3405c2e4aa52",
};

// let app;

// if (getApps().length === 0) {
// 	app = initializeApp(firebaseConfig);
// } else {
// 	app = getApp();
// }
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

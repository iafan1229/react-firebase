
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCbhfLfXyuKJkIB_LDCY-W3zxdIJs9EcaQ',
	authDomain: 'react-chat-587da.firebaseapp.com',
	projectId: 'react-chat-587da',
	storageBucket: 'react-chat-587da.appspot.com',
	messagingSenderId: '35233671735',
	appId: '1:35233671735:web:4163b291ded4369e62adb2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


export {app,db}
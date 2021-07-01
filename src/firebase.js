import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyC9VU7kRX8G_io8SHQNNAN0_mkYrS1PgK4",
    authDomain: "todo-app-ea811.firebaseapp.com",
    projectId: "todo-app-ea811",
    storageBucket: "todo-app-ea811.appspot.com",
    messagingSenderId: "916795460750",
    appId: "1:916795460750:web:c70e4d492f46ecdb96cddf"
};



const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();


export default db;
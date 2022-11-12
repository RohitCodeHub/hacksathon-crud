import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVI3kGR78HSxd_mALRrTikfV0O1HOZ8S0",
  authDomain: "hackathon-eb183.firebaseapp.com",
  databaseURL: "https://hackathon-eb183-default-rtdb.firebaseio.com",
  projectId: "hackathon-eb183",
  storageBucket: "hackathon-eb183.appspot.com",
  messagingSenderId: "170631724562",
  appId: "1:170631724562:web:adbd59a90859b13a5162cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
console.log('app', app)
let submitData = document.getElementById("submitData");
submitData.addEventListener("click",function(){
    let email = document.getElementById("email");
    let psd = document.getElementById("psd");

    signInWithEmailAndPassword(auth, email.value, psd.value)
.then((userCredential) => {
// Signed in 
const user = userCredential.user;
console.log("user=>", user);
// ...
})
.catch((error) => {
const errorCode = error.code;
const errorMessage = error.message;
console.log("error=>", errorMessage);
});

});

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { 
  addDoc, 
  collection, 
  getFirestore 
} from "firebase/firestore";
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJQJwtXKmTkrfeCQcnXGcdCbWKsZpHVsY",
  authDomain: "netflix-clone-e7219.firebaseapp.com",
  projectId: "netflix-clone-e7219",
  storageBucket: "netflix-clone-e7219.appspot.com", // ✅ fixed
  messagingSenderId: "664419822275",
  appId: "1:664419822275:web:9fcd3e5e7c0305f7105076"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// -------------------
// Authentication Utils
// -------------------

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // ✅ collection changed to "users"
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    alert(error.message);
  toast.error(error.code.split('/')[1].split('-').join(' '));

  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Login Error:", error);
    alert(error.message);
    toast.error(error.code);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, login, signup, logout };

import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDDZEZ4ReNDPTzy-alAeV2OX1awveKGVFQ",
  authDomain: "bookify-f59ec.firebaseapp.com",
  projectId: "bookify-f59ec",
  storageBucket: "bookify-f59ec.appspot.com",
  messagingSenderId: "221188813994",
  appId: "1:221188813994:web:ce34e2e2fdc7990e1d8cd3",
  measurementId: "G-YXNR4F6WFW",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const FirebaseContext = createContext(null);
//creating context to access all the functions in firebasecontext
export const useFirebase = () => useContext(FirebaseContext);
//creating instance for firestore
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const googleProvider=new GoogleAuthProvider()
export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Cleanup function to unsubscribe from the listener
    return () => unsubscribe();
  }, []);

  const register = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Registration successful");
      })
      .catch((error) => {
        console.error("Registration failed:", error.message);
      });
  };
  const loginWithGoogle=()=>signInWithPopup(auth,googleProvider)

  
  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Login successful");
      })
      .catch((error) => {
        console.error("Login failed:", error.message);
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logout successful");
      })
      .catch((error) => {
        console.error("Logout failed:", error.message);
      });
  };
  console.log(user);
  const handleCreateListing = async (name, number, price, cover) => {
    const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
    const uploadResult = await uploadBytes(imageRef, cover);
    await addDoc(collection(firestore, "books"), {
      name,
      number,
      price,
      imageURL: uploadResult.ref.fullPath,
      userId: user.uid,
    });
  };
  const listAllBooks = () => {
    return getDocs(collection(firestore, "books"));
  };
  const getimageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };
  const isLoggedin = !!user;

  return (
    <FirebaseContext.Provider
      value={{
        register,
        login,
        isLoggedin,
        logout,
        handleCreateListing,
        listAllBooks,
        getimageURL,
        loginWithGoogle,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

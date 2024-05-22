import React, { useState } from "react";
import firebaseApp from "./firebase/credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

import Home from "./screens/Home";
import Login from "./screens/Login";

function App() {
  const [user, setUser] = useState(null);

  async function getRole(uid) {
    const docuRef = doc(firestore, `users/${uid}`);
    const docuCifrada = await getDoc(docuRef);

    if (docuCifrada.exists()) {
      const infoFinal = docuCifrada.data().role;
      return infoFinal;
    } else {
      console.log("No such document!");
      return null;
    }
  }

  function setUserWithFirebaseAndRol(usuarioFirebase) {
    getRole(usuarioFirebase.uid).then((role) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        role: role,
      };
      setUser(userData);
      console.log("userData final", userData);
    });
  }

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      if (!user) {
        setUserWithFirebaseAndRol(usuarioFirebase);
      }
    } else {
      setUser(null);
    }
  });

  return <>{user ? <Home user={user} /> : <Login />}</>;
}

export default App;
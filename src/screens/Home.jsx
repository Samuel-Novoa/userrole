import React from "react";
import AdminView from "../components/AdminView";
import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut } from "firebase/auth";
import UserView from "../components/UserView";

const Home = ({ user }) => {
  const auth = getAuth(firebaseApp);

  return (
    <div>
      <div>Home</div>
      <button onClick={() => signOut(auth)}>Cerrar session</button>
      {user.role === "admin" ? <AdminView /> : <UserView />}
    </div>
  );
};

export default Home;

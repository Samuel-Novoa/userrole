import React, { useState } from 'react';
import firebaseApp from "../firebase/credenciales";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// Importar servcioi de base de datos
import { getFirestore, doc, setDoc } from "firebase/firestore"


function Login() {
    const [isRegistrando, setIsregistrando] = useState(false);
    const auth = getAuth(firebaseApp);

    const firestore = getFirestore(firebaseApp)

    async function registrarUsuario(email, password, role) {
        const infoUsuario = await createUserWithEmailAndPassword(auth, email, password).then(usuarioFirebase => {
            return usuarioFirebase;
        });

        console.log(infoUsuario.user.uid)

        const docuRef = doc(firestore, `users/${infoUsuario.user.uid}`)
        setDoc(docuRef, { correo: email, role: role})
    }

    function submitHandler (e) {
        e.preventDefault();

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const role = e.target.elements.role.value;

        console.log("submit", email, password, role);

        if (isRegistrando) {
            registrarUsuario(email, password, role);
        } else {
            signInWithEmailAndPassword(auth, email, password)
        }
    }

    return (
        <div>
            <h1>{isRegistrando ? "Registrate" : "Inicia Sesion" }</h1>

            <form onSubmit={submitHandler}>
                <label>
                    Correo electronico:
                    <input type="email" id="email" />
                </label>

                <label>
                    Contrasena:
                    <input type="password" id="password" />
                </label>

                <label>
                    Role:
                    <select id="role">
                        <option value="admin">Administrador</option>
                        <option value="user">Usuario</option>
                    </select>
                </label>

                <input type="submit" value={isRegistrando ? "Registrado" : "Iniciar session"} />
            </form>
            <button onClick={() => setIsregistrando(!isRegistrando)}>
                {isRegistrando ? "Ya tengo una cuenta" : "Quiero registrado"}
            </button>
        </div>
    )
}

export default Login;

import React, { useState } from "react";
import "../style.css";
import axios from "axios"
import {Link, useNavigate} from 'react-router-dom'

/* Le formulaire a deux champs, nom d'utilisateur et mot de passe
 qui sont gérés via useState et onChange handlers, qui mettent à jour le state avec les valeurs des champs.
 */
function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleUsernameInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)

    /* appelée lorsque le formulaire est soumis.
     Elle fait une requête POST à une URL spécifique avec les informations d'identification saisies.
      Si la réponse est true, elle utilise useNavigate pour rediriger l'utilisateur vers la page de jeu.
     */
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3500/auth', {
            username: username,
            password: password
        }).then((res) => {
            console.log(username)
            console.log(username)
            console.log(res.data)
            if (res.data === true) {
                navigate('/game')
            }
        })
    }

    return (
        //Code pour front de la page :
        <div className="login-container">
            <h1 className="logo">
                <span className="red">P</span>
                <span className="blue">U</span>
                <span className="yellow">N</span>
                <span className="green">T</span>
                <span className="red">O</span>
            </h1>
            <div className="login-form">
                <h2>Connectez-vous</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" onChange={handleUsernameInput}/>

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" onChange={handlePwdInput} />

                    <button type="submit">Connexion</button>
                    <Link to={"/signIn"}>
                        <button type="button" className="inscription-button">
                            Inscription
                        </button>
                    </Link>
                </form>
            </div>

        </div>
    );
}

export default LoginPage;

import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import '../style.css'

// Les constantes USERNAME_REGEX, PWD_REGEX et BIRTHDAY_REGEX sont des expressions régulières utilisées pour valider les entrées de l'utilisateur.
const USERNAME_REGEX = /^.{4,}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
const BIRTHDAY_REGEX = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/

/* Le composant SignIn utilise useState pour stocker les valeurs de l'utilisateur pour les champs d'entrée tels que le nom d'utilisateur
 le mot de passe, la confirmation de mot de passe et l'anniversaire.
  Pour chaque champ, il y a également une variable booléenne pour vérifier si la saisie de l'utilisateur est valide.
 */
const SignIn = () => {
    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)

    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [validPasswordConfirmation, setValidPasswordConfirmation] = useState(false)

    const [anniversary, setAnniversary] = useState('')
    const [validAnniversary, setValidAnniversary] = useState(false)

    const navigate = useNavigate()
/*  Le composant utilise également useEffect pour valider la saisie de l'utilisateur lors de la modification des champs d'entrée.
    Il y a un canSave booléen qui est mis à jour en fonction de la validité de toutes les entrées.
 */
    useEffect(() => {
        setValidUsername(USERNAME_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        setValidPasswordConfirmation(password === passwordConfirmation)
    }, [password, passwordConfirmation])

    useEffect(() => {
        setValidAnniversary(BIRTHDAY_REGEX.test(anniversary))
    }, [anniversary])

    /* Les fonctions handleUsernameInput, handlePasswordInput, handlePasswordConfirmationInput et handleAnniversaryInput
     sont des gestionnaires d'événements pour mettre à jour les valeurs d'entrée lorsque l'utilisateur tape dans chaque champ.
     */
    const handleUsernameInput = (e) => setUsername(e.target.value)
    const handlePasswordInput = (e) => setPassword(e.target.value)
    const handlePasswordConfirmationInput = (e) => setPasswordConfirmation(e.target.value)
    const handleAnniversaryInput = (e) => setAnniversary(e.target.value)

    const canSave = [validUsername, validPassword, validPasswordConfirmation, validAnniversary].every(Boolean)


    /* La fonction onSubmit est appelée lorsque l'utilisateur soumet le formulaire.
    Si toutes les entrées sont valides, la fonction envoie une requête POST avec les informations de l'utilisateur à
    Sun serveur local. Si la requête est réussie, l'utilisateur est redirigé vers la page du jeu.
     */
    const onSubmit = async (e) => {
        e.preventDefault()
        if (canSave) {
            axios.post('http://localhost:3500/users', {
                username: username,
                password: password,
                anniversary: anniversary
            }).then((res) => {
                console.log(username, password, anniversary)
                if (res.status === 201) {
                    navigate('/game')
                } else {
                    console.log(res)
                }
            })
        }
    }

        return (
            <div className="login-container">
                <h1 className="logo">
                    <span className="red">P</span>
                    <span className="blue">U</span>
                    <span className="yellow">N</span>
                    <span className="green">T</span>
                    <span className="red">O</span>
                </h1>
                <div className="login-form">
            <form className="signup-form" onSubmit={onSubmit}>
                    <h2>Inscription</h2>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={username} onChange={handleUsernameInput} />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordInput}/>

                    <label htmlFor="password">Password confirmation</label>
                    <input type="password" id="passwordConfirmation" value={passwordConfirmation} onChange={handlePasswordConfirmationInput}/>

                    <label htmlFor="anniversary">Anniversary</label>
                    <input type="anniversary" id="anniversary" value={anniversary} onChange={handleAnniversaryInput}/>

                    <button type="submit">S'inscrire</button>
            </form>
            </div>
            </div>
        );
}

export default SignIn


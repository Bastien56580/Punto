// On importe le modèle 'User' défini dans un autre fichier pour pouvoir utiliser les fonctions MongoDB pour accéder à la collection 'users'
const User = require('../models/User')

// On importe le module 'bcryptjs' pour pouvoir utiliser les fonctions de hachage de mot de passe
const bcrypt = require('bcryptjs')

// On importe le module 'express-async-handler' pour pouvoir gérer les erreurs asynchrones de manière centralisée
const asyncHandler = require('express-async-handler')

// On définit la fonction asynchrone 'login' qui permet à un utilisateur de se connecter avec un nom d'utilisateur et un mot de passe
const login = asyncHandler(async (req, res) => {
// On récupère le nom d'utilisateur et le mot de passe à partir de la demande HTTP
    const {username, password} = req.body
// On affiche le nom d'utilisateur et le mot de passe dans la console pour le débogage
    console.log("back", username, password)

    // Si le nom d'utilisateur ou le mot de passe est manquant, on renvoie une erreur 400 'Bad Request' avec un message
    if (!username || !password) {
        return res.status(400).json({message: 'All fields are required'})
    }

// On recherche l'utilisateur dans la base de données MongoDB à partir du nom d'utilisateur, en excluant le champ '_id' et en récupérant le résultat sous forme d'objet JavaScript
    const foundUser = await User.findOne({username}).lean().exec()

// Si l'utilisateur n'est pas trouvé ou s'il est inactif, on renvoie une erreur 401 'Unauthorized' avec un message
    if (!foundUser || !foundUser.active) {
        return res.status(401).json({message: 'Unauthorized'})
    }

// On compare le mot de passe fourni avec le mot de passe haché stocké dans la base de données MongoDB
    const match = await bcrypt.compare(password, foundUser.password)

// Si les mots de passe ne correspondent pas, on renvoie une erreur 401 'Unauthorized' avec un message
    if (!match) return res.status(401).json({message: 'Unauthorized'})

// Sinon, on renvoie une réponse JSON indiquant que la connexion a réussi
    res.json(true)

})

// On exporte la fonction 'login' pour pouvoir l'utiliser dans d'autres fichiers JavaScript
module.exports = {
    login
}
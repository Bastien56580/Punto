const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const {id} = require("date-fns/locale");

    //@desc Get all users
    //@route Get /users
    //@access Private
/*  récupère tous les utilisateurs stockés dans la base de données, en excluant leur mot de passe
    et les renvoie sous forme d'objet JSON. Si aucun utilisateur n'est trouvé, elle renvoie une réponse avec le statut 400
    et un message d'erreur approprié.
 */
const getAllUsers = asyncHandler(async (req, res) =>{
    const user = await User.find().select('-password').lean()
    if(!user?.length){
        return res.status(400).json({message: 'No users found'})
    }
    res.json(user)
})

//@desc Create new user
//@route Post /users
//@access Private
/* crée un nouvel utilisateur avec les données envoyées en POST à l'API.
Elle vérifie d'abord que toutes les données requises sont présentes, puis vérifie si l'utilisateur existe déjà
dans la base de données. Si c'est le cas, elle renvoie une réponse avec le statut 400 et un message d'erreur.
Sinon, elle hache le mot de passe de l'utilisateur, stocke l'utilisateur dans la base de données et renvoie une réponse
avec le statut 201 et un message de succès, ou avec le statut 400 et un message d'erreur si les données de l'utilisateur
sont invalides.
 */
const createNewUser = asyncHandler(async (req, res) =>{
    const { username, password, anniversary } = req.body

    //confirm data
    if(!username || !password || !anniversary){
        return res.status(400).json({meessage:'Tous les champs sont requis'})
    }

    //check si duplication

    const duplicate = await User.findOne({ username }).lean().exec()

    if(duplicate){
        return res.status(400).json({message: 'Utilisateur dupliqué'})
    }

    //hash password

    const hashedPwd = await bcrypt.hash(password, 10) //salt

    const userObject = { username, "password": hashedPwd, anniversary}

        //Creation utilisateur + stockage

    const user = await User.create(userObject)
    if(user){
        res.status(201).json({message : `Nouvel utilisateur ${username} crée`})
    } else {
        res.status(400).jso({message : `Invalid user data received`})
    }
})

//@desc Update user
//@route PATCH /users
//@access Private
/* met à jour les informations d'un utilisateur existant avec les données envoyées en PATCH à l'API.
Elle vérifie d'abord que toutes les données requises sont présentes, puis vérifie si l'utilisateur existe dans la base de données.
Si ce n'est pas le cas, elle renvoie une réponse avec le statut 400 et un message d'erreur.
Sinon, elle vérifie si le nom d'utilisateur est déjà utilisé par un autre utilisateur, et si c'est le cas, elle renvoie une réponse avec le statut 409 et un message d'erreur.
Sinon, elle met à jour les informations de l'utilisateur dans la base de données et renvoie une réponse avec le statut 200 et un message de succès.
 */
const updateUser = asyncHandler(async (req, res) =>{
    const { id, username, roles, active, password} = req.body

    //Confirmation des données

    if(!id || !username || !Array.isArray(roles) || !roles.length || typeof active !=='boolean'){
        return res.status(400).json({message:'Tous les champs sont requis'})
    }

    const user = await User.findById(id).exec()

    if(!user){
        return res.status(400).json({message:'Utilisateur non trouvé'})
    }

    //check si duplication
    const duplicate = await User.findOne({username}).lean().exec
    //autorisation d'update sur l'utilisateur original
    if(duplicate && duplicate?._id.toString() !==id){
        return res.status(409).json({message: 'Username dupliqué'})
    }

    user.username = username
    user.roles = roles
    user.active = active

    if(password){
        //Hash pwd
        user.password = await bcrypt.hash(password,10)//salt
    }

    const updatedUser = await user.save()

    res.json({message: `${updatedUser.username} updated !`})
})

//@desc Delete user
//@route Delete /users
//@access Private
/* supprime un utilisateur existant avec les données envoyées en DELETE à l'API.
 Elle vérifie d'abord que l'ID de l'utilisateur est présent, puis vérifie si l'utilisateur existe dans la base de données.
  Si ce n'est pas le cas, elle renvoie une réponse avec le statut 400 et un message d'erreur.
   Sinon, elle vérifie si l'utilisateur a des notes assignées.
    Si c'est le cas, elle renvoie une réponse avec le statut 400 et un message d'erreur.
    Sinon, elle supprime l'utilisateur de la base de données et renvoie une réponse avec le statut 200 et un message de succès.
 */
const deleteUser = asyncHandler(async (req, res) =>{
    const { id } = req.body

    if(!id){
        return res.status(400).json({message: 'User ID Required'})
    }

    const notes = await Note.findOne({user: id}).lean().exec()
    if(notes?.length){
        return res.status(400).json({message:'User has assigned notes'})
    }

    const user = await User.findById(id).exec()

    if(!user){
        return res.status(400).json({message:'Utilisateur non trouvé'})
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} supprimé`

    res.json(reply)
})

/* gère l'authentification des utilisateurs.
Elle recherche un utilisateur dans la base de données en utilisant le nom d'utilisateur fourni en POST.
 Si l'utilisateur n'existe pas, elle renvoie une réponse avec le statut 401 et un message d'erreur.
  Sinon, elle vérifie que le mot de passe fourni correspond au mot de passe haché stocké dans la base de données.
   Si ce n'est pas le cas, elle renvoie une réponse avec le statut 401 et un message d'erreur.
    Sinon, elle renvoie une réponse avec le statut 200 et un token d'authentification.
 */
const login = (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user === null) {
                return res.status(401).json({
                    message: 'Connexion impossible'
                });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((valid) => {
                        if (!valid) {
                            return res.status(401).json({
                                message: 'Connexion impossible'
                            });
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: 'TOKEN'
                            });
                        }
                    })
                    .catch((error) => {
                        res.status(500).json({ error });
                    });
            }
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
};


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    login
}
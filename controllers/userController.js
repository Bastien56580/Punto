const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

    //@desc Get all users
    //@route Get /users
    //@access Private
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
const createNewUser = asyncHandler(async (req, res) =>{
    const { username, password, roles } = req.body

    //confirm data
    if(!username || !password || !Array.isArray(roles) || !roles.length){
        return res.status(400).json({meessage:'Tous les champs sont requis'})
    }

    //check si duplication

    const duplicate = await User.findOne({ username }).lean().exec()

    if(duplicate){
        return res.status(400).json({message: 'Utilisateur dupliqué'})
    }

    //hash password

    const hashedPwd = await bcrypt.hash(password, 10) //salt

    const userObject = { username, "password": hashedPwd, roles}

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

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}
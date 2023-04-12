const mongoose = require('mongoose')
/*
Création des schémas pour faire entrer les données des utilisateurs dans la base de données
 */
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    anniversary:[{
        type: String,
        required: true
    }],
    active:{
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('User', userSchema)
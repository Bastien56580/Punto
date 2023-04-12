const mongoose = require('mongoose')
/*
Création des schémas de cartes pour la mise en base de données des cartes de jeu
 */
const cardSchema = new mongoose.Schema({
    value:{
        type: Number,
        required: true,
        trim : true

    },
    color:{
        type: String,
        required: true,
        trim: true
    },

    image:{
        type : Buffer,
        required: true,
        trim: true
    }

})

module.exports = mongoose.model('Card', cardSchema)
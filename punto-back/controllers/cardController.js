const Card = require('../models/Card')
const asyncHandler = require('express-async-handler')


//@desc Get all card
//@route Get /card
//@access Private
/*  cette fonction récupère toutes les cartes enregistrées dans la base de données et renvoie un JSON
contenant ces cartes. Si aucune carte n'est trouvée, elle renvoie une réponse d'erreur avec le code 400 et un message.
 */
const getAllCards = asyncHandler(async (req, res) =>{
    const card = await Card.find().lean()
    if(!card?.length){
        return res.status(400).json({message: 'No cards found'})
    }
    res.json(card)
})

//@desc Create new card
//@route Post /card
//@access Private
//test
/*  fonction crée une nouvelle carte avec les données fournies dans le corps de la requête.
Elle vérifie également que les champs color et value sont fournis dans le corps de la requête.
Si l'un des champs est manquant, elle renvoie une réponse d'erreur avec le code 400 et un message.
 */
const createNewCard = asyncHandler(async (req, res) =>{
    const { color, value } = req.body

    //confirm data
    if(!color || !value){
        return res.status(400).json({meessage:'Tous les champs sont requis'})
    }

})


module.exports = {
    getAllCards,
    createNewCard,

}
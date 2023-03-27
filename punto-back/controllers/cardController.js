const Card = require('../models/Card')
const asyncHandler = require('express-async-handler')


//@desc Get all card
//@route Get /card
//@access Private
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
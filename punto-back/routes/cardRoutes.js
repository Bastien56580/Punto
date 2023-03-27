const express = require('express')
const router = express.Router()
const cardController = require('../controllers/cardController')

router.route('/')
    .get(cardController.getAllCards)
    .post(cardController.createNewCard)

module.exports = router
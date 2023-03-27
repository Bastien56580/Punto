const express = require('express')
const router = express.Router()
const boardController = require('../controllers/boardController')

router.route('/')
    .get(boardController.getBoard)
    .post(boardController.createNewBoard)
    .patch(boardController.updateBoard)

module.exports = router
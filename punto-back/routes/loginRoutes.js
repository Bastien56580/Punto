const express = require('express')
const router = express.Router()
const boardController = require('../controllers/loginController')

router.route('/')
    .get(loginController.getLogin)
    .post(loginController.createNewLogin)
    .patch(loginController.updateLogin)
    .delete(loginController.deleteLogin)

module.exports = router;
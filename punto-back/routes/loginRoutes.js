const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginController')

router.route('/')
    .get(loginController.getLogin)
    .post(loginController.createNewLogin)
    .post(loginController.login)
    .patch(loginController.updateLogin)
    .delete(loginController.deleteLogin)

module.exports = router;
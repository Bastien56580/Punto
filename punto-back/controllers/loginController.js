require('dotenv').config();
const User = require('../models/User.model');


const loginController = {
    register: async (req, res) => {
        try {
            await User.create({
                username: req.body.username,
                password: req.body.password,
            })
            res.json({ status: "201"});
        } catch (error) {
            res.status(403).json(error.message);
            console.log(error);
        }
    },

    login : async (req, res) => {
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password,
        });
        if (user) {
            return res.json({ status: "200", user: true });
        } else {
            return res.json({ status: "KO", user: false });
        }
    }

}

module.exports = authController;
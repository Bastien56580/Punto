const mongoose=require('mongoose')

const connexion = async() => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true, useUnifiedTopology: true
        })
    } catch (err){
        console.log(err)
    }
}
module.exports = connexion

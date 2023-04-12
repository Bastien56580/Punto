// On importe le module 'mongoose' pour utiliser le framework MongoDB
    const mongoose=require('mongoose')

// On définit une fonction asynchrone 'connexion' qui se connecte à la base de données MongoDB
const connexion = async() => {
    try {
// On désactive le mode strict des requêtes pour autoriser certaines requêtes MongoDB non conformes à la norme
        mongoose.set('strictQuery', false)
// On se connecte à la base de données MongoDB en utilisant l'URL stockée dans la variable d'environnement 'DATABASE_URI'
        await mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true, useUnifiedTopology: true
        })
    } catch (err){
// Si une erreur se produit lors de la connexion, on la capture et on l'affiche dans la console
        console.log(err)
    }
}

// On exporte la fonction 'connexion' pour qu'elle soit utilisée dans d'autres fichiers JavaScript
module.exports = connexion
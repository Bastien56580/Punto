require ('dotenv').config() // Charger les variables d'environnement
const express = require('express') // Application serveur
const app = express()
const path = require('path') //Manipuler les chemins de fichiers
const http = require('http'); // Création du serveur
const server = http.createServer(app);
const { Server } = require("socket.io"); //Gérer les connexions web socket
const io = new Server(server);
const { logger } = require('./middleware/logger') //Logger les requêtes
const errorHandler = require('./middleware/errorHandler') //Traitement des erreurs
const cookieParser = require('cookie-parser') // analyser les cookies
const cors = require('cors') // Configurer la politique CORS
const connexion = require('./config/dbConnect') // pour établir la connexion avec la base de données
const corsOption = require ('./config/corsOption')
const mongoose = require("mongoose"); // pour créer un schéma de modèle pour les cartes de jeu.
const PORT = process.env.PORT || 3500 // Le port d'écoute du serveur est défini dans une constante PORT, qui est soit une variable d'environnement, soit 3500 par défaut.

console.log(process.env.NODE_ENV)

/* La connexion à la base de données est établie en appelant connexion()
 qui est défini dans le fichier dbConnect.js.
  Lorsque la connexion est établie, le serveur est démarré en appelant app.listen() avec le port d'écoute défini auparavant.
 */

connexion()

/* Les middlewares sont configurés avec app.use(), qui gère l'ordre d'exécution des middlewares.
 Les middlewares sont, dans l'ordre : le logger, la politique CORS, le middleware pour analyser les données JSON dans les requêtes
  le middleware pour analyser les cookies, le middleware pour servir les fichiers statiques à partir du répertoire public
   les routes pour la racine, les utilisateurs, les cartes de jeu et l'authentification.
    Si une requête ne correspond à aucune des routes, le middleware final renvoie une réponse 404.
 */

app.use(logger)

app.use(cors(corsOption))

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))

app.use('/users', require('./routes/userRoutes'))

app.use('/cards', require('./routes/cardRoutes'))

app.use('/auth', require('./routes/authentificationRoutes'))

app.all('*', (req,res) =>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }else if (req.accepts('json')){
        res.json({message: '404 Not Found'})
    }else{
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)



mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    const server = app.listen(PORT, () => console.log(`Server running on port ${PORT} at http://localhost:3500`))
    io.on('connection', (socket) => {
        console.log('a user connected');
    });
})

mongoose.connection.on('error', err => {
    console.log(err)
})
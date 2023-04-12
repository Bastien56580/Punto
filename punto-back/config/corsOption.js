// On importe le module 'allowedOrigins' qui contient la liste d'origines autorisées
const allowedOrigins = require('./allowedOrigins')

// On définit les options pour la gestion du Cross-Origin Resource Sharing (CORS)
const corsOptions = {
// La fonction origin vérifie si l'origine de la requête est autorisée
    origin: (origin, callback) =>{
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
// Si l'origine est autorisée ou s'il n'y a pas d'origine (dans le cas d'une requête locale), on appelle le callback avec le paramètre 'true'
            callback(null, true)
        } else {
// Si l'origine n'est pas autorisée, on appelle le callback avec une erreur
            callback(new Error('Not allowed by Cors'))
        }
    },
// On autorise les requêtes avec les informations d'authentification (cookies, jetons...)
    credentials: true,
// On définit le code de statut HTTP à renvoyer si les options pré-vol (OPTIONS) sont validées
    optionsSuccessStatus: 200
}

// On exporte les options CORS pour qu'elles soient utilisées dans d'autres fichiers JavaScript
module.exports = corsOptions
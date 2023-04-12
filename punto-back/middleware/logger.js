const { format } = require('date-fns')
const { v4:uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

/* La fonction logEvents utilise le module date-fns pour formater la date actuelle et le module uuid pour générer un identifiant unique.
 Elle prend en paramètres un message et le nom du fichier journal dans lequel enregistrer l'événement.
  Elle ajoute ensuite une ligne au fichier journal contenant la date et l'heure, l'identifiant unique, le message et un retour à la ligne.
   Si le dossier de journal n'existe pas, il est créé.
 */
const logEvents = async (message, logFileName) =>{
    const dateTime = `${format(new Date(),`yyyyMMdd\tHH:mm:ss`)}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`


    try{
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (err){
        console.log(err)
    }
}

/* La fonction logger est un middleware Express qui enregistre chaque requête entrante en appelant la fonction logEvents avec le nom de fichier journal reqLog.log.
 Elle affiche également la méthode de la requête HTTP et son chemin dans la console.
  Enfin, elle appelle next() pour passer au middleware suivant.
 */
const logger = (req, res, next) =>{
    logEvents(`${req.method}\t${req.headers.origin}`,'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()

}

module.exports = {logEvents, logger }

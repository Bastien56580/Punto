require ('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connexion = require('./config/dbConnect')
const corsOption = require ('./config/corsOption')
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)

connexion()

app.use(logger)

app.use(cors(corsOption))

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))

app.use('/users', require('./routes/userRoutes'))

app.use('/cards', require('./routes/cardRoutes'))

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
const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')
const cors = require('cors')

const app = express()
const port = 3000

const server = require('http').createServer(app);

const io = require('socket.io')(server)
// const { Server } = require('socket.io');
// const io = new Server(server);


//Ajout d'un écouteur pour les nouvelles connexions

io.on('connection', (socket) => {
    console.log('Utilisateur connecté avec l\'id:', socket.id)
    socket.on('disconnect', () => {
        console.log('L\'utilisateur', socket.id, ' est déconnecté');
    })
    socket.on('chat message', (msg) => {

        io.emit('chat message', msg);
        console.log(`Message de la part de ${socket.id} :`, msg);

    })

})

// Utilisation d'un middleware personnalisé

// app.use((req, res, next) => {
//     console.log(`URL : ${req.url}`);
//     next();
// })

// Utilisation des middlewares
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev')) //Log in console
    .use(bodyParser.json())   //Convertir les entrées en JSON
    .use(cors())

    // configurer l'utilisaton de CORS

    // .use(cors(
    //     {
    //         "origin": "*",
    //         "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    //         "preflightContinue": false,
    //         "optionsSuccessStatus": 204
    //     }))

sequelize.initDb()
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
//Les points de terminaison

require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

// Gestion des erreurs 404
app.use(({ res }) => {
    const message = 'Impossible de trouver la ressource ! Vous pouvez essayer une autre URL.'
    res.status(404).json({ message })
})

server.listen(port, () => {
    console.log(`Listening to port : ${port}`);
});
//app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))



const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = 3000

var http = require("http").createServer(app);
var io = require("socket.io")(http);

//Ajout d'un écouteur pour les nouvelles connexions
io.on('connection', (socket) => {
    console.log('Utilisateur connecté', socket.id);
})
//Utilisation d'un middleware personnalisé
// app.use((req, res, next) => {
//     console.log(`URL : ${req.url}`);
//     next();
// })

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

//sequelize.initDb() 
app.get('/', (req, res) => {
    res.send("Hello Worlds ! ")
})
//Les points de terminaison

require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
// Gestion des erreurs 404
app.use(({res}) =>{
    const message = 'Impossible de trouver la ressource ! Vous pouvez essayer une autre URL.'
    res.status(404).json({message}) 
})

// add listener for new connection
io.on("connection",  (socket) => {
    // this is socket for each user
    console.log("User connected", socket.id)
});


http.listen(port, () => {
    console.log(`Listening to port : ${port}`);
});
//app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))

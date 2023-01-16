const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const UserModel = require ('../models/user')
const pokemons = require('./mock-pockemon')
const users = require('./mock-users')
const bcrypt = require('bcrypt')


const sequelize = new Sequelize('pokedex', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT+1',
  },
  logging: false
})
  
const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
  
const initDb = () => {
//Synchroniser la base de donnés afin d'insérer le nouvel tableau

  return sequelize.sync({force: true}).then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
        //types: pokemon.types.join()
      }).then(pokemon => console.log(pokemon.toJSON()))
    })
bcrypt.hash('pikachu',10)
.then(crypt => {
  User.create({
    username:'pikachu',
    password:crypt
  })
.then(user => console.log('test',user.toJSON())) 
})  
    console.log('La base de donnée a bien été initialisée !')
  })
}
  
module.exports = { 
  initDb, Pokemon, User
}
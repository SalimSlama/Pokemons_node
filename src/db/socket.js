
const pokemons = require('./mock-pockemon')
const users = require('./mock-users')



  
const initSocket = () => {
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
    }),
    users.map(user => {
      User.create({
        name: user.name
      })
    })
    console.log('La base de donnée a bien été initialisée !')
  })
}
  
module.exports = { 
  initSocket
}
const { Op } = require('sequelize')
const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {

    //Rechercher un pokémon par nom
    if (req.query.name) {
      const name = req.query.name
      //Limiter le nombre des résultats recherchés
      const limit = parseInt(req.query.limit) || 5
      //Rechercher et calculer le totale des résultats
if(name.length < 2){
  const message = 'Le terme de recherche doitn contenir au moins 2 caractéres'
  return res.status(400).json({message})
}

      return Pokemon.findAndCountAll({
        where: {
          name: // 'name' est la propriété du modéle pokémon
          {
            [Op.like]: `%${name}%`  // 'name' est le critére de la recherche
          }
        },
        order: ['name'],
        // Limiter le résultat de notre recherche
        limit: limit
      })
        .then(({count, rows}) => {
          const message = `Il y a ${count} pokémons qui correspondent au terme de recherche ${name}.`
          res.json({ message, data: rows })
        })
    } else {
      //Afficher la liste des tous les pokémons
      Pokemon.findAll(({order: ['name']})) 
        .then(pokemons => {
          const message = 'La liste des pokémons a bien été récupérée.'
          res.json({ message, data: pokemons })
        })
        .catch(error => {
          const message = 'La liste des pokémons n\'a pas pu être récupérer. Réessayer dans quelques instants'
          res.status(500).json({ message, data: error })
        })
    }

  })
}
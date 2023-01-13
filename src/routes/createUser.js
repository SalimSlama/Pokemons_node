const { ValidationError, UniqueConstraintError } = require('sequelize')
const { User } = require('../db/sequelize')

module.exports = (app) => {
  app.post('/api/users', (req, res) => {
    User.create(req.body)
      .then(user => {
        const message = `L\'utilisateur ${req.body.name} a bien été crée.`
        res.json({ message, data: user })
      })
      .catch(error => {
        const message = 'L\'utilisateur n\'a pas pu être ajouté. Réessayée dans quelques instants.'
        res.status(500).json[{ message, data: error }]
      })
  })
}
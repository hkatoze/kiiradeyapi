const { User } = require("../db/sequelize");
const { ValidationError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.put("/api/users/:userId", auth, (req, res) => {
    const id = req.params.userId;

    User.findByPk(id)
      .then((user) => {
        if (user === null) {
          const message = `L'utilisateur demandé n'existe pas. Réessayer avec un autre identifiant.`;
          return res.status(404).json({ message });
        }
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        const message = `L'utilisateur n'a pas pu être modifié. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};

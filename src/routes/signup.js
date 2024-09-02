const { ValidationError, UniqueConstraintError } = require("sequelize");
const bcrypt = require("bcrypt");
const auth = require("../auth/auth");
const { User } = require("../db/sequelize");

module.exports = (app) => {
  app.post("/api/signup", auth, (req, res) => {
    User.create({
      nom: req.body.nom,
      prenom: req.body.prenom,
      telephone: req.body.telephone,
      role: req.body.role,
      url_photo: req.body.url_photo,
    })
      .then((user) => {
        const message = `Compte crée avec succès`;

        res.json({ message, data: user });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message });
        }

        console.log(error);
        const message = `Erreur de création du compte. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};

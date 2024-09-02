const { ValidationError } = require("sequelize");
const auth = require("../auth/auth");
const { Delivery } = require("../db/sequelize");

module.exports = (app) => {
  app.post("/api/deliveries/", auth, (req, res) => {
    Delivery.create(req.body)
      .then((delivery) => {
        const message = `Nouvelle livraison ajoutée.`;

        res.json({ message, data: delivery });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        const message = `La livraison n'a pas pu être ajouté.Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};

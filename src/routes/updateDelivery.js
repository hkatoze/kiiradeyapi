const { Delivery } = require("../db/sequelize");
const { ValidationError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.put("/api/deliveries/:deliveryId", auth, (req, res) => {
    const id = req.params.deliveryId;

    Delivery.findByPk(id)
      .then((delivery) => {
        if (delivery === null) {
          const message = `La livraison demandée n'existe pas. Réessayer avec un autre identifiant.`;
          return res.status(404).json({ message });
        }
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        const message = `La livraison n'a pas pu être modifié. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};

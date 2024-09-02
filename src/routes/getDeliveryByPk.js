const { Delivery } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/deliveries/:deliveryId", auth, (req, res) => {
    const id = req.params.deliveryId;

    Delivery.findByPk(id)
      .then((delivery) => {
        if (delivery === null) {
          const message = `Cette livraison n'existe pas. Réessayer avec un autre identifiant.`;

          return res.status(404).json({ message });
        }
        const message = `La livraison  a bien été reccupérée.`;

        res.json({ message, data: delivery });
      })
      .catch((error) => {
        const message = `La livraison n'a pas pu être reccupéré. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};

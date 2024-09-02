const { Delivery } = require("../db/sequelize");
const { Op } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/deliveries", auth, (req, res) => {
    if (req.query.search) {
      const searchQuery = req.query.search;

      return Delivery.findAll({
        where: {
          status: {
            [Op.like]: `%${searchQuery}%`,
          },
        },
      }).then((deliveries) => {
        const message = `La recherche pour ${searchQuery} a trouvé ${deliveries.length} résultats`;
        res.json({ message, data: deliveries });
      });
    }

    Delivery.findAll()
      .then((deliveries) => {
        const message = `La liste complète des livraisons a bien été récupérée.`;
        res.json({ message, data: deliveries });
      })
      .catch((error) => {
        const message = `La liste complète des livraisons n'a pas pu être récupérée. Réessayez dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};

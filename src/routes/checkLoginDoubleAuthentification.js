const bcrypt = require("bcrypt");
const { User } = require("../db/sequelize");

module.exports = (app) => {
  // Endpoint pour la validation du code de vérification et la modification du mot de passe
  app.post("/api/check-code", async (req, res) => {
    const { phone, verificationCode } = req.body;

    try {
      // Vérification si l'utilisateur existe
      const user = await User.findOne({ where: { phone } });
      if (!user) {
        return res
          .status(404)
          .json({
            message: "Aucun utilisateur trouvé avec ce numéro de téléphone.",
          });
      }

      // Vérification du code de vérification
      if (user.authentificationCode !== verificationCode) {
        return res
          .status(400)
          .json({ message: "Code de vérification incorrect." });
      }

      // Modification du mot de passe
      user.authentificationCode = null; // Réinitialisation du code de vérification après utilisation
      await user.save();

      return res
        .status(200)
        .json({ message: "Connexion réussie !", data: user });
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "Une erreur est survenue lors de votre connexion ",
          error,
        });
    }
  });
};

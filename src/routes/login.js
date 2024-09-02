const bcrypt = require("bcrypt");
const { User } = require("../db/sequelize");

const {
  generateVerificationCode,
} = require("../utilsFunctions/generateVerificationCode");
const {
  sendVerificationCode,
} = require("../utilsFunctions/sendVerificationCode");

module.exports = (app) => {
  // Endpoint pour la demande de réinitialisation du mot de passe
  app.post("/api/login", async (req, res) => {
    const { telephone } = req.body;

    try {
      // Vérification si l'utilisateur existe
      const user = await User.findOne({ where: { telephone } });
      if (!user) {
        return res.status(404).json({
          message: "Ce numéro de téléphone ne dispose pas de compte.",
        });
      }

      // Génération d'un code de vérification unique
      const verificationCode = generateVerificationCode();

      // Stockage du code de vérification dans la base de données
      user.authentificationCode = verificationCode;
      await user.save();

      // Envoi du code de vérification par sms
      await sendVerificationCode(telephone, verificationCode);

      return res.status(200).json({
        message:
          "Un code de vérification a été envoyé sur votre numéro de téléphone.",
        verificationCode: verificationCode,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Une erreur est survenue lors de la connexion.",
        error,
      });
    }
  });
};

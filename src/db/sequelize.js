const { Sequelize, DataTypes } = require("sequelize");

const UserModel = require("./models/User");
const DeliveryModel = require("./models/Delivery");
const AdminModel = require("./models/Admin");

const sequelize = new Sequelize(
  "u235953842_kiiradey",
  "u235953842_lelabo",
  "Kind@1404",
  {
    host: "srv1301.hstgr.io",
    dialect: "mysql",
    dialectOptions: {},
    logging: false,
  }
);

const User = UserModel(sequelize, DataTypes);
const Admin = AdminModel(sequelize, DataTypes);
const Delivery = DeliveryModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync().then((_) => {
    console.log(`La base de données a bien été initialisée !`);
    /*   Temperament.bulkCreate(temperaments).then((_) =>
      console.log(`Temperaments ajoutés avec succès`)
    );
    Filiere.bulkCreate(filieres).then((_) =>
      console.log(`Filières ajoutées avec succès`)
    ); */
  });
};

module.exports = {
  initDb,
  User,
  Admin,
  Delivery,
};

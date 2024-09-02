module.exports = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "Delivery",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pickup_location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      delivery_location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      package_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("PENDING", "ACCEPTED", "COMPLETED"),
        defaultValue: "PENDING",
      },
      livreur_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
};

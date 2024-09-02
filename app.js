// @ts-nocheck
const bodyParser = require("body-parser");
const express = require("express");
const { initDb } = require("./src/db/sequelize");
const favicon = require("serve-favicon");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
app
  .use(bodyParser.json())
  .use(cors())
  .use(favicon(__dirname + "/favicon.ico"));
initDb();

/* ........All routes list........... */
require("./src/routes/home")(app);
require("./src/routes/signupToApi")(app);
require("./src/routes/loginToApi")(app);

require("./src/routes/getUserByPk")(app);
require("./src/routes/getAdminByPk")(app);
require("./src/routes/updateUser")(app);
require("./src/routes/deleteUser")(app);
require("./src/routes/getAllUsers")(app);
require("./src/routes/getAllAdmins")(app);
require("./src/routes/signup")(app);
require("./src/routes/login")(app);

require("./src/routes/createDelivery")(app);
require("./src/routes/getDeliveryBypk")(app);
require("./src/routes/getAllDeliveries")(app);
require("./src/routes/updateDelivery")(app);
require("./src/routes/deleteDelivery")(app);

require("./src/routes/checkLoginDoubleAuthentification")(app);

//404 error managment
app.use(({ res }) => {
  const message = `Impossible de trouver la ressource demandée! Vous pouvez essayer une autre URL.`;
  res.status(404).json({ message });
});

app.listen(port, () => {
  console.log(`Notre api a démaré sur : http://localhost:${port}`);
});

module.exports = app;

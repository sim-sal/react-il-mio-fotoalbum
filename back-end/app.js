const express = require("express");
const dotenv = require("dotenv");
// admin
const photosRouterAdmin = require("./routers/admin/photos");
const categoriesRouterAdmin = require("./routers/admin/categories");
const usersRouterAdmin = require("./routers/admin/users");
const messagesRouterAdmin = require("./routers/admin/messages");
// guets
const photosRouterGuests = require("./routers/guests/photos");
const messagesRouterGuests = require("./routers/guests/messages");

const cors = require('cors');
const app = express();
const port = 3000;

dotenv.config();

// setto i file statici
app.use(express.static("public"));

// Abilita CORS per tutte le route
app.use(cors());

// application/json
app.use(express.json());
app.listen(port, () => {
    console.log(`App attiva su http://localhost:${port}`);
})

// ROUTERS ADMIN
// photos
app.use("/admin/photos", photosRouterAdmin);
// categories
app.use("/admin/categories", categoriesRouterAdmin);
//user
app.use("/admin/users", usersRouterAdmin);
//message
app.use("/admin/messages", messagesRouterAdmin);


// ROUTERS PUBLIC
// photos
app.use("/photos", photosRouterGuests);
//message
app.use("/messages", messagesRouterGuests);
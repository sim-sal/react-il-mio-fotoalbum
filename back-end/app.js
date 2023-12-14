const express = require("express");
const dotenv = require("dotenv");
const photosRouter = require("./routers/photos");
const categoriesRouter = require("./routers/categories");

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

// ROUTERS
// photos
app.use("/photos", photosRouter);
// categories
app.use("/categories", categoriesRouter);
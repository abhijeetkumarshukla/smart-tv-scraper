const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const scraperRoutes = require("./routes/scraperRoutes");

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.use("/api", scraperRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
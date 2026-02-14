const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const recipeRoutes = require("./routes/recipes.js"); // Keep .js if using Node >= 14

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Main API route
app.use("/api", recipeRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
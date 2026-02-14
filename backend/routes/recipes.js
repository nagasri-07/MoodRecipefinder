const express = require("express");
const axios = require("axios");
const https = require("https");

const router = express.Router();

const moodTasteMap = {
  Happy: {
    Sweet: ["cupcakes", "fruit tart", "ice cream"],
    Spicy: ["spicy noodles", "hot wings", "salsa"],
    Savory: ["pasta", "pizza", "sandwich"]
  },
  Sad: {
    Sweet: ["chocolate cake", "brownies"],
    Spicy: ["ramen", "chili"],
    Savory: ["mac and cheese", "soup"]
  },
  Tired: {
    Sweet: ["energy bars", "smoothie"],
    Spicy: ["curry", "spicy stir fry"],
    Savory: ["omelette", "toast"]
  }
};

router.get("/getRecipes", async (req, res) => {
  const { mood, taste } = req.query;
  const keywords = moodTasteMap[mood]?.[taste] || ["recipe"];
  const query = keywords[Math.floor(Math.random() * keywords.length)];
  try {
    const response = await axios.get(
      "https://api.spoonacular.com/recipes/complexSearch",
      {

        params: {
          query,
          apiKey: process.env.SPOONACULAR_API_KEY,
          number: 5
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
      }
    );

    res.json(response.data.results);
  } catch (error) {
    console.error("API error:", error.message);
    // fallback: send keywords as mock recipes
    res.json(
      keywords.map((k, i) => ({
        id: i,
        title: k,
        image: "https://via.placeholder.com/150",
        sourceUrl: "#"
      }))
    );
  }
});

module.exports = router;
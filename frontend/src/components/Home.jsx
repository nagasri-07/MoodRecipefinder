import { useState } from "react";
import Spinner from "./Spinner";

function Home() {
  const [mood, setMood] = useState("");
  const [taste, setTaste] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async () => {
    if (!mood || !taste) {
      alert("Select Mood and Taste");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/recipes/getRecipes?mood=${mood}&taste=${taste}`
      );
      const data = await res.json();
      setRecipes(data);
    } catch (err) {
      alert("Error fetching recipes");
    }

    setLoading(false);
  };

  return (
    <div className="home-container">
      <h1>Mood Recipe Finder</h1>

      <select onChange={(e) => setMood(e.target.value)}>
        <option value="">Select Mood</option>
        <option value="Happy">Happy</option>
        <option value="Sad">Sad</option>
        <option value="Tired">Tired</option>
      </select>

      <select onChange={(e) => setTaste(e.target.value)}>
        <option value="">Select Taste</option>
        <option value="Sweet">Sweet</option>
        <option value="Spicy">Spicy</option>
        <option value="Savory">Savory</option>
      </select>

      <button onClick={fetchRecipes} className="button">
        Find Recipes
      </button>

      {loading && <Spinner />}

      <div className="recipe-grid">
        {recipes.map((r) => (
          <div key={r.id} className="recipe-card">
            <img src={r.image} alt={r.title} />
            <h3>{r.title}</h3>
            <a href={r.sourceUrl} target="_blank" rel="noreferrer">
              View Recipe
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

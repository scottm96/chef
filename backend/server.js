// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Importing CORS

// Initialize Express app
const app = express();
const port = 5000;

// Use CORS Middleware with Security Settings
app.use(cors({
  origin: "http://localhost:5173", // Only allow requests from your React app
  methods: ["POST"],              // Only allow POST requests
  allowedHeaders: ["Content-Type", "Authorization"], // Only allow these headers
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Define the POST endpoint for generating recipes
app.post('/generate-recipe', async (req, res) => {
  // Extract ingredients from the request body
  const { ingredients } = req.body;

  // Validate the ingredients input
  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: "Please provide a list of ingredients." });
  }

  // Construct the prompt as a plain text string
  const prompt = `I have ${ingredients.join(", ")}. Please give me a recipe you'd recommend I make!. Format your response in markdown to make it easier to render to a web page`;

  try {
    // Make a POST request to the Hugging Face Inference API
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
      {
        inputs: prompt,
        parameters: {
          max_new_tokens: 512,
          return_full_text: false
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Extract the generated recipe from the response
    const recipe = response.data?.generated_text || response.data[0]?.generated_text || "Could not generate a recipe. Try again.";

    // Send the recipe back to the client
    res.status(200).json({ recipe });

  } catch (error) {
    // Log and handle errors
    console.error("Error generating recipe:", error.response?.data || error.message);
    res.status(500).json({ error: "An error occurred while generating the recipe." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

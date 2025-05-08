//import necesssary libraries
import React from "react"
import Recipe from "./ClaudeRecipe"
import IngredientsList from "./IngredientsList"
import axios from "axios"

//create the main function for the <Main />
export default function Main(){
    //we need an array to store the ingredients as they are added
    //we will be updating the array and needs to be rerendered in real time so we use a state for the array

    //initialize state
    const [ingredients, setIngredients] = React.useState([])
    
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    //function takes in formData parameter and its get method is used to extract the value using the name as the argument

    function addIngredient(formData){
        const newIngredient = formData.get("ingredient")
        //use setState to update the Ingredients array
        setIngredients((prevIngredients) => [...prevIngredients, newIngredient])
    }

    const [recipe, setRecipe] = React.useState("");


    const generateRecipe = async () => {
        if (ingredients.length === 0) {
          setError("Please add some ingredients.");
          return;
        }
    
        setLoading(true);
        setError("");
        setRecipe("");
    
        try {
          const response = await axios.post("http://localhost:5000/generate-recipe", {
            ingredients: ingredients
          });
    
          setRecipe(response.data.recipe);
        } catch (err) {
          setError("Failed to generate recipe. Please try again.");
          console.error(err);
        } finally {
          setLoading(false);
        }
    };

    return(
        <main>
            <form 
                action = {addIngredient}   
                className="add-ingredient-form">
                <input 
                    type="text"
                    placeholder="e.g oregano"
                    aria-label="Add Ingredients" 
                    name = "ingredient"
                />
                <button>Add Ingredient</button>
            </form>
            {ingredients.length > 0 && <IngredientsList 
                    ingredients = {ingredients}
                    generateRecipe = {generateRecipe}
                    loading = {loading}
                />
            }
            {error && <p style={{ color: "red" }}>{error}</p>}
            {recipe && <Recipe recipe = {recipe}/>}
        </main>
    )
}
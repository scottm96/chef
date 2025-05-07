//import necesssary libraries
import React from "react"
import Recipe from "./ClaudeRecipe"
import IngredientsList from "./IngredientsList"

//create the main function for the <Main />
export default function Main(){
    //we need an array to store the ingredients as they are added
    //we will be updating the array and needs to be rerendered in real time so we use a state for the array

    //initialize state
    const [ingredients, setIngredients] = React.useState(
        ["all the main spices", "pasta", "ground beef", "tomato paste"]
    )

    //function takes in formData parameter and its get method is used to extract the value using the name as the argument

    function addIngredient(formData){
        const newIngredient = formData.get("ingredient")
        //use setState to update the Ingredients array
        setIngredients((prevIngredients) => [...prevIngredients, newIngredient])
    }

    const [recipeShown, setRecipeShown] = React.useState(false)

    function toggleRecipeShown(){
        setRecipeShown(prevRecipeShown => !prevRecipeShown)
    }

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
                    toggleRecipeShown = {toggleRecipeShown}
                />
            }

            {recipeShown && <Recipe/>}
        </main>
    )
}
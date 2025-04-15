//import necesssary libraries
import React from "react"

//create the main function for the <Main />
export default function Main(){
    //we need an array to store the ingredients as they are added
    //we will be updatint the arrya and needs to be rerendered in real time so we use a state for the array

    const [ingredients, setIngredients] = React.useState([])

    //use the map method to loop through the array of ingredients and display them as list elements
    const ingredientList = ingredients.map( (ingredient) => {
        return <li key = {ingredient} >{ingredient}</li>
    })

    /*function handleSubmit(event){
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newIngredient = formData.get("ingredient")

        setIngredients((prevIngredients) => [...prevIngredients, newIngredient])
    } this is before react 19 made it simpler
    */
     
    //a function to take care of the addng of ingredients to the array
    function addIngredient(formData){
        const newIngredient = formData.get("ingredient")
        setIngredients((prevIngredients) => [...prevIngredients, newIngredient])
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
            <ul>
                {ingredientList}
            </ul>
        </main>
    )
}
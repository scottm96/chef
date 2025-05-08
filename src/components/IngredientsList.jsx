export default function IngredientsList(props){
    
    const ingredientList = props.ingredients.map( (ingredient) => {
        return <li key = {ingredient} >{ingredient}</li>
    })

    return(
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientList}</ul>
            {props.ingredients.length > 3 && <div className="get-recipe-container">
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                    <button onClick={props.generateRecipe}>{props.loading ? "Generating..." : "Generate Recipe"}</button>
                </div>}
         </section>
    )
}
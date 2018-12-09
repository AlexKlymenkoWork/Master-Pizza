//All search requests should be made to the search API URL. https://www.food2fork.com/api/search
// api key for food2fork : c4426e03cfa8fcbb35a2ec5ef71644b2

import Search from './models/Search'
import Recipe from './models/Recipe'
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {elements, renderLoader, clearLoader} from './views/base'


/** Global state of the app
* - Search object
* - Current recioe object
* - Shopping list object
* - Liked recipes
*/

const state = {};


/* Search Controller */
const controlSearch = async () => {
    // 1. Get query from view
    const query = searchView.getInput();
    console.log(query);

    if(query){
        // 2. New search object and add to state 
        state.search = new Search(query);

        // 3. Prepere UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try{
            // 4. Search for recipes
            await state.search.getResult();
    
            // 5. Render results on UI
            clearLoader();
            
            searchView.renderResult(state.search.result);
            
        } catch( error ){
            alert(`Error with the search: ${error}`);
            clearLoader();
        }

    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// Testing
elements.searchForm.addEventListener('load', e => {
    e.preventDefault();
    controlSearch();
});



elements.searchResPages.addEventListener('click', e => {  

    const btn = e.target.closest('.btn-inline');
    
    if (btn) {

        const goToPage = parseInt(btn.dataset.goto, 10);
        
        searchView.clearResults();
        searchView.renderResult(state.search.result, goToPage);
    }
});


/* Recipe Controller */
const controlRecipe = async () => {
    
    // Get ID From url
    const id = window.location.hash.replace('#','');
    console.log(id);
    
    if(id){
        // Prepare UI for chenges
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if (state.search) searchView.highlightSelected(id);


        // Create new recipe object
        state.recipe = new Recipe(id);

        try{
            // Get recipe data and parse ingridients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate servings and time 
            state.recipe.calcTime();
            state.recipe.calcServings();
            // Render recipe
           clearLoader();

           recipeView.renderRecipe(state.recipe);
            
        }catch (error){
            alert(`Error processing recipe ${error}`);
        }

    }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// Heandling recipe button clicks 
elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        // Decreease button is clicked
        if(state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if(e.target.matches('.btn-increase, .btn-increase *')){
        // Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }

});
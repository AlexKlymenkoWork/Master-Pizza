//All search requests should be made to the search API URL. https://www.food2fork.com/api/search
// api key for food2fork : c4426e03cfa8fcbb35a2ec5ef71644b2

import Search from './models/Search'
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base'

/** Global state of the app
* - Search object
* - Current recioe object
* - Shopping list object
* - Liked recipes
*/

const state = {};

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

        // 4. Search for recipes
        await state.search.getResult();

        // 5. Render results on UI
        clearLoader();
        searchView.renderResult(state.search.result);
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


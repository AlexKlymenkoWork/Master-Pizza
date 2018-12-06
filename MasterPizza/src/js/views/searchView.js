import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = ''
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
};

/* 
 // str = 'Pasta with tomato and spinach'
acc: 0 / acc + cur.length = 5 / newTitle = ['Pasta']
acc: 5 / acc + cur.length = 9 / newTitle = ['Pasta', 'with']
acc: 9 / acc + cur.length = 15 / newTitle = ['Pasta', 'with', 'tomato']
acc: 15 / acc + cur.length = 18 / newTitle = ['Pasta', 'with', 'tomato','and']
//limit ========================================================
acc: 18 / acc + cur.length = 24 / newTitle = ['Pasta', 'with', 'tomato','and','spinach']
 */

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit){
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        return `${newTitle.join(' ')} ...`;
    }
    return title;
};

const renderRecipe = receipe => {
    const markup = `
    <li>
        <a class="results__link" href="#${receipe.receipe_id}">
                <figure class="results__fig">
                <img src="${receipe.image_url}" alt="${receipe.title}">
                </figure>
                <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(receipe.title)}</h4>
                <p class="results__author">${receipe.publisher}</p>
                </div>
        </a>
    </li>
    `;

    elements.searchResList.insertAdjacentHTML('beforeend', markup);

};

export const renderResult = recipes => {
  recipes.forEach(renderRecipe);  
};
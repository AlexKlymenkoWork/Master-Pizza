// Global app controller
//All search requests should be made to the search API URL. https://www.food2fork.com/api/search
// api key for food2fork : 0fd960a250890c9d3bf1364985f531b0
import axios from 'axios';


async function getResult(query) {
    const proxy = 'http://cors-anywhere.herokuapp.com/';
    const key = '0fd960a250890c9d3bf1364985f531b0';
    try{
        const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${query}`);
        const recipes = res.data.recipes;
        console.log(recipes);

    } catch(err){
        alert(err);
    }
}
getResult('pizza');
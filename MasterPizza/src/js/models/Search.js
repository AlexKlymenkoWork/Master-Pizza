import axios from 'axios';

export default class Search{
    constructor(query){
        this.query = query;
    }

    async getResult() {
        const proxy = 'http://cors-anywhere.herokuapp.com/';
        const key = 'c4426e03cfa8fcbb35a2ec5ef71644b2';
        try{
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            //console.log(this.result);
    
        } catch(error){
            alert(error);
        }
    }
}
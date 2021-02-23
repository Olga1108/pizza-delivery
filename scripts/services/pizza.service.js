import {pizzaList} from '../data/pizzaList.js';
import {renderCards} from '../view/pizza.render.js'


export default class PizzaService {
    constructor() {

    }
// search by name
    get initialList () {
        return [...pizzaList];
    }

    filterByName() {
        
        const searchInputValue = document.querySelector('#search').value;
        const searchResult = [...pizzaList].filter(pizza => {
        const searchedName = pizza.name.toLocaleLowerCase().includes(searchInputValue.toLocaleLowerCase());;
        const searchedIngredients = pizza.composition.join(', ').toLocaleLowerCase().includes(searchInputValue.toLocaleLowerCase());
        return searchedName || searchedIngredients;
        }) 
        renderCards(searchResult);  
    }
    sortPizzas(resultArr, dir = "default"){
            
        resultArr = [...pizzaList].sort((a, b) => {
            if (dir === 'default') return this.initialList;
            if (dir === 'less') return b.price - a.price;
            if (dir === 'more') return a.price - b.price;
            })
          
        return resultArr;
    }
    filterByPrice(e) {
        e.preventDefault();
          
        let small = [...pizzaList].reduce((acc, current) => acc.price < current.price ? acc : current);
        let big = [...pizzaList].reduce((acc, current) => acc.price > current.price ? acc : current);
        smallPrice.placeholder = small.price;
        bigPrice.placeholder = big.price;
        const smallPriceAmount = smallPrice.value ? smallPrice.value : small.price;
        const bigPriceAmount = bigPrice.value ? bigPrice.value : big.price; 
        const neededPizzas = [...pizzaList].filter(goods => goods.price >= smallPriceAmount && goods.price <= bigPriceAmount)
        renderCards(neededPizzas);
        }   

    filterByCaloricity(e) {
        e.preventDefault();
          
        let small = [...pizzaList].reduce((acc, current) => acc.caloricity < current.caloricity ? acc : current);
        let big = [...pizzaList].reduce((acc, current) => acc.caloricity > current.caloricity ? acc : current);
        smallCaloricity.placeholder = small.caloricity;
        bigCaloricity.placeholder = big.caloricity;
        const smallCaloricityAmount = smallCaloricity.value ? smallCaloricity.value : small.caloricity;
        const bigCaloricityAmount = bigCaloricity.value ? bigCaloricity.value : big.caloricity; 
        const searchedCaloricity = [...pizzaList].filter(goods => goods.caloricity >= smallCaloricityAmount && goods.caloricity <= bigCaloricityAmount)
        renderCards(searchedCaloricity);
        } 
    }
    

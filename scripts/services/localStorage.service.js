import {pizzaList} from '../data/pizzaList.js'
export const setPizzasListToLS = () => {
    localStorage.setItem('pizzas', JSON.stringify(pizzaList));
  }
  
  //  localStorage
export const getPizzasListFromLS = () => {
    const pizzasListFromLS = JSON.parse(localStorage.getItem('pizzas'));
    if (pizzasListFromLS) {
      pizzasListFromLS.forEach((pizza, i) => pizzaList[i] = pizza);
    }
  }
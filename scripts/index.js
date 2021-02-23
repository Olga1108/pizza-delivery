import {pizzaList} from './data/pizzaList.js';
import {renderCards} from './view/pizza.render.js';
import PizzaService  from './services/pizza.service.js'
import {openCreatePizza} from './view/createPizza.render.js';


renderCards(pizzaList)


const searchForm = document.querySelector('.form-search');
let searchPizza = new PizzaService(pizzaList)
searchForm.oninput = searchPizza.filterByName;

const sortSelect = document.getElementById('sort');
  
  sortSelect.onchange = e => {
    document.querySelector('.card-list').innerHTML = '';
    renderCards(searchPizza.sortPizzas(pizzaList, sortSelect.value));
  }

  
  const btnChoiceByPrice = document.querySelector('#btn-price');
  btnChoiceByPrice.addEventListener('click', searchPizza.filterByPrice);

  const btnChoiceByCaloricity = document.querySelector('#btn-caloricity');
  btnChoiceByCaloricity.addEventListener('click', searchPizza.filterByCaloricity);



document.querySelector('#cancel').addEventListener('click', function (e) {
    e.preventDefault();
    this.parentNode.reset();
    renderCards(pizzaList);
  })


const btnModalOpen = document.querySelector('.btn-modal-open');
  btnModalOpen.addEventListener('click', () => {
    openCreatePizza();
  });

   
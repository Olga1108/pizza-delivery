import {setPizzasListToLS} from '../services/localStorage.service.js'
import {createImgPath} from '../helpers/path.helper.js'
import {compositionList} from '../data/compositionList.js'
import {pizzaList} from '../data/pizzaList.js'
import { renderCards } from './pizza.render.js';


  
export  function openCreatePizza() {
  const popup = document.getElementById('modal-create-pizza');
  // popup.classList.add('modal--active');
    const formCreatePizza = document.querySelector('.form-create-pizza');
    formCreatePizza.innerHTML = '';
  
    // create block pizza img
    const pizzaImgBox = document.createElement('div');
    pizzaImgBox.classList.add('form-group');
  
    pizzaImgBox.innerHTML = `
        <input id="img-upload" type="file">
        <img id="pizzaImg" src="" height="100" alt="Image preview...">`;
    formCreatePizza.appendChild(pizzaImgBox);
    document.querySelector('#img-upload').addEventListener('change', previewImg);
  
    // create block pizza name
    const pizzaTitle = document.createElement('div');
    pizzaTitle.classList.add('form-group');
    pizzaTitle.innerHTML = `<input type="text" class="pizza-name form-control" placeholder="Название пиццы...">`;
    formCreatePizza.appendChild(pizzaTitle);
  
    // create block for pizza compozition
    const pizzaCompositionBlock = document.createElement('div');
    pizzaCompositionBlock.className = 'form-group pizza-composition';
  
    // filling the block with ingredients
    for (const ingredient of compositionList) {
      const formCheck = document.createElement('div');
      formCheck.classList.add('form-check', 'form-check-inline');
      formCheck.innerHTML = `
          <input class="form-check-input" type="checkbox" id="checkbox${ingredient.id}" value="${ingredient.name}">
          <label class="form-check-label" for="checkbox${ingredient.id}">${ingredient.name}</label>`
  
      pizzaCompositionBlock.appendChild(formCheck);
    }
  
    formCreatePizza.appendChild(pizzaCompositionBlock);
  
 
    const btnCreatePizza = document.createElement('button');
    btnCreatePizza.className = 'btn btn-danger btn-create-pizza';
    btnCreatePizza.type = 'submit';
    btnCreatePizza.textContent = 'Создать';
    formCreatePizza.appendChild(btnCreatePizza);
  
    formCreatePizza.addEventListener('submit', function (e) {
      e.preventDefault();
      cretePizza();
      // popup.classList.remove('modal--active');
    })
  
}
  

  function cretePizza() {
    const formCreatePizza = document.querySelector('.form-create-pizza');
    const pizzaImgSrc = document.getElementById('pizzaImg').src;
    const pizzaNameValue = formCreatePizza.querySelector('.pizza-name').value;
    const pizzaComposition = formCreatePizza.querySelector('.pizza-composition');
    const composition = pizzaComposition.querySelectorAll('input[type="checkbox"]');
    let compositionCheckedValue = Array.from(composition)
      .filter(item => item.checked)
      .map(item => item.value);
  
    let pizzaPrice = 0;
    let pizzaCaloricity = 100;
    for (const ingredient of compositionList) {
      compositionCheckedValue.forEach(item => {
        if (ingredient.name === item) {
          pizzaPrice += ingredient.price;
          pizzaCaloricity += ingredient.caloricity;
        }
      })
    }
  
    if (pizzaNameValue && compositionCheckedValue && pizzaPrice) {
      pizzaList.unshift({
        id: pizzaList.length + 1,
        img: pizzaImgSrc,
        name: pizzaNameValue,
        composition: compositionCheckedValue,
        caloricity: pizzaCaloricity,
        price: pizzaPrice,
        selfCreated: true,
      });
      setPizzasListToLS();
      renderCards(pizzaList);
    }
  }
  
const convertToBase64 = file => {
    const fileReader = new FileReader();
  
    return new Promise((resolve, reject) => {
      fileReader.onerror = () => {
        fileReader.abort()
        reject("Problem parsing input file.");
      }
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.readAsDataURL(file);
    })
  }
  

  const previewImg = async (e) => {
    const preview = document.getElementById('pizzaImg');
    const file = e.target.files[0];
  
    try {
      preview.src = file ? await convertToBase64(file) : "";
    } catch (e) {
      console.warn(e.message)
    }
  }
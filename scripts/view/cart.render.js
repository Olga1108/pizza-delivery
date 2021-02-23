import {createImgPath} from '../helpers/path.helper.js'
import {pizzaList} from '../data/pizzaList.js'

let cartList = [];

 const getCartDataLS = () => {
    const pizzaFromCartLS = JSON.parse(localStorage.getItem('cartList'));
    if (pizzaFromCartLS) {
      pizzaFromCartLS.forEach((pizza, i) => cartList[i] = pizza);
    }
  }
  
   const setCartDataLS = (data) => {
    localStorage.setItem('cartList', JSON.stringify(data));
  }

 getCartDataLS();
const cartElemRender = (pizza) => {
    let pizzaFromCart = pizzaList.find(item => item.id == pizza.id);
  
    const productElem = document.createElement('div');
  

  
    productElem.innerHTML = `       
      <div><img class="product__img" src="${createImgPath(pizzaFromCart.img)}"></div>
      <h5 class="product__title">${pizzaFromCart.name}</h5>
      <input class="product__count" type="number" value="${pizza.count}">
      <p>${pizzaFromCart.price}</p>
      <p>${pizzaFromCart.price * pizza.count}</p>
      <span class='product__remove'>&times;</span>
    `;
  
    return productElem;
  }
  
  const totalOptions = () => {
    return cartList.reduce((a, b) => {
      let pizzaFromCart = pizzaList.find(item => item.id == b.id);
  
      a.totalPrice += pizzaFromCart.price * b.count;
      a.totalCount += b.count;
      return {
        totalPrice: a.totalPrice,
        totalCount: a.totalCount
      }
    }, {
      totalPrice: 0,
      totalCount: 0
    })
  
  }
  
  const fullCartRender = () => {
    const cartContent = document.querySelector('#cart__content');
    cartContent.innerHTML = '';
  
    const productElements = document.createElement('div');
    productElements.classList.add('product__list');
  
    if (cartList.length) {
      document.querySelector('#cart__checkout').classList.add('btn-checkout--active');
      document.querySelector('#cart__reset').classList.add('btn-clear--active');
   
      cartList.forEach((pizza, id) => {
        const productElem = cartElemRender(pizza);
  
        productElements.appendChild(productElem);
  
        productElem.querySelector(".product__count").onchange = function () {
          pizza.count = +this.value;
          if (!pizza.count) {
            cartList.splice(id, 1);
          }
  
          setCartDataLS(cartList);
          fullCartRender();
        };
  
        productElem.querySelector(".product__remove").addEventListener('click', function () {
          cartList.splice(id, 1);
          setCartDataLS(cartList);
          fullCartRender();
        });
      });
  
      const totalPriceBlock = document.createElement('div');
      totalPriceBlock.innerHTML = `
        <div>
          <p class="">Итого: ${totalOptions().totalCount} шт. -  ${totalOptions().totalPrice} грн</p>
        <div>`;
        productElements.appendChild(totalPriceBlock);
  
      cartContent.appendChild(productElements);
    } else {
      cartContent.textContent = 'В корзине нет товаров';
      document.querySelector('#cart__checkout').classList.remove('btn-checkout--active');
      document.querySelector('#cart__reset').classList.remove('btn-clear--active');
    }
  
  }
  
  fullCartRender();
  
  // clear cart
export const removeCartProduct = () => {
    localStorage.removeItem('cartList');
    localStorage.removeItem('userInfo');
    cartList = [];
    fullCartRender();
  }
  
  document.querySelector('#cart__checkout').onclick = (e) => {
      e.preventDefault();
      window.open('./registration.html')
  }
    
import {removeCartProduct} from './view/cart.render.js'

  document.querySelector('#cart__reset').onclick = function () {
    removeCartProduct();
  }  
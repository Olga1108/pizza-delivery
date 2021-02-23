import {userData} from './services/user.service.js'

document.querySelector('.btn-to-cart').onclick = function (event) {
    event.stopPropagation();
    event.preventDefault();
    localStorage.setItem('userInfo', JSON.stringify(userData()));
    window.open('./cart.html')
};
import {setPizzasListToLS, getPizzasListFromLS} from '../services/localStorage.service.js'
import {createImgPath} from '../helpers/path.helper.js'
import {pizzaList} from '../data/pizzaList.js'

getPizzasListFromLS();
export function renderCard(pizza) {
    const blockForCard = document.createElement('div');
    blockForCard.className = "col-xs-12 col-md-4 col-lg-3 mb-4"
    const card = document.createElement('div')
    card.className = "card h-100 pb-3 pt-2 px-1";
    card.innerHTML = `
        <p class = "card-caloricity">${pizza.caloricity || ''} Ккал</p>
        <div class = "mx-auto pt-3" style="width: 150px">
            <img class ="card-img-top" src="${createImgPath(pizza.img)}" alt="${pizza.name}"/>
        </div>
        
        <div class = "card-body">
            <h5 class = "card-title">${pizza.name || ''}</h5>
            <p class = "card-text">${pizza.composition.join(', ') || ''}</p>
        </div>    
        <div class = "card-footer bg-transparent border-white">
            <p class = "card-price">${pizza.price || ''} грн</p>
        </div>
    `
    // favorit
    const heart = document.createElement('button');
    heart.classList.add('btn-favorite');
    
    if (pizza.isFavorite) heart.classList.add('btn-favorite--active');
    heart.addEventListener('click', function (event) {
        event.stopPropagation();
        this.classList.toggle('btn-favorite--active');
        pizza.isFavorite = !pizza.isFavorite;
       setPizzasListToLS();
        renderCards(pizzaList);
    })

    //add to cart
    const buttonCart = document.createElement('button')
    buttonCart.className = 'btn btn-add-to-basket btn-warning d-block'
    buttonCart.innerText = 'Заказать'
    buttonCart.onclick = (e) => {
        e.preventDefault()
        e.stopPropagation();
        addPizzaToCart(pizza)
    }
    card.appendChild(heart);
    card.appendChild(buttonCart);
    
    card.onclick = (e) => {
        if(!e.target.className.includes('btn-add-to-basket')) {
            modalWindowContent(pizza);
        }
    }

    card.setAttribute("data-toggle", "modal");
    card.setAttribute("data-target", "#staticBackdrop");

    blockForCard.appendChild(card)
    document.querySelector('.card-list').appendChild(blockForCard)
}

 export const modalWindowContent = (pizza) => {
    
    const modalBody = document.querySelector('.modal-body')
    
    modalBody.innerHTML = `
    <p class = "card-caloricity">${pizza.caloricity || ''} Ккал</p>
    <div class = "mx-auto pt-3" style="width: 150px">
        <img class ="card-img-top" src="${createImgPath(pizza.img)}" alt="${pizza.name}"/>
    </div>
    
    <div class = "card-body">
        <h5 class = "card-title">${pizza.name || ''}</h5>
        <p class = "card-text">${pizza.composition.join(', ') || ''}</p>
    </div>    
    <div class = "card-footer bg-transparent border-white">
        <p class = "card-price">${pizza.price || ''} грн</p>
    </div>
`;

}

export const renderCards = pizzas => {
    document.querySelector('.card-list').innerHTML = '';
    pizzas.forEach(pizza => renderCard(pizza))
}


const cartList = [];

const getCartDataLS = () => {
  const pizzaFromCartLS = JSON.parse(localStorage.getItem('cartList'));
  if (pizzaFromCartLS) {
    pizzaFromCartLS.forEach((pizza, i) => cartList[i] = pizza);
  }
}

getCartDataLS();


const setCartDataLS = (data) => {
  localStorage.setItem('cartList', JSON.stringify(data));
}


const addPizzaToCart = (pizza) => {
  let findPizzaById = cartList.find(item => item.id === pizza.id)

  if (findPizzaById) {
    findPizzaById.count += 1;
    setCartDataLS(cartList);
    renderCart();
    return;
  }

  cartList.push({
    id: pizza.id,
    count: 1
  });

  setCartDataLS(cartList);
  renderCart();
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

const renderCart = () => {
  document.querySelector('.btn-cart-info').innerHTML = `${totalOptions().totalCount} шт. <br>  ${totalOptions().totalPrice} грн`;
}

renderCart();


document.querySelector('.btn-cart').onclick = function (e) {
  e.preventDefault();

  if (totalOptions().totalCount) {
    window.open('./cart.html');
  }
}
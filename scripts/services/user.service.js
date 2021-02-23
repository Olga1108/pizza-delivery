export const userData = () => {
    const userName = document.getElementById('name').value;
    const userSurname = document.getElementById('surname').value;
    const userPhone = document.getElementById('phone').value;
    const userAddress = document.getElementById('address').value;
    if (userName && userSurname && userPhone) {
        return {
            name: userName,
            surname: userSurname,
            phone: userPhone,
            address: userAddress
        }
    }
}
// document.querySelector('.btn-to-cart').onsubmit = function (event) {
//     event.preventDefault();
//     localStorage.setItem('userInfo', JSON.stringify(userData()));
//     window.open('./cart.html')
// }
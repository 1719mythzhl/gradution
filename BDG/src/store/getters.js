const getters = {
    token: state => state.user.token,
    name: state => state.user.name,
    shopCar: state => state.classList.shopCar,
    buyCar: state => state.classList.buyCar
  }
  export default getters
  
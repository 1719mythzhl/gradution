const state = {
    shopCar: [], //购物车
    buyCar: [] //已购商品
}

const mutations = {
    SET_SHOPCAR: (state, course) => {
        state.shopCar.push(course)
    },
    SET_BUYCAR: (state, course) => {
        state.buyCar.push(course)
    },
    CLEAR_ALLCAR: (state) => {
        state.buyCar = []
        state.shopCar = []
    }
}

const actions = {}

export default {
    state,
    mutations,
    actions
}
export const state = () => ({
    counter: 0, //text example
    hiddenCateList: true //for page of store to control category list open or not in mobile
})

export const mutations = {
    increment (state) { //text example
        state.counter++
    },
    SET_HIDDENCATELIST (state) {
        state.hiddenCateList = !state.hiddenCateList
    }
}

export const actions = {
    async showCateListBar({commit}) {
        commit('SET_HIDDENCATELIST')
    }
}

export const getters = {
    isAuthenticated(state) {
        return state.auth.loggedIn
    },
}
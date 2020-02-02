export const state = () => ({
    currentBrandId: '',
    currentPageIndex: 1,
    currentPageSize: 20
})

export const mutations = {
    SET_CURRENTBRANDID(state, brand_id) {
        state.currentBrandId = brand_id
    },
    SET_CURRENTPAGEINDEX(state, PageIndex) {
        state.currentPageIndex = PageIndex
    },
    SET_CURRENTPAGESIZE(state, PageSize) {
        state.currentPageSize = PageSize
    },
}

export const actions = {
    async setCurrentBrandId({commit}, brand_id) {
        commit('SET_CURRENTBRANDID', brand_id)
    },
    async setCurrentPageIndex({commit}, PageIndex) {
        commit('SET_CURRENTPAGEINDEX', PageIndex)
    },
    async setCurrentPageSize({commit}, PageSize) {
        commit('SET_CURRENTPAGESIZE', PageSize)
    },
    async resetPagination({commit}) {
        commit('SET_CURRENTPAGEINDEX', 1)
        commit('SET_CURRENTPAGESIZE', 20)
    }
}
export default new Vuex.Store({
    strict: true,
    state: {
        page: 'MainMenu',
    },
    mutations: {
        setPage(state, newPage) {
            state.page = newPage;
        }
    }
});
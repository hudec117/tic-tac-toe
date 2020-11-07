export default new Vuex.Store({
    strict: true,
    state: {
        page: 'MainMenu',
        game: {}
    },
    mutations: {
        setPage(state, newPage) {
            state.page = newPage;
        },
        setGame(state, newGame) {
            state.game = newGame;
        }
    }
});
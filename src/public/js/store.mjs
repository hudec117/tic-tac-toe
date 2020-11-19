export default new Vuex.Store({
    strict: true,
    state: {
        page: 'MainMenu',
        alert: {
            visible: false,
            message: ''
        }
    },
    mutations: {
        setPage(state, newPage) {
            state.page = newPage;
        },
        setAlert(state, { visible, message }) {
            state.alert.visible = visible;
            state.alert.message = message;
        }
    },
    actions: {
        goToPage(context, newPage) {
            context.commit('setPage', newPage);

            context.dispatch('hideAlert');
        },
        showAlert(context, message) {
            context.commit('setAlert', {
                visible: true,
                message: message
            });
        },
        hideAlert(context) {
            context.commit('setAlert', {
                visible: false,
                message: ''
            });
        }
    }
});
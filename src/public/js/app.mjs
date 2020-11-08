import MainMenu from './pages/main-menu.mjs';
import Settings from './pages/settings.mjs';
import BoardSelect from './pages/board-select.mjs';
import Game from './pages/game.mjs';

export default {
    name: 'App',
    template: /*html*/`
        <div class="container">
            <main-menu v-if="page === 'MainMenu'"></main-menu>
            <settings v-if="page === 'Settings'"></settings>
            <board-select v-if="page === 'BoardSelect'"></board-select>
            <game v-if="page === 'Game'"></game>
        </div>
    `,
    components: {
        MainMenu,
        Settings,
        BoardSelect,
        Game
    },
    computed: {
        page: function() {
            return this.$store.state.page;
        }
    },
    mounted: function() {
        const socket = io();
        socket.on('update_game', this.onUpdateGame);

        Vue.prototype.$io = socket;

        this.tryJoinGame();
    },
    methods: {
        tryJoinGame: function() {
            // Check if a game ID is present.
            const gameId = window.location.hash.substr(1);
            if (gameId) {
                // Remove game ID fragment from URL
                window.location.replace("#");
                history.replaceState({}, '', window.location.href.slice(0, -1));

                this.$io.emit('join_game', gameId, res => {
                    if (res.success) {
                        this.$store.commit('setPage', 'Game');
                    } else {
                        // TODO: handle
                    }
                });
            }
        },
        onUpdateGame: function(game) {
            this.$store.commit('setGame', game);
        }
    }
};
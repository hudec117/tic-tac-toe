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
            <board-select v-if="page === 'BoardSelect'" v-on:selected="onBoardSelected"></board-select>
            <game v-if="page === 'Game'" v-bind:initial-game="initialGame"></game>
        </div>
    `,
    components: {
        MainMenu,
        Settings,
        BoardSelect,
        Game
    },
    data: function() {
        return {
            initialGame: {}
        };
    },
    computed: {
        page: function() {
            return this.$store.state.page;
        }
    },
    mounted: function() {
        Vue.prototype.$io = io();

        this.tryJoinGameWithId();
    },
    methods: {
        onBoardSelected: function(size) {
            this.$io.emit('game-create', {
                size: size
            }, res => {
                if (res.success) {
                    this.initialGame = res.game;
                    this.$store.commit('setPage', 'Game');
                } else {
                    // TODO: handle
                }
            });
        },
        tryJoinGameWithId: function() {
            // Check if a game ID is present.
            const gameId = window.location.hash.substr(1);
            if (gameId) {
                // Remove game ID fragment from URL
                window.location.replace("#");
                history.replaceState({}, '', window.location.href.slice(0, -1));

                this.$io.emit('game-join', gameId, res => {
                    if (res.success) {
                        this.initialGame = res.game;
                        this.$store.commit('setPage', 'Game');
                    } else {
                        // TODO: handle
                    }
                });
            }
        }
    }
};
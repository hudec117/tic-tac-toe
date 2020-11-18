import MainMenu from './pages/main-menu.mjs';
import Settings from './pages/settings.mjs';
import BoardSelect from './pages/board-select.mjs';
import Game from './pages/game.mjs';

import Alert from './components/alert.mjs';

export default {
    name: 'App',
    template: /*html*/`
        <div class="container">
            <!-- Row for title -->
            <div class="row text-center mt-4">
                <div class="col">
                    <h1 class="display-4">Tic-Tac-Toe</h1>
                </div>
            </div>

            <!-- Row for alert -->
            <div class="row justify-content-center">
                <div class="col-6">
                    <alert />
                </div>
            </div>

            <!-- Each page specifies their own rows so we don't specify the following div as a Bootstrap row -->
            <div class="mt-3">
                <main-menu v-if="page === 'MainMenu'"></main-menu>
                <settings v-if="page === 'Settings'"></settings>
                <board-select v-if="page === 'BoardSelect'" v-on:selected="onBoardSelected"></board-select>
                <game v-if="page === 'Game'" v-bind:initial-game="initialGame"></game>
            </div>
        </div>
    `,
    components: {
        MainMenu,
        Settings,
        BoardSelect,
        Game,
        Alert
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
    created: function() {
        Vue.prototype.$io = io();

        window.addEventListener('hashchange', this.tryJoinGameWithId);

        this.tryJoinGameWithId();
    },
    destroyed: function() {
        window.removeEventListener('hashchange');
    },
    methods: {
        onBoardSelected: function(size) {
            this.$io.emit('game-create', {
                size: size
            }, res => {
                if (res.success) {
                    this.initialGame = res.game;
                    this.$store.dispatch('goToPage', 'Game');
                } else {
                    this.$store.dispatch('showAlert', `Cannot create game because: ${res.message}`);
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
                        this.$store.dispatch('goToPage', 'Game');
                    } else {
                        this.$store.dispatch('showAlert', `Cannot join game because: ${res.message}`);
                    }
                });
            }
        }
    }
};
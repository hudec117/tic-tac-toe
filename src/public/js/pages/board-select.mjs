export default {
    name: 'BoardSelect',
    template: /*html*/`
        <div class="text-center">
            <div class="row my-4">
                <div class="col">
                    <h1 class="display-6">Tic-Tac-Toe</h1>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <button type="button"
                            class="btn btn-primary"
                            v-on:click="on3x3Click"
                            v-bind:disabled="creatingGame">
                        3x3 Board
                    </button>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <button type="button"
                            class="btn btn-primary"
                            v-on:click="on4x4Click"
                            v-bind:disabled="creatingGame">
                        4x4 Board
                    </button>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <button type="button" class="btn btn-secondary" v-on:click="onBackClick">
                        <i class="fas fa-arrow-left"></i>
                    </button>
                </div>
            </div>
        </div>
    `,
    data: function() {
        return {
            creatingGame: false
        };
    },
    methods: {
        on3x3Click: function() {
            this.createGame(3);
        },
        on4x4Click: function() {
            this.createGame(4);
        },
        onBackClick: function() {
            this.$store.commit('setPage', 'MainMenu');
        },
        createGame: function(size) {
            this.creatingGame = true;

            this.$io.emit('create_game', {
                size: size
            }, res => {
                if (res.success) {
                    this.$store.commit('setPage', 'Game');
                } else {
                    this.creatingGame = false;
                    // TODO: handle
                }
            });
        }
    }
};
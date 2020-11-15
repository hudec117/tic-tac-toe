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
                            v-on:click="on3x3Click">
                        3x3 Board
                    </button>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <button type="button"
                            class="btn btn-primary"
                            v-on:click="on4x4Click">
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
    methods: {
        on3x3Click: function() {
            this.$emit('selected', 3);
        },
        on4x4Click: function() {
            this.$emit('selected', 4);
        },
        onBackClick: function() {
            this.$store.commit('setPage', 'MainMenu');
        }
    }
};
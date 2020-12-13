export default {
    name: 'EndGameDialog',
    template: /*html*/`
        <div id="endGameDialog" class="modal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">End of Game</h5>
                    </div>
                    <div class="modal-body">
                        <p class="mb-0">{{ message }}</p>
                    </div>
                    <div class="modal-footer row no-gutters">
                        <div class="col">
                            <button type="button"
                                    class="btn btn-lg btn-block btn-secondary"
                                    v-on:click="onBackToMenu">
                                <i class="fas fa-home mr-1"></i> Back to Menu
                            </button>
                        </div>
                        <div class="col">
                            <button type="button"
                                    class="btn btn-lg btn-block btn-primary"
                                    v-on:click="onPlayAnotherGame"
                                    disabled>
                                <i class="fas fa-redo mr-1"></i> Play Another Game
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    props: ['show', 'message'],
    watch: {
        show: function(newShow, oldShow) {
            window.$('#endGameDialog').modal(newShow ? 'show' : 'hide');
        }
    },
    mounted: function() {
        window.$('#endGameDialog').modal({
            backdrop: 'static',
            keyboard: false,
            show: false
        });
    },
    methods: {
        onBackToMenu: function() {
            this.$emit('back-to-menu');
        },
        onPlayAnotherGame: function() {
            this.$emit('play-another-game');
        }
    }
};
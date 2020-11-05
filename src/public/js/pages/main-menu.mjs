export default {
    name: 'MainMenu',
    template: /*html*/`
        <div class="text-center">
            <div class="row my-4">
                <div class="col">
                    <h1 class="display-3">Tic-Tac-Toe</h1>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <button type="button" class="btn btn-primary" v-on:click="onPlayOnlineClick">Play Online</button>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <button type="button" class="btn btn-primary" disabled>Play Locally</button>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <button type="button" class="btn btn-secondary" disabled>
                        Settings
                        <i class="fas fa-tools ml-1"></i>
                    </button>
                </div>
            </div>
        </div>
    `,
    data: function() {
        return {
            
        };
    },
    mounted: function() {
        
    },
    methods: {
        onPlayOnlineClick: function() {
            this.$store.commit('setPage', 'BoardSelect');
        }
    }
};
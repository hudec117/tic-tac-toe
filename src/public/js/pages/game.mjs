export default {
    name: 'Game',
    template: /*html*/`
        <div>
            <div class="row text-center my-4">
                <div class="col">
                    <h1 class="display-6">Tic-Tac-Toe</h1>
                </div>
            </div>
            <div class="row justify-content-center mb-3">
                <div class="col-auto form-inline">
                    <button type="button" class="btn btn-danger mr-2">
                        <i class="fas fa-arrow-left"></i> End Game
                    </button>

                    <label for="inviteLink" class="mr-1">Invite Link</label>
                    <input id="inviteLink"
                           class="form-control mr-2"
                           type="text"
                           v-bind:value="inviteLink"
                           v-on:click="onInviteLinkClick"
                           readonly>

                    <label for="playerType" class="mr-1">Turn</label>
                    <input type="text" class="form-control" id="playerType" v-bind:value="turn" readonly>
                </div>
            </div>
            <div class="row text-center">
                <div class="col">
                    <div class="d-inline-flex flex-column">
                        <div class="row d-flex flex-row" v-for="row of board">
                            <div class="cell" v-for="cell of row">
                                <img v-if="cell.type === 'X'" src="img/cross.png" />
                                <img v-if="cell.type === 'O'" src="img/nought.png" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data: function() {
        return {
            
        };
    },
    computed: {
        board: function() {
            return this.$store.state.game.board;
        },
        inviteLink: function() {
            return `${window.location.href}#${this.$store.state.game.id}`;
        },
        turn: function() {
            const playerPiece = this.$store.state.game.players[this.$io.id];
            const turnPiece = this.$store.state.game.turn;
            if (turnPiece === playerPiece) {
                return `Yours (${turnPiece})`;
            } else {
                return `Opponent's (${turnPiece})`;
            }
        }
    },
    methods: {
        onInviteLinkClick: function(event) {
            event.target.setSelectionRange(0, event.target.value.length);
        }
    }
};
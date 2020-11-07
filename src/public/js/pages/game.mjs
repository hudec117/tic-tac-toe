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

                    <label for="turnInfo" class="mr-1">Turn</label>
                    <input id="turnInfo"
                           class="form-control"
                           type="text"
                           v-bind:value="turnInfo"
                           readonly>
                </div>
            </div>
            <div class="row text-center">
                <div class="col">
                    <div class="d-inline-flex flex-column">
                        <div class="row d-flex flex-row" v-for="row of board">
                            <div v-bind:class="cellClasses" v-for="cell of row" v-on:click="onCellClick(cell)">
                                <img v-if="cell.type === 'X'" src="img/cross.png" />
                                <img v-if="cell.type === 'O'" src="img/nought.png" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    computed: {
        board: function() {
            return this.$store.state.game.board;
        },
        inviteLink: function() {
            return `${window.location.href}#${this.$store.state.game.id}`;
        },
        isPlayerTurn: function() {
            const playerPiece = this.$store.state.game.players[this.$io.id];
            const turnPiece = this.$store.state.game.turn;
            return playerPiece === turnPiece;
        },
        turnInfo: function() {
            if (this.isPlayerTurn) {
                return `Yours`;
            } else {
                return `Opponent's`;
            }
        },
        cellClasses: function() {
            return this.isPlayerTurn ? 'cell cell-active' : 'cell cell-inactive';
        }
    },
    methods: {
        onInviteLinkClick: function(event) {
            event.target.setSelectionRange(0, event.target.value.length);
        },
        onCellClick: function(cell) {
            this.$io.emit('take_turn', cell.id, res => {
                if (!res.success) {
                    // TODO: handle
                }
            });
        }
    }
};
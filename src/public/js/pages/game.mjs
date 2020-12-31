export default {
    name: 'Game',
    template: /*html*/`
        <div>
            <div class="row justify-content-center mb-3">
                <div class="col-auto form-inline">
                    <button type="button"
                            class="btn btn-lg btn-danger mr-4"
                            v-on:click="onEndGameClick"
                            title="You will automatically lose the game">
                        <i class="fas fa-arrow-left mr-1"></i> End Game
                    </button>

                    <label for="inviteLink"
                           class="col-form-label-lg mr-1"
                           v-if="game.type === 'online'">
                        Invite Link
                    </label>
                    <input id="inviteLink"
                           class="form-control form-control-lg mr-4"
                           type="text"
                           v-bind:value="inviteLink"
                           v-on:click="onInviteLinkClick"
                           v-if="game.type === 'online'"
                           readonly>

                    <label for="statusInfo" class="col-form-label-lg mr-1">Status</label>
                    <input id="statusInfo"
                           class="form-control form-control-lg"
                           type="text"
                           v-bind:value="statusInfo"
                           readonly>
                </div>
            </div>
            <div class="row text-center">
                <div class="col">
                    <div class="d-inline-flex flex-column">
                        <div class="row d-flex flex-row" v-for="row of game.board">
                            <div v-for="cell of row" v-bind:class="cellClasses(cell)" v-on:click="onCellClick(cell)">
                                <img v-if="cell.value === 'X'" src="img/cross.png" />
                                <img v-if="cell.value === 'O'" src="img/nought.png" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    props: ['initialGame'],
    data: function() {
        return {
            game: { ...this.initialGame },
            statusInfo: ''
        };
    },
    computed: {
        inviteLink: function() {
            return `${window.location.href}#${this.game.id}`;
        },
        playerPiece: function() {
            return this.game.players[this.$io.id];
        },
        isPlayerTurn: function() {
            if (this.game.type === 'online') {
                return this.playerPiece === this.game.turn;
            } else if (this.game.type === 'local') {
                return true;
            }
        },
        canTakeTurn: function() {
            return this.game.state === 'playing' && this.isPlayerTurn;
        }
    },
    created: function() {
        this.$io.on('game-update', this.onGameUpdate);
        this.$io.on('game-end', this.onGameEnd);
    },
    methods: {
        onGameUpdate: function(game) {
            this.game = game;

            // Update the status info.
            if (game.type === 'online') {
                if (game.state === 'waiting') {
                    this.statusInfo = 'Waiting for opponent';
                } else if (this.isPlayerTurn) {
                    this.statusInfo = 'Your turn';
                } else {
                    this.statusInfo = 'Opponent\'s turn';
                }
            } else if (game.type === 'local') {
                this.statusInfo = `${game.turn}'s turn`;
            }
        },
        onGameEnd: function(end) {
            if (end.reason === 'client-requested') {
                // TODO
            } else if (end.reason === 'client-won') {
                this.statusInfo = end.player + ' wins!';
            } else if (end.reason === 'client-draw') {
                this.statusInfo = 'The game is a draw!';
            }
        },
        onEndGameClick: function() {
            this.$io.emit('game-end', () => {
                this.$store.dispatch('goToPage', 'MainMenu');
            });
        },
        onInviteLinkClick: function(event) {
            event.target.setSelectionRange(0, event.target.value.length);
        },
        onCellClick: function(cell) {
            if (this.canTakeTurn && !cell.value) {
                this.$io.emit('game-take-turn', cell.id, res => {
                    if (!res.success) {
                        this.$store.dispatch('showAlert', `Cannot take turn because: ${res.message}`);
                    }
                });
            }
        },
        cellClasses: function(cell) {
            let classes = 'cell';

            if (this.canTakeTurn && !cell.value) {
                classes += ' cell-active';
            } else {
                classes += ' cell-inactive';
            }

            return classes;
        }
    }
};
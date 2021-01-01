/* Author(s): Aurel Hudec
 * Description: Vue component to display the game page.
 */

export default {
    name: 'Game',
    template: /*html*/`
        <div>
            <div class="form-row justify-content-center mb-3">
                <div class="col-auto">
                    <button type="button"
                            class="btn btn-lg btn-danger"
                            v-on:click="onEndGameClick"
                            title="You will automatically lose the game">
                        <i class="fas fa-arrow-left mr-1"></i> Back
                    </button>
                </div>
                <div class="col" v-if="game.type === 'online'">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">Invite Link</div>
                        </div>
                        <input id="inviteLink"
                               class="form-control form-control-lg"
                               type="text"
                               v-bind:value="inviteLink"
                               v-on:click="onInviteLinkClick"
                               readonly>
                    </div>
                </div>
                <div class="col-3">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">Status</div>
                        </div>
                        <input id="statusInfo"
                               class="form-control form-control-lg"
                               type="text"
                               v-bind:value="statusInfo"
                               readonly>
                    </div>
                </div>
                <div class="col-2">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">X wins</div>
                        </div>
                        <input id="xWins"
                               class="form-control form-control-lg"
                               type="text"
                               v-bind:value="game.scores['X']"
                               readonly>
                    </div>
                </div>
                <div class="col-2">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">O wins</div>
                        </div>
                        <input id="oWins"
                               class="form-control form-control-lg"
                               type="text"
                               v-bind:value="game.scores['O']"
                               readonly>
                    </div>
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
        scores: function() {
            return `X: ${this.game.scores['X']} O: ${this.game.scores['O']}`;
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

        this.updateStatusInfo(this.game);
    },
    methods: {
        onGameUpdate: function(game) {
            this.game = game;

            this.updateStatusInfo(game);
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
        updateStatusInfo(game) {
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
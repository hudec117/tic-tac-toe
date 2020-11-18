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
                        <i class="fas fa-arrow-left"></i> End Game
                    </button>

                    <label for="inviteLink" class="col-form-label-lg mr-1">Invite Link</label>
                    <input id="inviteLink"
                           class="form-control form-control-lg mr-4"
                           type="text"
                           v-bind:value="inviteLink"
                           v-on:click="onInviteLinkClick"
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
                                <img v-if="game.players[cell.value] === 'X'" src="img/cross.png" />
                                <img v-if="game.players[cell.value] === 'O'" src="img/nought.png" />
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
            game: { ...this.initialGame }
        };
    },
    computed: {
        inviteLink: function() {
            return `${window.location.href}#${this.game.id}`;
        },
        isPlayerTurn: function() {
            return this.$io.id === this.game.turn;
        },
        canTakeTurn: function() {
            return this.game.state === 'playing' && this.isPlayerTurn;
        },
        statusInfo: function() {
            if (this.game.state === 'waiting') {
                return 'Waiting for opponent';
            } else if (this.isPlayerTurn) {
                return `Your turn`;
            } else {
                return `Opponent's turn`;
            }
        }
    },
    created: function() {
        this.$io.on('game-update', this.onGameUpdate);
        this.$io.on('game-end', this.onGameEnd);
    },
    methods: {
        onGameUpdate: function(game) {
            this.game = game;
        },
        onGameEnd: function(end) {
            if (end.reason === 'client-requested') {
                window.alert('Your opponent has left the game, you automatically win!');
            } else if (end.reason === 'client-won') {
                window.alert(this.game.players[end.player] + ' wins!');
            } else if (end.reason === 'client-draw') {
                window.alert('The game is a draw!');
            }

            this.$store.dispatch('goToPage', 'MainMenu');
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
            if (!cell.value) {
                this.$io.emit('game-take-turn', cell.id, res => {
                    if (!res.success) {
                        this.$store.dispatch('showAlert', `Cannot take turn because: ${res.message}`);
                    }
                });
            }
        },
        cellClasses: function(cell) {
            let classes = 'cell';

            if (this.canTakeTurn) {
                if (!cell.value) {
                    classes += ' cell-active';
                }
            } else {
                classes += ' cell-inactive';
            }

            return classes;
        }
    }
};
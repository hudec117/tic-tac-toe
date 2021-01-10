/* Author(s): Aurel Hudec
 * Description: Vue component to display the main menu page.
 */

export default {
    name: 'MainMenu',
    template: /*html*/`
        <div class="text-center">
            <div class="row mb-3">
                <div class="col">
                    <button type="button" class="btn btn-lg btn-primary" v-on:click="onPlayOnlineClick">Play Online</button>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <button type="button" class="btn btn-lg btn-primary" v-on:click="onPlayLocallyClick">Play Locally</button>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <button type="button" class="btn btn-lg btn-secondary" v-on:click="onSettingsClick">
                        Settings
                        <i class="fas fa-tools ml-1"></i>
                    </button>
                </div>
            </div>
        </div>
    `,
    methods: {
        onPlayOnlineClick: function() {
            this.$emit('play-online');
        },
        onPlayLocallyClick: function() {
            this.$emit('play-locally');
        },
        onSettingsClick: function() {
            this.$emit('settings');
        }
    }
};
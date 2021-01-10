/* Author(s): Aurel Hudec, Aidan Briggs
 * Description: Vue component to display the settings page.
 */

export default {
    name: 'Settings',
    template: /*html*/`
        <div class = "options">
            <div class="darkOption">
                <input type="checkbox" id="darkTheme" name="darkTheme" disabled>
                <label for="darkTheme">Dark Theme</label>
            </div>
            <div class="muteOption">
                <input type="checkbox" id="mute" name="mute" autocomplete="off" v-on:click="muteSound" v-bind:checked="soundEffects">
                <label for="mute">Mute Sound</label>
            </div>
            <div class="row">
                <div class="col">
                    <button type="button" class="btn btn-lg btn-secondary" v-on:click="onBackClick">
                        <i class="fas fa-arrow-left"></i>
                    </button>            
                </div>
            </div>
        </div>
    `,
    data: function () {
        return {
            soundEffects: false,
        };


    },
    mounted: function () {
        var soundEffects = localStorage.getItem('soundEffects')
        if (soundEffects === 'true') {
            this.soundEffects = true;
        } else {
            this.soundEffects = false;
        }
    },
    methods: {
        muteFlagStatus: function () {
            return document.getElementById('mute').checked;
        },
        onBackClick: function () {
            this.$store.dispatch('goToPage', { page: 'MainMenu' });
        },
        muteSound: function (e) {
            this.soundEffects = e.currentTarget.checked
            if (this.soundEffects === true) {
                localStorage.setItem('soundEffects', true);
            }
            else {
                localStorage.setItem('soundEffects', false);
            }
        }


    }



};
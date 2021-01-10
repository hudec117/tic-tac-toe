/* Author(s): Aurel Hudec
 * Description: Vue component to display the settings page.
 */

export default {
    name: 'Settings',
    template: /*html*/`
        <div>
            Settings
        </div>
    `,
    methods: {
        onBackClick: function() {
            this.$store.dispatch('goToPage', { page: 'MainMenu' });
        }
    }
};
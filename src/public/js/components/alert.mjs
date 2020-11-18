export default {
    name: 'Alert',
    template: /*html*/`
        <div v-if="visible" class="alert alert-dismissible alert-warning mb-0">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <p class="mb-0">{{ message }}</p>
        </div>
    `,
    computed: {
        visible: function() {
            return this.$store.state.alert.visible;
        },
        message: function() {
            return this.$store.state.alert.message;
        }
    }
};
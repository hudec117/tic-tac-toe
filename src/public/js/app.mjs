export default {
    name: 'App',
    template: /*html*/`
        <div class="container-fluid">
            
        </div>
    `,
    data: function() {
        return {
            socket: null
        };
    },
    mounted: function() {
        this.socket = io();
    }
};
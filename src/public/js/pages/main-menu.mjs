export default {
    name: 'MainMenu',
    template: /*html*/`
        <div class="text-center">
            <div class="row my-4">
                <div class="col">
                    <h1 class="display-3">Tic-Tac-Toe</h1>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <button type="button" class="btn btn-primary">Play Online</button>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <button type="button" class="btn btn-primary">Play Locally</button>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <button type="button" class="btn btn-secondary">Settings</button>
                </div>
            </div>
        </div>
    `,
    data: function() {
        return {
            
        };
    },
    mounted: function() {
        
    }
};
import MainMenu from './pages/main-menu.mjs';
import Settings from './pages/settings.mjs';
import BoardSelect from './pages/board-select.mjs';
import Game from './pages/game.mjs';

export default {
    name: 'App',
    template: /*html*/`
        <div class="container-fluid">
            <main-menu v-if="page === 'MainMenu'"></main-menu>
            <settings v-if="page === 'Settings'"></settings>
            <board-select v-if="page === 'BoardSelect'"></board-select>
            <game v-if="page === 'Game'"></game>
        </div>
    `,
    components: {
        MainMenu,
        Settings,
        BoardSelect,
        Game
    },
    data: function() {
        return {
            page: 'MainMenu'
        };
    },
    mounted: function() {
        
    }
};
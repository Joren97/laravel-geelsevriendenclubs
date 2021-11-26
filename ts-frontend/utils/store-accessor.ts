import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import global from '~/store/global';
import game from "~/store/game";
import team from "~/store/team";

let globalModule: global;
let gameModule: game;
let teamModule: team;

function initialiseStores(store: Store<any>): void {
    globalModule = getModule(global, store);
    gameModule = getModule(game, store);
    teamModule = getModule(team, store);
}

export { initialiseStores, globalModule, gameModule , teamModule}
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import global from '~/store/global';
import game from "~/store/game";
import team from "~/store/team";
import auth from "~/store/auth";

let globalModule: global;
let gameModule: game;
let teamModule: team;
let authModule: auth;

function initialiseStores(store: Store<any>): void {
    globalModule = getModule(global, store);
    gameModule = getModule(game, store);
    teamModule = getModule(team, store);
    authModule = getModule(auth, store);
}

export { initialiseStores, globalModule, gameModule , teamModule, authModule}
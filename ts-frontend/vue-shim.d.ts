import { NuxtCookies } from "./index";

declare module "*.vue" {
    import Vue from 'vue'
    export default Vue
  }

  declare module "vue/types/vue" {
    interface Vue {
      $cookies: NuxtCookies;
    }
  }
  
  declare module 'vuex/types/index' {
    interface Store<S> {
      $cookies: NuxtCookies
    }
  }
import Vue, {ComponentOptions} from 'vue';
import { CookieSerializeOptions } from "cookie";

type CookieValue = any;

interface GetOptions {
    fromRes?: boolean;
    parseJSON?: boolean;
  }
  
  interface SetParams {
    name: string;
    value: CookieValue;
    opts?: CookieSerializeOptions;
  }
  
  export interface NuxtCookies {
    set: (
      name: string,
      value: CookieValue,
      opts?: CookieSerializeOptions
    ) => void;
    setAll: (cookieArray: SetParams[]) => void;
    get: <T = CookieValue>(name: string, opts?: GetOptions) => T;
    getAll: <T = CookieValue[]>(opts?: GetOptions) => T;
    remove: (name: string, opts?: CookieSerializeOptions) => void;
    removeAll: () => void;
  }

declare module '*.vue' {
    import Vue from 'vue';
    const _default: Vue;
    export default _default;
}

/* Cite: https://stackoverflow.com/a/49090772 */
declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        middleware?: string | string[];
        asyncData?(context: NuxtContext<V>): Promise<object> | object;
        fetch?(context: NuxtContext<V>): Promise<object> | object;
    }
}

declare module "@nuxt/vue-app" {
    interface NuxtAppOptions {
      $cookies: NuxtCookies;
    }
  }
  // Nuxt 2.9+
  declare module "@nuxt/types" {
    interface NuxtAppOptions {
      $cookies: NuxtCookies;
    }
  
    interface Context {
      $cookies: NuxtCookies;
    }
  }
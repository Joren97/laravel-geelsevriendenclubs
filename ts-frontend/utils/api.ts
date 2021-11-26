import https from 'https';
import { Store } from 'vuex';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { NuxtAppOptions } from '@nuxt/types';
import { globalModule } from '~/store';

const agent = new https.Agent({
  rejectUnauthorized: false,
});

let $axios: NuxtAxiosInstance;

export function initializeAxios(
  axiosInstance: NuxtAxiosInstance,
  store: Store<any>,
  app: NuxtAppOptions,
) {
  $axios = axiosInstance;

  $axios.onRequest((config) => {
    console.log('Making ' + config.method + ' request to: ' + config.url);
    config.httpsAgent = agent;
  });

  $axios.onResponse(() => { });

  $axios.onError((error) => {
    console.log(error.response);    
    globalModule.setError();
    });
}

export { $axios };

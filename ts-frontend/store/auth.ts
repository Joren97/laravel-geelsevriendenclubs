import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { $axios } from '~/utils/api';

const RESOURCE = '/api/auth';

const initialState = {
  user: null,
  loading: false,
};


@Module({ name: 'auth', stateFactory: true, namespaced: true })
export default class AuthModule extends VuexModule {
    loading: boolean = false
    error: string | null = ''

    @Mutation
    setError(value: string | null = 'An unknown error occured'): void {
        this.loading = false;
        this.error = value;
    }

    @Mutation
    setLoading(value: boolean): void {
        this.loading = value;
    }

    @Action
    async login(login: {username: string, password: string}){
        try {
            this.setLoading(true);
            let { data: {access_token, expires_in} } = await $axios.post(`${RESOURCE}/login`, login);
            this.setLoading(false);
            const x: any = {access_token, expires_in}
            return x;
          } catch (error) {
            this.setError();            
          }
    }
}

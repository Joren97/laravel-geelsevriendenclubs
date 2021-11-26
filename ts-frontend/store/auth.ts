import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

const RESOURCE = '/tokenauth';

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
}

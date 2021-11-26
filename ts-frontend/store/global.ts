import { VuexModule, Module, Mutation } from 'vuex-module-decorators';

@Module({ name: 'global', stateFactory: true, namespaced: true })
export default class GlobalModule extends VuexModule {
    error: string | null = ''
    success: string | null = ''
    loading: boolean = false

    @Mutation
    setError(value: string | null = 'An unknown error occured'): void {
        this.loading = false;
        this.error = value;
    }

    @Mutation
    setSuccess(value: string | null) {
        this.success = value;
        this.loading = false;
    }

    @Mutation
    setLoading(value: boolean): void {
        this.loading = value;
    }
}
import { VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { $axios } from '~/utils/api';

export const namespaced = true;

export default class BaseModule<Dto, CreateDto, UpdateDto> extends VuexModule {
  RESOURCE: string = '';
  error: string | null = null;
  loading: boolean = false;
  items: Array<Dto> = [];
  item: Dto | null = null;
  totalCount: number = 0;
  paginationParams: { page: number, pageSize: number, sorting: string } = {
    page: 1,
    pageSize: 15,
    sorting: '',
  }

  @Mutation
  setError(value: string | null = 'An unknown error occured'): void {
    this.loading = false;
    this.error = value;
  }

  @Mutation
  setLoading(value: boolean): void {
    console.log("Setting base loading")
    this.loading = value;
  }

  @Mutation
  setItems(obj: { data: Array<Dto>, total?: number }) {
    this.items = obj.data;
    this.totalCount = obj.total ? obj.total : 0;
    this.error = null;
    this.loading = false;
  }

  @Mutation
  setPaginationParams(obj: { page?: number | string, pageSize?: number, sorting?: string }) {
    this.paginationParams = {
      page: obj.page !== undefined ? Number(obj.page) : this.paginationParams.page,
      pageSize: obj.pageSize !== undefined ? Number(obj.pageSize) : this.paginationParams.pageSize,
      sorting: obj.sorting !== undefined ? obj.sorting : this.paginationParams.sorting,
    };
  }

  @Mutation
  setItem(value: Dto | null) {
    this.item = value;
    this.error = null;
    this.loading = false;
  }

  @Action({ rawError: true })
  async getAll(paginationParams?: { page?: number, pageSize?: number, sorting?: string, extra?: string }) {
    const pageSize = paginationParams !== undefined && paginationParams.pageSize !== undefined ? paginationParams.pageSize : this.paginationParams.pageSize;
    const page = paginationParams !== undefined && paginationParams.page !== undefined ? paginationParams.page : this.paginationParams.page;
    const sorting = paginationParams !== undefined && paginationParams.sorting !== undefined ? paginationParams.sorting : this.paginationParams.sorting;
    const extra = paginationParams !== undefined && paginationParams.extra !== undefined ? paginationParams.extra : '';

    const skipCount = (page - 1) * pageSize;
    try {      
      this.setLoading(true);
      const { data: {data, per_page, total} } = await $axios.get(`${this.RESOURCE}`
        + `?per_page=${pageSize}`
        + extra);        
      this.setItems({ data, total });
    } catch (error) {
      console.log(error);      
      this.setError();
    }
  }

  @Action({ rawError: true })
  async get(id: string) {
    try {
      this.setLoading(true);
      const { data } = await $axios.get(`${this.RESOURCE}/${id}`);
      this.setItem(data);
      return data;
    } catch (error) {
      this.setError();
    }
  }

  @Action({ rawError: true })
  async update(obj: UpdateDto, id: number) {
    console.log(id);
    try {
      this.setLoading(true);
      const { data: { result, success } } = await $axios.put(`${this.RESOURCE}/${id}`, obj);
      this.setLoading(false);
      return success;
    } catch (error) {
      this.setError();
    }
  }

  @Action({ rawError: true })
  async create(obj: CreateDto) {
    try {
      this.setLoading(true);
      const { data: { result, success } } = await $axios.post(`${this.RESOURCE}`, obj);
      this.setLoading(false);
      return success;
    } catch (error) {
      this.setError();
    }
  }

  @Action({ rawError: true })
  async delete(id: number) {
    try {
      this.setLoading(true);
      const { data: { result, success } } = await $axios.delete(`${this.RESOURCE}/delete?id=${id}`);
      this.setLoading(false);
      return success;
    } catch (error) {
      this.setError();
    }
  }
}

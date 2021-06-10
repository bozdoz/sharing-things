import { mutate } from "swr";
import api from "resources/api";
import { BaseModel } from "models/types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

const resourceFactory = <T extends BaseModel, U extends BaseModel = T>(
  model: string,
  {
    postUpdate,
    postCreate,
    listView = "",
  }: {
    postUpdate?: (body: T) => void;
    postCreate?: (body: T) => void;
    /** custom listView to purge from cache */
    listView?: string;
  } = {}
) => {
  const prefix = `/api/v1/${model}`;
  const defaultListView = `${prefix}/list`;

  const request = async (suffix: string, body?: Writable<T> | Partial<U>) => {
    const res = await api<ApiResponse<T>>(`${prefix}${suffix}`, {
      body,
    });

    // invalidate cache of list views
    mutate(listView || defaultListView);

    return res.data;
  };

  const update = async (id: string, body: Partial<U>) => {
    const instance = await request(`/${id}/update`, body);

    postUpdate?.(instance);

    return instance;
  };

  const create = async (body: Writable<T>) => {
    const instance = await request(`/create`, body);
    postCreate?.(instance);

    return instance;
  };

  const deleteFn = (id: string) => request(`/${id}/delete`);

  const get = (id: string) => request(`/${id}`);

  return {
    create,
    update,
    delete: deleteFn,
    get,
  };
};

export default resourceFactory;

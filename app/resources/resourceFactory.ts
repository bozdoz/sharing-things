import { mutate } from "swr";
import api from "utils/api";
import { BaseModel } from "models/types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

const resourceFactory = <T extends BaseModel, U extends BaseModel = T>(
  model: string,
  {
    postUpdate,
  }: {
    postUpdate?: () => void;
  } = {}
) => {
  const prefix = `/api/v1/${model}`;
  const listView = `${prefix}/list`;

  const request = async (suffix: string, body?: Writable<T> | Partial<U>) => {
    const res = await api<ApiResponse<T>>(`${prefix}${suffix}`, {
      body,
    });

    // invalidate cache of list views
    mutate(listView);

    return res.data;
  };

  const update = async (id: string, body: Partial<U>) => {
    await request(`/${id}/update`, body);

    postUpdate?.();
  };

  const create = (body: Writable<T>) => request(`/create`, body);

  const deleteFn = (id: string) => request(`/${id}/delete`);

  return {
    create,
    update,
    delete: deleteFn,
  };
};

export default resourceFactory;

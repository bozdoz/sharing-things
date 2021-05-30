import { mutate } from "swr";
import api from "utils/api";
import { BaseModel } from "models/BaseModel";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

const resourceFactory = <T extends BaseModel>(model: string) => {
  const prefix = `/api/v1/${model}`;
  const listView = `${prefix}/list`;

  const request = async (body: Writable<T> | Partial<T>, suffix: string) => {
    const res = await api<ApiResponse<T>>(`${prefix}${suffix}`, {
      body,
    });

    // invalidate cache of list views
    mutate(listView);

    return res.data;
  };

  const update = (id: string, body: Partial<T>) =>
    request(body, `/${id}/update`);

  const create = (body: Writable<T>) => request(body, `/create`);

  return {
    create,
    update,
  };
};

export default resourceFactory;

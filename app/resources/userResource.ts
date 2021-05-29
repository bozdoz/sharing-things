import { User } from "models/User";
import { mutate } from "swr";
import api from "utils/api";

interface ApiResponse {
  success: boolean;
  data: User;
}

export const updateUser = async (id: string, body: Partial<User>) => {
  const prefix = `/api/v1/user/${id}`;
  const res = await api<ApiResponse>(`${prefix}/update`, {
    body,
  });

  const { data } = res;
  const revalidate = false;
  mutate(prefix, data, revalidate);

  return data;
};

export const createUser = async (body: Writable<User>) => {
  const prefix = `/api/v1/user`;
  const res = await api<ApiResponse>(`${prefix}/create`, {
    body,
  });

  const { data } = res;
  const revalidate = false;
  mutate(prefix, data, revalidate);

  return data;
};

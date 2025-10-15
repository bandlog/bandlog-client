import { api } from "@/common/lib/api";
import type { User } from "./entities/user";

export interface AuthApi {
  login: (email: string, password: string) => Promise<User>;
}

const login = async (email: string, password: string) => {
  const response = await api.withoutAuth().post<User>("/login", {
    json: {
      email,
      password,
    },
  });

  return response;
};

export const authApi: AuthApi = {
  login,
};

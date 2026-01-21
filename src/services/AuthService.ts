import { api } from "./api";
import { endpoints } from "./endpoints";

type AuthPayload = {
  email: string;
  password: string;
};

type AuthResponse = {
  accessToken: string;
  refreshToken?: string;
};

export const authService = {
  async login(payload: AuthPayload): Promise<AuthResponse> {
    const res = await api.post(endpoints.auth.login, payload);
    return res.data as AuthResponse;
  },

  async register(payload: AuthPayload): Promise<AuthResponse> {
    const res = await api.post(endpoints.auth.register, payload);
    return res.data as AuthResponse;
  },
};

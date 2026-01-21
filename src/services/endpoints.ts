export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    me: "/auth/me",
    refresh: "/auth/refresh",
  },
  meals: {
    list: "/meals",
    create: "/meals",
    update: (id: string) => `/meals/${id}`,
    delete: (id: string) => `/meals/${id}`,
  },
  workouts: {
    list: "/workouts",
    create: "/workouts",
    update: (id: string) => `/workouts/${id}`,
    delete: (id: string) => `/workouts/${id}`,
  },
} as const;

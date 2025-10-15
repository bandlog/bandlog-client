import ky from "ky";

const kyInstance = ky.create({
  prefixUrl: "",
  headers: {
    "Content-Type": "application/json",
  },
});

const kyInstanceWithAuth = kyInstance.extend({
  hooks: {
    beforeRequest: [
      (request: Request) => {
        const token = localStorage.getItem("token");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});

const instanceWithAuth = {
  get: <T = unknown>(...args: Parameters<(typeof kyInstanceWithAuth)["get"]>) =>
    kyInstanceWithAuth(...args).json<T>(),
  post: <T = unknown>(
    ...args: Parameters<(typeof kyInstanceWithAuth)["post"]>
  ) => kyInstanceWithAuth(...args).json<T>(),
  put: <T = unknown>(...args: Parameters<(typeof kyInstanceWithAuth)["put"]>) =>
    kyInstanceWithAuth(...args).json<T>(),
  delete: <T = unknown>(
    ...args: Parameters<(typeof kyInstanceWithAuth)["delete"]>
  ) => kyInstanceWithAuth(...args).json<T>(),
};

const instance = {
  get: <T = unknown>(...args: Parameters<(typeof kyInstance)["get"]>) =>
    kyInstance(...args).json<T>(),
  post: <T = unknown>(...args: Parameters<(typeof kyInstance)["post"]>) =>
    kyInstance(...args).json<T>(),
  put: <T = unknown>(...args: Parameters<(typeof kyInstance)["put"]>) =>
    kyInstance(...args).json<T>(),
  delete: <T = unknown>(...args: Parameters<(typeof kyInstance)["delete"]>) =>
    kyInstance(...args).json<T>(),
};

export const api = {
  withAuth: () => instanceWithAuth,
  withoutAuth: () => instance,
};

export const BASE_URL = "http://localhost:3000";

class ApiError extends Error {
  constructor(public response: Response) {
    super("ApiError: " + response.status);
  }
}

export const jsonInstance = async (url: string, init?: RequestInit & { json: unknown }) => {
  let headers = init?.headers ?? {};

  if (init?.json) {
    headers = {
      "Content-Type": "application/json",
      ...headers,
    };
    init = { ...init, body: JSON.stringify(init.json) };
  }

  const res = await fetch(`${BASE_URL}${url}`, {
    ...init,
    headers,
  });

  if (!res.ok) {
    throw new ApiError(res);
  }

  return res.json();
};

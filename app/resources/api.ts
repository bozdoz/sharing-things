interface CustomRequestInit extends Omit<RequestInit, "body"> {
  body?: Record<string, unknown> | string;
}

const api = <T extends any>(
  input: RequestInfo,
  init: CustomRequestInit = {}
): Promise<T> => {
  init.headers = {
    "Content-Type": "application/json",
    ...init.headers,
  };

  if (init.body) {
    init.body = JSON.stringify(init.body);
    init.method = "POST";
  }

  return fetch(input, init as RequestInit).then((resp) => resp.json());
};

export default api;

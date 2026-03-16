type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = {
  headers?: HeadersInit;
  body?: unknown;
  signal?: AbortSignal;
};

class ApiError extends Error {
  status: number;
  responseBody: unknown;

  constructor(message: string, status: number, responseBody: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.responseBody = responseBody;
  }
}

const DEFAULT_API_BASE_URL = "http://localhost:3000";

const normalizeUrl = (url: string): string => {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  const baseUrl =
    import.meta.env.VITE_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL;

  if (url.startsWith("/")) {
    return `${baseUrl}${url}`;
  }

  return `${baseUrl}/${url}`;
};

const toErrorMessage = (status: number, body: unknown): string => {
  if (typeof body === "object" && body !== null && "error" in body) {
    const error = (body as { error?: unknown }).error;
    if (typeof error === "string" && error.length > 0) {
      return error;
    }
  }

  return `Request failed with status ${status}`;
};

const request = async <T>(
  method: HttpMethod,
  url: string,
  options: RequestOptions = {},
): Promise<T> => {
  const { headers, body, signal } = options;
  const resolvedUrl = normalizeUrl(url);

  const accessToken = localStorage.getItem("accessToken");
  const isFormData = body instanceof FormData;

  let response: Response;

  try {
    response = await fetch(resolvedUrl, {
      method,
      signal,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...headers,
      },
      body:
        body === undefined
          ? undefined
          : isFormData
            ? body
            : JSON.stringify(body),
    });
  } catch {
    throw new Error(
      `Network error: could not reach ${resolvedUrl}. Check backend server and CORS settings.`,
    );
  }

  const contentType = response.headers.get("content-type") || "";
  const isJsonResponse = contentType.includes("application/json");
  const responseBody = isJsonResponse
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new ApiError(
      toErrorMessage(response.status, responseBody),
      response.status,
      responseBody,
    );
  }

  return responseBody as T;
};

export const apiClient = {
  get: <T>(url: string, options?: Omit<RequestOptions, "body">) =>
    request<T>("GET", url, options),

  post: <T>(
    url: string,
    body?: unknown,
    options?: Omit<RequestOptions, "body">,
  ) => request<T>("POST", url, { ...options, body }),

  put: <T>(
    url: string,
    body?: unknown,
    options?: Omit<RequestOptions, "body">,
  ) => request<T>("PUT", url, { ...options, body }),

  patch: <T>(
    url: string,
    body?: unknown,
    options?: Omit<RequestOptions, "body">,
  ) => request<T>("PATCH", url, { ...options, body }),

  delete: <T>(url: string, options?: Omit<RequestOptions, "body">) =>
    request<T>("DELETE", url, options),
};

export { ApiError };
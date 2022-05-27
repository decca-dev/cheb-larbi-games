export default async function fetcher<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const response = await fetch(input);
  const data = await response.json();
  if (response.ok) {
    return data.data;
  }
  throw new FetchError({
    message: data.message,
    response,
    data,
  });
}

export class FetchError extends Error {
  response: Response;
  data: {
    message: string;
  };
  constructor({
    message,
    response,
    data,
  }: {
    message: string;
    response: Response;
    data: {
      error: boolean;
      message: string;
      data?: unknown;
    };
  }) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.name = "FetchError";
    this.response = response;
    this.data = data ?? { message: message };
  }
}

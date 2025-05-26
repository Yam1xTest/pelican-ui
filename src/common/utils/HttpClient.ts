import { HttpStatusCode } from "axios";
import { getStrapiURL } from "./getStrapiURL";

const getApiFetch = () => {
  const baseUrl = getStrapiURL();

  return async (endpoint: string, options?: RequestInit) => {
    const url = `${baseUrl}${endpoint}`;
    const response = await fetch(url, options);

    if (!response.ok && response.status !== HttpStatusCode.NotFound) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.status === HttpStatusCode.NotFound) {
      return null;
    }

    return response.json();
  };
};

export const apiFetch = getApiFetch();

import { getStrapiURL } from "./getStrapiURL";

const getStrapiFetch = () => {
  const baseUrl = getStrapiURL();

  return async (endpoint: string, options?: RequestInit) => {
    const updatedOptions: RequestInit = {
      headers: {
        'Cache-Control': `public, max-age=60`,
      },
      ...options,
    };
    const url = `${baseUrl}${endpoint}`;
    const response = await fetch(url, updatedOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };
};

export const strapiFetch = getStrapiFetch();

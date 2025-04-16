import { NewsCollection } from "@/src/common/api-types";
import { expect } from "@playwright/test";
import axios, { HttpStatusCode, AxiosError } from "axios";
import { getStrapiURL } from "@/src/common/utils/getStrapiURL";
import { getFileIdByName } from "./cms-integration-helpers";

const NEWS_API_ENDPOINT = `${getStrapiURL()}/news`;
const NEWS_PAGE_API_ENDPOINT = `${getStrapiURL()}/news-page`;

export async function updateTestNewsPage({
  title,
  isDraft = false,
}: {
  title: string;
  isDraft?: boolean;
}) {
  try {
    const response = await axios.put(`${NEWS_PAGE_API_ENDPOINT}?status=${isDraft ? `draft` : `published`}`, {
      data: {
        title,
      },
    });

    await expect(response.status, `News page should be updated with status 200`)
      .toEqual(HttpStatusCode.Ok);
  } catch (error) {
    throw new Error(`Failed to update test news page: ${(error as AxiosError).message}`);
  }
}

export async function cleanupTestNewsPage() {
  try {
    const response = await axios.delete(`${NEWS_PAGE_API_ENDPOINT}`);

    await expect(response.status, `News page should be deleted with status 204`)
      .toEqual(HttpStatusCode.NoContent);
  } catch (error) {
    throw new Error(`Failed to delete test news page: ${(error as AxiosError).message}`);
  }
}

export async function createTestNews({
  title,
  description,
  innerContent,
  isDraft = false,
}: {
  title: string;
  description: string;
  innerContent: string;
  isDraft?: boolean;
}) {
  try {
    const response = await axios.post(`${NEWS_API_ENDPOINT}?status=${isDraft ? `draft` : `published`}`, {
      data: {
        title,
        description,
        image: await getFileIdByName(),
        innerContent,
      },
    });

    await expect(response.status, `News should be created with status 201`)
      .toEqual(HttpStatusCode.Created);
  } catch (error) {
    throw new Error(`Failed to create test news: ${(error as AxiosError).message}`);
  }
}

export async function cleanupTestNewsByTitle({
  title,
}: {
  title: string;
}) {
  try {
    const newsResponse = (await axios.get(`${NEWS_API_ENDPOINT}?populate=*&status=draft`)).data;

    const testNews = newsResponse.data.find((item: NewsCollection) => item.title === title);

    if (testNews) {
      const response = await axios.delete(`${NEWS_API_ENDPOINT}/${testNews.documentId}`);

      await expect(response.status, `News should be deleted with status 204`)
        .toEqual(HttpStatusCode.NoContent);
    }
  } catch (error) {
    throw new Error(`Failed to delete test news: ${(error as AxiosError).message}`);
  }
}

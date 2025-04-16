import { expect } from "@playwright/test";
import axios, { HttpStatusCode, AxiosError } from "axios";
import { getStrapiURL } from "@/src/common/utils/getStrapiURL";
import { TEST_MOCK_HERO } from "../cms-integration-mocks";
import { getFileIdByName } from "./cms-integration-helpers";

const HOME_PAGE_API_ENDPOINT = `${getStrapiURL()}/home`;

export async function updateTestHomePage({
  isDraft = false,
}: {
  isDraft?: boolean;
} = {}) {
  try {
    const response = await axios.put(`${HOME_PAGE_API_ENDPOINT}?status=${isDraft ? `draft` : `published`}`, {
      data: {
        blocks: [
          {
            ...TEST_MOCK_HERO,
            image: await getFileIdByName(),
          },
        ],
      },
    });

    await expect(response.status, `Home page should be updated with status 200`)
      .toEqual(HttpStatusCode.Ok);
  } catch (error) {
    throw new Error(`Failed to update test home page: ${(error as AxiosError).message}`);
  }
}

export async function cleanupTestHomePage() {
  try {
    const response = await axios.delete(`${HOME_PAGE_API_ENDPOINT}`);

    await expect(response.status, `Home page should be deleted with status 204`)
      .toEqual(HttpStatusCode.NoContent);
  } catch (error) {
    throw new Error(`Failed to delete test home page: ${(error as AxiosError).message}`);
  }
}

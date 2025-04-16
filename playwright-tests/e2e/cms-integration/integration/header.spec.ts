import { gotoPage, setViewportSize } from "@/playwright-tests/global-helpers";
import { AppRoute, Breakpoint } from "@/src/common/enum";
import { getStrapiURL } from "@/src/common/utils/getStrapiURL";
import test, { expect, Page } from "@playwright/test";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { getFileIdByName } from "../helpers/cms-integration-helpers";
import { TEST_MOCK_HEADER } from "../mocks";

const HEADER_API_ENDPOINT = `${getStrapiURL()}/header`;

test.describe(`Header CMS integration tests`, () => {
  test.beforeEach(async () => {
    await updateTestHeader();
  });

  test.afterEach(async () => {
    await cleanupTestHeader();
  });

  test(
    `
      GIVEN ticket popup without content
      WHEN call method PUT /api/header
      AND click by ticket button
      SHOULD ticket popup content is displayed correctly
      `,
    checkTicketPopupOnUiTest,
  );
});

async function checkTicketPopupOnUiTest({
  page,
}: {
  page: Page;
}) {
  await gotoPage({
    page,
    url: AppRoute.HOME,
  });

  await setViewportSize({
    page,
    width: Breakpoint.DESKTOP,
  });

  await page.getByTestId(`header-tickets-popup-button`)
    .click();

  expect(page.getByText(TEST_MOCK_HEADER.ticketsPopup.generalTickets[0].category), `The general ticket category should be displayed in the ticket popup.`)
    .toBeVisible();

  expect(page.getByText(TEST_MOCK_HEADER.ticketsPopup.subsidizedTicket.category), `The subsidized ticket category should be displayed in the ticket popup.`)
    .toBeVisible();

  expect(page.getByText(TEST_MOCK_HEADER.ticketsPopup.buyTicketsButton.label), `The buy ticket button label should be visible in the ticket popup.`)
    .toBeVisible();
}

async function updateTestHeader() {
  try {
    const response = await axios.put(HEADER_API_ENDPOINT, {
      data: {
        ticketsPopup: {
          ...TEST_MOCK_HEADER.ticketsPopup,
          visitingRulesAccordion: {
            button: TEST_MOCK_HEADER.ticketsPopup.visitingRulesAccordion.button,
            images: [
              {
                id: await getFileIdByName(),
              },
            ],
          },
        },
      },
    });

    await expect(response.status, `Header content should be updating with status 200`)
      .toEqual(HttpStatusCode.Ok);
  } catch (error) {
    throw new Error(`Failed to update test header: ${(error as AxiosError).message}`);
  }
}

async function cleanupTestHeader() {
  try {
    const response = await axios.delete(`${HEADER_API_ENDPOINT}`);

    await expect(response.status, `Header content should be deleted with status 204`)
      .toEqual(HttpStatusCode.NoContent);
  } catch (error) {
    throw new Error(`Failed to delete test header: ${(error as AxiosError).message}`);
  }
}

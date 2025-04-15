import { test as teardown } from '@playwright/test';
import { getStrapiURL } from '@/src/common/utils/getStrapiURL';
import axios from 'axios';
import { E2E_UI_NAME_PREFIX } from '../../helpers';

teardown(`Remove test files`, async () => {
  const filesResponse = (await axios.get(`${getStrapiURL()}/upload/files`)).data;

  const filesDelete: any[] = filesResponse
    .filter((file: any) => file.name?.startsWith(E2E_UI_NAME_PREFIX));

  if (filesDelete.length) {
    filesDelete.forEach(async ({
      id,
    }) => {
      await axios.delete(`${getStrapiURL()}/upload/files/${id}`);
    });
  }
});

import { apiFetch } from '@/src/common/utils/HttpClient';
import { NextApiRequest, NextApiResponse } from 'next';

// Endpoint for getting sitemap.xml from Strapi
export default async function getSitemap(_: NextApiRequest, res: NextApiResponse) {
  const xmlData = await apiFetch(`/strapi-5-sitemap-plugin/sitemap.xml`, {
    isResponseText: true,
  });

  res.setHeader(`Content-Type`, `application/xml`);

  res.status(200)
    .send(xmlData);
}

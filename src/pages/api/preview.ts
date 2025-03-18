import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line consistent-return
export default async function preview(req: NextApiRequest, res: NextApiResponse) {
  const {
    slug = ``,
  } = req.query;

  if (req.query.secret !== process.env.PREVIEW_SECRET) {
    return res.status(401)
      .json({
        message: `Invalid token`,
      });
  }

  res.setPreviewData({ });

  const cookies = res.getHeader(`Set-Cookie`);

  if (Array.isArray(cookies)) {
    res.setHeader(
      `Set-Cookie`,
      cookies.map((cookie: string) => cookie.replace(`SameSite=Lax`, `SameSite=None;Secure`)),
    );
  }

  res.redirect(`/${slug}`);
}

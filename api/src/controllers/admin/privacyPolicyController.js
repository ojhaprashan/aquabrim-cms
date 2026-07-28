import Page from '../../models/pageModel.js';
import asyncHandler from '../../utils/asyncHandler.js';

const SLUG = 'privacy-policy';
const NAME = 'Privacy Policy';

// GET /api/admin/privacy-policy  -> read the page for editing
export const getPrivacyPolicy = asyncHandler(async (req, res) => {
  const page = await Page.getBySlug(SLUG);
  res.json({ data: page || { slug: SLUG, name: NAME, content: {} } });
});

// PUT /api/admin/privacy-policy  -> save the page content
export const updatePrivacyPolicy = asyncHandler(async (req, res) => {
  const { content = {}, name = NAME } = req.body;
  const page = await Page.save(SLUG, name, content);
  res.json({ data: page });
});

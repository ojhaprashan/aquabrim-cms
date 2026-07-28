import Page from '../../models/pageModel.js';
import asyncHandler from '../../utils/asyncHandler.js';

const SLUG = 'contact-us';
const NAME = 'Contact Us';

// GET /api/admin/contact-us  -> read the page for editing
export const getContact = asyncHandler(async (req, res) => {
  const page = await Page.getBySlug(SLUG);
  res.json({ data: page || { slug: SLUG, name: NAME, content: {} } });
});

// PUT /api/admin/contact-us  -> save the page content
export const updateContact = asyncHandler(async (req, res) => {
  const { content = {}, name = NAME } = req.body;
  const page = await Page.save(SLUG, name, content);
  res.json({ data: page });
});

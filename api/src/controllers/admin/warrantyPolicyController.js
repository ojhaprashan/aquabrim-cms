import Page from '../../models/pageModel.js';
import asyncHandler from '../../utils/asyncHandler.js';

const SLUG = 'warranty-policy';
const NAME = 'Warranty Policy';

// GET /api/admin/warranty-policy  -> read the page for editing
export const getWarrantyPolicy = asyncHandler(async (req, res) => {
  const page = await Page.getBySlug(SLUG);
  res.json({ data: page || { slug: SLUG, name: NAME, content: {} } });
});

// PUT /api/admin/warranty-policy  -> save the page content
export const updateWarrantyPolicy = asyncHandler(async (req, res) => {
  const { content = {}, name = NAME } = req.body;
  const page = await Page.save(SLUG, name, content);
  res.json({ data: page });
});

import Page from '../../models/pageModel.js';
import asyncHandler from '../../utils/asyncHandler.js';

const SLUG = 'refund-policy';
const NAME = 'Refund Policy';

// GET /api/admin/refund-policy  -> read the page for editing
export const getRefundPolicy = asyncHandler(async (req, res) => {
  const page = await Page.getBySlug(SLUG);
  res.json({ data: page || { slug: SLUG, name: NAME, content: {} } });
});

// PUT /api/admin/refund-policy  -> save the page content
export const updateRefundPolicy = asyncHandler(async (req, res) => {
  const { content = {}, name = NAME } = req.body;
  const page = await Page.save(SLUG, name, content);
  res.json({ data: page });
});

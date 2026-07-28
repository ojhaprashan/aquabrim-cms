import Page from '../../models/pageModel.js';
import asyncHandler from '../../utils/asyncHandler.js';

const SLUG = 'pricing-policy';
const NAME = 'Pricing Policy';

// GET /api/admin/pricing-policy  -> read the page for editing
export const getPricingPolicy = asyncHandler(async (req, res) => {
  const page = await Page.getBySlug(SLUG);
  res.json({ data: page || { slug: SLUG, name: NAME, content: {} } });
});

// PUT /api/admin/pricing-policy  -> save the page content
export const updatePricingPolicy = asyncHandler(async (req, res) => {
  const { content = {}, name = NAME } = req.body;
  const page = await Page.save(SLUG, name, content);
  res.json({ data: page });
});

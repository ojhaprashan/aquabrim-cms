import Page from '../../models/pageModel.js';
import asyncHandler from '../../utils/asyncHandler.js';
import ApiError from '../../utils/ApiError.js';

const SLUG = 'pricing-policy';

// GET /api/pricing-policy  -> public content for the Pricing Policy page
export const getPricingPolicy = asyncHandler(async (req, res) => {
  const page = await Page.getBySlug(SLUG);
  if (!page) throw new ApiError(404, 'Page not found');
  res.json({ data: page });
});

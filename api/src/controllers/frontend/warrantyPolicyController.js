import Page from '../../models/pageModel.js';
import asyncHandler from '../../utils/asyncHandler.js';
import ApiError from '../../utils/ApiError.js';

const SLUG = 'warranty-policy';

// GET /api/warranty-policy  -> public content for the Warranty Policy page
export const getWarrantyPolicy = asyncHandler(async (req, res) => {
  const page = await Page.getBySlug(SLUG);
  if (!page) throw new ApiError(404, 'Page not found');
  res.json({ data: page });
});

import Page from '../../models/pageModel.js';
import asyncHandler from '../../utils/asyncHandler.js';
import ApiError from '../../utils/ApiError.js';

const SLUG = 'terms-and-conditions';

// GET /api/terms-and-conditions  -> public content for the Terms page
export const getTerms = asyncHandler(async (req, res) => {
  const page = await Page.getBySlug(SLUG);
  if (!page) throw new ApiError(404, 'Page not found');
  res.json({ data: page });
});

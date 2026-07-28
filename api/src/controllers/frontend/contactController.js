import Page from '../../models/pageModel.js';
import asyncHandler from '../../utils/asyncHandler.js';
import ApiError from '../../utils/ApiError.js';

const SLUG = 'contact-us';

// GET /api/contact-us  -> public content for the Contact Us page
export const getContact = asyncHandler(async (req, res) => {
  const page = await Page.getBySlug(SLUG);
  if (!page) throw new ApiError(404, 'Page not found');
  res.json({ data: page });
});

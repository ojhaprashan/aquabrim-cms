import Page from '../../models/pageModel.js';
import asyncHandler from '../../utils/asyncHandler.js';
import ApiError from '../../utils/ApiError.js';

const SLUG = 'blogs';

// GET /api/blogs  -> public content for the Blog page
export const getBlogs = asyncHandler(async (req, res) => {
  const page = await Page.getBySlug(SLUG);
  if (!page) throw new ApiError(404, 'Page not found');
  res.json({ data: page });
});

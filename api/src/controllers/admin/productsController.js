import Page from '../../models/pageModel.js';
import asyncHandler from '../../utils/asyncHandler.js';

const SLUG = 'products';
const NAME = 'Products';

// GET /api/admin/products  -> read the page for editing
export const getProducts = asyncHandler(async (req, res) => {
  const page = await Page.getBySlug(SLUG);
  res.json({ data: page || { slug: SLUG, name: NAME, content: {} } });
});

// PUT /api/admin/products  -> save the page content
export const updateProducts = asyncHandler(async (req, res) => {
  const { content = {}, name = NAME } = req.body;
  const page = await Page.save(SLUG, name, content);
  res.json({ data: page });
});

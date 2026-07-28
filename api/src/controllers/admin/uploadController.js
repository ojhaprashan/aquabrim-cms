import asyncHandler from '../../utils/asyncHandler.js';
import ApiError from '../../utils/ApiError.js';

// POST /api/admin/upload  (multipart, field name "file")
// Saves the image to /uploads and returns its public URL, which the admin
// then stores inside a page's content JSON.
export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'No file uploaded (field name must be "file")');

  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.status(201).json({ url, filename: req.file.filename });
});

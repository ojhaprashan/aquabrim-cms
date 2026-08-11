import asyncHandler from '../../utils/asyncHandler.js';
import ApiError from '../../utils/ApiError.js';

// POST /api/admin/upload  (multipart, field name "file")
// Saves the image to /uploads and returns its path, which the admin then stores
// inside a page's content JSON.
//
// The path is RELATIVE ("/uploads/x.jpg") on purpose. An absolute URL would bake
// in whichever host did the upload, so an image added from localhost would still
// point at localhost once the content reached production (and vice versa). Both
// the admin and the website resolve it against the API they are talking to.
export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'No file uploaded (field name must be "file")');

  const url = `/uploads/${req.file.filename}`;
  res.status(201).json({ url, filename: req.file.filename });
});

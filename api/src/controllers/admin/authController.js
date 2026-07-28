import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { query } from '../../config/db.js';
import env from '../../config/env.js';
import asyncHandler from '../../utils/asyncHandler.js';
import ApiError from '../../utils/ApiError.js';

const signToken = (admin) =>
  jwt.sign({ id: admin.id, email: admin.email }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });

// POST /api/admin/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  const { rows } = await query('SELECT * FROM admins WHERE email = $1', [email]);
  const admin = rows[0];
  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    throw new ApiError(401, 'Invalid credentials');
  }

  res.json({
    token: signToken(admin),
    admin: { id: admin.id, name: admin.name, email: admin.email },
  });
});

// GET /api/admin/auth/me
export const me = asyncHandler(async (req, res) => {
  const { rows } = await query('SELECT id, name, email FROM admins WHERE id = $1', [req.user.id]);
  if (!rows[0]) throw new ApiError(404, 'Admin not found');
  res.json({ admin: rows[0] });
});

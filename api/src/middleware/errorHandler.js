import env from '../config/env.js';

export const notFound = (req, res, next) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const payload = { message: err.message || 'Internal server error' };

  if (env.nodeEnv === 'development') {
    payload.stack = err.stack;
  }

  if (status >= 500) {
    console.error(err);
  }

  res.status(status).json(payload);
};

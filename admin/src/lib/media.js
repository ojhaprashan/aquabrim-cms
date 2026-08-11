// Image paths are stored RELATIVE ("/uploads/x.jpg") so the same content works
// on localhost and in production. This turns one into a URL the browser can load,
// pointing at whichever API this admin build is configured to talk to.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// "http://localhost:5000/api" -> "http://localhost:5000"
export const API_ORIGIN = API_URL.replace(/\/+$/, '').replace(/\/api$/, '');

export const mediaUrl = (value) => {
  if (!value) return '';
  // Already absolute (http://, https://, data:) or a frontend-hosted asset — leave it.
  if (/^(https?:)?\/\//i.test(value) || value.startsWith('data:')) return value;
  if (value.startsWith('/uploads/')) return `${API_ORIGIN}${value}`;
  return value;
};

export default mediaUrl;

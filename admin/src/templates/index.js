import home from './home';
import about from './about';
import products from './products';
import blogs from './blogs';
import contact from './contact';
import {
  pricingPolicy,
  privacyPolicy,
  refundPolicy,
  shippingPolicy,
  termsAndConditions,
  warrantyPolicy,
} from './policies';

// All page templates, in menu order. Each has: slug, name, icon, sections[].
const templates = [
  home,
  about,
  products,
  blogs,
  contact,
  pricingPolicy,
  privacyPolicy,
  refundPolicy,
  shippingPolicy,
  termsAndConditions,
  warrantyPolicy,
];

export const templateList = templates.map((t) => ({ slug: t.slug, name: t.name, icon: t.icon }));

export const getTemplate = (slug) => templates.find((t) => t.slug === slug) || null;

// Build the initial form content for a template: its section defaults, with any
// saved content merged on top so existing edits win.
export const buildInitialContent = (template, saved = {}) => {
  const out = {};
  for (const section of template.sections) {
    out[section.key] = { ...(section.default || {}), ...(saved?.[section.key] || {}) };
  }
  return out;
};

export default templates;

import { policyTemplate, sections } from './policyTemplate';

export const pricingPolicy = policyTemplate({
  slug: 'pricing-policy',
  name: 'Pricing Policy',
  seo: {
    metaTitle: 'Pricing Policy | Aquabrim Water Level Controllers',
    metaDescription:
      "Understand Aquabrim's pricing, payment terms & discount policy. Transparent pricing from ₹2,000 for homes to industrial custom quotes.",
    canonical: '/pricing-policy/',
  },
  banner: {
    image: '/assets/images/policy/pricing.webp',
    title: 'Pricing Policy – Aquabrim Water Level Controllers & Automation Systems',
    subtitle: 'This page explains our product pricing, changes, and applicable conditions.',
  },
  sectionDefaults: sections([
    ['overview', '1. Overview'],
    ['pricing-structure', '2. Custom Pricing Structure'],
    ['quotes', '3. Quotations & Validity'],
    ['taxes', '4. Taxes & Additional Charges'],
    ['payments', '5. Payment Terms'],
    ['offers', '6. Promotional Offers'],
    ['accuracy', '7. Pricing Accuracy'],
    ['refunds', '8. Refunds & Adjustments'],
    ['updates', '9. Policy Updates'],
    ['contact', '10. Contact Us'],
  ]),
});

export const privacyPolicy = policyTemplate({
  slug: 'privacy-policy',
  name: 'Privacy Policy',
  seo: {
    metaTitle: 'Privacy Policy | How Aquabrim Protects Your Data',
    metaDescription:
      'Learn how Aquabrim collects, uses, and protects your personal information.',
    canonical: '/privacy-policy/',
  },
  banner: {
    image: '/assets/images/policy/privacy.webp',
    title: 'Privacy Policy – How We Collect & Protect Your Data',
    subtitle: 'Learn how we collect, use, and protect your personal information.',
  },
  sectionDefaults: sections([
    ['overview', '1. Overview'],
    ['collect', '2. Information We Collect'],
    ['use', '3. How We Use Your Information'],
    ['sharing', '4. Data Sharing & Disclosure'],
    ['cookies', '5. Cookies & Tracking Technologies'],
    ['security', '6. Data Security'],
    ['rights', '7. Your Rights & Choices'],
    ['links', '8. Third-Party Links'],
    ['children', "9. Children's Privacy"],
    ['updates', '10. Policy Updates'],
    ['contact', '11. Contact Us'],
  ]),
});

export const refundPolicy = policyTemplate({
  slug: 'refund-policy',
  name: 'Refund Policy',
  seo: {
    metaTitle: 'Refund & Return Policy | Aquabrim',
    metaDescription: 'Learn about our refund eligibility, timelines, and return process.',
    canonical: '/refund-policy/',
  },
  banner: {
    image: '/assets/images/policy/refund.webp',
    title: 'Refund & Return Policy – Aquabrim Products',
    subtitle: 'Learn about our refund eligibility, timelines, and return process.',
  },
  sectionDefaults: sections([
    ['overview', '1. Overview'],
    ['eligibility', '2. Refund Eligibility'],
    ['request', '3. How to Request a Refund'],
    ['process', '4. Refund Approval Process'],
    ['timeline', '5. Refund Timeline'],
    ['non-refundable', '6. Non-Refundable Conditions'],
    ['damaged', '7. Damaged or Defective Products'],
    ['updates', '8. Policy Updates'],
    ['contact', '9. Contact Us'],
  ]),
});

export const shippingPolicy = policyTemplate({
  slug: 'shipping-policy',
  name: 'Shipping Policy',
  seo: {
    metaTitle: 'Shipping & Delivery Policy | Aquabrim',
    metaDescription: 'Learn how we process and deliver your Aquabrim orders.',
    canonical: '/shipping-policy/',
  },
  banner: {
    image: '/assets/images/policy/shipping.webp',
    title: 'Shipping & Delivery Policy – Aquabrim Orders',
    subtitle: 'Learn how we process and deliver your Aquabrim orders.',
  },
  sectionDefaults: sections([
    ['overview', '1. Overview'],
    ['processing', '2. Order Processing'],
    ['shipping', '3. Shipping & Delivery'],
    ['timelines', '4. Delivery Timelines'],
    ['charges', '5. Shipping Charges'],
    ['tracking', '6. Order Tracking & Support'],
    ['incorrect-info', '7. Incorrect Shipping Information'],
    ['updates', '8. Policy Updates'],
    ['contact', '9. Contact Us'],
  ]),
});

export const termsAndConditions = policyTemplate({
  slug: 'terms-and-conditions',
  name: 'Terms and Conditions',
  seo: {
    metaTitle: 'Terms & Conditions | Aquabrim',
    metaDescription: 'Read the terms and conditions for using our website and products.',
    canonical: '/terms-and-conditions/',
  },
  banner: {
    image: '/assets/images/policy/terms&condition.webp',
    title: 'Terms & Conditions – Aquabrim Private Limited',
    subtitle: 'Read the terms and conditions for using our website and products.',
  },
  sectionDefaults: sections([
    ['overview', '1. Overview'],
    ['acceptance', '2. Acceptance of Terms'],
    ['company', '3. Company Information'],
    ['website-use', '4. Use of Website & Services'],
    ['product-info', '5. Product & Service Information'],
    ['pricing-payments', '6. Pricing & Payments'],
    ['intellectual-property', '7. Intellectual Property Rights'],
    ['links', '8. Third-Party Links'],
    ['liability', '9. Limitation of Liability'],
    ['responsibilities', '10. User Responsibilities'],
    ['force-majeure', '11. Force Majeure'],
    ['governing-law', '12. Governing Law & Jurisdiction'],
    ['changes', '13. Changes to Terms'],
    ['contact', '14. Contact Us'],
  ]),
});

export const warrantyPolicy = policyTemplate({
  slug: 'warranty-policy',
  name: 'Warranty Policy',
  seo: {
    metaTitle: 'Warranty Policy | Aquabrim Water Level Controllers',
    metaDescription: 'Understand the warranty terms and coverage for Aquabrim products.',
    canonical: '/warranty-policy/',
  },
  banner: {
    image: '/assets/images/policy/warranty.webp',
    title: 'Product Warranty Policy – Aquabrim Water Level Controllers',
    subtitle: 'Understand the warranty terms and coverage for Aquabrim products.',
  },
  sectionDefaults: sections([
    ['overview', '1. Overview'],
    ['coverage', '2. Warranty & AMC Coverage'],
    ['process', '3. Service & Support Process'],
    ['warranty-terms', '4. Warranty Terms'],
    ['amc-terms', '5. AMC Terms & Conditions'],
    ['exclusions', '6. Conditions Where Warranty / AMC May Not Apply'],
    ['relocation', '7. Product Relocation & Address Changes'],
    ['liability', '8. Limitation of Liability'],
    ['spares', '9. Spare Parts & Service Availability'],
    ['updates', '10. Policy Updates'],
    ['contact', '11. Contact Us'],
  ]),
});

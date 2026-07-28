// Factory for the 6 policy pages — they all share the same shape:
//   seo + banner + lastUpdated + a list of content sections + a CTA banner.
// Each content section is { id, title, body (rich text / HTML) }.

const sharedCta = {
  title: 'Still Need Help?',
  subtitle: 'Our team is here to assist you with any questions',
  btnText: 'Contact Support',
  btnLink: '/contact-us',
  icon: 'bi-life-preserver',
  btnIcon: 'bi-headset',
};

const ctaFields = [
  { key: 'title', label: 'Title', type: 'text', maxLength: 60 },
  { key: 'subtitle', label: 'Subtitle', type: 'text', maxLength: 95 },
  { key: 'btnText', label: 'Button Text', type: 'text', maxLength: 24 },
  { key: 'btnLink', label: 'Button Link', type: 'url', maxLength: 120 },
  { key: 'icon', label: 'Icon (bootstrap class)', type: 'text', maxLength: 30 },
  { key: 'btnIcon', label: 'Button Icon (bootstrap class)', type: 'text', maxLength: 30 },
];

// Turn ["1. Overview", ...] pairs into default section objects.
export const sections = (pairs) =>
  pairs.map(([id, title]) => ({ id, title, body: '' }));

export function policyTemplate({ slug, name, seo, banner, sectionDefaults }) {
  return {
    slug,
    name,
    icon: 'bi-file-earmark-text',
    sections: [
      {
        key: 'seo',
        label: 'SEO',
        fields: [
          { key: 'metaTitle', label: 'Meta Title', type: 'text', maxLength: 65 },
          { key: 'metaDescription', label: 'Meta Description', type: 'textarea', maxLength: 165 },
          { key: 'canonical', label: 'Canonical Path', type: 'text', maxLength: 120 },
        ],
        default: seo,
      },
      {
        key: 'banner',
        label: 'Banner',
        fields: [
          { key: 'image', label: 'Banner Image', type: 'image' },
          { key: 'title', label: 'Title', type: 'text', maxLength: 120 },
          { key: 'subtitle', label: 'Subtitle', type: 'textarea', maxLength: 200 },
        ],
        default: banner,
      },
      {
        key: 'meta',
        label: 'Page Info',
        fields: [{ key: 'lastUpdated', label: 'Last Updated', type: 'text', maxLength: 24 }],
        default: { lastUpdated: '20 May 2026' },
      },
      {
        key: 'body',
        label: 'Content Sections',
        fields: [
          {
            key: 'sections',
            label: 'Sections',
            type: 'list',
            itemLabel: 'Section',
            maxItems: 20,
            itemFields: [
              { key: 'id', label: 'Anchor id', type: 'text', help: 'e.g. overview', maxLength: 40 },
              { key: 'title', label: 'Section Title', type: 'text', maxLength: 90 },
              { key: 'body', label: 'Body', type: 'richtext', help: 'HTML allowed', maxLength: 6000 },
            ],
          },
        ],
        default: { sections: sectionDefaults },
      },
      {
        key: 'cta',
        label: 'CTA Banner',
        fields: ctaFields,
        default: sharedCta,
      },
    ],
  };
}

export { sharedCta, ctaFields };

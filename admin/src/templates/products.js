// PRODUCTS page template. The `products` list holds the full product catalog
// (same shape as src/data/products.json) and drives both the listing and the
// /products/[slug] detail pages.
const productItemFields = [
  { key: 'id', label: 'ID', type: 'number' },
  { key: 'slug', label: 'Slug', type: 'text', maxLength: 80, help: 'URL: /products/{slug}' },
  { key: 'category', label: 'Category', type: 'text', maxLength: 30, help: 'domestic | industrial | more_categories' },
  { key: 'categoryName', label: 'Category Name', type: 'text', maxLength: 30 },
  { key: 'subCategory', label: 'Sub Category', type: 'text', maxLength: 40 },
  { key: 'title', label: 'Title', type: 'text', maxLength: 40 },
  { key: 'subtitle', label: 'Subtitle', type: 'text', maxLength: 60 },
  { key: 'description', label: 'Short Description', type: 'textarea', maxLength: 200 },
  { key: 'h1', label: 'Detail H1', type: 'text', maxLength: 120 },
  { key: 'metaTitle', label: 'Meta Title', type: 'text', maxLength: 70 },
  { key: 'metaDescription', label: 'Meta Description', type: 'textarea', maxLength: 165 },
  { key: 'images', label: 'Images (first = main)', type: 'list', itemLabel: 'Image', maxItems: 8, itemField: { key: 'image', type: 'image' } },
  { key: 'howItWorksImg', label: 'How-It-Works Image', type: 'image' },
  { key: 'longDescription', label: 'Long Description', type: 'list', itemLabel: 'Paragraph', maxItems: 8, itemField: { key: 'text', type: 'textarea', maxLength: 600 } },
  { key: 'howItWorks', label: 'How It Works (steps)', type: 'list', itemLabel: 'Step', maxItems: 8, itemFields: [
    { key: 'title', label: 'Title', type: 'text', maxLength: 40 },
    { key: 'desc', label: 'Description', type: 'textarea', maxLength: 300 },
  ] },
  { key: 'features', label: 'Features', type: 'list', itemLabel: 'Feature', maxItems: 15, itemField: { key: 'text', type: 'text', maxLength: 60 } },
  { key: 'technicalSpecifications', label: 'Technical Specifications', type: 'list', itemLabel: 'Spec', maxItems: 20, itemFields: [
    { key: 'label', label: 'Label', type: 'text', maxLength: 40 },
    { key: 'value', label: 'Value', type: 'text', maxLength: 120 },
  ] },
  { key: 'faqs', label: 'FAQs', type: 'list', itemLabel: 'FAQ', maxItems: 12, itemFields: [
    { key: 'question', label: 'Question', type: 'text', maxLength: 130 },
    { key: 'answer', label: 'Answer', type: 'textarea', maxLength: 500 },
  ] },
  { key: 'cta', label: 'CTA', type: 'group', fields: [
    { key: 'title', label: 'Title', type: 'text', maxLength: 90 },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea', maxLength: 200 },
    { key: 'contact', label: 'Contact (call | email)', type: 'text', maxLength: 10 },
  ] },
];

const products = {
  slug: 'products',
  name: 'Products',
  icon: 'bi-box-seam',
  sections: [
    {
      key: 'seo',
      label: 'SEO',
      fields: [
        { key: 'metaTitle', label: 'Meta Title', type: 'text', maxLength: 70 },
        { key: 'metaDescription', label: 'Meta Description', type: 'textarea', maxLength: 165 },
        { key: 'canonical', label: 'Canonical Path', type: 'text', maxLength: 120 },
      ],
      default: {
        metaTitle: 'Water Level Controller Products | Buy Online | Aquabrim',
        metaDescription:
          "Browse Aquabrim's full range of water automation products — wireless controllers for homes, industrial multi-tank systems, alarms & accessories. Find the right fit for your setup.",
        canonical: '/products/',
      },
    },
    {
      key: 'hero',
      label: 'Hero',
      fields: [
        { key: 'headingLine1', label: 'Heading Line 1', type: 'text', maxLength: 60 },
        { key: 'headingLine2', label: 'Heading Line 2', type: 'text', maxLength: 60 },
        { key: 'sidebarLabel', label: 'Sidebar Label', type: 'text', maxLength: 24 },
      ],
      default: {
        headingLine1: 'Water Level Controller Products',
        headingLine2: 'Smart Automation for Every Setup',
        sidebarLabel: 'Categories',
      },
    },
    {
      key: 'catalog',
      label: 'Product Catalog',
      fields: [
        { key: 'products', label: 'Products', type: 'list', itemLabel: 'Product', maxItems: 50, itemFields: productItemFields },
      ],
      default: {
        products: [
          { id: 1, slug: 'trigger-municipal-water-controller', category: 'domestic', categoryName: 'Domestic', title: 'Trigger', subtitle: 'Never miss water supply', description: 'Smart controller for motor, directly connected to corporation water supply line', images: ['/assets/Product/trigger_2.jpeg', '/assets/Product/trigger_1.jpeg', '/assets/Product/trigger_3.jpeg'], longDescription: [], howItWorks: [], features: [], technicalSpecifications: [], faqs: [], cta: { contact: 'call' } },
          { id: 2, slug: 'macro-borewell-water-controller', category: 'domestic', categoryName: 'Domestic', title: 'Macro', subtitle: 'Prevents tank overflow', description: 'Controller for borewell/ submersible pumps, motor pumping from Underground tank to Overhead tank', images: ['/assets/Product/macro_3.jpeg'], longDescription: [], howItWorks: [], features: [], technicalSpecifications: [], faqs: [], cta: { contact: 'call' } },
          { id: 4, slug: 'matrix-multi-tank-controller', category: 'industrial', categoryName: 'Industrial', title: 'MATRIX', description: 'Multi-Tank Water Level Controller', images: ['/assets/Product/matix_1.webp'], longDescription: [], howItWorks: [], features: [], technicalSpecifications: [], faqs: [], cta: { contact: 'email' } },
          { id: 5, slug: 'flexibell-water-level-alarm', category: 'industrial', categoryName: 'Industrial', title: 'FLEXIBELL', description: 'Wireless Water Level Alarm', images: ['/assets/Product/flexibell_1.webp'], longDescription: [], howItWorks: [], features: [], technicalSpecifications: [], faqs: [], cta: { contact: 'email' } },
        ],
      },
    },
    {
      key: 'cta',
      label: 'CTA Banner',
      fields: [
        { key: 'title', label: 'Title', type: 'text', maxLength: 60 },
        { key: 'subtitle', label: 'Subtitle', type: 'text', maxLength: 95 },
        { key: 'btnText', label: 'Button Text', type: 'text', maxLength: 24 },
        { key: 'btnLink', label: 'Button Link', type: 'url', maxLength: 120 },
        { key: 'icon', label: 'Icon (bootstrap class)', type: 'text', maxLength: 30 },
        { key: 'btnIcon', label: 'Button Icon (bootstrap class)', type: 'text', maxLength: 30 },
      ],
      default: {
        title: 'Need Help Choosing the Right System?',
        subtitle: 'Our experts can help you find the best solution for your setup.',
        btnText: 'Talk to Expert',
        btnLink: '/contact-us',
        icon: 'bi-person-workspace',
        btnIcon: 'bi-chat-dots-fill',
      },
    },
  ],
};

export default products;

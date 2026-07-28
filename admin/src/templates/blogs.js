// BLOG page template — mirrors BlogScreen.tsx (the live /blogs page).
const blogs = {
  slug: 'blogs',
  name: 'Blog',
  icon: 'bi-newspaper',
  sections: [
    {
      key: 'seo',
      label: 'SEO',
      fields: [
        { key: 'metaTitle', label: 'Meta Title', type: 'text', maxLength: 65 },
        { key: 'metaDescription', label: 'Meta Description', type: 'textarea', maxLength: 165 },
        { key: 'canonical', label: 'Canonical Path', type: 'text', maxLength: 120 },
      ],
      default: {
        metaTitle: 'Water Automation Blog – Tips, Guides & Insights | Aquabrim',
        metaDescription:
          "Expert articles on water level controllers, dry-run protection, smart automation, water conservation & industry insights from Aquabrim — India's water automation specialists since 2008.",
        canonical: '/blogs/',
      },
    },
    {
      key: 'hero',
      label: 'Hero',
      fields: [
        { key: 'headingLine1', label: 'Heading Line 1', type: 'text', maxLength: 60 },
        { key: 'headingLine2', label: 'Heading Line 2', type: 'text', maxLength: 60 },
      ],
      default: {
        headingLine1: 'Water Automation Blog',
        headingLine2: 'Expert Guides, Tips & Industry Insights',
      },
    },
    {
      key: 'categories',
      label: 'Categories',
      fields: [
        { key: 'categories', label: 'Categories', type: 'list', itemLabel: 'Category', maxItems: 10, itemFields: [
          { key: 'id', label: 'ID', type: 'text', maxLength: 20 },
          { key: 'name', label: 'Name', type: 'text', maxLength: 40 },
          { key: 'count', label: 'Count', type: 'number' },
        ] },
      ],
      default: {
        categories: [
          { id: 'all', name: 'All Posts', count: 24 },
          { id: 'automation', name: 'Water Automation', count: 8 },
          { id: 'conservation', name: 'Water Conservation', count: 6 },
          { id: 'updates', name: 'Product Updates', count: 5 },
          { id: 'insights', name: 'Industry Insights', count: 3 },
          { id: 'guides', name: 'Tips & Guides', count: 2 },
        ],
      },
    },
    {
      key: 'posts',
      label: 'Blog Posts',
      fields: [
        { key: 'posts', label: 'Posts', type: 'list', itemLabel: 'Post', maxItems: 30, itemFields: [
          { key: 'id', label: 'ID', type: 'number' },
          { key: 'title', label: 'Title', type: 'text', maxLength: 120 },
          { key: 'description', label: 'Description', type: 'textarea', maxLength: 200 },
          { key: 'category', label: 'Category (label)', type: 'text', maxLength: 40 },
          { key: 'catId', label: 'Category ID', type: 'text', maxLength: 20, help: 'must match a category id' },
          { key: 'date', label: 'Date', type: 'text', maxLength: 20 },
          { key: 'readTime', label: 'Read Time', type: 'text', maxLength: 20 },
          { key: 'img', label: 'Image', type: 'image' },
        ] },
      ],
      default: {
        posts: [
          { id: 1, category: 'Water Automation', catId: 'automation', date: '10 May 2025', readTime: '5 min read', title: 'Why Smart Water Level Controllers Are Essential for Every Home', description: 'Save water, prevent overflow, and ensure uninterrupted supply with smart automation.', img: '/assets/images/blog/blog-inner1.jpg' },
          { id: 2, category: 'Product Updates', catId: 'updates', date: '06 May 2025', readTime: '4 min read', title: 'Introducing iBot 4G – Smarter, Faster & More Reliable', description: 'Our latest innovation comes with 4G connectivity, real-time alerts, and advanced safety.', img: '/assets/images/blog/blog-inner2.jpg' },
          { id: 3, category: 'Water Conservation', catId: 'conservation', date: '02 May 2025', readTime: '6 min read', title: '10 Simple Ways to Conserve Water and Reduce Waste', description: 'Small changes can make a big difference. Start your journey towards a water-secure future.', img: '/assets/images/blog/blog-inner3.jpg' },
          { id: 4, category: 'Industry Insights', catId: 'insights', date: '28 Apr 2025', readTime: '5 min read', title: 'Water Management Solutions for Apartments & Societies', description: 'How automation ensures fair usage, reduces wastage, and simplifies water management.', img: '/assets/images/blog/blog1.png' },
          { id: 5, category: 'Water Automation', catId: 'automation', date: '24 Apr 2025', readTime: '4 min read', title: 'How Industrial Units Benefit from Smart Water Automation', description: 'Increase efficiency, reduce downtime, and optimize water usage with intelligent systems.', img: '/assets/images/blog/blog2.png' },
          { id: 6, category: 'Tips & Guides', catId: 'guides', date: '20 Apr 2025', readTime: '3 min read', title: 'Dry Run Protection: Why It Can Save Your Motor & Money', description: 'Understand how dry run protection works and why it is crucial for your pumps and motors.', img: '/assets/images/blog/blog3.png' },
        ],
      },
    },
    {
      key: 'featured',
      label: 'Featured Post',
      fields: [
        { key: 'widgetHeading', label: 'Widget Heading', type: 'text', maxLength: 30 },
        { key: 'image', label: 'Image', type: 'image' },
        { key: 'category', label: 'Category', type: 'text', maxLength: 40 },
        { key: 'date', label: 'Date', type: 'text', maxLength: 20 },
        { key: 'readTime', label: 'Read Time', type: 'text', maxLength: 20 },
        { key: 'title', label: 'Title', type: 'text', maxLength: 120 },
        { key: 'description', label: 'Description', type: 'textarea', maxLength: 200 },
        { key: 'link', label: 'Link', type: 'url', maxLength: 120 },
      ],
      default: {
        widgetHeading: 'Featured Post',
        image: '/assets/images/blog/blog-inner2.jpg',
        category: 'Product Updates',
        date: '15 Apr 2025',
        readTime: '4 min read',
        title: 'Understanding the Aquabrim Matrix Panel',
        description: 'A complete overview of features, benefits, and real-world applications.',
        link: '/blog-details',
      },
    },
    {
      key: 'newsletter',
      label: 'Newsletter Widget',
      fields: [
        { key: 'heading', label: 'Heading', type: 'text', maxLength: 30 },
        { key: 'body', label: 'Body', type: 'textarea', maxLength: 160 },
        { key: 'placeholder', label: 'Input Placeholder', type: 'text', maxLength: 40 },
        { key: 'buttonText', label: 'Button Text', type: 'text', maxLength: 24 },
      ],
      default: {
        heading: 'Stay Updated',
        body: 'Subscribe to our newsletter and get the latest insights and updates.',
        placeholder: 'Enter your email',
        buttonText: 'Subscribe',
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
        title: 'Reliable Water Management Starts Here',
        subtitle: 'Explore automation solutions trusted across industries and homes.',
        btnText: 'View Systems',
        btnLink: '/products',
        icon: 'bi-droplet-half',
        btnIcon: 'bi-grid-fill',
      },
    },
  ],
};

export default blogs;

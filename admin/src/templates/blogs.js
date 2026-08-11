// BLOG template.
//
// ONE "Post" = ONE complete article. The fields below are laid out in the exact
// order of the SEO team's Word doc, so writing a post is a straight top-to-bottom
// copy job:
//
//   1. Publishing    <- the "URL SLUG / H1 / AUTHOR / DATE" block of the doc
//   2. SEO           <- the "META TITLE / META DESC" block
//   3. Card & Image  <- the listing card + the big image on the article page
//   4. Article       <- "LIVE BLOG CONTENT": quick answer, intro, then one
//                       Section per H2 heading
//   5. FAQs          <- the "FAQs" block (also becomes FAQPage schema)
//
// Nothing is a "block type" and there is no HTML to write. Every field is plain
// text, and everything except the heading inside a Section is optional — fill in
// only the parts your doc actually has.
//
// Categories and their counts are NOT edited here: the site derives the category
// list and the post count per category from the posts below, automatically.
//
// Leaving a field blank keeps whatever the site already ships for that slug
// (src/data/blogs.ts). Typing in a field overrides it.

// A single H3 sub-section inside a Section. Used when the doc has a smaller
// heading part-way through a section (e.g. "How It Works").
const subsectionFields = [
  { key: 'heading', label: 'Sub-heading (H3)', type: 'text', maxLength: 120 },
  { key: 'paragraphs', label: 'Paragraphs', type: 'list', itemLabel: 'Paragraph', maxItems: 8,
    itemField: { key: 'text', label: 'Paragraph', type: 'textarea', maxLength: 900 } },
  { key: 'bullets', label: 'Bullet points', type: 'list', itemLabel: 'Bullet', maxItems: 12,
    itemField: { key: 'text', label: 'Bullet', type: 'textarea', maxLength: 300 } },
  { key: 'paragraphsAfter', label: 'Paragraphs after the bullets', type: 'list', itemLabel: 'Paragraph', maxItems: 5,
    itemField: { key: 'text', label: 'Paragraph', type: 'textarea', maxLength: 900 } },
];

// One H2 section of the article. Renders strictly in this order:
// heading -> paragraphs -> bullets -> paragraphsAfter -> highlight -> table -> sub-sections.
const sectionFields = [
  { key: 'heading', label: 'Section heading (H2)', type: 'text', maxLength: 120,
    help: 'Also becomes an entry in the sticky table of contents on the left of the article' },
  { key: 'paragraphs', label: 'Paragraphs', type: 'list', itemLabel: 'Paragraph', maxItems: 10,
    itemField: { key: 'text', label: 'Paragraph', type: 'textarea', maxLength: 900 } },
  { key: 'bullets', label: 'Bullet points', type: 'list', itemLabel: 'Bullet', maxItems: 12,
    help: 'Each one shows with a blue tick. Leave empty if this section has no bullets',
    itemField: { key: 'text', label: 'Bullet', type: 'textarea', maxLength: 300 } },
  { key: 'paragraphsAfter', label: 'Paragraphs after the bullets', type: 'list', itemLabel: 'Paragraph', maxItems: 5,
    itemField: { key: 'text', label: 'Paragraph', type: 'textarea', maxLength: 900 } },
  { key: 'highlight', label: 'Highlight box (optional)', type: 'group',
    help: 'Blue tinted box — use for a "Quick fact" or a key takeaway. Leave both blank to hide it',
    fields: [
      { key: 'title', label: 'Box label', type: 'text', maxLength: 40, placeholder: 'Quick fact' },
      { key: 'text', label: 'Box text', type: 'textarea', maxLength: 500 },
    ] },
  { key: 'table', label: 'Two-column table (optional)', type: 'group',
    help: 'Use for comparison / "feature vs benefit" tables. Leave the rows empty to hide it',
    fields: [
      { key: 'col1Label', label: 'Left column heading', type: 'text', maxLength: 60 },
      { key: 'col2Label', label: 'Right column heading', type: 'text', maxLength: 60 },
      { key: 'rows', label: 'Rows', type: 'list', itemLabel: 'Row', maxItems: 15, itemFields: [
        { key: 'label', label: 'Left cell', type: 'text', maxLength: 80 },
        { key: 'value', label: 'Right cell', type: 'textarea', maxLength: 500 },
      ] },
    ] },
  { key: 'subsections', label: 'Sub-sections (optional)', type: 'list', itemLabel: 'Sub-section', maxItems: 5,
    help: 'Only if the doc has an H3 heading inside this section', itemFields: subsectionFields },
];

const postFields = [
  // ---- 1. Publishing -------------------------------------------------------
  { key: 'slug', label: 'URL slug', type: 'text', maxLength: 90,
    help: 'Lower-case, words joined by dashes. The page becomes /blogs/{slug}/ — never change this once a post is live' },
  { key: 'title', label: 'Title (H1)', type: 'text', maxLength: 120,
    help: 'The headline shown at the top of the article and on the listing card' },
  { key: 'category', label: 'Category', type: 'text', maxLength: 40,
    help: 'Water Automation | Water Conservation | Tips & Guides | Industry Insights | Product Updates' },
  { key: 'categoryId', label: 'Category ID', type: 'text', maxLength: 20,
    help: 'The matching short code: automation | conservation | guides | insights | updates' },
  { key: 'date', label: 'Publish date', type: 'text', maxLength: 20, placeholder: '10 Jul 2026',
    help: 'Format: DD Mon YYYY' },
  { key: 'readTime', label: 'Read time', type: 'text', maxLength: 20, placeholder: '5 min read' },
  { key: 'author', label: 'Author', type: 'text', maxLength: 60, placeholder: 'Aquabrim Team' },

  // ---- 2. SEO --------------------------------------------------------------
  { key: 'metaTitle', label: 'Meta title', type: 'text', maxLength: 65,
    help: 'Google search result headline. Keep under 60 characters' },
  { key: 'metaDescription', label: 'Meta description', type: 'textarea', maxLength: 165,
    help: 'Google search result snippet. Aim for 150-160 characters' },

  // ---- 3. Card & image -----------------------------------------------------
  { key: 'image', label: 'Featured image', type: 'image',
    help: 'Used on the listing card and as the large image at the top of the article' },
  { key: 'imageAlt', label: 'Image alt text', type: 'text', maxLength: 160,
    help: 'Describe the image for screen readers and image search' },
  { key: 'excerpt', label: 'Card summary', type: 'textarea', maxLength: 320,
    help: 'The 1-2 line teaser under the title on the /blogs listing page' },
  { key: 'tags', label: 'Tags', type: 'list', itemLabel: 'Tag', maxItems: 10,
    itemField: { key: 'tag', label: 'Tag', type: 'text', maxLength: 40 } },

  // ---- 4. Article ----------------------------------------------------------
  { key: 'quickAnswer', label: 'Quick Answer', type: 'textarea', maxLength: 700,
    help: 'The highlighted box at the very top of the article — a direct 2-3 sentence answer. This is what Google pulls for featured snippets. Leave blank to hide it' },
  { key: 'intro', label: 'Intro paragraphs', type: 'list', itemLabel: 'Paragraph', maxItems: 6,
    help: 'The paragraphs that come before the first H2 heading',
    itemField: { key: 'text', label: 'Paragraph', type: 'textarea', maxLength: 900 } },
  { key: 'sections', label: 'Sections', type: 'list', itemLabel: 'Section', maxItems: 20,
    help: 'One Section per H2 heading in the doc, in order', itemFields: sectionFields },

  // ---- 5. FAQs -------------------------------------------------------------
  { key: 'faqs', label: 'FAQs', type: 'list', itemLabel: 'FAQ', maxItems: 12,
    help: 'Shown as an accordion at the end of the article and submitted to Google as FAQ schema',
    itemFields: [
      { key: 'question', label: 'Question', type: 'text', maxLength: 160 },
      { key: 'answer', label: 'Answer', type: 'textarea', maxLength: 700 },
    ] },
];

const blogs = {
  slug: 'blogs',
  name: 'Blog',
  icon: 'bi-newspaper',
  sections: [
    {
      key: 'seo',
      label: 'SEO — listing page only',
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
      label: 'Listing page heading',
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
      key: 'posts',
      label: 'Blog Posts',
      fields: [
        {
          key: 'posts', label: 'Posts', type: 'list', itemLabel: 'Post',
          maxItems: 40, itemFields: postFields,
          // Table layout: one row per article, click to open and edit it.
          layout: 'table',
          thumbKey: 'image',
          columns: [
            { key: 'title', label: 'Post' },
            { key: 'category', label: 'Category', width: '160px' },
            { key: 'date', label: 'Date', width: '120px' },
          ],
        },
      ],
      // Defaults carry the publishing/SEO/card fields only. The article body of
      // each existing post already ships with the site (src/data/blogs.ts) and is
      // used automatically while the fields below are blank.
      default: {
        posts: [
          {
            slug: 'fed-up-waking-early-municipal-water-supply-delhi',
            title: 'Fed Up of Waking Up Early Just to Catch the Water Supply in Delhi?',
            category: 'Water Automation',
            categoryId: 'automation',
            date: '10 Jul 2026',
            readTime: '5 min read',
            author: 'Aquabrim Team',
            metaTitle: "Fed Up of Waking Up Early for Delhi's Water Supply? Read This | Aquabrim",
            metaDescription:
              "Tired of catching Delhi's irregular DJB municipal water supply by hand? Discover how a smart automatic water level controller solves this problem permanently, no more missed supply, no more overflows.",
            image: '/assets/blogs/blogs1.webp',
            imageAlt:
              'Delhi apartment building with water tank - smart automatic water level controller solution by Aquabrim',
            excerpt:
              "If you live in Delhi, you know the drill: wake up before sunrise to catch the DJB supply, or wait another 24 hours. Here's the permanent, low-effort fix thousands of homeowners have already switched to.",
            tags: ['Water Supply Delhi', 'DJB', 'Automatic Controller', 'Smart Home', 'Water Tank'],
            quickAnswer: '',
            intro: [],
            sections: [],
            faqs: [],
          },
          {
            slug: 'why-every-home-needs-a-smart-water-level-controller',
            title: 'Why Every Home Needs a Smart Water Level Controller',
            category: 'Tips & Guides',
            categoryId: 'guides',
            date: '18 Jul 2026',
            readTime: '4 min read',
            author: 'Aquabrim Team',
            metaTitle: 'Why Every Home Needs a Smart Water Level Controller | Aquabrim',
            metaDescription:
              "Tank overflow, dry motors, and manual switching are avoidable. Here's what a smart water level controller does, its advantages, and the main types.",
            image: '/assets/blogs/blogs2.webp',
            imageAlt: 'Smart water level controller installed above a home overhead tank',
            excerpt:
              "Most homes still manage water the way they did twenty years ago. A smart water level controller removes tank checking, overflow and dry-run worries from your daily routine, here's what it is and the types you'll come across.",
            tags: ['Smart Water Level Controller', 'Home Automation', 'Water Management'],
            quickAnswer: '',
            intro: [],
            sections: [],
            faqs: [],
          },
          {
            slug: 'what-makes-aquabrim-best-water-level-controller',
            title: 'What Makes Aquabrim the Best Water Level Controller?',
            category: 'Tips & Guides',
            categoryId: 'guides',
            date: '10 Aug 2026',
            readTime: '6 min read',
            author: 'Aquabrim Team',
            metaTitle: 'What Makes Aquabrim the Best Water Level Controller?',
            metaDescription:
              "16+ years of experience, wireless sensors, dry-run protection, a full product range, and 50,000+ customers. Here's exactly what sets Aquabrim apart.",
            image: '/assets/blogs/blogs1.webp',
            imageAlt: 'Aquabrim smart water level controller installed in an Indian apartment',
            excerpt:
              'Aquabrim is built specifically for Indian water problems — irregular municipal supply, borewell dry-run risk, and multi-tank apartments. Here are the seven things that set it apart.',
            tags: ['Best Water Level Controller', 'Aquabrim', 'Water Automation India'],
            quickAnswer: '',
            intro: [],
            sections: [],
            faqs: [],
          },
        ],
      },
    },
    {
      key: 'featured',
      label: 'Featured Post Widget',
      fields: [
        { key: 'widgetHeading', label: 'Widget Heading', type: 'text', maxLength: 30 },
        { key: 'postSlug', label: 'Which post to feature', type: 'text', maxLength: 90,
          help: 'Paste the URL slug of one of the posts above. Leave blank to feature the newest post' },
      ],
      default: {
        widgetHeading: 'Featured Post',
        postSlug: '',
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

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
        {
          key: 'products', label: 'Products', type: 'list', itemLabel: 'Product',
          maxItems: 50, itemFields: productItemFields,
          // Table layout: rows you click into, instead of 50 products expanded
          // down one page. `columns` are the summary cells shown per row.
          layout: 'table',
          thumbKey: 'images',
          columns: [
            { key: 'title', label: 'Product' },
            { key: 'categoryName', label: 'Category', width: '150px' },
            { key: 'slug', label: 'URL slug', width: '280px' },
          ],
        },
      ],
      default: {
        products: [
          { id: 1, slug: 'trigger-municipal-water-controller', category: 'domestic', categoryName: 'Domestic', title: 'Trigger', subtitle: 'Never miss water supply', description: 'Smart controller for motor, directly connected to corporation water supply line', images: ['/assets/Product/trigger_2.jpeg', '/assets/Product/trigger_1.jpeg', '/assets/Product/trigger_3.jpeg'], longDescription: [], howItWorks: [], features: [], technicalSpecifications: [], faqs: [], cta: { contact: 'call' } },
          { id: 2, slug: 'macro-borewell-water-controller', category: 'domestic', categoryName: 'Domestic', title: 'Macro', subtitle: 'Prevents tank overflow', description: 'Controller for borewell/ submersible pumps, motor pumping from Underground tank to Overhead tank', images: ['/assets/Product/macro_3.jpeg'], longDescription: [], howItWorks: [], features: [], technicalSpecifications: [], faqs: [], cta: { contact: 'call' } },
          { id: 4, slug: 'matrix-multi-tank-controller', category: 'industrial', categoryName: 'Industrial', title: 'MATRIX', description: 'Multi-Tank Water Level Controller', images: ['/assets/Product/matix_1.webp'], longDescription: [], howItWorks: [], features: [], technicalSpecifications: [], faqs: [], cta: { contact: 'email' } },
          { id: 5, slug: 'flexibell-water-level-alarm', category: 'industrial', categoryName: 'Industrial', title: 'FLEXIBELL', description: 'Wireless Water Level Alarm', images: ['/assets/Product/flexibell_1.webp'], longDescription: [], howItWorks: [], features: [], technicalSpecifications: [], faqs: [], cta: { contact: 'email' } },
          { id: 6, slug: 'wireless-water-level-transmitter-capacitive', category: 'more_categories', categoryName: 'More Category', subCategory: 'wireless_capacitive', title: 'Wireless water level transmitter ( Capacitive)', description: 'Continuous capacitive level sensing for deep tanks and borewells.', images: ['/assets/accessories/wireless-water-level-transmitter-capacitive.jpg'], longDescription: [], howItWorks: [], features: [], technicalSpecifications: [], faqs: [] },
          { id: 7, slug: 'current-voltage-monitoring-system', category: 'more_categories', categoryName: 'More Category', subCategory: 'current_voltage', title: 'Current & Voltage monitoring system', description: 'Advanced electrical health monitoring and pump safety system.', images: ['/assets/accessories/current-voltage-monitoring-system.jpg'], longDescription: [], howItWorks: [], features: [], technicalSpecifications: [], faqs: [] },
          { id: 8, slug: 'flow-meter', category: 'more_categories', categoryName: 'More Category', subCategory: 'flowmeter', title: 'Flow Meter', description: 'High-precision wireless electromagnetic flow monitoring system.', images: ['/assets/accessories/electromagnetic-flow-meter.jpg'], longDescription: [], howItWorks: [], features: [], technicalSpecifications: [], faqs: [] },
          { id: 9, slug: 'temperature-humidity-monitoring-system', category: 'more_categories', categoryName: 'More Category', subCategory: 'temp_humidity', title: 'Temperature and humidity Monitoring system', description: 'Remote environmental condition monitoring for panels and server rooms.', images: ['/assets/accessories/temperature-humidity-monitoring-system.jpg'], longDescription: [], howItWorks: [], features: [], technicalSpecifications: [], faqs: [] },
          { id: 10, slug: 'wireless-water-level-transmitter-non-contact', category: 'more_categories', categoryName: 'More Category', subCategory: 'wireless_non_contact', title: 'Wireless water level transmitter ( Non Contact)', description: 'Radar and ultrasonic non-contact level transmitter for open sumps.', images: ['/assets/accessories/non-contact-transmitter-1.jpg', '/assets/accessories/non-contact-transmitter-2.jpg', '/assets/accessories/non-contact-transmitter-3.jpg'], longDescription: [], howItWorks: [], features: [], technicalSpecifications: [], faqs: [] },
          { id: 12, slug: 'integrated-control-command-centre', category: 'more_categories', categoryName: 'More Category', subCategory: 'integrated_control', title: 'Integrated Control & Command centre', description: 'Unified dashboard and command hub for site-wide water systems.', images: ['/assets/accessories/integrated-control-command-centre.jpg'], longDescription: [], howItWorks: [], features: [], technicalSpecifications: [], faqs: [] },
          { id: 14, slug: 'motorized-valve', category: 'more_categories', categoryName: 'More Category', subCategory: 'motorized_valve', title: 'Motorized Valve', description: 'Heavy-duty automated control valves with wireless triggering.', images: ['/assets/accessories/motorized-valve.jpg'], longDescription: [], howItWorks: [], features: [], technicalSpecifications: [], faqs: [] },
          { id: 15, slug: 'iot-gateway', category: 'more_categories', categoryName: 'More Category', subCategory: 'iot_gateway', title: 'IoT Gateway', description: 'Cloud communication hub linking Aquabrim devices over GPRS, WiFi & RS485.', images: ['/assets/accessories/iot-gateway.jpg'], longDescription: [], howItWorks: [], features: [], technicalSpecifications: [], faqs: [] },
          { id: 16, slug: 'wireless-signal-booster', category: 'more_categories', categoryName: 'More Category', subCategory: 'signal_booster', title: 'Wireless Signal Booster', description: 'Extends wireless range between transmitters and the main controller.', images: ['/assets/accessories/wireless-signal-booster.jpg'], longDescription: [], howItWorks: [], features: [], technicalSpecifications: [], faqs: [] },
          { id: 17, slug: 'lidar-based-level-sensor', category: 'more_categories', categoryName: 'More Category', subCategory: 'lidar_sensor', title: 'Lidar based level sensor', description: 'Non-contact LiDAR level sensing for precise, maintenance-free measurement.', images: ['/assets/accessories/lidar-level-sensor.jpg'], longDescription: [], howItWorks: [], features: [], technicalSpecifications: [], faqs: [] },
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

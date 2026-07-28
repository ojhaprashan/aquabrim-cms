// ABOUT US page template — sections mirror src/components/about/*
const about = {
  slug: 'about-us',
  name: 'About Us',
  icon: 'bi-info-circle',
  sections: [
    {
      key: 'seo',
      label: 'SEO',
      fields: [
        { key: 'metaTitle', label: 'Meta Title', type: 'text', maxLength: 65 },
        { key: 'metaDescription', label: 'Meta Description', type: 'textarea', maxLength: 165 },
        { key: 'canonicalPath', label: 'Canonical Path', type: 'text', maxLength: 120 },
      ],
      default: {
        metaTitle: 'About Aquabrim | Water Automation Company Since 2008',
        metaDescription:
          'Aquabrim has pioneered smart water automation in India since 2008. Serving 50,000+ customers in 15+ cities with wireless controllers, industrial systems & IoT-based water management.',
        canonicalPath: '/about-us/',
      },
    },
    {
      key: 'aboutIntro',
      label: 'About Intro',
      fields: [
        { key: 'image', label: 'Image', type: 'image' },
        { key: 'imageAlt', label: 'Image Alt', type: 'text', maxLength: 90 },
        { key: 'eyebrow', label: 'Eyebrow', type: 'text', maxLength: 32 },
        { key: 'heading', label: 'Heading (H1)', type: 'text', maxLength: 90 },
        { key: 'paragraphs', label: 'Paragraphs', type: 'list', itemLabel: 'Paragraph', maxItems: 6, itemField: { key: 'text', type: 'textarea', maxLength: 500 } },
        { key: 'expertiseHeading', label: 'Expertise Heading', type: 'text', maxLength: 70 },
        { key: 'expertiseItems', label: 'Expertise Items', type: 'list', itemLabel: 'Item', maxItems: 3, itemFields: [
          { key: 'title', label: 'Title', type: 'text', maxLength: 40 },
          { key: 'desc', label: 'Description', type: 'textarea', maxLength: 160 },
        ] },
      ],
      default: {
        image: '/assets/about/about.webp',
        imageAlt: "India's Leading Water Level Informatory System & Automation Solutions",
        eyebrow: 'About Aquabrim',
        heading: "India's Smart Water Automation Company – Aquabrim Since 2008",
        paragraphs: [
          'Aquabrim is built to simplify and modernize the way water is monitored, controlled, and managed across residential, commercial, and industrial infrastructure.',
          "Founded in 2008, Aquabrim has grown into one of India's trusted water automation companies, delivering intelligent solutions that help reduce water wastage, improve operational efficiency, and enable smarter infrastructure management.",
          'From wireless water level automation systems to advanced industrial monitoring technologies, we design solutions that combine engineering reliability with smart automation to solve real-world water management challenges.',
          'With a strong focus on innovation, scalability, and long-term performance, Aquabrim continues to help homes, businesses, industries, and infrastructure projects transition toward smarter and more efficient water management systems.',
        ],
        expertiseHeading: 'Who We Are & What We Build',
        expertiseItems: [
          { title: 'Smart Water Automation', desc: 'Intelligent automation systems designed for efficient water monitoring and control.' },
          { title: 'Industrial Monitoring Solutions', desc: 'Advanced sensing, flow management, and automation technologies for industrial infrastructure.' },
          { title: 'System Integration & Services', desc: 'End-to-end implementation, integration, and technical support for automation projects.' },
        ],
      },
    },
    {
      key: 'missionVision',
      label: 'Mission & Vision',
      fields: [
        { key: 'heading', label: 'Heading', type: 'text', maxLength: 70 },
        { key: 'cards', label: 'Cards', type: 'list', itemLabel: 'Card', maxItems: 2, itemFields: [
          { key: 'icon', label: 'Icon (bootstrap class)', type: 'text', maxLength: 30 },
          { key: 'title', label: 'Title', type: 'text', maxLength: 40 },
          { key: 'desc', label: 'Description', type: 'textarea', maxLength: 220 },
        ] },
      ],
      default: {
        heading: 'Our Mission & Vision',
        cards: [
          { icon: 'bi-bullseye', title: 'Our Mission', desc: 'To develop reliable water level monitoring and automation systems that improve operational efficiency and support smarter infrastructure management.' },
          { icon: 'bi-eye', title: 'Our Vision', desc: 'To lead the future of water automation with intelligent, connected, and efficient infrastructure solutions.' },
        ],
      },
    },
    {
      key: 'journey',
      label: 'Our Journey',
      fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text', maxLength: 32 },
        { key: 'heading', label: 'Heading', type: 'text', maxLength: 70 },
        { key: 'milestones', label: 'Milestones', type: 'list', itemLabel: 'Milestone', maxItems: 12, itemFields: [
          { key: 'year', label: 'Year', type: 'text', maxLength: 8 },
          { key: 'title', label: 'Title', type: 'text', maxLength: 45 },
          { key: 'desc', label: 'Description', type: 'textarea', maxLength: 220 },
        ] },
      ],
      default: {
        eyebrow: 'OUR ROADMAP',
        heading: 'The Journey of Innovation (2008–2025)',
        milestones: [
          { year: '2008', title: 'Foundation & Vision', desc: 'Aquabrim was founded with a vision to build smarter technologies for efficient water monitoring and automation.' },
          { year: '2010', title: 'Residential Automation', desc: 'Expanded into residential automation by developing solutions tailored for domestic water management requirements.' },
          { year: '2012', title: 'Industrial-Grade Systems', desc: 'Introduced industrial-grade automation systems for commercial buildings and large-scale infrastructure projects.' },
          { year: '2015', title: 'Web Telemetry & IoT', desc: 'Integrated remote monitoring and web-enabled technologies to improve operational visibility and control.' },
          { year: '2018', title: 'PAN India Leadership', desc: 'Strengthened nationwide presence through continuous innovation, reliable support, and scalable automation systems.' },
          { year: '2021', title: 'Advanced Flow Portfolios', desc: 'Expanded the product portfolio with advanced flow management systems, motorised valves, and intelligent sensing technologies.' },
          { year: '2023', title: 'Connected Infrastructure', desc: 'Diversified into broader industrial automation and connected infrastructure management solutions.' },
          { year: '2025', title: 'Future-Ready Grids', desc: 'Continuing to build future-ready intelligent automation systems focused on sustainability, digital connectivity, and smarter water infrastructure.' },
        ],
      },
    },
    {
      key: 'testimonials',
      label: 'Testimonials (headings only)',
      fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text', maxLength: 32 },
        { key: 'heading', label: 'Heading', type: 'text', maxLength: 70 },
      ],
      default: {
        eyebrow: 'What Our Clients Say',
        heading: 'Trusted by 50,000+ Customers',
      },
    },
    {
      key: 'founders',
      label: 'Founders',
      fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text', maxLength: 32 },
        { key: 'heading', label: 'Heading', type: 'text', maxLength: 70 },
        { key: 'founders', label: 'Founders', type: 'list', itemLabel: 'Founder', maxItems: 4, itemFields: [
          { key: 'name', label: 'Name', type: 'text', maxLength: 40 },
          { key: 'role', label: 'Role', type: 'text', maxLength: 60 },
          { key: 'desc', label: 'Description', type: 'textarea', maxLength: 400 },
          { key: 'image', label: 'Image', type: 'image' },
          { key: 'imageSide', label: 'Image Side (left/right)', type: 'text', maxLength: 10 },
          { key: 'pills', label: 'Pills', type: 'list', itemLabel: 'Pill', maxItems: 8, itemField: { key: 'label', type: 'text', maxLength: 40 } },
        ] },
      ],
      default: {
        eyebrow: 'OUR FOUNDERS',
        heading: 'Meet Our Founders',
        founders: [
          { name: 'Praveen Sinha', role: 'Co-Founder & Strategic Advisor', image: '/assets/images/team/praveen.png', imageSide: 'left', desc: "Bringing strong entrepreneurial vision and strategic leadership, Praveen Sinha has played a key role in shaping Aquabrim's growth, innovation roadmap, and long-term expansion in intelligent infrastructure solutions.", pills: ['IIM-C Alumni', 'Serial Entrepreneur', 'Venture Capitalist', 'Startup Ecosystem Mentor', 'Business & Growth Strategist'] },
          { name: 'Rakesh Kumar', role: 'Co-Founder & Technology Head', image: '/assets/images/team/rakesh.png', imageSide: 'right', desc: 'With deep expertise in wireless technologies and industrial automation, Rakesh Kumar leads the technology and product innovation initiatives at Aquabrim, driving the development of reliable and future-ready automation systems.', pills: ['Wireless Technology Expert', 'Electronics Engineer', 'Automation Specialist', 'Patent Holder', 'Industrial IoT Innovator'] },
        ],
      },
    },
    {
      key: 'serviceArea',
      label: 'Where We Serve',
      fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text', maxLength: 32 },
        { key: 'heading', label: 'Heading', type: 'text', maxLength: 90 },
        { key: 'stats', label: 'Stats', type: 'list', itemLabel: 'Stat', maxItems: 3, itemFields: [
          { key: 'icon', label: 'Icon (bootstrap class)', type: 'text', maxLength: 30 },
          { key: 'label', label: 'Label', type: 'text', maxLength: 60 },
        ] },
        { key: 'ctaButtonText', label: 'CTA Button Text', type: 'text', maxLength: 24 },
        { key: 'ctaButtonLink', label: 'CTA Button Link', type: 'url', maxLength: 120 },
        { key: 'mapImage', label: 'Map Image', type: 'image' },
        { key: 'states', label: 'States', type: 'list', itemLabel: 'State', maxItems: 30, itemFields: [
          { key: 'name', label: 'Name', type: 'text', maxLength: 40 },
          { key: 'top', label: 'Top %', type: 'text', maxLength: 8 },
          { key: 'left', label: 'Left %', type: 'text', maxLength: 8 },
          { key: 'displayName', label: 'Display Name', type: 'text', maxLength: 40 },
          { key: 'isHeadOffice', label: 'Head Office', type: 'boolean' },
        ] },
      ],
      default: {
        eyebrow: 'Where We Serve',
        heading: 'Trusted by Homes and Industries Across India',
        stats: [
          { icon: 'bi-geo-alt-fill', label: '15+ Cities Served Across India' },
          { icon: 'bi-house-door-fill', label: '50,000+ Homes and Buildings Automated' },
          { icon: 'bi-emoji-smile-fill', label: 'Trusted Since 2008' },
        ],
        ctaButtonText: 'View Products',
        ctaButtonLink: '/products',
        mapImage: '/assets/images/india_map.webp',
        states: [
          { name: 'Punjab', top: '22%', left: '33%' },
          { name: 'Uttarakhand', top: '24%', left: '41%' },
          { name: 'Delhi', top: '28%', left: '36%', displayName: 'Delhi', isHeadOffice: true },
          { name: 'Rajasthan', top: '36%', left: '29%' },
          { name: 'Uttar Pradesh', top: '33%', left: '43%' },
          { name: 'Bihar', top: '38%', left: '53%' },
          { name: 'West Bengal', top: '46%', left: '57%' },
          { name: 'Odisha', top: '52%', left: '50%' },
          { name: 'Maharashtra', top: '54%', left: '34%' },
          { name: 'Goa', top: '64%', left: '30%' },
          { name: 'Karnataka', top: '71%', left: '35%' },
          { name: 'Tamil Nadu', top: '80%', left: '42%' },
          { name: 'Kerala', top: '82%', left: '34%' },
        ],
      },
    },
    {
      key: 'ctaBanner',
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
        title: 'Want to See What We Build?',
        subtitle: 'Explore smart water Level controllers by Aquabrim.',
        btnText: 'Explore Products',
        btnLink: '/products',
        icon: 'bi-eye-fill',
        btnIcon: 'bi-arrow-right',
      },
    },
  ],
};

export default about;

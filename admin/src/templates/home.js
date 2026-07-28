// HOME page template — sections mirror src/components/homes/home/*
// maxLength / maxItems are tuned to the frontend design so content can't overflow.
const home = {
  slug: 'home',
  name: 'Home',
  icon: 'bi-house-door',
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
        metaTitle: 'Wireless Water Level Controller India | Aquabrim',
        metaDescription:
          "Aquabrim's wireless water level controllers stop tank overflow, prevent dry-run damage & automate your motor 24/7. Trusted by 50,000+ homes & industries across India since 2008.",
        canonical: '/',
      },
    },
    {
      key: 'hero',
      label: 'Hero',
      fields: [
        { key: 'headingPrefix', label: 'Heading Prefix', type: 'text', maxLength: 75 },
        { key: 'animatedPhrases', label: 'Animated Phrases', type: 'list', itemLabel: 'Phrase', maxItems: 5, itemField: { key: 'phrase', type: 'text', maxLength: 22 } },
        { key: 'paragraph', label: 'Paragraph', type: 'textarea', maxLength: 180 },
        { key: 'primaryBtnText', label: 'Primary Button Text', type: 'text', maxLength: 24 },
        { key: 'primaryBtnLink', label: 'Primary Button Link', type: 'url', maxLength: 120 },
        { key: 'secondaryBtnText', label: 'Secondary Button Text', type: 'text', maxLength: 24 },
        { key: 'secondaryBtnLink', label: 'Secondary Button Link', type: 'url', maxLength: 120 },
        { key: 'sliderImages', label: 'Slider Images', type: 'list', itemLabel: 'Image', maxItems: 5, itemField: { key: 'image', type: 'image' } },
      ],
      default: {
        headingPrefix: 'Smart Wireless Water Level Controller for',
        animatedPhrases: ['Homes', 'Apartments', 'Industries'],
        paragraph:
          'Prevent tank overflow, protect motors from dry-run, and maintain a consistent water supply with Aquabrim.',
        primaryBtnText: 'Our Products',
        primaryBtnLink: '/products',
        secondaryBtnText: 'Talk to Expert',
        secondaryBtnLink: '/contact-us',
        sliderImages: [
          '/assets/home/for homes.webp',
          '/assets/home/for apartments.webp',
          '/assets/home/for industries.webp',
        ],
      },
    },
    {
      key: 'aboutArea',
      label: 'About / How It Works',
      fields: [
        { key: 'image', label: 'Image', type: 'image' },
        { key: 'heading', label: 'Heading', type: 'text', maxLength: 75 },
        { key: 'paragraphs', label: 'Paragraphs', type: 'list', itemLabel: 'Paragraph', maxItems: 4, itemField: { key: 'text', type: 'textarea', maxLength: 420 } },
        { key: 'features', label: 'Feature Checklist', type: 'list', itemLabel: 'Feature', maxItems: 8, itemField: { key: 'text', type: 'text', maxLength: 50 } },
        { key: 'ctaBtnText', label: 'CTA Button Text', type: 'text', maxLength: 24 },
        { key: 'ctaBtnLink', label: 'CTA Button Link', type: 'url', maxLength: 120 },
      ],
      default: {
        image: '/assets/home/home page image.webp',
        heading: 'How Aquabrim Water Level Controller Works',
        paragraphs: [
          'Aquabrim Water Level Controllers keeps your water tank perfectly managed with no manual effort. It constantly checks two things: the incoming water supply (municipal line or borewell) and the water level inside the tank using built-in sensors.',
          'When the tank level drops below the set point and water is available, Aquabrim turns the motor ON to fill the tank. As the tank fills, it keeps monitoring the level in real time and switches the motor OFF the moment the tank reaches the set capacity, preventing overflow and saving water.',
          'If there is no water in the supply line, Aquabrim keeps the motor off, so it never runs dry and stays protected. This smart control ensures the right water level, avoids wastage, and gives you a steady, reliable supply.',
        ],
        features: [
          'Detects water supply availability',
          'Prevents dry-run damage',
          'Monitors tank water level',
          'Avoids overflow and wastage',
          'Starts motor when level is low',
          'Maintains Consistent Water Supply',
          'Stops motor when tank is full',
        ],
        ctaBtnText: 'View Products',
        ctaBtnLink: '/products',
      },
    },
    {
      key: 'aboutImpact',
      label: 'Impact / Stats',
      fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text', maxLength: 32 },
        { key: 'heading', label: 'Heading', type: 'text', maxLength: 75 },
        { key: 'subheading', label: 'Subheading', type: 'text', maxLength: 90 },
        { key: 'stats', label: 'Stats', type: 'list', itemLabel: 'Stat', maxItems: 4, itemFields: [
          { key: 'value', label: 'Value', type: 'text', maxLength: 12 },
          { key: 'label', label: 'Label', type: 'text', maxLength: 28 },
        ] },
      ],
      default: {
        eyebrow: 'Trusted by thousands',
        heading: 'Trusted by 50,000+ Customers Across India',
        subheading: 'Installed across residential, commercial and institutional',
        stats: [
          { value: '50,000+', label: 'Customers Served' },
          { value: '5,000+', label: 'Systems Installed' },
          { value: '15+', label: 'Cities Served' },
          { value: '16+', label: 'Years Experience' },
        ],
      },
    },
    {
      key: 'aboutClients',
      label: 'Clients Marquee',
      fields: [
        { key: 'heading', label: 'Heading', type: 'text', maxLength: 45 },
        { key: 'logos', label: 'Client Logos', type: 'list', itemLabel: 'Logo', maxItems: 20, itemField: { key: 'image', type: 'image' } },
      ],
      default: {
        heading: 'They trust Aquabrim',
        logos: [
          '/assets/client/1280px-Radisson_Blu_logo.svg.png',
          '/assets/client/Bharat_Heavy_Electricals_Limited-Logo.wine.png',
          '/assets/client/Bharat_Petroleum_logo.svg.png',
          '/assets/client/Coca-Cola_logo.svg.png',
          '/assets/client/EIL logo.png',
          '/assets/client/Indian-Oil-Logo-768x483.png',
          '/assets/client/Indian_Railway_Logo_2.png',
          '/assets/client/Unilever.svg.png',
          '/assets/client/Emaar-Properties-Logo-1.jpg.jpeg',
          '/assets/client/max healthcar.png',
          '/assets/client/bhutani infra logo.png',
          '/assets/client/hyatt regency.jpeg',
          '/assets/client/pwd.jpeg',
          '/assets/client/M3M.webp',
        ],
      },
    },
    {
      key: 'services',
      label: 'Products Carousel',
      fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text', maxLength: 32 },
        { key: 'heading', label: 'Heading', type: 'text', maxLength: 75 },
        { key: 'items', label: 'Product Cards', type: 'list', itemLabel: 'Card', maxItems: 8, itemFields: [
          { key: 'title', label: 'Title', type: 'text', maxLength: 28 },
          { key: 'subtitle', label: 'Subtitle', type: 'text', maxLength: 45 },
          { key: 'description', label: 'Description', type: 'textarea', maxLength: 140 },
          { key: 'image', label: 'Image', type: 'image' },
          { key: 'slug', label: 'Slug', type: 'text', maxLength: 70 },
        ] },
      ],
      default: {
        eyebrow: 'Our Products',
        heading: 'Our Water Automation Products',
        items: [
          { title: 'Trigger', subtitle: 'Never miss water supply', description: 'Smart controller for motor, directly connected to corporation water supply line', image: '/assets/Product/trigger_2.jpeg', slug: 'trigger-municipal-water-controller' },
          { title: 'Macro', subtitle: 'Prevents tank overflow', description: 'Controller for borewell/ submersible pumps, motor pumping from Underground tank to Overhead tank', image: '/assets/Product/macro_3.jpeg', slug: 'macro-borewell-water-controller' },
          { title: 'MATRIX', subtitle: '', description: 'Multi-Tank Water Level Controller', image: '/assets/Product/matix_1.webp', slug: 'matrix-multi-tank-controller' },
          { title: 'FLEXIBELL', subtitle: '', description: 'Wireless Water Level Alarm', image: '/assets/Product/flexibell_1.webp', slug: 'flexibell-water-level-alarm' },
        ],
      },
    },
    {
      key: 'productFeatures',
      label: 'Product Features Grid',
      fields: [
        { key: 'heading', label: 'Heading', type: 'text', maxLength: 45 },
        { key: 'items', label: 'Features', type: 'list', itemLabel: 'Feature', maxItems: 6, itemFields: [
          { key: 'title', label: 'Title', type: 'text', maxLength: 40 },
          { key: 'image', label: 'Image', type: 'image' },
          { key: 'wide', label: 'Wide (spans 2 columns)', type: 'boolean' },
          { key: 'blue', label: 'Blue background', type: 'boolean' },
        ] },
      ],
      default: {
        heading: 'Product Features',
        items: [
          { title: 'App-Based Remote Control', image: '/assets/product_feature/WebApp Based Monitoring System.png', wide: true, blue: true },
          { title: 'Smart Scheduling', image: '/assets/product_feature/Smart Scheduling.webp', wide: false, blue: false },
          { title: 'Dry-Run Motor Protection', image: '/assets/product_feature/Dry-run Protection.png', wide: false, blue: true },
          { title: 'Prevents Tank Overflow', image: '/assets/product_feature/Tank Level Monitoring.png', wide: false, blue: true },
          { title: 'Real-Time Alerts', image: '/assets/product_feature/SMS Alert.png', wide: false, blue: false },
          { title: 'Wireless Sensor Technology', image: '/assets/product_feature/Wireless Technology.png', wide: true, blue: true },
        ],
      },
    },
    {
      key: 'platformArea',
      label: 'Platform / App',
      fields: [
        { key: 'image', label: 'Image', type: 'image' },
        { key: 'heading', label: 'Heading', type: 'richtext', maxLength: 110, help: 'HTML allowed (e.g. <span class="text-primary">word</span>)' },
        { key: 'paragraph', label: 'Paragraph', type: 'richtext', maxLength: 550, help: 'HTML allowed' },
        { key: 'appLabel', label: 'App Label', type: 'text', maxLength: 45 },
        { key: 'webLink', label: 'Web Link', type: 'url', maxLength: 160 },
        { key: 'androidLink', label: 'Android Link', type: 'url', maxLength: 200 },
        { key: 'iosLink', label: 'iOS Link', type: 'url', maxLength: 200 },
      ],
      default: {
        image: '/assets/Application/application.webp',
        heading: 'Control Your Water System from Anywhere',
        paragraph:
          "Track water levels, motor performance, tank conditions, and system notifications in real time with Aquabrim's smart web and mobile platform. Remotely access and manage your water automation system, receive instant alerts, and monitor operations seamlessly from anywhere with complete control and convenience.",
        appLabel: 'Get the Aquabrim App on',
        webLink: 'https://aquabrim.co.in/',
        androidLink: 'https://play.google.com/store/apps/details?id=com.aquabrim.aquabrim_app',
        iosLink: '#',
      },
    },
    {
      key: 'faqArea',
      label: 'FAQ + Support',
      fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text', maxLength: 24 },
        { key: 'heading', label: 'Heading', type: 'text', maxLength: 75 },
        { key: 'faqs', label: 'FAQs', type: 'list', itemLabel: 'FAQ', maxItems: 8, itemFields: [
          { key: 'question', label: 'Question', type: 'text', maxLength: 130 },
          { key: 'answer', label: 'Answer', type: 'textarea', maxLength: 450 },
        ] },
        { key: 'supportHeading', label: 'Support Heading', type: 'text', maxLength: 45 },
        { key: 'supportParagraph', label: 'Support Paragraph', type: 'textarea', maxLength: 170 },
        { key: 'supportPoints', label: 'Support Points', type: 'list', itemLabel: 'Point', maxItems: 4, itemFields: [
          { key: 'icon', label: 'Icon (bootstrap class)', type: 'text', maxLength: 30 },
          { key: 'label', label: 'Label', type: 'text', maxLength: 32 },
        ] },
        { key: 'supportPrimaryBtnText', label: 'Primary Button Text', type: 'text', maxLength: 24 },
        { key: 'supportPrimaryBtnLink', label: 'Primary Button Link', type: 'url', maxLength: 120 },
        { key: 'supportSecondaryBtnText', label: 'Secondary Button Text', type: 'text', maxLength: 24 },
        { key: 'supportSecondaryBtnLink', label: 'Secondary Button Link', type: 'url', maxLength: 120 },
      ],
      default: {
        eyebrow: 'FAQ',
        heading: 'Frequently Asked Questions',
        faqs: [
          { question: 'How do Aquabrim water automation systems operate?', answer: "Aquabrim's smart automation systems continuously monitor water levels and automatically manage motor activity to maintain a reliable water supply. The system helps automate tank filling, reduce manual intervention, and ensure smooth water management." },
          { question: 'What kind of water management issues does Aquabrim solve?', answer: 'Aquabrim is designed to address common challenges such as tank overflow, dry-running motors, inconsistent water supply, manual motor switching, and inefficient water monitoring through intelligent automation and real-time control.' },
          { question: 'Why do Aquabrim products offer more value compared to standard controllers?', answer: 'Aquabrim products are built with advanced automation features including smart monitoring, motor protection, wireless connectivity, instant alerts, and web/mobile access to deliver better reliability, efficiency, and long-term performance.' },
          { question: 'Are Aquabrim systems compatible with underground and overhead tanks?', answer: 'Yes, Aquabrim solutions are designed to work efficiently with underground storage tanks, overhead tanks, municipal supply lines, borewells, and submersible pump systems.' },
          { question: 'Can Aquabrim systems perform efficiently in areas with irregular water supply?', answer: 'Yes, Aquabrim products are intelligently designed to detect fluctuating or low water supply conditions and automatically manage motor operations for efficient water usage and uninterrupted tank management.' },
        ],
        supportHeading: 'Still Have Questions?',
        supportParagraph: 'Our team is here to help you find the right solution for your water automation needs.',
        supportPoints: [
          { icon: 'bi-chat-dots', label: 'Expert Support' },
          { icon: 'bi-lightning', label: 'Quick Response' },
          { icon: 'bi-tools', label: 'Installation Guidance' },
        ],
        supportPrimaryBtnText: 'Get in Touch',
        supportPrimaryBtnLink: '/contact-us',
        supportSecondaryBtnText: 'View Products',
        supportSecondaryBtnLink: '/products',
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
        title: 'Tired of Managing Water Manually?',
        subtitle: 'Switch to smarter and automated water management.',
        btnText: 'Explore Products',
        btnLink: '/products',
        icon: 'bi-droplet-half',
        btnIcon: 'bi-arrow-right',
      },
    },
  ],
};

export default home;

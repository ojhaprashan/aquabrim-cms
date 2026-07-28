// CONTACT US page template — mirrors src/components/contact/ContactArea.tsx
const contact = {
  slug: 'contact-us',
  name: 'Contact Us',
  icon: 'bi-envelope',
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
        metaTitle: 'Contact Aquabrim | Get a Quote – Delhi, Bangalore, Pune',
        metaDescription:
          'Contact Aquabrim for water level controllers, installation support & expert advice. Offices in Delhi, Bangalore & Pune. Call +91-9560088791 or send us a message for a quick response.',
        canonical: '/contact-us/',
      },
    },
    {
      key: 'heading',
      label: 'Page Heading',
      fields: [
        { key: 'line1', label: 'Heading Line 1', type: 'text', maxLength: 40 },
        { key: 'line2', label: 'Heading Line 2', type: 'text', maxLength: 60 },
      ],
      default: {
        line1: 'Contact Aquabrim',
        line2: 'Get a Quote or Expert Support',
      },
    },
    {
      key: 'form',
      label: 'Contact Form',
      fields: [
        { key: 'formTitle', label: 'Form Title', type: 'text', maxLength: 40 },
        { key: 'formSubtitle', label: 'Form Subtitle', type: 'textarea', maxLength: 160 },
        { key: 'submitText', label: 'Submit Button Text', type: 'text', maxLength: 24 },
        { key: 'successMessage', label: 'Success Message', type: 'textarea', maxLength: 200 },
        { key: 'queryTypes', label: 'Query Type Options', type: 'list', itemLabel: 'Option', maxItems: 8, itemField: { key: 'option', type: 'text', maxLength: 40 } },
      ],
      default: {
        formTitle: 'Send Us a Message',
        formSubtitle: 'Fill out the form below and our team will get back to you as soon as possible.',
        submitText: 'Send Message',
        successMessage: "Thank you! Your message has been sent. We'll get back to you soon.",
        queryTypes: ['General Inquiry', 'Technical Support', 'Sales', 'Feedback'],
      },
    },
    {
      key: 'offices',
      label: 'Offices',
      fields: [
        { key: 'offices', label: 'Offices', type: 'list', itemLabel: 'Office', maxItems: 10, itemFields: [
          { key: 'title', label: 'Office Title', type: 'text', maxLength: 70 },
          { key: 'addressLabel', label: 'Address Label', type: 'text', maxLength: 40 },
          { key: 'address', label: 'Address', type: 'textarea', maxLength: 220 },
          { key: 'person', label: 'Contact Person', type: 'text', maxLength: 60 },
          { key: 'phone', label: 'Phone', type: 'text', maxLength: 30 },
          { key: 'emails', label: 'Emails', type: 'list', itemLabel: 'Email', maxItems: 4, itemField: { key: 'email', type: 'text', maxLength: 60 } },
        ] },
      ],
      default: {
        offices: [
          { title: 'Head Office – New Delhi (Ghitorni)', address: 'Aquabrim Pvt. Ltd.\nPlot no. 35, 1st Floor, Union Bank of India Building,\n100 Feet road, Ghitorni, Delhi – 110030', emails: ['save.water@aquabrim.com', 'sales@aquabrim.com'], phone: '+91-9560088791' },
          { title: 'Branch – Bangalore, Karnataka', addressLabel: 'STATE: KARNATAKA', address: 'Aquabrim Pvt. Ltd.\nFlat no .20, Mahabala 2nd cross, Chamundi Narsari Road,\nJaraganahalli, Bangalore (Landmark: Shivanna Depo).', emails: ['save.water@aquabrim.com', 'sales@aquabrim.com'], phone: '+91-9560088781' },
          { title: 'Branch – Pune, Maharashtra', addressLabel: 'STATE: MAHARASHTRA', address: 'Aquabrim Pvt. Ltd.\n16/B Elahi Residency, 3 No Colony, Ashoka Society,\nKalewadi Phata, Thergaon, Chinchwad,\nPune – 411033, Maharashtra', emails: [] },
          { title: 'Branch – Hyderabad, Telangana', person: 'Mr. Gajula Kesari Kumar', phone: '+91-9502855986', emails: [] },
        ],
      },
    },
    {
      key: 'map',
      label: 'Map',
      fields: [
        { key: 'embedSrc', label: 'Map Embed Src', type: 'url', maxLength: 1200 },
        { key: 'linkUrl', label: 'Map Link URL', type: 'url', maxLength: 1200 },
        { key: 'linkText', label: 'Map Link Text', type: 'text', maxLength: 40 },
      ],
      default: {
        embedSrc: 'https://www.google.com/maps?q=Aquabrim%20Pvt.%20Ltd.%2C%20Plot%20no.%2035%2C%20Ghitorni%2C%20New%20Delhi%20110030&output=embed',
        linkUrl: 'https://www.google.com/maps/search/?api=1&query=Aquabrim%20Ghitorni%20New%20Delhi%20110030',
        linkText: 'View on Google Maps',
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
        title: "Let's Talk About Your Requirement",
        subtitle: 'Connect with our experts for the right solution.',
        btnText: 'Call Now',
        btnLink: 'tel:+919560088791',
        icon: 'bi-headset',
        btnIcon: 'bi-telephone-fill',
      },
    },
  ],
};

export default contact;

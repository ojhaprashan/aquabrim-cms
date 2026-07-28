import { useState } from 'react';
import { Field } from './Fields';

// Map common section keys to a fitting icon.
const ICONS = {
  seo: 'bi-search', hero: 'bi-star', banner: 'bi-image', meta: 'bi-info-circle',
  aboutArea: 'bi-info-square', aboutIntro: 'bi-info-square', aboutImpact: 'bi-graph-up',
  aboutClients: 'bi-building', services: 'bi-box-seam', catalog: 'bi-box-seam',
  productFeatures: 'bi-grid-3x3-gap', platformArea: 'bi-phone', faqArea: 'bi-question-circle',
  cta: 'bi-megaphone', ctaBanner: 'bi-megaphone', missionVision: 'bi-bullseye',
  journey: 'bi-signpost-2', testimonials: 'bi-chat-quote', founders: 'bi-people',
  serviceArea: 'bi-geo-alt', body: 'bi-file-text', heading: 'bi-type', form: 'bi-ui-checks',
  offices: 'bi-building', map: 'bi-map', categories: 'bi-tags', posts: 'bi-newspaper',
  featured: 'bi-pin-angle', newsletter: 'bi-envelope-paper',
};

export default function SectionCard({ section, value, onChange, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const data = value || {};
  const icon = ICONS[section.key] || 'bi-sliders';

  const setField = (fieldKey, v) => onChange({ ...data, [fieldKey]: v });

  return (
    <div className="card section-card">
      <button type="button" className="section-head" onClick={() => setOpen(!open)}>
        <span className="sec-icon"><i className={`bi ${icon}`}></i></span>
        <span className="section-title">{section.label}</span>
        <i className={`bi bi-chevron-down section-chevron ${open ? 'open' : ''}`}></i>
      </button>

      {open && (
        <div className="section-body">
          {section.fields.map((field) => (
            <Field
              key={field.key}
              field={field}
              value={data[field.key]}
              onChange={(v) => setField(field.key, v)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import ImageField from './ImageField';
import { mediaUrl } from '../../lib/media';

// Renders ONE field based on its schema `type`.
// Supported types: text, textarea, richtext, url, number, boolean, image, list.
export function Field({ field, value, onChange }) {
  const { type, label, help, placeholder } = field;

  if (type === 'list') {
    // Long lists (products, blog posts) render as a compact table you click into,
    // instead of every item expanded down one enormous page.
    if (field.layout === 'table' && field.itemFields) {
      return <TableListField field={field} value={value} onChange={onChange} />;
    }
    return <ListField field={field} value={value} onChange={onChange} />;
  }

  if (type === 'group') {
    const obj = value || {};
    return (
      <div className="field group-field">
        <label>
          {label}
          {help && <span className="muted"> — {help}</span>}
        </label>
        <div className="group-body">
          {field.fields.map((sub) => (
            <Field
              key={sub.key}
              field={sub}
              value={obj[sub.key]}
              onChange={(v) => onChange({ ...obj, [sub.key]: v })}
            />
          ))}
        </div>
      </div>
    );
  }

  const { maxLength } = field;
  const counted = maxLength && ['text', 'textarea', 'url', 'richtext'].includes(type);
  const len = typeof value === 'string' ? value.length : 0;

  return (
    <div className="field">
      <label>
        {label}
        {help && <span className="muted"> — {help}</span>}
      </label>
      {renderInput(type, value, onChange, placeholder, maxLength)}
      {counted && (
        <div className={`char-count ${len >= maxLength ? 'at-limit' : ''}`}>
          {len} / {maxLength}
        </div>
      )}
    </div>
  );
}

function renderInput(type, value, onChange, placeholder, maxLength) {
  switch (type) {
    case 'textarea':
    case 'richtext':
      return (
        <textarea
          rows={type === 'richtext' ? 6 : 3}
          value={value ?? ''}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      );
    case 'image':
      return <ImageField value={value} onChange={onChange} />;
    case 'number':
      return (
        <input
          type="number"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
          placeholder={placeholder}
        />
      );
    case 'boolean':
      return (
        <label className="checkbox">
          <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
          <span className="muted">enabled</span>
        </label>
      );
    case 'url':
    case 'text':
    default:
      return (
        <input
          type="text"
          value={value ?? ''}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      );
  }
}

// Renders a repeatable list of items. Each item is either a single value
// (when `itemField` is set) or an object (when `itemFields` is set).
export function ListField({ field, value, onChange }) {
  const items = Array.isArray(value) ? value : [];
  const { label, help, itemFields, itemField, itemLabel = 'Item', maxItems } = field;
  const atMax = maxItems != null && items.length >= maxItems;

  const update = (idx, next) => {
    const copy = [...items];
    copy[idx] = next;
    onChange(copy);
  };

  const add = () => {
    if (atMax) return;
    onChange([...items, itemFields ? blankItem(itemFields) : '']);
  };

  const remove = (idx) => onChange(items.filter((_, i) => i !== idx));

  const move = (idx, dir) => {
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    const copy = [...items];
    [copy[idx], copy[j]] = [copy[j], copy[idx]];
    onChange(copy);
  };

  return (
    <div className="field list-field">
      <label>
        {label}
        {help && <span className="muted"> — {help}</span>}
        <span className={`muted ${atMax ? 'at-limit' : ''}`}> ({items.length}{maxItems != null ? ` / ${maxItems}` : ''})</span>
      </label>

      {items.map((item, idx) => (
        <div key={idx} className="list-item">
          <div className="list-item-head">
            <span className="list-item-title">{itemLabel} {idx + 1}</span>
            <div className="list-item-actions">
              <button type="button" className="btn btn-ghost btn-xs" onClick={() => move(idx, -1)} disabled={idx === 0}>↑</button>
              <button type="button" className="btn btn-ghost btn-xs" onClick={() => move(idx, 1)} disabled={idx === items.length - 1}>↓</button>
              <button type="button" className="btn btn-danger btn-xs" onClick={() => remove(idx)}>Remove</button>
            </div>
          </div>

          {itemField ? (
            // List of scalars (e.g. list of phrases / feature strings).
            <Field field={{ ...itemField, label: itemField.label || itemLabel }} value={item} onChange={(v) => update(idx, v)} />
          ) : (
            // List of objects — render each sub-field.
            itemFields.map((sub) => (
              <Field
                key={sub.key}
                field={sub}
                value={item?.[sub.key]}
                onChange={(v) => update(idx, { ...item, [sub.key]: v })}
              />
            ))
          )}
        </div>
      ))}

      <button type="button" className="btn btn-ghost" onClick={add} disabled={atMax}>
        + Add {itemLabel}
      </button>
      {atMax && <span className="limit-note">Maximum {maxItems} reached — remove one to add another.</span>}
    </div>
  );
}

// Renders a long list as a table of rows. Clicking a row opens just that item's
// fields, so editing one product doesn't mean scrolling past thirteen others.
//
// Schema options (on the list field):
//   layout: 'table'
//   columns: [{ key, label, width? }]   -- summary columns, first is the main one
//   thumbKey: 'images' | 'image'        -- optional image column (array or string)
export function TableListField({ field, value, onChange }) {
  const items = Array.isArray(value) ? value : [];
  const { label, help, itemFields, itemLabel = 'Item', maxItems, columns = [], thumbKey } = field;

  const [openIndex, setOpenIndex] = useState(null);
  const [query, setQuery] = useState('');

  const atMax = maxItems != null && items.length >= maxItems;

  const update = (idx, next) => {
    const copy = [...items];
    copy[idx] = next;
    onChange(copy);
  };

  const add = () => {
    if (atMax) return;
    onChange([...items, blankItem(itemFields)]);
    setQuery('');
    setOpenIndex(items.length); // open the new row straight away
  };

  const remove = (idx) => {
    if (!window.confirm(`Delete this ${itemLabel.toLowerCase()}? This cannot be undone once saved.`)) return;
    onChange(items.filter((_, i) => i !== idx));
    setOpenIndex(null);
  };

  const move = (idx, dir) => {
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    const copy = [...items];
    [copy[idx], copy[j]] = [copy[j], copy[idx]];
    onChange(copy);
    // Follow the item that moved, so reordering from inside the detail view
    // doesn't silently switch you to editing its neighbour.
    setOpenIndex((cur) => (cur === idx ? j : cur === j ? idx : cur));
  };

  const thumbOf = (item) => {
    if (!thumbKey) return null;
    const raw = item?.[thumbKey];
    const src = Array.isArray(raw) ? raw[0] : raw;
    return src ? mediaUrl(src) : null;
  };

  // ---- Detail view: one item's fields, with a way back ----
  if (openIndex != null && items[openIndex]) {
    const item = items[openIndex];
    const title = item?.[columns[0]?.key] || `${itemLabel} ${openIndex + 1}`;

    return (
      <div className="field table-list">
        <div className="tl-detail-head">
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setOpenIndex(null)}>
            <i className="bi bi-arrow-left"></i> Back to list
          </button>
          <div className="tl-detail-title" title={title}>{title}</div>
          <div className="list-item-actions">
            <button type="button" className="btn btn-ghost btn-xs" onClick={() => move(openIndex, -1)} disabled={openIndex === 0}>↑</button>
            <button type="button" className="btn btn-ghost btn-xs" onClick={() => move(openIndex, 1)} disabled={openIndex === items.length - 1}>↓</button>
            <button type="button" className="btn btn-danger btn-xs" onClick={() => remove(openIndex)}>Delete</button>
          </div>
        </div>

        <div className="tl-detail-body">
          {itemFields.map((sub) => (
            <Field
              key={sub.key}
              field={sub}
              value={item?.[sub.key]}
              onChange={(v) => update(openIndex, { ...item, [sub.key]: v })}
            />
          ))}
        </div>

        <div className="section-footer">
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setOpenIndex(null)}>
            <i className="bi bi-check2"></i> Done editing
          </button>
        </div>
      </div>
    );
  }

  // ---- List view ----
  // Filter on the summary columns only, and keep the original index so reorder
  // and delete act on the right item even while a search is active.
  const q = query.trim().toLowerCase();
  const rows = items
    .map((item, idx) => ({ item, idx }))
    .filter(({ item }) =>
      !q || columns.some((c) => String(item?.[c.key] ?? '').toLowerCase().includes(q))
    );

  return (
    <div className="field table-list">
      <label>
        {label}
        {help && <span className="muted"> — {help}</span>}
        <span className={`muted ${atMax ? 'at-limit' : ''}`}> ({items.length}{maxItems != null ? ` / ${maxItems}` : ''})</span>
      </label>

      {items.length > 6 && (
        <input
          type="text"
          className="tl-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${label.toLowerCase()}…`}
        />
      )}

      <div className="tl-table">
        <div className="tl-row tl-head">
          {thumbKey && <span className="tl-thumb-cell" />}
          {columns.map((c) => (
            <span key={c.key} className="tl-cell" style={c.width ? { flex: `0 0 ${c.width}` } : undefined}>
              {c.label}
            </span>
          ))}
          <span className="tl-actions-cell" />
        </div>

        {rows.length === 0 && (
          <div className="tl-empty">
            {items.length === 0 ? `No ${itemLabel.toLowerCase()}s yet.` : 'No matches.'}
          </div>
        )}

        {rows.map(({ item, idx }) => {
          const thumb = thumbOf(item);
          return (
            <div
              key={idx}
              className="tl-row tl-body-row"
              role="button"
              tabIndex={0}
              onClick={() => setOpenIndex(idx)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenIndex(idx); } }}
            >
              {thumbKey && (
                <span className="tl-thumb-cell">
                  {thumb
                    ? <img src={thumb} alt="" className="tl-thumb" />
                    : <span className="tl-thumb tl-thumb-empty"><i className="bi bi-image"></i></span>}
                </span>
              )}

              {columns.map((c, ci) => (
                <span
                  key={c.key}
                  className={`tl-cell ${ci === 0 ? 'tl-cell-main' : ''}`}
                  style={c.width ? { flex: `0 0 ${c.width}` } : undefined}
                  title={String(item?.[c.key] ?? '')}
                >
                  {String(item?.[c.key] ?? '') || <span className="muted">—</span>}
                </span>
              ))}

              {/* Row actions must not also trigger the row's own open handler. */}
              <span className="tl-actions-cell" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="btn btn-ghost btn-xs" onClick={() => move(idx, -1)} disabled={idx === 0}>↑</button>
                <button type="button" className="btn btn-ghost btn-xs" onClick={() => move(idx, 1)} disabled={idx === items.length - 1}>↓</button>
                <button type="button" className="btn btn-ghost btn-xs" onClick={() => setOpenIndex(idx)}>Edit</button>
                <button type="button" className="btn btn-danger btn-xs" onClick={() => remove(idx)}>Delete</button>
              </span>
            </div>
          );
        })}
      </div>

      <button type="button" className="btn btn-ghost" onClick={add} disabled={atMax}>
        + Add {itemLabel}
      </button>
      {atMax && <span className="limit-note">Maximum {maxItems} reached — remove one to add another.</span>}
    </div>
  );
}

// Build an empty object item from the sub-field schema.
function blankItem(itemFields) {
  const obj = {};
  for (const f of itemFields) {
    if (f.type === 'list') obj[f.key] = [];
    else if (f.type === 'group') obj[f.key] = {};
    else if (f.type === 'boolean') obj[f.key] = false;
    else obj[f.key] = '';
  }
  return obj;
}

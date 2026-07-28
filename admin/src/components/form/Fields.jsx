import ImageField from './ImageField';

// Renders ONE field based on its schema `type`.
// Supported types: text, textarea, richtext, url, number, boolean, image, list.
export function Field({ field, value, onChange }) {
  const { type, label, help, placeholder } = field;

  if (type === 'list') {
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

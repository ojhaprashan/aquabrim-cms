import { useRef, useState } from 'react';
import api from '../../lib/api';

// Image field: shows a preview, uploads the picked file to /admin/upload,
// and stores the returned URL as the field value.
export default function ImageField({ value, onChange }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);

  const pick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await api.post('/admin/upload', fd);
      onChange(res.data.url);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="image-field">
      {value ? (
        <img src={value} alt="" className="image-preview" />
      ) : (
        <div className="image-placeholder">No image</div>
      )}
      <div className="image-field-controls">
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/assets/... or paste a URL"
        />
        <div className="image-field-actions">
          <button type="button" className="btn btn-ghost" onClick={() => inputRef.current?.click()} disabled={busy}>
            {busy ? 'Uploading…' : 'Upload'}
          </button>
          {value && (
            <button type="button" className="btn btn-danger" onClick={() => onChange('')}>
              Clear
            </button>
          )}
        </div>
        <input ref={inputRef} type="file" accept="image/*" hidden onChange={pick} />
      </div>
    </div>
  );
}

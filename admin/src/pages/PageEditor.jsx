import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../lib/api';
import { templateList, getTemplate, buildInitialContent } from '../templates';
import SectionCard from '../components/form/SectionCard';

export default function PageEditor() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const selected = slug || '';
  const template = getTemplate(selected);

  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!template) {
      setContent(null);
      return;
    }
    setLoading(true);
    setMessage('');
    api
      .get(`/admin/${template.slug}`)
      .then((res) => setContent(buildInitialContent(template, res.data.data?.content)))
      .catch(() => setContent(buildInitialContent(template, {})))
      .finally(() => setLoading(false));
  }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSelect = (e) => {
    const value = e.target.value;
    navigate(value ? `/pages/${value}` : '/pages');
  };

  const setSection = (sectionKey, value) =>
    setContent((prev) => ({ ...prev, [sectionKey]: value }));

  const save = async () => {
    setSaving(true);
    setMessage('');
    try {
      await api.put(`/admin/${template.slug}`, { name: template.name, content });
      setMessage('Saved');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="topbar">
        <div>
          <div className="tb-title">{template ? template.name : 'Edit Page'}</div>
          <div className="tb-sub">
            {template ? `Editing /${template.slug} · ${template.sections.length} sections` : 'Choose a page to edit'}
          </div>
        </div>
        <div className="tb-actions">
          {message && (
            <span className={`save-msg ${message === 'Saved' ? 'ok' : 'err'}`}>
              {message === 'Saved' && <i className="bi bi-check-circle-fill"></i>}
              {message}
            </span>
          )}
          {template && (
            <button className="btn btn-primary" onClick={save} disabled={saving || loading}>
              <i className="bi bi-save"></i> {saving ? 'Saving…' : 'Save changes'}
            </button>
          )}
        </div>
      </div>

      <div className="content-inner">
        <div className="card template-picker">
          <label><i className="bi bi-layout-text-window-reverse"></i> Template</label>
          <select value={selected} onChange={onSelect}>
            <option value="">— Select a page template —</option>
            {templateList.map((t) => (
              <option key={t.slug} value={t.slug}>{t.name}</option>
            ))}
          </select>
        </div>

        {!template && (
          <div className="card empty">
            <i className="bi bi-arrow-up-circle" style={{ fontSize: 28, display: 'block', marginBottom: 8 }}></i>
            Pick a page above to edit its sections and content.
          </div>
        )}

        {template && loading && <p className="muted">Loading {template.name}…</p>}

        {template && !loading && content && (
          <div className="sections">
            {template.sections.map((section, i) => (
              <SectionCard
                key={section.key}
                section={section}
                value={content[section.key]}
                onChange={(v) => setSection(section.key, v)}
                defaultOpen={i === 0}
              />
            ))}

            <div className="form-actions">
              <button className="btn btn-primary" onClick={save} disabled={saving}>
                <i className="bi bi-save"></i> {saving ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

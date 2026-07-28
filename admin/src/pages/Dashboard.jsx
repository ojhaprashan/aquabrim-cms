import { Link } from 'react-router-dom';
import { templateList } from '../templates';

export default function Dashboard() {
  return (
    <div>
      <div className="topbar">
        <div>
          <div className="tb-title">Dashboard</div>
          <div className="tb-sub">Manage your website content</div>
        </div>
      </div>

      <div className="content-inner">
        <div className="dash-hero">
          <i className="bi bi-droplet-half hero-badge"></i>
          <h1>Welcome to Aquabrim CMS</h1>
          <p>Select a page below to edit its sections, text, and images. Changes reflect on your website.</p>
        </div>

        <div className="section-label">All Pages · {templateList.length}</div>
        <div className="page-grid">
          {templateList.map((t) => (
            <Link key={t.slug} to={`/pages/${t.slug}`} className="card page-tile">
              <div className="tile-icon"><i className={`bi ${t.icon || 'bi-file-earmark'}`}></i></div>
              <div className="tile-name">{t.name}</div>
              <i className="bi bi-arrow-right tile-go"></i>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

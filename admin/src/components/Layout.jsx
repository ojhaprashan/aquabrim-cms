import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { templateList } from '../templates';

export default function Layout() {
  const { admin, logout } = useAuth();
  const initial = (admin?.name || admin?.email || 'A').charAt(0).toUpperCase();

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brand">
          <img src="/logo.png" alt="Aquabrim" className="brand-logo" />
          <div>
            <div className="brand-name">Aquabrim</div>
            <div className="brand-sub">CMS</div>
          </div>
        </div>

        <nav>
          <NavLink to="/" end>
            <i className="bi bi-grid-1x2-fill"></i> Dashboard
          </NavLink>

          <div className="nav-group-label">Pages</div>
          {templateList.map((t) => (
            <NavLink key={t.slug} to={`/pages/${t.slug}`}>
              <i className={`bi ${t.icon || 'bi-file-earmark'}`}></i> {t.name}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="avatar">{initial}</div>
            <div>
              <div className="u-name">{admin?.name || 'Admin'}</div>
              <div className="u-email">{admin?.email}</div>
            </div>
          </div>
          <button className="btn" onClick={logout}>
            <i className="bi bi-box-arrow-right"></i> Log out
          </button>
        </div>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

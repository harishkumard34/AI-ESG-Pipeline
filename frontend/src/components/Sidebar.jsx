import { NavLink } from 'react-router-dom';
import { LayoutDashboard, UploadCloud, Database, Activity, LogOut, Settings } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside style={{
      width: '260px',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid var(--border-color)',
      background: 'var(--bg-panel)',
      padding: '24px 0',
      zIndex: 100
    }}>
      <div style={{ padding: '0 24px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
        <div style={{ background: 'var(--primary)', padding: '6px', borderRadius: '8px' }}>
          <Activity color="white" size={22} />
        </div>
        <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.5px', color: 'var(--text-main)' }}>
          ESG<span style={{ fontWeight: 400, color: 'var(--text-muted)' }}> AI Pipeline</span>
        </span>
      </div>

      <div style={{ padding: '0 24px', marginBottom: '12px' }}>
        <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-light)', fontWeight: 600 }}>Main Menu</p>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '0 16px', flex: 1 }}>
        <SidebarLink to="/dashboard" icon={<LayoutDashboard size={18} />} label="Overview" exact />
        <SidebarLink to="/dashboard/upload" icon={<UploadCloud size={18} />} label="Process Data" />
        <SidebarLink to="/dashboard/records" icon={<Database size={18} />} label="Records DB" />
      </nav>

      <div style={{ padding: '0 16px' }}>
        <div style={{ height: '1px', background: 'var(--border-color)', margin: '16px 0' }}></div>
        <SidebarLink to="/dashboard/settings" icon={<Settings size={18} />} label="Settings" />
        <SidebarLink to="/login" icon={<LogOut size={18} />} label="Logout" />
      </div>
    </aside>
  );
}

function SidebarLink({ to, icon, label, exact }) {
  return (
    <NavLink 
      to={to} 
      end={exact}
      style={({ isActive }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 16px',
        borderRadius: 'var(--radius-sm)',
        textDecoration: 'none',
        color: isActive ? 'var(--primary)' : 'var(--text-muted)',
        background: isActive ? 'var(--primary-light)' : 'transparent',
        fontWeight: isActive ? 600 : 500,
        fontSize: '14px',
        transition: 'all 0.15s ease'
      })}
    >
      {({ isActive }) => (
        <>
          <div style={{ color: isActive ? 'var(--primary)' : 'var(--text-light)' }}>
            {icon}
          </div>
          {label}
        </>
      )}
    </NavLink>
  );
}

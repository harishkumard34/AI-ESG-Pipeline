import { NavLink } from 'react-router-dom';
import { LayoutDashboard, UploadCloud, Database, Activity, LogOut } from 'lucide-react';

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
      borderRight: '1px solid rgba(255,255,255,0.3)',
      background: 'rgba(255,255,255,0.6)',
      backdropFilter: 'blur(20px)',
      padding: '32px 0',
      zIndex: 100
    }}>
      <div style={{ padding: '0 32px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
        <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', padding: '8px', borderRadius: '12px' }}>
          <Activity color="white" size={24} />
        </div>
        <span style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.5px' }}>ESG<span style={{ fontWeight: 400 }}> AI</span></span>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 16px', flex: 1 }}>
        <SidebarLink to="/dashboard" icon={<LayoutDashboard size={20} />} label="Overview" exact />
        <SidebarLink to="/dashboard/upload" icon={<UploadCloud size={20} />} label="Process Data" />
        <SidebarLink to="/dashboard/records" icon={<Database size={20} />} label="Records DB" />
      </nav>

      <div style={{ padding: '0 16px' }}>
        <SidebarLink to="/login" icon={<LogOut size={20} />} label="Logout" />
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
        padding: '14px 20px',
        borderRadius: '12px',
        textDecoration: 'none',
        color: isActive ? 'var(--primary)' : 'var(--text-muted)',
        background: isActive ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
        fontWeight: isActive ? 600 : 500,
        transition: 'all 0.2s ease',
        boxShadow: isActive ? 'inset 2px 0 0 var(--primary)' : 'none'
      })}
    >
      {icon}
      {label}
    </NavLink>
  );
}

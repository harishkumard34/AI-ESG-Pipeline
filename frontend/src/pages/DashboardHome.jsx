import { ShieldCheck, AlertTriangle, Database } from 'lucide-react';
import heroImg from '../assets/hero_dashboard.jpg';

export default function DashboardHome() {
  return (
    <div className="animate-slide-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '36px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-1px' }}>System Overview</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '18px' }}>Welcome back, Admin. AI monitoring is active.</p>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-muted)' }}>Admin User</span>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }}>A</div>
        </div>
      </div>

      <div style={{ 
        width: '100%', 
        height: '340px', 
        borderRadius: '24px', 
        overflow: 'hidden',
        marginBottom: '40px',
        position: 'relative',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        <img src={heroImg} alt="AI ESG Dashboard" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.5) 20%, transparent)' }}></div>
        <div style={{ position: 'absolute', bottom: '40px', left: '40px', color: 'white', maxWidth: '500px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '12px' }}>AI-Powered Compliance</h2>
          <p style={{ fontSize: '18px', opacity: 0.9, lineHeight: 1.5 }}>
            Automated data extraction, real-time anomaly detection, and LangGraph RAG validation working seamlessly.
          </p>
        </div>
      </div>

      {/* Quick Links / Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'rgba(79, 70, 229, 0.1)', padding: '16px', borderRadius: '16px' }}>
            <ShieldCheck size={32} color="var(--primary)" />
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontWeight: 500, marginBottom: '4px' }}>System Status</p>
            <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--success)' }}>Optimal</h3>
          </div>
        </div>
        
        <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '16px', borderRadius: '16px' }}>
            <AlertTriangle size={32} color="var(--danger)" />
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontWeight: 500, marginBottom: '4px' }}>Anomaly Detection</p>
            <h3 style={{ fontSize: '24px', fontWeight: 700 }}>Active</h3>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'rgba(79, 70, 229, 0.1)', padding: '16px', borderRadius: '16px' }}>
            <Database size={32} color="var(--primary)" />
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontWeight: 500, marginBottom: '4px' }}>Database Connection</p>
            <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--success)' }}>Connected</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

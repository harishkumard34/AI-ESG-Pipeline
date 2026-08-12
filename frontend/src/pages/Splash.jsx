import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

export default function Splash() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      
      {/* Decorative Orbs for Glassmorphism Background */}
      <div style={{ position: 'absolute', top: '10%', left: '15%', width: '400px', height: '400px', background: 'var(--primary)', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.15, zIndex: -1 }}></div>
      <div style={{ position: 'absolute', bottom: '10%', right: '15%', width: '300px', height: '300px', background: 'var(--accent)', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.2, zIndex: -1 }}></div>

      <div className="glass-card animate-slide-up" style={{ padding: '64px', maxWidth: '600px' }}>
        <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', width: '80px', height: '80px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
          <Activity color="white" size={40} />
        </div>
        
        <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-1px', color: 'var(--text-main)' }}>
          AI ESG Intelligence
        </h1>
        
        <p style={{ fontSize: '20px', color: 'var(--text-muted)', marginBottom: '40px', lineHeight: 1.6 }}>
          Automate your compliance, detect anomalies instantly, and query policies with our LangGraph Multi-Agent RAG engine.
        </p>
        
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <button className="btn-primary" style={{ padding: '16px 40px', fontSize: '18px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            Enter Portal
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </button>
        </Link>
      </div>
    </div>
  );
}

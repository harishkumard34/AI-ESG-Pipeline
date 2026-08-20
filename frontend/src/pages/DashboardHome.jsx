import { ShieldCheck, AlertTriangle, Database, TrendingUp, Users, FileText, CheckCircle } from 'lucide-react';

export default function DashboardHome() {
  return (
    <div className="animate-slide-up" style={{ padding: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px', letterSpacing: '-0.5px' }}>
            System Overview
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
            Monitor your ESG data pipeline and compliance metrics.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button className="btn-outline">Download Report</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '16px', borderLeft: '1px solid var(--border-color)' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>Admin User</p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>admin@esg-pipeline.com</p>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '16px' }}>
              A
            </div>
          </div>
        </div>
      </div>

      {/* Main KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
        <MetricCard title="Total Documents" value="1,248" change="+12% from last month" icon={<FileText size={20} />} color="var(--primary)" />
        <MetricCard title="Anomalies Detected" value="23" change="-5% from last month" icon={<AlertTriangle size={20} />} color="var(--warning)" />
        <MetricCard title="Compliance Score" value="94/100" change="+2 pts from last month" icon={<ShieldCheck size={20} />} color="var(--success)" />
        <MetricCard title="Active Users" value="84" change="+12 new users" icon={<Users size={20} />} color="var(--accent)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Simulated Chart Area */}
        <div className="saas-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Processing Volume</h3>
            <span className="badge badge-success">Live Updates</span>
          </div>
          <div style={{ height: '240px', display: 'flex', alignItems: 'flex-end', gap: '12px', paddingTop: '20px', borderBottom: '1px solid var(--border-color)' }}>
            {/* Mock Bars */}
            {[40, 70, 45, 90, 65, 85, 120, 95, 60, 110, 80, 100].map((h, i) => (
              <div key={i} style={{ flex: 1, background: 'var(--primary-light)', borderRadius: '4px 4px 0 0', position: 'relative', height: `${h}%`, transition: 'height 0.3s ease' }}>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '100%', background: 'var(--primary)', opacity: 0.8, borderRadius: '4px 4px 0 0' }}></div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', color: 'var(--text-light)', fontSize: '12px' }}>
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
          </div>
        </div>

        {/* System Status */}
        <div className="saas-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px' }}>System Status</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <StatusRow label="LangGraph Pipeline" status="Operational" />
            <StatusRow label="Llama-3 Integration" status="Operational" />
            <StatusRow label="Supabase Database" status="Operational" />
            <StatusRow label="BM25 Retriever" status="Operational" />
            
            <div style={{ marginTop: '16px', padding: '16px', background: 'var(--primary-light)', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <TrendingUp color="var(--primary)" size={20} style={{ marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary-hover)', marginBottom: '4px' }}>System is Optimal</h4>
                  <p style={{ fontSize: '12px', color: 'var(--primary)' }}>All agents are running smoothly. Processing time is currently averaging 1.2s per document.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, icon, color }) {
  return (
    <div className="saas-card" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>{title}</p>
        <div style={{ color: color, background: `${color}15`, padding: '8px', borderRadius: '8px' }}>
          {icon}
        </div>
      </div>
      <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>{value}</h2>
      <p style={{ fontSize: '13px', color: 'var(--text-light)', fontWeight: 500 }}>{change}</p>
    </div>
  );
}

function StatusRow({ label, status }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: '14px', color: 'var(--text-main)', fontWeight: 500 }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <CheckCircle size={14} color="var(--success)" />
        <span style={{ fontSize: '13px', color: 'var(--success)', fontWeight: 500 }}>{status}</span>
      </div>
    </div>
  );
}

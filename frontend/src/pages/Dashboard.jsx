import { useEffect, useState } from 'react';
import axios from 'axios';
import Chatbot from '../components/Chatbot';
import UploadSection from '../components/UploadSection';
import { Activity, AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Dashboard() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/records/');
      setRecords(response.data.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };

  const validCount = records.filter(r => !r.is_suspicious).length;
  const invalidCount = records.filter(r => r.is_suspicious).length;

  return (
    <div>
      {/* Top Navigation */}
      <nav className="glass-panel" style={{ 
        position: 'sticky', top: '16px', margin: '0 24px', padding: '16px 32px', 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 50 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', padding: '8px', borderRadius: '12px' }}>
            <Activity color="white" size={24} />
          </div>
          <span style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.5px' }}>ESG<span style={{ fontWeight: 400 }}> Intelligence</span></span>
        </div>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-muted)' }}>Admin User</span>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }}>A</div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main style={{ padding: '32px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        
        <div className="animate-slide-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <h1 className="text-gradient" style={{ fontSize: '36px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-1px' }}>Welcome back, Admin</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '18px' }}>Here is your automated ESG compliance overview.</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="animate-slide-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px', animationDelay: '0.1s' }}>
          <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ background: 'rgba(79, 70, 229, 0.1)', padding: '16px', borderRadius: '16px' }}>
              <ShieldCheck size={32} color="var(--primary)" />
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontWeight: 500, marginBottom: '4px' }}>Total Records Processed</p>
              <h3 style={{ fontSize: '32px', fontWeight: 700 }}>{records.length}</h3>
            </div>
          </div>
          
          <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '16px', borderRadius: '16px' }}>
              <AlertTriangle size={32} color="var(--danger)" />
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontWeight: 500, marginBottom: '4px' }}>Anomalies Detected</p>
              <h3 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--danger)' }}>{invalidCount}</h3>
            </div>
          </div>
        </div>

        {/* Upload Component */}
        <div style={{ animationDelay: '0.2s' }} className="animate-slide-up">
          <UploadSection onUploadSuccess={fetchRecords} />
        </div>

        {/* Data Table */}
        <div className="glass-card animate-slide-up" style={{ animationDelay: '0.3s', padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.4)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600 }}>Normalized Data</h2>
            <button onClick={fetchRecords} className="btn-outline" style={{ padding: '8px 16px', fontSize: '14px' }}>Refresh</button>
          </div>
          
          {loading ? (
            <div style={{ padding: '64px', textAlign: 'center', color: 'var(--primary)', fontWeight: 500 }}>Fetching latest records...</div>
          ) : records.length === 0 ? (
            <div style={{ padding: '64px', textAlign: 'center', color: 'var(--text-muted)' }}>No records found. Upload a file above.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'rgba(0,0,0,0.02)' }}>
                    <th style={{ padding: '16px 32px', fontWeight: 600, color: 'var(--text-muted)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Category</th>
                    <th style={{ padding: '16px 32px', fontWeight: 600, color: 'var(--text-muted)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Amount</th>
                    <th style={{ padding: '16px 32px', fontWeight: 600, color: 'var(--text-muted)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Unit</th>
                    <th style={{ padding: '16px 32px', fontWeight: 600, color: 'var(--text-muted)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Date</th>
                    <th style={{ padding: '16px 32px', fontWeight: 600, color: 'var(--text-muted)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>AI Validation</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, i) => (
                    <tr key={record.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.3)', transition: 'background 0.2s ease' }}>
                      <td style={{ padding: '20px 32px', fontWeight: 500 }}>{record.category}</td>
                      <td style={{ padding: '20px 32px', fontWeight: 600 }}>{record.amount.toLocaleString()}</td>
                      <td style={{ padding: '20px 32px', color: 'var(--text-muted)' }}>{record.unit}</td>
                      <td style={{ padding: '20px 32px', color: 'var(--text-muted)' }}>{record.date}</td>
                      <td style={{ padding: '20px 32px' }}>
                        {record.is_suspicious ? (
                          <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '8px' }}>
                            <span style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '6px 12px', borderRadius: '99px', fontSize: '13px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                              <AlertTriangle size={14} /> Anomaly Detected
                            </span>
                            <div style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '300px', lineHeight: '1.4' }}>
                              {record.ai_reasoning}
                            </div>
                          </div>
                        ) : (
                          <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '6px 12px', borderRadius: '99px', fontSize: '13px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <CheckCircle2 size={14} /> Validated
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <Chatbot />
    </div>
  );
}

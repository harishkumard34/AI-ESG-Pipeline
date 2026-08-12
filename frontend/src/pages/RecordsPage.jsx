import { useEffect, useState } from 'react';
import axios from 'axios';
import { AlertTriangle, CheckCircle2, Check, X, ShieldCheck } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export default function RecordsPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all' or 'anomalies'

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/api/records/`);
      setRecords(response.data.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAuditorAction = async (recordId, newStatus) => {
    try {
      await axios.put(`${API_BASE}/api/records/${recordId}`, {
        status: newStatus
      });
      setRecords(prev => prev.map(r => 
        r.id === recordId ? { ...r, auditor_status: newStatus } : r
      ));
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update status. Make sure backend is running.");
    }
  };

  const validCount = records.filter(r => !r.is_suspicious).length;
  const invalidCount = records.filter(r => r.is_suspicious).length;

  const filteredRecords = filter === 'anomalies' ? records.filter(r => r.is_suspicious) : records;

  return (
    <div className="animate-slide-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '36px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-1px' }}>Records Database</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '18px' }}>Manage extracted data and review AI anomaly detections.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '24px' }}>
          <div 
            onClick={() => setFilter('all')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', background: filter === 'all' ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)', padding: '12px 24px', borderRadius: '16px', border: filter === 'all' ? '2px solid var(--primary)' : '2px solid transparent', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: filter === 'all' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none' }}>
             <ShieldCheck size={24} color="var(--primary)" />
             <div>
               <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Total Records</p>
               <h4 style={{ fontSize: '20px', fontWeight: 700 }}>{records.length}</h4>
             </div>
          </div>
          <div 
            onClick={() => setFilter('anomalies')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', background: filter === 'anomalies' ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)', padding: '12px 24px', borderRadius: '16px', border: filter === 'anomalies' ? '2px solid var(--danger)' : '2px solid transparent', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: filter === 'anomalies' ? '0 4px 12px rgba(239, 68, 68, 0.1)' : 'none' }}>
             <AlertTriangle size={24} color="var(--danger)" />
             <div>
               <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Anomalies</p>
               <h4 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--danger)' }}>{invalidCount}</h4>
             </div>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.4)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600 }}>
            {filter === 'anomalies' ? 'Anomalous Records' : 'All Normalized Data'}
          </h2>
          <button onClick={fetchRecords} className="btn-outline" style={{ padding: '8px 16px', fontSize: '14px' }}>Refresh Data</button>
        </div>
        
        {loading ? (
          <div style={{ padding: '64px', textAlign: 'center', color: 'var(--primary)', fontWeight: 500 }}>Fetching latest records...</div>
        ) : filteredRecords.length === 0 ? (
          <div style={{ padding: '64px', textAlign: 'center', color: 'var(--text-muted)' }}>
            {filter === 'anomalies' ? 'No anomalies detected! 🎉' : 'No records found. Upload a file to see data here.'}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Category</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Amount</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Unit</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Date</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>AI Validation</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center' }}>Auditor Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record, i) => (
                  <tr key={record.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.3)', transition: 'background 0.2s ease' }}>
                    <td style={{ padding: '20px 24px', fontWeight: 500 }}>{record.category}</td>
                    <td style={{ padding: '20px 24px', fontWeight: 600 }}>{record.amount.toLocaleString()}</td>
                    <td style={{ padding: '20px 24px', color: 'var(--text-muted)' }}>{record.unit}</td>
                    <td style={{ padding: '20px 24px', color: 'var(--text-muted)' }}>{record.date}</td>
                    <td style={{ padding: '20px 24px' }}>
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
                    <td style={{ padding: '20px 24px', textAlign: 'center' }}>
                      {record.auditor_status === 'Pending' || !record.auditor_status ? (
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button onClick={() => handleAuditorAction(record.id, 'Approved')} style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }} title="Approve">
                            <Check size={18} />
                          </button>
                          <button onClick={() => handleAuditorAction(record.id, 'Rejected')} style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }} title="Reject">
                            <X size={18} />
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontWeight: 600, fontSize: '14px', color: record.auditor_status === 'Approved' ? 'var(--success)' : 'var(--danger)' }}>
                          {record.auditor_status}
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
    </div>
  );
}

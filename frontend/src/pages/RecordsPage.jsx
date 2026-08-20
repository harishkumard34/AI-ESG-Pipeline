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
    <div className="animate-slide-up" style={{ padding: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px', letterSpacing: '-0.5px' }}>Records Database</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>Manage extracted data and review AI anomaly detections.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <div 
            onClick={() => setFilter('all')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', background: filter === 'all' ? 'var(--primary-light)' : 'white', padding: '12px 20px', borderRadius: 'var(--radius-md)', border: `1px solid ${filter === 'all' ? 'var(--primary)' : 'var(--border-color)'}`, cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: 'var(--shadow-sm)' }}>
             <ShieldCheck size={20} color={filter === 'all' ? 'var(--primary)' : 'var(--text-muted)'} />
             <div>
               <p style={{ fontSize: '12px', color: filter === 'all' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Records</p>
               <h4 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>{records.length}</h4>
             </div>
          </div>
          <div 
            onClick={() => setFilter('anomalies')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', background: filter === 'anomalies' ? 'var(--danger-bg)' : 'white', padding: '12px 20px', borderRadius: 'var(--radius-md)', border: `1px solid ${filter === 'anomalies' ? 'var(--danger)' : 'var(--border-color)'}`, cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: 'var(--shadow-sm)' }}>
             <AlertTriangle size={20} color={filter === 'anomalies' ? 'var(--danger)' : 'var(--text-muted)'} />
             <div>
               <p style={{ fontSize: '12px', color: filter === 'anomalies' ? 'var(--danger)' : 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Anomalies</p>
               <h4 style={{ fontSize: '20px', fontWeight: 700, color: filter === 'anomalies' ? 'var(--danger)' : 'var(--text-main)', marginTop: '2px' }}>{invalidCount}</h4>
             </div>
          </div>
        </div>
      </div>

      <div className="saas-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-main)' }}>
            {filter === 'anomalies' ? 'Anomalous Records' : 'All Normalized Data'}
          </h2>
          <button onClick={fetchRecords} className="btn-outline" style={{ padding: '6px 12px', fontSize: '13px' }}>Refresh Data</button>
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
                <tr style={{ background: 'white', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Category</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Amount</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Unit</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>AI Validation</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'center' }}>Auditor Action</th>
                </tr>
              </thead>
              <tbody style={{ background: 'white' }}>
                {filteredRecords.map((record, i) => (
                  <tr key={record.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s ease', ':hover': { background: '#f8fafc' } }}>
                    <td style={{ padding: '16px 24px', fontWeight: 500, fontSize: '14px' }}>{record.category}</td>
                    <td style={{ padding: '16px 24px', fontWeight: 600, fontSize: '14px' }}>{record.amount.toLocaleString()}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-muted)', fontSize: '14px' }}>{record.unit}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-muted)', fontSize: '14px' }}>{record.date}</td>
                    <td style={{ padding: '16px 24px' }}>
                      {record.is_suspicious ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <span className="badge badge-danger" style={{ alignSelf: 'flex-start' }}>
                            <AlertTriangle size={12} /> Anomaly Detected
                          </span>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)', maxWidth: '300px', lineHeight: '1.5' }}>
                            {record.ai_reasoning}
                          </div>
                        </div>
                      ) : (
                        <span className="badge badge-success" style={{ alignSelf: 'flex-start' }}>
                          <CheckCircle2 size={12} /> Validated
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                      {record.auditor_status === 'Pending' || !record.auditor_status ? (
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button onClick={() => handleAuditorAction(record.id, 'Approved')} style={{ background: 'var(--success-bg)', color: 'var(--success)', border: '1px solid #a7f3d0', padding: '6px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.2s' }} title="Approve">
                            <Check size={16} />
                          </button>
                          <button onClick={() => handleAuditorAction(record.id, 'Rejected')} style={{ background: 'var(--danger-bg)', color: 'var(--danger)', border: '1px solid #fecaca', padding: '6px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.2s' }} title="Reject">
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontWeight: 600, fontSize: '13px', color: record.auditor_status === 'Approved' ? 'var(--success)' : 'var(--danger)' }}>
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

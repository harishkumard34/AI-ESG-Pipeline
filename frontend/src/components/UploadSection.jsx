import { useState, useRef } from 'react';
import axios from 'axios';
import { UploadCloud, File, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export default function UploadSection({ onUploadSuccess }) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, uploading, success, error
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    setFile(selectedFile);
    setStatus('idle');
    setMessage('');
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const handleUpload = async () => {
    if (!file) return;

    setStatus('uploading');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(`${API_BASE}/api/upload/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.data.status === 'error') {
        setStatus('error');
        setMessage(res.data.message || 'Failed to process file.');
      } else {
        setStatus('success');
        setMessage(res.data.message || 'File processed successfully!');
        
        if (onUploadSuccess) {
          onUploadSuccess();
        }
        
        setTimeout(() => {
          setFile(null);
          setStatus('idle');
        }, 3000);
      }
      
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage(err.response?.data?.message || err.message || 'Failed to process file.');
    }
  };

  return (
    <div className="saas-card animate-slide-up" style={{ padding: '32px', marginBottom: '32px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
          Upload & Analyze Data
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Upload your utility bills, invoices, or ESG reports for LangGraph AI processing.</p>
      </div>

      <div 
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragActive ? 'var(--primary)' : 'var(--border-color)'}`,
          borderRadius: 'var(--radius-md)',
          padding: '48px 20px',
          textAlign: 'center',
          backgroundColor: dragActive ? 'var(--primary-light)' : '#f8fafc',
          transition: 'all 0.2s ease',
          cursor: 'pointer'
        }}
        onClick={status === 'idle' ? onButtonClick : undefined}
      >
        <input 
          ref={inputRef}
          type="file" 
          onChange={handleChange} 
          style={{ display: 'none' }} 
          accept=".pdf,.xlsx,.xls"
        />

        {status === 'uploading' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <Loader2 size={40} color="var(--primary)" style={{ animation: 'spin 1s linear infinite' }} />
            <div style={{ fontWeight: 500, color: 'var(--primary)', fontSize: '15px' }}>Processing with LangGraph Pipeline...</div>
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : status === 'success' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle size={32} color="var(--success)" />
            </div>
            <div style={{ fontWeight: 600, color: 'var(--success)', fontSize: '16px' }}>{message}</div>
          </div>
        ) : status === 'error' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--danger-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertCircle size={32} color="var(--danger)" />
            </div>
            <div style={{ fontWeight: 500, color: 'var(--danger)', fontSize: '15px' }}>{message}</div>
            <button onClick={(e) => { e.stopPropagation(); setStatus('idle'); }} className="btn-outline" style={{ marginTop: '8px' }}>Try Again</button>
          </div>
        ) : file ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <File size={40} color="var(--primary)" />
            <div style={{ fontWeight: 600, fontSize: '15px' }}>{file.name}</div>
            <div style={{ color: 'var(--text-light)', fontSize: '13px' }}>{(file.size / 1024 / 1024).toFixed(2)} MB</div>
            
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="btn-outline">Cancel</button>
              <button onClick={(e) => { e.stopPropagation(); handleUpload(); }} className="btn-primary">Analyze with AI</button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'white', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)', marginBottom: '8px' }}>
              <UploadCloud size={28} color="var(--primary)" />
            </div>
            <div>
              <span style={{ fontWeight: 600, color: 'var(--primary)' }}>Click to upload</span> <span style={{ color: 'var(--text-muted)' }}>or drag and drop</span>
            </div>
            <p style={{ color: 'var(--text-light)', fontSize: '13px' }}>PDF, Excel (Max 10MB)</p>
          </div>
        )}
      </div>
    </div>
  );
}

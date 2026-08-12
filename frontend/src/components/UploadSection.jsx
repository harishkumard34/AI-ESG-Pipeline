import { useState, useRef } from 'react';
import axios from 'axios';
import { UploadCloud, File, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

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
      const res = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setStatus('success');
      setMessage(res.data.message || 'File processed successfully!');
      
      // Notify parent to refresh data
      if (onUploadSuccess) {
        onUploadSuccess();
      }
      
      // Reset after 3 seconds
      setTimeout(() => {
        setFile(null);
        setStatus('idle');
      }, 3000);
      
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage(err.response?.data?.message || 'Failed to process file.');
    }
  };

  return (
    <div className="glass-card animate-slide-up" style={{ padding: '32px', marginBottom: '32px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
          Analyze ESG Document
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>Upload your utility bills or ESG reports (PDF/Excel) for AI analysis.</p>
      </div>

      <div 
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragActive ? 'var(--primary)' : 'rgba(79, 70, 229, 0.2)'}`,
          borderRadius: 'var(--radius-md)',
          padding: '40px 20px',
          textAlign: 'center',
          backgroundColor: dragActive ? 'rgba(79, 70, 229, 0.05)' : 'rgba(255, 255, 255, 0.5)',
          transition: 'all 0.3s ease',
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
            <Loader2 size={48} color="var(--primary)" style={{ animation: 'spin 1s linear infinite' }} />
            <div style={{ fontWeight: 500, color: 'var(--primary)' }}>AI is analyzing your document...</div>
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : status === 'success' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <CheckCircle size={48} color="var(--success)" />
            <div style={{ fontWeight: 500, color: 'var(--success)' }}>{message}</div>
          </div>
        ) : status === 'error' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <AlertCircle size={48} color="var(--danger)" />
            <div style={{ fontWeight: 500, color: 'var(--danger)' }}>{message}</div>
            <button onClick={() => setStatus('idle')} className="btn-outline" style={{ marginTop: '8px' }}>Try Again</button>
          </div>
        ) : file ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <File size={48} color="var(--primary)" />
            <div style={{ fontWeight: 500 }}>{file.name}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{(file.size / 1024 / 1024).toFixed(2)} MB</div>
            
            <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
              <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="btn-outline">Cancel</button>
              <button onClick={(e) => { e.stopPropagation(); handleUpload(); }} className="btn-primary">Process with AI</button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(79, 70, 229, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UploadCloud size={32} color="var(--primary)" />
            </div>
            <div>
              <span style={{ fontWeight: 600, color: 'var(--primary)' }}>Click to upload</span> or drag and drop
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>PDF, Excel (Max 10MB)</p>
          </div>
        )}
      </div>
    </div>
  );
}

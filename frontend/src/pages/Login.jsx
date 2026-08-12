import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      
      {/* Decorative Orbs */}
      <div style={{ position: 'absolute', top: '0', left: '0', width: '500px', height: '500px', background: 'var(--primary)', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.15, zIndex: -1 }}></div>
      <div style={{ position: 'absolute', bottom: '0', right: '0', width: '400px', height: '400px', background: 'var(--accent)', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.2, zIndex: -1 }}></div>

      <div className="glass-card animate-slide-up" style={{ width: '100%', maxWidth: '420px', padding: '48px', position: 'relative' }}>
        
        <Link to="/" style={{ position: 'absolute', top: '24px', left: '24px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
          Back
        </Link>

        <div style={{ textAlign: 'center', marginBottom: '32px', marginTop: '16px' }}>
          <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Activity color="white" size={28} />
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-1px' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)' }}>Sign in to the ESG platform</p>
        </div>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '14px' }}>Email Address</label>
            <input 
              type="email" 
              placeholder="admin@esg.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-input"
              required
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '14px' }}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input"
              required
            />
          </div>
          
          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '16px' }}>
            Sign In to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Chatbot from './Chatbot';

export default function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-color)' }}>
      <Sidebar />
      <main style={{ 
        marginLeft: '260px', 
        flex: 1, 
        padding: '40px 48px',
        maxWidth: '1600px'
      }}>
        <Outlet />
      </main>
      <Chatbot />
    </div>
  );
}

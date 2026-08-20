import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Bot, Send, X, MessageSquare, Sparkles } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE}/api/chat/`, {
        message: userMessage.content
      });
      
      setMessages(prev => [...prev, { role: 'ai', content: response.data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: "Sorry, I couldn't process that request." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="animate-slide-up"
        style={{ 
          position: 'fixed', bottom: '32px', right: '32px', 
          width: '64px', height: '64px', borderRadius: '50%', padding: 0, zIndex: 100, 
          background: 'var(--text-main)', color: 'white', border: 'none', cursor: 'pointer',
          boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <MessageSquare size={28} />
      </button>
    );
  }

  return (
    <div className="saas-card animate-slide-up" style={{ 
      position: 'fixed', bottom: '32px', right: '32px', 
      width: '400px', height: '600px', zIndex: 100, padding: 0, 
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-color)', borderRadius: '16px'
    }}>
      
      {/* Header */}
      <div style={{ 
        padding: '20px 24px', 
        background: 'var(--text-main)', 
        color: 'white',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '8px', borderRadius: '8px' }}>
            <Bot size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0, letterSpacing: '0.2px' }}>AI Compliance Assistant</h3>
            <span style={{ fontSize: '12px', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}><div style={{width: 8, height: 8, background: '#10b981', borderRadius: '50%', border: '2px solid var(--text-main)'}}></div> Online</span>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', padding: '4px', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'white'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>
          <X size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#f8fafc' }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={24} color="var(--primary)" />
            </div>
            <p style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '15px' }}>Hello! How can I help you today?</p>
            <span style={{ fontSize: '13px', lineHeight: '1.5' }}>I have access to your ESG policy documents. Ask me anything about compliance rules or past records.</span>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} style={{ 
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', 
            maxWidth: '85%', 
            background: msg.role === 'user' ? 'var(--primary)' : 'white', 
            color: msg.role === 'user' ? 'white' : 'var(--text-main)', 
            padding: '12px 16px', 
            borderRadius: msg.role === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px', 
            fontSize: '14px',
            boxShadow: 'var(--shadow-sm)',
            border: msg.role === 'user' ? 'none' : '1px solid var(--border-color)',
            lineHeight: 1.5
          }}>
            {msg.content}
          </div>
        ))}
        
        {isLoading && (
          <div style={{ alignSelf: 'flex-start', background: 'white', padding: '12px 16px', borderRadius: '12px 12px 12px 4px', fontSize: '14px', color: 'var(--text-muted)', display: 'flex', gap: '4px', alignItems: 'center', border: '1px solid var(--border-color)' }}>
            <div className="typing-dot" style={{ width: 6, height: 6, background: 'var(--text-light)', borderRadius: '50%', animation: 'typing 1.4s infinite ease-in-out' }}></div>
            <div className="typing-dot" style={{ width: 6, height: 6, background: 'var(--text-light)', borderRadius: '50%', animation: 'typing 1.4s infinite ease-in-out 0.2s' }}></div>
            <div className="typing-dot" style={{ width: 6, height: 6, background: 'var(--text-light)', borderRadius: '50%', animation: 'typing 1.4s infinite ease-in-out 0.4s' }}></div>
            <style>{`@keyframes typing { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }`}</style>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} style={{ padding: '16px', background: 'white', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="saas-input"
            style={{ paddingRight: '48px', borderRadius: '8px' }}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading} 
            style={{ position: 'absolute', right: '8px', background: 'var(--primary)', color: 'white', border: 'none', width: '28px', height: '28px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: input.trim() && !isLoading ? 'pointer' : 'default', opacity: input.trim() && !isLoading ? 1 : 0.5, transition: 'all 0.2s' }}
          >
            <Send size={14} style={{ marginLeft: '-1px' }} />
          </button>
        </div>
      </form>
    </div>
  );
}

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
        className="btn-primary animate-slide-up"
        style={{ 
          position: 'fixed', bottom: '32px', right: '32px', 
          width: '64px', height: '64px', borderRadius: '50%', padding: 0, zIndex: 100, 
          boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        <MessageSquare size={28} />
      </button>
    );
  }

  return (
    <div className="glass-card animate-slide-up" style={{ 
      position: 'fixed', bottom: '32px', right: '32px', 
      width: '400px', height: '600px', zIndex: 100, padding: 0, 
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      boxShadow: '0 24px 48px rgba(0,0,0,0.1)' 
    }}>
      
      {/* Header */}
      <div style={{ 
        padding: '20px 24px', 
        background: 'linear-gradient(135deg, var(--primary), var(--accent))', 
        color: 'white',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '8px', borderRadius: '50%' }}>
            <Bot size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>ESG AI Assistant</h3>
            <span style={{ fontSize: '12px', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{width: 6, height: 6, background: '#10b981', borderRadius: '50%'}}></div> Online</span>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
          <X size={18} />
        </button>
      </div>

      {/* Messages Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(255,255,255,0.4)' }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <Sparkles size={32} color="var(--primary)" opacity={0.5} />
            <p style={{ fontWeight: 500 }}>Hello! I have access to your ESG policy documents.</p>
            <span style={{ fontSize: '14px' }}>Ask me anything about compliance rules or past records.</span>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} style={{ 
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', 
            maxWidth: '85%', 
            background: msg.role === 'user' ? 'linear-gradient(135deg, var(--primary), var(--accent))' : 'white', 
            color: msg.role === 'user' ? 'white' : 'var(--text-main)', 
            padding: '14px 18px', 
            borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px', 
            fontSize: '15px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            lineHeight: 1.5
          }}>
            {msg.content}
          </div>
        ))}
        
        {isLoading && (
          <div style={{ alignSelf: 'flex-start', background: 'white', padding: '14px 18px', borderRadius: '20px 20px 20px 4px', fontSize: '15px', color: 'var(--text-muted)', display: 'flex', gap: '6px', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <div className="typing-dot" style={{ width: 6, height: 6, background: 'var(--primary)', borderRadius: '50%', animation: 'typing 1.4s infinite ease-in-out' }}></div>
            <div className="typing-dot" style={{ width: 6, height: 6, background: 'var(--primary)', borderRadius: '50%', animation: 'typing 1.4s infinite ease-in-out 0.2s' }}></div>
            <div className="typing-dot" style={{ width: 6, height: 6, background: 'var(--primary)', borderRadius: '50%', animation: 'typing 1.4s infinite ease-in-out 0.4s' }}></div>
            <style>{`@keyframes typing { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }`}</style>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} style={{ padding: '20px', background: 'white', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ position: 'relative' }}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="glass-input"
            style={{ paddingRight: '56px', background: 'var(--bg-base)', border: 'none', borderRadius: '24px' }}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading} 
            className="btn-primary" 
            style={{ position: 'absolute', right: '6px', top: '6px', bottom: '6px', padding: '0', width: '36px', height: 'auto', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}

'use client'
import { useState } from 'react';

export default function ChatWindow({ code }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const askQuestion = async () => {
    setLoading(true);
    
    try {
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          code: code,
          role: 'Embedded C++ Engineer'
        })
      });
      
      const data = await res.json();
      setMessages([...messages, { type: 'ai', text: data.question }]);
    } catch (error) {
      console.error('Error:', error);
    }
    
    setLoading(false);
  };

  const submitResponse = () => {
    if (response.trim()) {
      setMessages([...messages, { type: 'candidate', text: response }]);
      setResponse('');
    }
  };

  return (
    <div style={{ 
      height: '100%', 
      border: '1px solid #ccc', 
      padding: '10px',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      color: '#000000'
    }}>
      <h3 style={{ color: '#000000' }}>AI Questions</h3>
      
      <div style={{ flex: 1, overflowY: 'scroll', marginBottom: '10px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ 
            margin: '10px 0', 
            padding: '10px', 
            backgroundColor: msg.type === 'ai' ? '#e3f2fd' : '#e8f5e8',
            border: '1px solid #ddd',
            borderRadius: '5px',
            color: '#1a1a1a'  // Very dark gray, almost black for better contrast on white
          }}>
            <strong style={{ color: msg.type === 'ai' ? '#1976d2' : '#388e3c' }}>
              {msg.type === 'ai' ? 'AI:' : 'You:'}
            </strong> <span style={{ color: 'red', fontSize: '16px', fontWeight: 'bold' }}>{msg.text}</span>
          </div>
        ))}
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Type your response..."
          style={{ 
            width: '100%', 
            height: '60px', 
            padding: '5px',
            border: '1px solid #ccc',
            borderRadius: '3px',
            color: '#000000'
          }}
        />
      </div>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={askQuestion} 
          disabled={loading}
          style={{ flex: 1, padding: '10px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '3px' }}
        >
          {loading ? 'Thinking...' : 'Ask AI Question'}
        </button>
        
        <button 
          onClick={submitResponse}
          disabled={!response.trim()}
          style={{ flex: 1, padding: '10px', backgroundColor: '#388e3c', color: 'white', border: 'none', borderRadius: '3px' }}
        >
          Submit Response
        </button>
      </div>
    </div>
  );
}
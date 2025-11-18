'use client'
import { useState } from 'react';
import CodeEditor from '@/components/CodeEditor';
import ChatWindow from '@/components/ChatWindow';

export default function Home() {
  const [code, setCode] = useState('// Write your C++ code here');

  const handleCodeChange = (value) => {
    setCode(value);
  };

  return (
    <div style={{ padding: '20px', height: '100vh' }}>
      <h1>Interview Tool</h1>
      <div style={{ display: 'flex', gap: '20px', height: 'calc(100vh - 100px)' }}>
        <div style={{ flex: 1 }}>
          <CodeEditor onChange={handleCodeChange} />
        </div>
        <div style={{ flex: 1 }}>
          <ChatWindow code={code} />
        </div>
      </div>
    </div>
  );
}
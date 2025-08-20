import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const initialList = [];

  const [texts, setTexts] = useState(initialList);
  const [isLoading, setIsLoading] = useState(false);

  // 页面加载时获取数据
  useEffect(() => {
    fetchFromDb();
  }, []);

  function sendToDb() {
    if (!input.trim()) return; // 防止空输入
    
    setIsLoading(true);
    axios.post('/api/add', {
      text: input
    }).then(res => {
      fetchFromDb()
      console.log(res);
    }).catch(e => {
      console.log(e);
    }).finally(() => {
      setIsLoading(false);
    });

    setInput("");
  }

  function fetchFromDb() {
    fetch("/api/fetch")
      .then(response => response.json())
      .then(data => setTexts(data.texts));
  }

  function clear() {
    if (texts.length === 0) return; // 如果没有内容则不执行
    
    axios.delete("/api/delete")
      .then(res => {
        console.log(res);
        setTexts([])
      })
      .catch(e => {
        console.log(e);
      });

    setInput("");
  }

  // 处理回车键提交
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendToDb();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        🚀 Welcome to the application of Wing's microservice architecture v2.0
        <div style={{ fontSize: '0.6em', marginTop: '10px', opacity: 0.8 }}>
          Running in {process.env.REACT_APP_NAMESPACES || 'default'} namespace
        </div>
      </header>
      
      <div className="Grid">
        <div className="Grid-Item">
          <h3 style={{ marginTop: 0, marginBottom: '20px' }}>📝 Add New Text</h3>
          <input 
            type="text" 
            placeholder="Enter your text here..." 
            value={input} 
            onChange={e => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <div style={{ marginTop: '20px' }}>
            <button 
              onClick={sendToDb} 
              disabled={isLoading || !input.trim()}
              style={{ opacity: isLoading || !input.trim() ? 0.6 : 1 }}
            >
              {isLoading ? '⏳ Adding...' : '➕ Add Text'}
            </button>
            <button 
              onClick={clear}
              disabled={texts.length === 0}
              style={{ opacity: texts.length === 0 ? 0.6 : 1 }}
            >
              🗑️ Clear All
            </button>
          </div>
        </div>
        
        <div className="Grid-Item">
          <h3 style={{ marginTop: 0, marginBottom: '20px' }}>
            📋 Text List ({texts.length} items)
          </h3>
          {texts.length === 0 ? (
            <div style={{ 
              padding: '40px', 
              color: 'rgba(255,255,255,0.7)', 
              fontStyle: 'italic',
              fontSize: '1.1em'
            }}>
              ✨ No texts yet. Add your first text above!
            </div>
          ) : (
            <ul>
              {texts.map((text, index) => {
                return (
                  <li key={text.text}>
                    <span style={{ marginRight: '10px' }}>📄</span>
                    {text.text}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // 引入App组件
import reportWebVitals from './reportWebVitals';

// 使用createRoot API挂载React应用
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 如果你想开始测量你的应用的性能，可以传递一个函数
// 来记录页面性能（例如 reportWebVitals(console.log)）
// 或发送到一个分析端点。了解更多：https://bit.ly/CRA-vitals
reportWebVitals();

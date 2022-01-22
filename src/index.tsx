import './wdyr'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadServer, DevTools } from 'jira-dev-tool'

// 务必在 jira-dev-tool 引入 => 因为需要自定义主题变量. => 通过配置变量
import 'antd/dist/antd.less'

import { AppProviders } from 'context';
loadServer(() => {
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <DevTools />
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById('root')
  )
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

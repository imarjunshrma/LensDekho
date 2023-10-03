// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx';
import '@/styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  RecoilRoot
} from 'recoil';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
)

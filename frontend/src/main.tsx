// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import { store } from './features/store.ts';
import {
  RecoilRoot
} from 'recoil';
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </Provider>
  // </React.StrictMode>,
)

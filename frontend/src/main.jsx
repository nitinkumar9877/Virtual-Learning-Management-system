// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// CORRECTED: BrowserRouter
import { BrowserRouter } from "react-router-dom"
import App from './App.jsx'
import { store } from './redux/store.js';
import { Provider } from "react-redux";

createRoot(document.getElementById('root')).render(
  // CORRECTED: <BrowserRouter>
  <BrowserRouter> 
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
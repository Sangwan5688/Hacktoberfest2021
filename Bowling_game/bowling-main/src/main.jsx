import {Provider} from "react-redux";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {store} from './store/store.js'
import './index.css'
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </Provider>
  </React.StrictMode>,
)

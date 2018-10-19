import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import "./assets/theme-dashboard/v4/dist/toolkit-inverse.css"; 
import { CreateStore } from 'redux'; 
import { Provider } from 'react-redux'; 

const store = createStore(() => {})
// reducer needs to be added 

ReactDOM.render(
  <Provider store = {store}>
    <Router>
      <App />
    </Router>,  
  </Provider>
  document.getElementById("root")
);
registerServiceWorker();

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import "./assets/theme-dashboard/v4/dist/toolkit-light.css"; 
import { createStore } from 'redux'; 
import { Provider } from 'react-redux'; 
import reducers from './reducers';


const store = createStore(reducers)
// reducer needs to be added 

ReactDOM.render(
  <Provider store = {store}>
    <Router>
      <App />
    </Router> 
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import "./assets/theme-dashboard/v4/dist/toolkit-light.css"; 
import { createStore } from 'redux'; 
import { Provider } from 'react-redux'; 
import rootReducer from './reducers';


const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store = {store}>
    <Router>
      <App />
    </Router> 
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

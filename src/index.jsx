import React                from 'react';
import ReactDOM             from 'react-dom';
import { Provider }         from "react-redux";
import store                from "./helpers/store";
import { BrowserRouter }    from 'react-router-dom';
import App                  from './App';
import reportWebVitals      from './reportWebVitals';
import                          './styles/index.css';
import { CommonUtil }       from './helpers/CommonUtil';
import * as FakeBackendUtil from './helpers/FakeBackendUtil';

if(CommonUtil.isFakeDatabase()){ // setup fake backend
  FakeBackendUtil.configureFakeBackend();
}

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

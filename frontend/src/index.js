import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import {ApolloProvider,ApolloClient,InMemoryCache,createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import reportWebVitals from './reportWebVitals';

const httpLink = createHttpLink({
  uri:'https://dabatech.herokuapp.com/graphql'
});

const authLink = setContext((_,{headers})=>{
  const token = localStorage.getItem('token');
  return{
    headers:{
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

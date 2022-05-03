import React,{createContext} from 'react';
import {Route,Routes} from 'react-router-dom';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/Signup';
import ProfilePage from './pages/Profile';
import { ProtectedRoute,RedirectRoute } from './components/ProtectedRoute';
import NavBar from './components/Navbar';

import {Layout} from 'antd';

export const userData = createContext({data:{}});

const {Header,Content} = Layout;

function App() {
  return (
     <>
      <Header style={{backgroundColor:"#FFFF"}}>
        <NavBar/>
      </Header>

      <Content>
        <Routes>
          <Route exact path='/' element={<RedirectRoute><SignInPage/></RedirectRoute>}/>
          <Route path='/signup' element={<RedirectRoute><SignUpPage/></RedirectRoute>}/>
          <Route path='/profile' element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
        </Routes>
      </Content>
     </>
  );
}

export default App;

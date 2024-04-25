import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'

import {
  Routes,
  Route,
} from "react-router-dom"

import ReactGA from 'react-ga';
import { useLocation } from 'react-router-dom';

import './styles/App.css';
import './styles/buttons.css';

import UserInfo from './components/login/UserInfo';
import LoginForm from './components/login/LoginForm';
import AccountForm from './components/login/AccountForm';
import NotificationTemp from './components/global/NotificationTemp'
import ProjectForm from './components/project/ProjectForm';
import SearchForm from './components/map/SearchForm';
import CompanyCreate from './components/company/CompanyCreate';
import Company from './components/company/Company';
import JobFull from './components/project/JobFull';
import Intro from "./components/home/Intro"
import Map from './components/map/Map';

import { getUserInfo } from '../src/reducers/userReducer'

import csrfServices from '../src/services/csrfService'


function App() {
  
  ReactGA.initialize('G-PJ2YDY4ZXH');
  const dispatch = useDispatch()

  const location = useLocation();

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  useEffect(() => {
    csrfServices.getCsrfToken()
    dispatch(getUserInfo())

  },[dispatch])


  return (
      <div className="App">

        <Routes>
        
          <Route path='/commerce/:uuid'  element={
                <>
                  <Company /> 
                </>
              } />

          <Route path='/job/:uuid' element= { <JobFull />  }  />

          <Route path='/profile' element= { <UserInfo />  }  />

          <Route path='/login' element= { <LoginForm /> } />

          <Route path='/signup' element= { <AccountForm /> } />

          {/* <Route path='/howitworks' element= { <HowItWorks /> } />

          <Route path='/explanation' element= { <Explanation /> } /> */}

          <Route path='/job' element= { <ProjectForm /> } />

          <Route path='/create' element= { <CompanyCreate /> } />

          <Route path='/information' element= { <Intro /> } />

          <Route path='/'  element={
            <>
              <SearchForm />
              <Map />
            </>
            } />

        </Routes>
        
        <NotificationTemp />
        
      </div>

  );
}

export default App;

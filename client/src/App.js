import React from 'react';
import {Switch,Route,Redirect} from "react-router-dom";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import OverviewPage from './pages/Overview/OverviewPage';
import TourPage from './pages/Tour/TourPage';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' component={OverviewPage} />
        <Route path='/tours/:tourId' component={TourPage} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;

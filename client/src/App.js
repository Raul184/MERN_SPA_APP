import React , {lazy,Suspense} from 'react';
import {Switch,Route,Redirect} from "react-router-dom";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Loading from './components/onLoading/OnLoading'
import PrivateRoute from './components/auth/PrivateRoutes'

const OverviewPage = lazy(() => import('./pages/Overview/OverviewPage'))
const TourPage = lazy(() => import('./pages/Tour/TourPage'))
const Login = lazy(() => import('./pages/Login/Login'))
const Signup = lazy(() => import('./pages/Signup/Signup'))
const MeProfile = lazy(() => import('./pages/Me/MeProfile'))

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Suspense fallback={<Loading />}>
        <Route exact path='/' component={OverviewPage} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route path='/tours/:tourId' component={TourPage} />
        <PrivateRoute exact path='/me' component={MeProfile} />
        <Redirect to="/" />
        </Suspense>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;

import React , {lazy,Suspense} from 'react'
import {Switch,Route} from "react-router-dom"
import HeaderContainer from './components/headerContainer/HeaderContainer'
import Footer from './components/footer/Footer'
import Loading from './components/onLoading/OnLoading'
import PrivateRoute from './components/auth/PrivateRoutes'
import ErrorBoundary from './components/error-boundary/Error-boundary'
const OverviewPage = lazy(() => import('./pages/Overview/OverviewPage'))
const TourPage = lazy(() => import('./pages/Tour/TourPage'))
const Login = lazy(() => import('./pages/Login/Login'))
const Signup = lazy(() => import('./pages/Signup/Signup'))
const MeProfile = lazy(() => import('./pages/Me/MeProfile'))

function App() {
  return (
    <div className="App">
      <HeaderContainer />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Route exact path='/' component={OverviewPage} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/tours/:tourId' component={TourPage} />
            <PrivateRoute exact path='/me' component={MeProfile} />
            <Route />
          </Suspense>
        </ErrorBoundary>
      </Switch>
      <Footer />
    </div>
  );
}
export default App;

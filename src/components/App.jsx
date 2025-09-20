import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import SharedLayout from './SharedLayout/SharedLayout';
import Loader from './Loader/Loader';
import PrivateRoute from 'routes/PrivateRoute';
import PublicRoute from 'routes/PublicRoute';

const Home = lazy(() => import('./Home/Home'));
const Movies = lazy(() => import('./Movies/Movies'));
const MovieDetails = lazy(() =>import('./MovieDetails/MovieDetails'));
const NotFound = lazy(() => import('./NotFound/NotFound'));
const Registration = lazy(() =>import('./Registration/Registration'));
const LogIn = lazy(() => import('./Login/Login'));
const MainPage = lazy(() => import('./pages/MainPage/MainPage'))

export const App = () => {
  return (
    <section>
      <SharedLayout />
      <Suspense fallback={ <div> <Loader /> </div> } >
        <Routes>
          <Route path="/" element={<PublicRoute component={<MainPage/>}/>}/>
          <Route path="/login" element={<PublicRoute component={<LogIn/>}/>}/>
          <Route path="registration" element={<PublicRoute component={<Registration/>}/>}/>

          <Route path="/home" element={<PrivateRoute component={<Home />}/>}/>
          <Route path="/movies" element={<PrivateRoute component={<Movies />}/>}/>
          <Route path="/movies/:movieId" element={<PrivateRoute component={<MovieDetails />}/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Suspense>
    </section>
  );
};
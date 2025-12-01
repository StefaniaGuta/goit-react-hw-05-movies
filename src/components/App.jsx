import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import SharedLayout from './SharedLayout/SharedLayout';
import Loader from './Loader/Loader';
import PrivateRoute from 'routes/PrivateRoute';
import PublicRoute from 'routes/PublicRoute';

const Home = lazy(() => import('./Home/Home'));
const Movies = lazy(() => import('./Movies/Movies'));
const Series = lazy(() => import('./Series/Series'));
const MovieDetails = lazy(() =>import('./MovieDetails/MovieDetails'));
const NotFound = lazy(() => import('./NotFound/NotFound'));
const Registration = lazy(() =>import('./Registration/Registration'));
const LogIn = lazy(() => import('./Login/Login'));
const MainPage = lazy(() => import('./MainPage/MainPage'));
const MovieByGenPage = lazy(() => import('./pages/MovieByGenPage/MovieByGenPage'));
const SeriesDetails = lazy(() => import('./SeriesDetails/SeriesDetails'));
const ActorsPage = lazy(() => import('./pages/ActorsPage/ActorsPage'));
const ListPage = lazy(() => import('./pages/ListPage/ListPage'));

export const App = () => {
  return (
    <section>
      <SharedLayout />
      <Suspense fallback={ <div> <Loader /> </div> } >
        <Routes>
          <Route path="/" element={<PublicRoute component={<MainPage/>}/>}/>
          <Route path="/login" element={<PublicRoute component={<LogIn/>}/>}/>
          <Route path="registration" element={<PublicRoute component={<Registration/>}/>}/>
          <Route path="genres/:genName/:genId" element={<MovieByGenPage/>}/>

          <Route path="/home" element={<PrivateRoute component={<Home />}/>}/>
          <Route path='/list' element={<PrivateRoute component={<ListPage/>}/>}/>
          <Route path="/movies/:type/:id?" element={<Movies />}/>
          <Route path="/series/:type/:id?" element={<Series />}/>
          <Route path="/movie/:movieId" element={<MovieDetails />}/>
          <Route path="/serie/:movieId" element={<SeriesDetails />}/>
          <Route path="/people/:actorId" element={<ActorsPage />}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Suspense>
    </section>
  );
};
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Suspense, useState } from 'react';
import Loader from '../Loader/Loader';
import './SharedLayout.css';
import Searchbar from 'components/Searchbar/Searchbar';
import { useSelector, useDispatch } from 'react-redux';
import {logOut} from "../../redux/auth/operations";
import url from '../Images/icons.svg';


const SharedLayout = () => {
  const isLogin = useSelector((state) => state.auth.isLoggedIn);
  const genres = useSelector((state) => state?.movies.genres?.genres);
  const [open, setOpen] = useState(null);
  const [openMovieModal, setOpenMovieModal] = useState(null)
  const [openSeriesModal, setOpenSeriesModal] = useState(null)
  
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const logout = async() => {
    try{
      await dispatch(logOut());
      navigate('/')
    } catch(e) {
      console.log(e)
    }
  }

  const handleOpen = () => setOpen(!open);
  const handleOpenMovie = () => setOpenMovieModal(!openMovieModal);
  const handleOpenSeries = () => setOpenSeriesModal(!openSeriesModal);

  const handleNavigate = (gen) => {
    navigate(`/genres/${gen.name}/${gen.id}`);
    setOpen(!open)
  }
  const navigateToMoviesPage = (type) => {
    navigate(`/movies/${type}`, { state: { type } });
    setOpenMovieModal(!openMovieModal);
  };

  const navigateToSeriesPage = (type) => {
    navigate(`/series/${type}`, { state: { type } });
    setOpenSeriesModal(!openSeriesModal);
  }
  return (
    <>
      <header className='header'>
        <nav className='navigation'>
          <Link to="/home" className="link">
            Home
          </Link>
          <Link onClick={handleOpen} className="link">Genre</Link>
          {open ?(
            <ul className='genList'>
              {genres.map(gen => (
                <li onClick={() => handleNavigate(gen)} key={gen.id}>{gen.name}</li>
              ))}
            </ul>
          ) : null}
          <Searchbar/>
          <Link onClick={handleOpenMovie} className="link"> Movies</Link>
          {openMovieModal ?(
          <ul className='moviesTypes'>
            <li onClick={() => navigateToMoviesPage("popularMovies")}>Popular</li>
             <li onClick={() => navigateToMoviesPage("nowPlayingMovies")}>Now Playing</li>
              <li onClick={() => navigateToMoviesPage("upcomingMovies")}>Upcoming</li>
               <li onClick={() => navigateToMoviesPage("topRatedMovies")}>Top Rated</li>
          </ul>
          ) : null}
          
          <Link onClick={handleOpenSeries} className="link">Series</Link>
          {openSeriesModal ?(
          <ul className='seriesTypes'>
            <li onClick={() => navigateToSeriesPage("popularSeries")}>Popular</li>
            <li onClick={() => navigateToSeriesPage("airingTodaySeries")}>Airing Today</li>
            <li onClick={() => navigateToSeriesPage("onTvSeries")}>On TV</li>
            <li onClick={() => navigateToSeriesPage("topRatedSeries")}>Top Rated</li>
          </ul>
          ) : null}
          {isLogin ? ((
            <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
              <button onClick={() => logout()} className='logOutButton' type='submit'>Logout</button>
              
            </div>)) 
              : 
          (
            <div style={{display: 'flex', width: '140px', alignItems: 'center', gap: "5px"}}>
              <Link to="/login" className="link">Login</Link> / 
              <Link to="/registration" className="link">Singup</Link>
              <svg width="24" height="24"><use xlinkHref={`${url}#bell`}/></svg>
          </div>
          )
          }
        </nav>
      </header>
      <Suspense fallback={<div><Loader/></div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default SharedLayout;
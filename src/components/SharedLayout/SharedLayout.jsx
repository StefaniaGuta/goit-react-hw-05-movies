import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Suspense, useState } from 'react';
import Loader from '../Loader/Loader';
import { useActors } from '../../redux/actors/useActors';
import './SharedLayout.css';
import Searchbar from 'components/Searchbar/Searchbar';
import { useSelector, useDispatch } from 'react-redux';
import {logOut} from "../../redux/auth/operations";
import url from '../Images/icons.svg';


const SharedLayout = () => {
  const isLogin = useSelector((state) => state.auth.isLoggedIn);
  const genres = useSelector((state) => state?.movies.genres?.genres);
  const actors = useActors();
  const [open, setOpen] = useState(null);
  const [openMovieModal, setOpenMovieModal] = useState(null);
  const [openSeriesModal, setOpenSeriesModal] = useState(null);
  const [openUserMenu, setUserMenu] = useState(null);
  const [openActorsMenu, setOpenActorsMenu] = useState(null);
  
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
  const handleOpenActors = () => setOpenActorsMenu(!openActorsMenu);

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

  const navigateToActorPage = (a) => {
    navigate(`/people/${a.id}`);
    setOpenActorsMenu(!openActorsMenu);
  }

  const openMenu = () => setUserMenu(!openUserMenu);
  return (
    <>
      <header className='header'>
        <nav className='navigation'>
          <Link to="/home" className="link">
            Home
          </Link>

          <div className='modalWrapper'>
            <Link onClick={handleOpen} className="link">Genre</Link>
            {open ?(
              <ul className='genList'>
                {genres.map(gen => (
                  <li className='menuChoises' onClick={() => handleNavigate(gen)} key={gen.id}>{gen.name}</li>
                ))}
              </ul>
            ) : null}
          </div>

          {isLogin ? 
            <div className='modalWrapper'>
              <Link onClick={handleOpenActors} className="link">Actors</Link>
              {openActorsMenu ? (
                <ul className='genList'>
                  {actors.map((a, i) => (
                    <li className='menuChoises' key={i} onClick={() => navigateToActorPage(a)}>
                      {a.name}
                    </li>
                  ))}
                </ul>
                ) : null}
            </div>
          :null}
          <Searchbar/>

          <div className='modalWrapper'>
            <Link onClick={handleOpenMovie} className="link"> Movies</Link>
            {openMovieModal ?(
              <ul className='moviesTypes'>
                <li className='menuChoises' onClick={() => navigateToMoviesPage("popularMovies")}>Popular</li>
                <li className='menuChoises' onClick={() => navigateToMoviesPage("nowPlayingMovies")}>Now Playing</li>
                <li className='menuChoises' onClick={() => navigateToMoviesPage("upcomingMovies")}>Upcoming</li>
                <li className='menuChoises' onClick={() => navigateToMoviesPage("topRatedMovies")}>Top Rated</li>
              </ul>
            ) : null}
          </div>

          <div className='modalWrapper'>
            <Link onClick={handleOpenSeries} className="link">Series</Link>
            {openSeriesModal ?(
              <ul className='seriesTypes'>
                <li className='menuChoises' onClick={() => navigateToSeriesPage("popularSeries")}>Popular</li>
                <li className='menuChoises' onClick={() => navigateToSeriesPage("airingTodaySeries")}>Airing Today</li>
                <li className='menuChoises' onClick={() => navigateToSeriesPage("onTvSeries")}>On TV</li>
                <li className='menuChoises' onClick={() => navigateToSeriesPage("topRatedSeries")}>Top Rated</li>
              </ul>
            ) : null}
          </div>
          
          {isLogin ? ((
            <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
              <svg className='userMenu' onClick={openMenu} width="24" height="24"><use xlinkHref={`${url}#userMenu`}/></svg>
              {openUserMenu ? 
              <div className='userMenuList'>
                <button onClick={() => logout()} className='logOutButton' type='submit'>Logout</button>
                <Link to="/list" onClick={openMenu} className='watchlistLink'>Watchlist</Link>
              </div>  
              : null}
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
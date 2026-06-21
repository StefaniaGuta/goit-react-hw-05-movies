import url from '../Images/icons.svg';
import { Link } from 'react-router-dom';
import './menuMobile.css';

const MenuMobile = ({
  handleOpen, 
  open, 
  genres, 
  handleNavigate,
  handleOpenMovie,
  openMovieModal,
  navigateToMoviesPage,
  handleOpenSeries,
  openSeriesModal,
  navigateToSeriesPage,
  handleMobileMenu,
  openMobileMenu,
  setOpenMobileMenu
}) =>{






  return (
    <>
    <svg 
      className='menuMobile'
      width="69" 
      height="30"
      onClick={handleMobileMenu}
    >
      <use xlinkHref={`${url}#menuMobile`}/>
    </svg>

    {openMobileMenu && (
  <div className="mobileMenu">
    <Link
      to="/home"
      className="mobileLink"
      onClick={handleMobileMenu}
    >
      Home
    </Link>

    <div className="mobileSection">
      <span onClick={handleOpen}>Genres</span>

      {open && (
        <ul>
          {genres.map(gen => (
            <li
              key={gen.id}
              onClick={() => {
                handleNavigate(gen);
                setOpenMobileMenu(false);
              }}
            >
              {gen.name}
            </li>
          ))}
        </ul>
      )}
    </div>

    <div className="mobileSection">
      <span onClick={handleOpenMovie}>Movies</span>

      {openMovieModal && (
        <ul>
          <li onClick={() => navigateToMoviesPage("popularMovies")}>
            Popular
          </li>
          <li onClick={() => navigateToMoviesPage("nowPlayingMovies")}>
            Now Playing
          </li>
          <li onClick={() => navigateToMoviesPage("upcomingMovies")}>
            Upcoming
          </li>
          <li onClick={() => navigateToMoviesPage("topRatedMovies")}>
            Top Rated
          </li>
        </ul>
      )}
    </div>

    <div className="mobileSection">
      <span onClick={handleOpenSeries}>Series</span>

      {openSeriesModal && (
        <ul>
          <li onClick={() => navigateToSeriesPage("popularSeries")}>
            Popular
          </li>
          <li onClick={() => navigateToSeriesPage("airingTodaySeries")}>
            Airing Today
          </li>
          <li onClick={() => navigateToSeriesPage("onTvSeries")}>
            On TV
          </li>
          <li onClick={() => navigateToSeriesPage("topRatedSeries")}>
            Top Rated
          </li>
        </ul>
      )}
    </div>
    
        <Link
          to="/login"
          className="mobileLink"
          onClick={handleMobileMenu}
        >
          Login
        </Link>

        <Link
          to="/registration"
          className="mobileLink"
          onClick={handleMobileMenu}
        >
          Signup
        </Link>
    
  </div>
)}
    </>

    
    
  )
} 

export default MenuMobile;
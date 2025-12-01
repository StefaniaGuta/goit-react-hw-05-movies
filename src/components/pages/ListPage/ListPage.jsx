import {getList, deleteItemFromTheList} from '../../../redux/list/listOperantions';
import { IMAGE_URL } from '../../../redux/movies/getAPI';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import url from '../../Images/icons.svg';
import { useSelector } from 'react-redux';
import {selectFirstRecentMovies} from '../../../redux/movies/selectors';
import RatingStars from '../../RatingStars/RatingStars';
import FavoriteList from '../../FavoriteList/FavoriteList';
import CreateWatchlist from '../../CreateWatchlist/CreateWatchlist'; 
import './ListPage.css'

const ListPage = () => {
 const dispatch = useDispatch();
 const [items, setItem] = useState([]);
 const mov = useSelector(selectFirstRecentMovies);
 const ser = useSelector(state => state?.series.series.slice(0, 5));
 const all = mov.concat(ser);
 const [open, setOpen] = useState(null)

 useEffect(() => {
  const getItemsFromTheList = async () => {
    const res = await dispatch(getList());
    setItem(res.payload.movies)
  }
  getItemsFromTheList();
 }, [dispatch]);

 const deleteItem = async (item) => {
  try{
    const res = await dispatch(deleteItemFromTheList({
      movieId: item.movieId,
      mediaType: item.mediaType,
      type: item.type
    }))
    const guestListAfterRemoveOne = items.filter(i => i._id !== item._id);
    setItem(guestListAfterRemoveOne)
    return res.payload
  } catch(e){
    console.log(e)
  }
}

 const getYear = (a) => {
  if(a.media_type === "movie"){
    return new Date(a.release_date).getFullYear()
  } else {
    return new Date(a.first_air_date).getFullYear()
  }
 }

 const openModal = () => setOpen(!open);

 return(
  <section className='listPageSection'>
      <h1 className='listPageTitle'>Welcome to <span>Watchlists</span></h1>
    {items && items.length > 0 ? 
    <ul className='listPageListItems'>
      {items.map((i, index) => (
        <li key={index} className='listPageItem'>
          <button title='detele' type='button' onClick={() => deleteItem(i)} className='listPageDeleteBtn'>
            <svg className='listPageBinClose' width="20" height="20"><use xlinkHref={`${url}#delete`}/></svg> 
            <svg className='listPageBinOpen' width="20" height="20"><use xlinkHref={`${url}#deleteOn`}/></svg> 
          </button>
          <img
            src={IMAGE_URL + i.backdropPath || i.posterPatch}
            alt={i.title}
          />
          <h2 className='listPageMovieTitle'>{i.title}</h2>
        </li>
      ))}
    </ul>
    : 
    <div>
      <div className='listPageTitleDescription'>
        <span className='listPageDescription'>
          Browse movies, add them to watchlists and share them with friends. <br></br>
          <p className='secondRowDescription'>
            Just click the 
            <svg width="20" height="26" className='listPageSvg'><use xlinkHref={`${url}#favorite`}/></svg>to add, 
            the poster to see more details, 
            <svg width="20" height="18" className='listPageSvg'><use xlinkHref={`${url}#eye`}/></svg> 
            to mark as watched or hit the <svg width="30" height="30" className='listPageSvg'><use xlinkHref={`${url}#heart`}/></svg> 
            to mark your favorites.
          </p>
          Also, if you want your own personalized list, simply click the 
          <button type='button' className='createWatchlistBtn' onClick={openModal}>+ Create watchlist</button> 
          button to create one and start tracking your favorite movies and series.
        </span>
      </div>
      {open ? <CreateWatchlist setOpen={setOpen} open={open}/> : null}
      <h2 className='listPageSubtitle'>Popular movies right now</h2>
      <ul className='listPageListItems'>
        {all.map((a, index) => (
          <li key={index} className='listPageItem'>
            <FavoriteList item={a}/>
            <img
              src={IMAGE_URL + a.backdrop_path || a.poster_path}
              alt={a.title || a.name}
            />
            
            <RatingStars voteAverage={a.vote_average}/>
            <h2 className='listPageMovieTitle'>{a.title || a.name}</h2>
            <p className='itemYear'>({getYear(a)})</p>
          </li>
        ))}
      </ul>
    </div>
}
  </section>
 )
}

export default ListPage;
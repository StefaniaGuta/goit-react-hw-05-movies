import {postItemInTheList} from '../../redux/list/listOperantions';
import { useDispatch } from 'react-redux';
import url from '../Images/icons.svg';
import { useNavigate } from 'react-router-dom';
import './FavoriteList.css';

const FavoriteList = ({item}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const sez = item.seasons
  
  const choosenItem = async (type) => {
    const mediaType = sez ? "tv" : "movie";
    try{
      const res = await dispatch(postItemInTheList({
        movieId: item.id, 
        mediaType: mediaType,
        type: type,
        title: item.title || item.name,
        posterPath: item.poster_path,
        backdropPath: item.backdrop_path
      }));
        return res.payload
    } catch(e){
        console.log(e)
    }
  }

  const navToPage = () => {
    if (sez) {
      navigate(`/serie/${item.id}`);
    } else{
    navigate(`/movie/${item.id}`);
    }
  }

return (
  <section  className='addToListSection' onClick={navToPage}>
    <span title="add to favorite list">
      <svg width="28" height="27" className='listSvg' onClick={() => choosenItem("favorite")} ><use xlinkHref={`${url}#heart`}/></svg>
    </span>
    <span title="add to watched list"> 
      <svg width="21" height="21" onClick={() => choosenItem("watched")} className='listSvg'><use xlinkHref={`${url}#eye`}/></svg> 
    </span>
    <span title="add to watch list">
      <svg width="28" height="27" onClick={() => choosenItem("watchlist")} className='listSvg'><use xlinkHref={`${url}#favorite`}/></svg>
    </span>
  </section>
)
}

export default FavoriteList;
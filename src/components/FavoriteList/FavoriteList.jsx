import {postItemInTheList} from '../../redux/list/listOperantions';
import {getWishList} from '../../redux/wishList/wishList';
import { useDispatch } from 'react-redux';
import url from '../Images/icons.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import './FavoriteList.css';

const FavoriteList = ({item}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [wish, setWishes] = useState([]);
  const sez = item.seasons;
  const [openLists, setOpenLists] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const wishRes = await dispatch(getWishList());
        setWishes(wishRes.payload.wishLists || []);
      }catch(e){
        console.log(e)
      }
    };
    fetchData();
  }, [dispatch]);
  

  const addToList = async (type) => {
  const mediaType = sez ? "tv" : "movie";

  try {
    await dispatch(
      postItemInTheList({
        movieId: item.id,
        mediaType: mediaType,
        type: type.type,
        wishList: type.wishList,
        title: item.title || item.name,
        posterPath: item.poster_path,
        backdropPath: item.backdrop_path,
      })
    );
    setOpenLists(false);
  } catch (e) {
    console.log(e);
  }
};


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
      <svg width="28" height="27" className='listSvg' onClick={() => addToList({type: "favorite"})} ><use xlinkHref={`${url}#heart`}/></svg>
    </span>

    <span title="add to watched list"> 
      <svg width="21" height="21" onClick={() => addToList({type: "watched"})} className='listSvg'><use xlinkHref={`${url}#eye`}/></svg> 
    </span>
    <div className="customListWrapper">
      <span title="add to watch list">
        <svg width="20" height="27" onClick={() => setOpenLists(prev => !prev)} className='listSvg'><use xlinkHref={`${url}#favorite`}/></svg>
        {openLists && (
          <ul className="customListsDropdown">
            {wish ? (wish.map(list => (
              <li
                key={list._id}
                onClick={(e) => {
                  addToList({
                    type: "custom",
                    wishList: list._id
                  });
                }}
              >
                {list.name}
              </li>
            ))) : null}
          </ul>
        )}
      </span>

    </div>
  </section>
)
}

export default FavoriteList;
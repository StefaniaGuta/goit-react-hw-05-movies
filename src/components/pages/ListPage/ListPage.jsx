import {getList, deleteItemFromTheList} from '../../../redux/list/listOperantions';
import { IMAGE_URL } from '../../../redux/movies/getAPI';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import url from '../../Images/icons.svg';
import {selectFirstRecentMovies} from '../../../redux/movies/selectors';
import RatingStars from '../../RatingStars/RatingStars';
import FavoriteList from '../../FavoriteList/FavoriteList';
import CreateWatchlist from '../../CreateWatchlist/CreateWatchlist'; 
import {getWishList} from '../../../redux/wishList/wishList';
import { useNavigate } from 'react-router-dom';
import './ListPage.css';

const ListPage = () => {  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [wishes, setWishes] = useState([]);
  const [selectedList, setSelectedList] = useState("favorite");
  const [open, setOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isMyListOpen, setIsMyListOpen] = useState(false);

  const toggleLibrary = () => setIsLibraryOpen(prev => !prev);

  const mov = useSelector(selectFirstRecentMovies);
  const ser = useSelector(state => state?.series.series.slice(0, 5));
  const all = mov.concat(ser);

  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(getList());
      setItems(res.payload.movies);

      const wishRes = await dispatch(getWishList());
      setWishes(wishRes.payload.wishLists || []);
    };

    fetchData();
  }, [dispatch]);

  const deleteItem = async (item) => {
    try {
      await dispatch(deleteItemFromTheList({
        movieId: item.movieId,
        mediaType: item.mediaType,
        type: item.type
      }));

      setItems(prev => prev.filter(i => i._id !== item._id));
    } catch (e) {
      console.log(e);
    }
  };

  const filteredItems = items.filter(item => {
    if (selectedList === "favorite") return item.type === "favorite";
    if (selectedList === "watched") return item.type === "watched";
    if (selectedList === "general") return !item.wishList;
    return item.wishList === selectedList;
  });

  return (
    <section className='listPageSection'>

      <div className="content">
        <h1 className='listPageTitle'>
          Welcome to <span>Watchlist</span>
        </h1>
        <div className='libraryAddWishListWrapper'>
          <div className="libraryWrapper">
            <button className="libraryBtn" onClick={toggleLibrary}>
              Your Library
            </button>

            {isLibraryOpen && (
              <div className="libraryDropdown">

                <button
                  onClick={() => setSelectedList("favorite")}
                  className={selectedList === "favorite" ? "active" : ""}
                >
                  Favorites ({items.filter(i => i.type === "favorite").length})
                </button>

                <button
                  onClick={() => setSelectedList("watched")}
                  className={selectedList === "watched" ? "active" : ""}
                >
                  Watched ({items.filter(i => i.type === "watched").length})
                </button>

                <button
                  onClick={() => setSelectedList("general")}
                  className={selectedList === "general" ? "active" : ""}
                >
                  General
                </button>

                <div
                  className="myListWrapper"
                  onMouseEnter={() => setIsMyListOpen(true)}
                  onMouseLeave={() => setIsMyListOpen(false)}
                >
                  <button>
                    My Lists ▶
                  </button>

                  {wishes.length > 0 && isMyListOpen && (
                    <ul className="myListDropdown">
                      {[...wishes].map(w => (
                        <li
                          key={w._id}
                          className={`myListItem ${selectedList === w._id ? "active" : ""}`}
                          onClick={() => {
                            setSelectedList(w._id);
                            setIsLibraryOpen(false);
                          }}
                        >
                          {w.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

              </div>
            )}
          </div>

          <button className="libraryBtn" onClick={() => setOpen(true)}>
            + Create List
          </button>
        </div>

        {open && <CreateWatchlist setOpen={setOpen} open={open} />}

        {filteredItems.length > 0 ? (
          <ul className='listPageListItems'>
            {filteredItems.map((i) => (
              <li key={i._id} className='listPageItem'>
                <button title='detele' type='button' onClick={() => deleteItem(i)} className='listPageDeleteBtn'>
                  <svg className='listPageBinClose' width="20" height="20"><use xlinkHref={`${url}#delete`}/></svg> 
                  <svg className='listPageBinOpen' width="20" height="20"><use xlinkHref={`${url}#deleteOn`}/></svg> 
                </button>
                <img
                  src={IMAGE_URL + (i.backdropPath || i.posterPatch)}
                  alt={i.title}
                />
                <h2 className='listPageMovieTitle'>{i.title}</h2>
              </li>
            ))}
          </ul>
        ) : (
          <div className='emptyState'>

            <div className='listPageTitleDescription'>
              <span className='listPageDescription'>
                No movies here yet 🎬 <br />
                Start adding movies to this list.
              </span>
            </div>

            <h2 className='listPageSubtitle'>
              Popular movies right now
            </h2>

            <ul className='listPopularItems'>
              {all.map((a, index) => (
                <li key={index} className='popularItem' onClick={() => navigate(`/movie/${a.id}`)}>

                  <FavoriteList item={a} />

                  <img
                    src={IMAGE_URL + (a.backdrop_path || a.poster_path)}
                    alt={a.title || a.name}
                  />

                  <div className='titleVoteWrapper'>
                    <h2 className='listPageMovieTitle'>
                      {a.title || a.name}
                    </h2>
                    <p className='listPageMovieAverage'>{a.vote_average.toFixed(1)}</p>
                  </div>

                  <RatingStars voteAverage={a.vote_average} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default ListPage;
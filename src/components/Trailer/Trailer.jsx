import { useEffect, useState, useRef, } from "react";
import { useDispatch } from "react-redux";
import { getTrailer } from "../../redux/movies/getAPI";
import './Trailer.css';

const Trailers = ( movieId ) => {
  const dispatch = useDispatch();
  const [trailers, setTrailers] = useState([]);
  const [open, setOpen] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const loadTrailers = async () => {
      try {
        const res = await dispatch(getTrailer({show: "tv", id: movieId.id.id}));
        
        const filtered = res.payload.results.filter(
          (v) => v.site === "YouTube" && v.type === "Teaser"
        );
        setTrailers(filtered);
      } catch (e) {
        console.error("Eroare la încărcarea trailerelor:", e);
      }
    };

    if (movieId) loadTrailers();

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch, movieId, open]);

  if (!trailers.length) return null;

const handleOpen = () => setOpen(!open)

  return (
    <div className="trailers">
       <button onClick={handleOpen} type="button">Watch Later</button>
       {open ? 
       <>
       {trailers.map((trailer) => (
         <div ref={modalRef} key={trailer.id} className="trailer-item">
           <h4>{trailer.name}</h4>
           <iframe
             width="960"
             height="509"
             src={`https://www.youtube.com/embed/${trailer.key}`}
             title={trailer.name}
             allowFullScreen
           ></iframe>
         </div>
       ))}
       </>
       : null}
        
    </div>
  );
};

export default Trailers;

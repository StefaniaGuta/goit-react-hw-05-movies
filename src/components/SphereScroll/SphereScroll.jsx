import { useRef, useEffect } from "react";
import { IMAGE_URL } from "../../redux/movies/getAPI";
import { useNavigate } from "react-router-dom";
import "./SphereScroll.css"

const SphereScroll = ({ movies }) => {
  const listRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const list = listRef.current;
      if (!list) return;

      const items = list.querySelectorAll("li");

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.left + rect.width / 2;
        const offset = (itemCenter - window.innerWidth / 2) / window.innerWidth;

        item.style.transform = `
          rotateY(${offset * 40}deg)
          scale(${1 - Math.abs(offset) * 0.3})
        `;
        item.style.opacity = `${1 - Math.abs(offset) * 0.6}`;
      });
    };

    const list = listRef.current;
    list.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => list.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateToDetails = (credit) => {
    if(credit.media_type === "tv"){
    navigate(`/serie/${credit.id}`)
    console.log(credit)
  } else if(credit.media_type === "movie") {
    navigate(`/movie/${credit.id}`)
  } else{
    navigate(`/*`)
  }
  }

  return (
    <ul ref={listRef} className="movieList">
      {movies.map((m) => (
        <li key={m.id} onClick={() => navigateToDetails(m)}>
          <img
            className="imgCover"
            src={IMAGE_URL + m.poster_path}
            alt={m.title || m.name}
          />
        </li>
      ))}
    </ul>
  );
};

export default SphereScroll;

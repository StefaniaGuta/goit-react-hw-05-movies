import { useParams } from "react-router-dom";
import { getActorDetails, getActorExternalIds, getActorCredits, getActorImages } from "../../../redux/actors/actors";
import { IMAGE_URL, formatDate } from "../../../redux/movies/getAPI";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import noImg from '../../Images/no_image.jpg';
import url from '../../Images/icons.svg';
import { useNavigate } from "react-router-dom";
import Loader from "components/Loader/Loader";
import './ActorsPage.css';

const ActorsPage =() => {
  const { actorId } = useParams();
  const dispatch = useDispatch();
  const [actor, setActor] = useState(null);
  const [socials, setSocials] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actorImages, setActorImages] = useState(null)
  const navigate = useNavigate();
  const [openJob, setOpenJob] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const detailsRes = await dispatch(getActorDetails(actorId));
        setActor(detailsRes.payload);

        const socialsRes = await dispatch(getActorExternalIds(actorId));
        setSocials(socialsRes.payload);

        const creditsRes = await dispatch(getActorCredits(actorId));
        setCredits(creditsRes.payload);

        const imagesRes = await dispatch(getActorImages(actorId))
        setActorImages(imagesRes.payload)
      } catch (err) {
        setError("Something went wrong while loading actor data.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [dispatch, actorId]);

 if (loading) {
    return <Loader/>
  }

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  const crewByJob = credits.crew.reduce((acc, item) => {
    const job = item.job;

    if (!acc[job]) {
      acc[job] = {
        job,
        movies: []
      };
    }

    if (!acc[job].movies.find(m => m.id === item.id)) {
      acc[job].movies.push({
        id: item.id,
        title: item.title || item.name,
        poster_path: item.poster_path,
        backdrop_path: item.backdrop_path,
        vote_average: item.vote_average,
        department: item.department,
        overview: item.overview
      });
    }

    return acc;
  }, {});
const groupedByJobList = Object.values(crewByJob);


const navigateToDetailsPage = (credit) => {
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
    <section className="actorsPageSection">
      <div className="aboutActorWrapper">
        <div className="socialsAccountsImageWrapper">
          <img className="socialsAccountsImage"
            src={actor?.profile_path ? IMAGE_URL + actor.profile_path : noImg}
            alt={actor?.name}
          />
        </div>
        <div>
          <h1>
            {actor?.name}
            <p className="actorDepartmentName">
              {actor?.known_for_department}
            </p>
          </h1>  
          <div className="aditionalDetailsAboutTheActor">
            <p className="detailAboutTheActor">
              <b>Born</b> {actor?.birthday ? formatDate(actor?.birthday) : "-"}
            </p>

            {actor?.deathday && (
              <p className="detailAboutTheActor">
                <b>Deathday:</b> {formatDate(actor.deathday)}
              </p>
            )}

            <p className="detailAboutTheActor">
              <b>From</b> {actor?.place_of_birth? actor?.place_of_birth : "-"}
            </p>

            <p className="detailAboutTheActor">
              <b>Gender</b>     {actor?.gender === 2 ? "Male" : "Female"}
            </p>

            <p className="detailAboutTheActor">
              <b>Popularity</b> {actor?.popularity?.toFixed(1)}
            </p>
          </div>

          <div className="socialsAccounts">
            {socials?.facebook_id && (
              <a 
                href={`https://www.facebook.com/${socials.facebook_id}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <svg width="20" height="20"><use xlinkHref={`${url}#facebook`}/></svg>
              </a>
            )}
            
            {socials?.instagram_id && (
              <a 
                href={`https://www.instagram.com/${socials.instagram_id}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <svg width="20" height="20"><use xlinkHref={`${url}#instagram`}/></svg>
              </a>
            )}
            {socials?.tiktok_id && (
              <a 
              href={`https://www.tiktok.com/@${socials.tiktok_id}`} 
              target="_blank" 
              rel="noopener noreferrer"
              >
                <svg width="20" height="20"><use xlinkHref={`${url}#tiktok`}/></svg>
              </a>
            )}
            {socials?.tvrage_id && (
              <a 
              href={`${socials.tvrage_id}`} 
              target="_blank" 
              rel="noopener noreferrer"
              >
                <svg width="20" height="20"><use xlinkHref={`${url}#TV`}/></svg>
              </a>
            )}
            {socials?.twitter_id && (
              <a 
              href={`https://x.com/${socials.twitter_id}`} 
              target="_blank" 
              rel="noopener noreferrer"
              >
                <svg width="20" height="20"><use xlinkHref={`${url}#twitter`}/></svg>
              </a>
            )}
            {socials?.wikidata_id && (
              <a 
              href={`https://www.wikidata.org/wiki/${socials.wikidata_id}`} 
              target="_blank" 
              rel="noopener noreferrer"
              >
                <svg width="20" height="20"><use xlinkHref={`${url}#wiki`}/></svg>
              </a>
            )}
            {socials?.youtube_id && (
              <a 
              href={`https://www.youtube.com/@${socials.youtube_id}`} 
              target="_blank" 
              rel="noopener noreferrer"
              >
                <svg width="20" height="20"><use xlinkHref={`${url}#youtube`}/></svg>
              </a>
            )}
          </div>
        </div>
      </div>

    
      <div className="ActorCareer">
        <div className="biography-actorImgs">
            <h2 className="ActorCareerSubsectionTitle">Biography</h2>
          <p title={actor.biography} className="actorBiography">
            {actor?.biography ? actor.biography : `We don't have a biography for ${actor.name}.`}
          </p>
          {actorImages?.profiles.length > 0 ?  
          <div className="actorImages">
            <h2>Photo Gallery</h2>
            <ul className="actorsPageImagesList">
              {actorImages?.profiles.slice(0, 12).map((p, i) => (
                <li key={i} className="actorLiImg">
                  <img className="actorsPageImage" src={IMAGE_URL + p.file_path} alt={actor.name}/>
                </li>
              ))}
            </ul>
          </div>
          : null}
        </div>

        <div className="actorCareer-Filmography">
          <h2 className="ActorCareerSubsectionTitle">Filmography</h2>
          {credits?.cast?.length ? (
            <ul className="actorActingCareer">
              {credits.cast
              .map((c, i) => (
                <li key={i} className="actorFilm" onClick={() => navigateToDetailsPage(c)}>
                  <img className="actorCareerFilmImg" src={c.poster_path || c.backdrop_path 
                    ? IMAGE_URL + c.poster_path || c.backdrop_path
                    : noImg
                  } 
                  alt={c.title || c.name}
                  />
                  <div className="actorCareerFilmDescription">
                  <p className="actorCareerFilmDescriptionVoteAverage">
                    <svg width="14" height="14"><use xlinkHref={`${url}#star`}/></svg>
                    {c.vote_average.toFixed(1)}
                  </p>
                  <p title={c.character} className="actorCareerFilmDescriptionCharacter">
                    <b>Character</b> <br></br>
                    {c.character ? c.character : "-"}
                  </p>
                    <p className="actorCareerFilmDescriptionOverview">{c.overview}</p>
                    <button className="actorCareerFilmDetailsBtn">Details</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No credits found.</p>
          )}
        </div>      
      </div>

      <div className="otherRolesWrapper">
        {credits?.crew.length > 0 ? (
          <>
          <h2 className="ActorCareerSubsectionTitle">Other Roles and Contributions</h2>
          <ul className="otherRolesList">
            {groupedByJobList.map((group, idx) => (
              <li key={idx} className="jobGroup">

                <button 
                  className="jobButton"
                  onClick={() => setOpenJob(group.job)}
                >
                  {group.job}
                </button>

                {openJob === group.job && (
                  <div className="jobModalOverlay" onClick={() => setOpenJob(null)}>
                    <div 
                      className="jobModal"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h3>{group.job} – Films</h3>

                      <button 
                        className="closeModal"
                        onClick={() => setOpenJob(null)}
                      >
                        ×
                      </button>

                      <ul className="movieListByJob">
                        {group.movies.map((m, i) => (
                          <li
                            key={i}
                            className="otherRolesLi"
                            onClick={() => navigate(`/movie/${m.id}`)}
                          >
                            <img
                              className="otherRolesImg"
                              src={
                                m.poster_path
                                  ? IMAGE_URL + m.poster_path
                                  : m.backdrop_path
                                  ? IMAGE_URL + m.backdrop_path
                                  : noImg
                              }
                              alt={m.title}
                            />
                            <div className="otherRolesFilmDescription">
                              <h4>{m.title}</h4>
                              <b>Department</b>
                              <p className="otherRolesDepartment-overview">{m.department}</p>
                              
                                <b>Storyline</b> 
                                <p className="otherRolesDepartment-overview">{m.overview}</p>
                              <p>
                                <svg width="14" height="14">
                                  <use xlinkHref={`${url}#star`}/>
                                </svg>
                                {m.vote_average.toFixed(1)}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
            </>
        ) : null}
      </div>
    </section>
  );
};

export default ActorsPage;
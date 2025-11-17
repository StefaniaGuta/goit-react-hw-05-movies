import { useParams } from "react-router-dom";
import { getActorDetails, getActorExternalIds, getActorCredits, getActorImages } from "../../../redux/actors/actors";
import { IMAGE_URL } from "../../../redux/movies/getAPI";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import noImg from '../../Images/no_image.jpg';
import url from '../../Images/icons.svg';
import { useNavigate } from "react-router-dom";
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
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

const groupedCrew = Object.values(
  credits.crew.reduce((acc, item) => {
    const filmId = item.id;

    if (!acc[filmId]) {
      acc[filmId] = {
        ...item,
        jobs: [{ department: item.department, job: item.job }]
      };
    } else {
      acc[filmId].jobs.push({
        department: item.department,
        job: item.job
      });
    }

    return acc;
  }, {})
);

//console.log(actorImages)
console.log(actor)
console.log(credits)
  return (
    <section className="actorsPageSection">
      <div className="Img-accounts-wrapper">

      <div className="socialsAccounts">
      <img className="socialsAccountsImage"
        src={actor?.profile_path ? IMAGE_URL + actor.profile_path : noImg}
        alt={actor?.name}
      />
        {socials?.facebook_id && (
          <a 
            href={`https://www.facebook.com/${socials.facebook_id}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            
            <svg width="29" height="32"><use xlinkHref={`${url}#facebook`}/></svg>
          </a>
        )}
        
        {socials?.instagram_id && (
          <a 
            href={`https://www.instagram.com/${socials.instagram_id}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <svg width="29" height="32"><use xlinkHref={`${url}#instagram`}/></svg>
          </a>
        )}
        {socials?.tiktok_id && (
          <a 
          href={`https://www.tiktok.com/@${socials.tiktok_id}`} 
          target="_blank" 
          rel="noopener noreferrer"
          >
            <svg width="29" height="32"><use xlinkHref={`${url}#tiktok`}/></svg>
          </a>
        )}
        {socials?.tvrage_id && (
          <a 
          href={`${socials.tvrage_id}`} 
          target="_blank" 
          rel="noopener noreferrer"
          >
            <svg width="29" height="32"><use xlinkHref={`${url}#TV`}/></svg>
          </a>
        )}
        {socials?.twitter_id && (
          <a 
          href={`https://x.com/${socials.twitter_id}`} 
          target="_blank" 
          rel="noopener noreferrer"
          >
            <svg width="29" height="32"><use xlinkHref={`${url}#twitter`}/></svg>
          </a>
        )}
        {socials?.wikidata_id && (
          <a 
          href={`https://www.wikidata.org/wiki/${socials.wikidata_id}`} 
          target="_blank" 
          rel="noopener noreferrer"
          >
            <svg width="29" height="32"><use xlinkHref={`${url}#wiki`}/></svg>
          </a>
        )}
        {socials?.youtube_id && (
          <a 
          href={`https://www.youtube.com/@${socials.youtube_id}`} 
          target="_blank" 
          rel="noopener noreferrer"
          >
            <svg width="29" height="32"><use xlinkHref={`${url}#youtube`}/></svg>
          </a>
        )}
      </div>
        <div className="actorNameAndBiographyWrapper">
          <h1>{actor?.name}</h1>
          <p>
            <b>Biography</b><br />
            {actor?.biography ? actor.biography : `We don't have a biography for ${actor.name}.`}
          </p>
        </div>
      </div>

      <div className="aditionalDetailsAboutTheActor">
        {actor.also_known_as.length > 0 ? (
        <span>
          <b>Also known as:</b>
          <ul>
            {actor?.also_known_as?.map((name, i) => (
              <li key={i}>{name}</li>
            ))}
          </ul>
        </span>
        ) : null}
        <p>
          <b>Birthday:</b> {actor?.birthday ? actor?.birthday : "-"}
        </p>

        {actor?.deathday && (
          <p>
            <b>Deathday:</b> {actor.deathday}
          </p>
        )}

        <p>
          <b>Place of birth:</b> {actor?.place_of_birth? actor?.place_of_birth : "-"}
        </p>

        <p>
          <b>Gender:</b> {actor?.gender === 2 ? "Male" : "Female"}
        </p>

        <p>
          <b>Department:</b> {actor?.known_for_department}
        </p>

        <p>
          <b>Popularity:</b> {actor?.popularity?.toFixed(1)}
        </p>
      </div>

    
      <div className="ActorCareer">
        <h2>Career</h2>

        <h3>Acting</h3>
        {credits?.cast?.length ? (
          <ul className="actorActingCareer">
            {credits.cast.map((c, i) => (
              <li key={i} className="actorFilm" onClick={() => navigate(`/movie/${c.id}`)}>
                <img className="actorCareerFilmImg" src={c.poster_path || c.backdrop_path 
                  ? IMAGE_URL + c.poster_path || c.backdrop_path
                  : noImg
                  } 
                  alt={c.title || c.name}
                />
                <div className="actorCareerFilmDescription">
                 <h4 className="actorCareerFilmDescriptionTitle">{c.title || c.name} </h4> 
                 <p className="actorCareerFilmDescriptionVoteAverage">
                  <svg width="14" height="14"><use xlinkHref={`${url}#star`}/></svg>
                  {c.vote_average.toFixed(1)}
                 </p>
                 <p className="actorCareerFilmDescriptionCharacter">
                  <b>Character:</b> {c.character}
                 </p>
                  <p className="actorCareerFilmDescriptionOverview">{c.overview}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No credits found.</p>
        )}
        {credits?.crew.length > 0 ? (
          <>
          <h3>Other departments</h3>
          <ul className="actorOtherDepartmentsJobs">
            {groupedCrew.map((c, i) => (
              <li className="actorOtherDepartmentsJobsFilm" key={i} onClick={() => navigate(`/movie/${c.id}`)}>
                
                <img
                  className="actorOtherDepartmentsJobsImg"
                  src={
                    c.poster_path
                    ? IMAGE_URL + c.poster_path
                    : c.backdrop_path
                    ? IMAGE_URL + c.backdrop_path
                    : noImg
                  }
                  alt={c.title || c.name}
                  />

                <div className="actorOtherDepartmentsJobsDescription">
                  <h4 className="actorOtherDepartmentsJobsTitle">
                    {c.title || c.name}
                  </h4>

                  <p className="actorOtherDepartmentsJobsDepartments">
                    <b>Departments:</b>{" "}
                    {c.jobs.map(j => j.department).join(", ")}
                  </p>

                  <p className="actorOtherDepartmentsJobsVoteAverage">
                  <svg width="14" height="14"><use xlinkHref={`${url}#star`}/></svg>
                  {c.vote_average.toFixed(1)}
                 </p>

                  <p className="actorOtherDepartmentsJobsRoles">
                    <b>Roles:</b>{" "}
                    {c.jobs.map(j => j.job).join(", ")}
                  </p>
                </div>

              </li>
            ))}
          </ul>
            </>
        ) : null}
      </div>
      {actorImages?.profiles.length > 0 ?  
      <div className="actorImages">
        <h2>Photos</h2>
        <ul className="actorsPageImagesList">
          {actorImages?.profiles.map((p, i) => (
            <li key={i}>
              <img className="actorsPageImage" src={IMAGE_URL + p.file_path} alt={actor.name}/>
            </li>
          ))}
        </ul>
      </div>
      : null}
    </section>
  );
};

export default ActorsPage;
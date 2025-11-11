import { useParams } from "react-router-dom";
import {persorDetails} from "../../../redux/movies/getAPI";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const ActorsPage =() => {
  const { actorId } = useParams();
  const dispatch = useDispatch()
useEffect(() => {
  const getDetails = async () => {
      try {
          const res = await dispatch(persorDetails(actorId));
          console.log(res.payload)
  } catch(e){
      console.log(e)
  }
  }
getDetails();
})

  console.log("ActorsPage", actorId)
  return (
      <div>actrs page</div>
  )
}

export default ActorsPage;
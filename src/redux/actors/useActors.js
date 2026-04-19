import { useState, useEffect } from "react";
import {popularActors} from './actors';
import { useDispatch } from "react-redux";

export const useActors = () => {
  const dispatch = useDispatch();
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const resActor = await dispatch(popularActors());
        setActors(resActor.payload);
      } catch (err) {
        console.log(err)
      }
    };

    fetchActors();
  }, [dispatch]);

  return actors;
};
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

export const usePaginatedFetch = (fetchAction, category = "", deps = []) => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAction(page, category));
        setData(response.payload.results || []);
        setTotalPages(response.payload.total_pages || 1);
      } catch (error) {
        console.error("Error fetching paginated data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page, ...deps]);

  return { data, totalPages, page, setPage };
};

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";



export const usePaginatedFetch = (fetchAction, category = "", param = null) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (param) {
          response = await dispatch(fetchAction({ id: param, page, category }));
        } else {
          response = await dispatch(fetchAction({ page, category }));
        }

        if (response?.payload) {
          setData(response.payload.results || []);
          setTotalPages(response.payload.total_pages || 1);
        }
      } catch (error) {
        console.error("Error fetching paginated data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, fetchAction, page, category, param, ]);

  return { data, totalPages, page, setPage };
};

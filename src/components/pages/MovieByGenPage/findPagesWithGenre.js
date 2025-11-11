import { getAll } from "../../../redux/movies/getAPI";

const findPagesWithGenre = async (
  dispatch,
  genId,
  maxPagesToCheck = 500,
  batchSize = 5,
) => {
  const genreIdNumber = parseInt(genId);
  const foundPages = [];

  for (let start = 1; start <= maxPagesToCheck; start += batchSize) {
    const batch = Array.from({ length: batchSize }, (_, i) => start + i)
      .filter(page => page <= maxPagesToCheck);

    const responses = await Promise.allSettled(
      batch.map(page => dispatch(getAll(page)))
    );

    for (const [index, result] of responses.entries()) {
      if (result.status === "fulfilled") {
        const movies = result.value.payload?.results || [];

        const hasGenre = movies.some(
          m => Array.isArray(m.genre_ids) && m.genre_ids.includes(genreIdNumber)
        );

        if (hasGenre) {
          foundPages.push(batch[index]);
        }
      }
    }

    if (start + batchSize > maxPagesToCheck) break;
  }

  return foundPages;
};


export default findPagesWithGenre;
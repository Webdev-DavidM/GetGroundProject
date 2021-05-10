import axios from 'axios';

export const requestBooks = ({ page, search }) => {
  return async (dispatch) => {
    dispatch({ type: 'BOOKS_REQUESTED' });
    try {
      const response = await axios.post(
        `http://nyx.vima.ekt.gr:3000/api/books`,
        {
          page: page,
          itemsPerPage: 6,
          filters: [
            {
              type: 'all',
              values: [`${search}`],
            },
          ],
        }
      );
      if (page) {
        window.history.pushState({}, '', `?page=${page}`);
      }
      if (search) {
        window.history.pushState({}, '', `/?search=${search}&page=${page}`);
      }

      if (response.status === 200) {
        dispatch({ type: 'BOOKS RECEIVED' });
        dispatch({
          type: 'ADD_BOOKS_LIST_TO_STORE',
          books: response.data.books,
          totalBooks: response.data.count,
          page: parseInt(page),
          search: search,
        });
      }
    } catch (err) {
      dispatch({
        type: 'BOOKS_REQUEST_FAILED',
        error: 'Sorry, something went wrong, please refresh the page',
      });
    }
  };
};

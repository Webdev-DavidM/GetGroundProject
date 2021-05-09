import axios from 'axios';

export const requestBooks = () => {
  return async (dispatch) => {
    dispatch({ type: 'BOOKS_REQUESTED' });
    try {
      let response = await axios.post(`http://nyx.vima.ekt.gr:3000/api/books`, {
        page: '1',
        itemsPerPage: 6,
      });
      window.history.pushState({}, '', `/?page=1`);
      if (response.status === 200) {
        dispatch({ type: 'BOOKS RECEIVED' });
        dispatch({
          type: 'ADD_BOOKS_LIST_TO_STORE',
          books: response.data.books,
          totalBooks: response.data.count,
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

export const displayPage = (page) => {
  return async (dispatch) => {
    dispatch({ type: 'BOOKS_REQUESTED' });
    try {
      let response = await axios.post(`http://nyx.vima.ekt.gr:3000/api/books`, {
        page: page,
        itemsPerPage: 6,
      });
      // window.history.pushState({}, '', ``);
      window.history.pushState({}, '', `/?page=${page}`);
      if (response.status === 200) {
        dispatch({ type: 'BOOKS RECEIVED' });
        dispatch({
          type: 'CHANGE_PAGE',
          books: response.data.books,
          totalBooks: response.data.count,
          currentPage: page,
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

export const search = (searchData) => {
  return async (dispatch) => {
    dispatch({ type: 'BOOKS_REQUESTED' });
    try {
      let response = await axios.post(`http://nyx.vima.ekt.gr:3000/api/books`, {
        filters: [
          {
            type: 'all',
            values: [`${searchData}`],
          },
        ],
      });
      window.history.pushState({}, '', `/?search=${searchData}`);
      if (response.status === 200) {
        dispatch({ type: 'BOOKS RECEIVED' });
        dispatch({
          type: 'SEARCH_RESULT',
          searchResult: response.data.books,
          totalBooks: response.data.count,
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

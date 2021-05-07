const initialState = {
  booksToDisplay: [],
  currentPage: 1,
  loading: false,
  error: null,
  count: 0,
  totalBooks: 0,
};

function booksReducer(state = initialState, action) {
  switch (action.type) {
    case 'BOOKS_REQUESTED':
      return { ...state, loading: true };
    case 'ADD_BOOKS_LIST_TO_STORE':
      return {
        ...state,
        error: null,
        totalBooks: action.totalBooks,
        booksToDisplay: action.books,
        loading: false,
      };
    case 'BOOKS_RECEIVED':
      return { ...state, loading: false };
    case 'BOOKS_REQUEST_FAILED':
      return { ...state, error: action.error, loading: false };
    case 'CHANGE_PAGE':
      return {
        ...state,
        totalBooks: action.totalBooks,
        booksToDisplay: action.books,
        currentPage: action.currentPage,
        loading: false,
      };
    case 'SEARCH_RESULT':
      return {
        ...state,
        booksToDisplay: action.searchResult,
        loading: false,
      };
    default:
      return state;
  }
}

export default booksReducer;

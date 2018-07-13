import {
  GET_WIKI_PAGES,
  GET_WIKI_PAGES_SUCCESS,
  GET_WIKI_PAGES_FAILURE,
  GET_SUGGESTIONS,
  GET_SUGGESTIONS_SUCCESS,
  GET_SUGGESTIONS_FAILURE,
  CLEAR_SEARCH_RESULTS
} from './actions';

const initialSearch = {
  isFetching: 0,
  error: false,
  errorMessage: '',
  wikiPages: [],
  isPageReceived: false,
  suggestions: [],
  isSuggestionsReceived: false
};

export const searchReducer = (state = initialSearch, action) => {
  switch (action.type) {
    case GET_WIKI_PAGES:
      return {
        ...state,
        isFetching: state.isFetching + 1
      };

    case GET_WIKI_PAGES_SUCCESS:
      return {
        ...state,
        isFetching: state.isFetching - 1,
        wikiPages: action.pages,
        isPageReceived: true
      };

    case GET_WIKI_PAGES_FAILURE:
      return {
        ...state,
        isFetching: state.isFetching - 1,
        error: true
      };

      case GET_SUGGESTIONS:
      return {
        ...state,
        isFetching: state.isFetching + 1
      };

    case GET_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        isFetching: state.isFetching - 1,
        suggestions: action.suggestions,
        isSuggestionsReceived: true
      };

    case GET_SUGGESTIONS_FAILURE:
      return {
        ...state,
        isFetching: state.isFetching - 1,
        error: true
      };

    case CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        wikiPages: [],
        suggestions: [],
        isPageReceived: false,
        isSuggestionsReceived: false
      }

    default:
      return state;
  }
};

export default searchReducer;

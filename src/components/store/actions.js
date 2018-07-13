
import axios from 'axios';
import { proccessWikiPagesResponse, proccessSuggestionsResponse } from './utils/services';
import {
  _GET_WIKI_PAGES_URL_,
  _SUGGESTIONS_URL_
} from '../store/utils/apiURL';

export const GET_WIKI_PAGES = 'GET_WIKI_PAGES';
export const GET_WIKI_PAGES_SUCCESS = 'GET_WIKI_PAGES_SUCCESS';
export const GET_WIKI_PAGES_FAILURE = 'GET_WIKI_PAGES_FAILURE';

export const GET_SUGGESTIONS = 'GET_SUGGESTIONS';
export const GET_SUGGESTIONS_SUCCESS = 'GET_SUGGESTIONS_SUCCESS';
export const GET_SUGGESTIONS_FAILURE = 'GET_SUGGESTIONS_FAILURE';

export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';


export const getWikiPages = () => ({
  type: GET_WIKI_PAGES
});

export const getWikiPagesSuccess = (pages) => ({
  type: GET_WIKI_PAGES_SUCCESS,
  pages
});

export const getWikiPagesFailure = () => ({
  type: GET_WIKI_PAGES_FAILURE
});

export const fetchWikiPages = (query) =>
  (dispatch) =>
    dispatch(
      fetchData(
        `${_GET_WIKI_PAGES_URL_}${query}`,
        {
          method: 'GET'
        },
        () => getWikiPages(),
        resp => (resp.error ? getWikiPagesFailure() : getWikiPagesSuccess(proccessWikiPagesResponse(resp)))
      )
    );



  export const getSuggestions = () => ({
    type: GET_SUGGESTIONS
  });
  
  export const getSuggestionsSuccess = (suggestions) => ({
    type: GET_SUGGESTIONS_SUCCESS,
    suggestions
  });
  
  export const getSuggestionsFailure = () => ({
    type: GET_SUGGESTIONS_FAILURE
  });
  
  export const fetchSuggestions = (query) =>
    (dispatch) =>
      dispatch(
        fetchData(
          `${_SUGGESTIONS_URL_}${query}`,
          {
            method: 'GET'
          },
          () => getSuggestions(),
          resp => (resp.error ? getSuggestionsFailure() : getSuggestionsSuccess(proccessSuggestionsResponse(resp)))
        )
      );
  
export const clearSearchResults = () => ({
  type: CLEAR_SEARCH_RESULTS
});


export const fetchData = (url, request, requestAction, receiveAction) =>
  (dispatch, getState) => {
    dispatch(requestAction());
    return axios(url, request)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.data;
        }
        const err = new Error(`${response.statusText}`);
        err.response = response;
        throw err;
      })
      .then(json =>
        dispatch(receiveAction(json))
      );
  };

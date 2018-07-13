import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SearchControl from './SearchControl';
import SearchResultsList from './SearchResultsList';
import SearchSuggestionsList from './SearchSuggestionsList';


import {
  fetchWikiPages,
  fetchSuggestions,
  clearSearchResults
} from '../store/actions';

class _Search extends Component {
  static propTypes = {
    isFetching: PropTypes.number,
    fetchAllMovies: PropTypes.func,
    getSuggestions: PropTypes.func,
    clearSearchResults: PropTypes.func
  };

  static defaultProps = {
    isFetching: false,
    fetchAllMovies: null
  };

  constructor(props) {
    super(props);

    this.state = {
      query: ''
    }
  }

  handleInputChange = (value) => {
    this.setState({
      ...this.state,
      query: value
    })
  }

  handleInputClear = (vlue) => {
    this.props.clearSearchResults();
    this.setState({
      ...this.state,
      query: ''
    })
  }

  handleKeyPress = (e) => {
    if(e.charCode === 13) {
        this.props.fetchWikiPages(this.state.query)
        .then(() => this.props.fetchSuggestions(this.state.query));
    }
  }

  handleSuggestionSelect = (e) => {
    const newQuery = e.target.firstChild.nodeValue;
    this.setState({
      ...this.state,
      query: newQuery
    })
    this.props.fetchWikiPages(newQuery)
      .then(() => this.props.fetchSuggestions(newQuery));
  }

  render() {
    const {
      wikiPages,
      suggestions
    } = this.props;

    return (
      <div className='search'>
        <SearchControl
          handleInputChange={this.handleInputChange}
          handleKeyPress={this.handleKeyPress}
          handleInputClear={this.handleInputClear}
          value={this.state.query}
        />
        {
          this.props.isSuggestionsReceived
          ?
            <SearchSuggestionsList
              suggestions={suggestions}
              onSuggestionSelect={this.handleSuggestionSelect}
          />
          :
            null
        }
        {
          this.props.isPageReceived
          ?
            <SearchResultsList
              wikiPages={wikiPages}
            />
          :
            null
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasError: state.error,
  isFetching: state.isFetching,
  wikiPages: state.wikiPages,
  suggestions: state.suggestions,
  isPageReceived: state.isPageReceived,
  isSuggestionsReceived: state.isSuggestionsReceived
});

const mapDispatchToProps = dispatch => ({
    fetchWikiPages: (query) => dispatch(fetchWikiPages(query)),
    fetchSuggestions: (query) => dispatch(fetchSuggestions(query)),
    clearSearchResults: (query) => dispatch(clearSearchResults())
});

const Search = connect(mapStateToProps, mapDispatchToProps)(_Search);

export default Search;



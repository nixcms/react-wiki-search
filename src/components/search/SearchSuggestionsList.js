import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SearchSuggestionsList extends Component {
    static propTypes = {
        suggestions: PropTypes.arrayOf(PropTypes.string).isRequired
    }

    handleSuggestionSelect = (e) => {
        this.props.onSuggestionSelect(e);
    }

    render() {
        return (
            <ul className='search-suggestions'>
                {
                    this.props.suggestions.length !== 0
                    ?
                        this.props.suggestions.map(sg => {
                            return(
                                <li className='search-suggestions__item' key={sg} onClick={this.handleSuggestionSelect}>
                                    { sg }
                                </li>
                            )
                        })
                    : null
                }
            </ul>
        )
    }
}
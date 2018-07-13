import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { _WIKI_PAGE_URL_ } from '../store/utils/apiURL';

export default class SearchResultsList extends Component {
    static propTypes = {
        wikiPages: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            desc: PropTypes.string.isRequired,
        })).isRequired
    }
    render() {
        return (
            <ul className='search-result'>
                {
                    this.props.wikiPages.length !== 0
                    ?
                        this.props.wikiPages.map(page => {
                            return(
                                <li className='search-result__item card' key={page.id}>
                                    <a href={`${_WIKI_PAGE_URL_}${page.id}`} target='_blank' rel='noopener noreferrer'>
                                        <h3  className='card__title'>{page.title}</h3>
                                        <div className='card__description'>{page.desc}</div>
                                    </a>
                                </li>
                            )
                        })
                    : <div className='search-result__status'> No results for your query, try another</div>
                }
            </ul>
        )
    }
}
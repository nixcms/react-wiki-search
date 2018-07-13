import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { _RANDOM_WIKI_PAGE_URL_ } from '../store/utils/apiURL';

export default class SearchControl extends Component {
    static propTypes = {
        value: PropTypes.string.isRequired,
        handleInputChange: PropTypes.func.isRequired,
        handleKeyPress: PropTypes.func.isRequired,
        handleInputClear: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        }
    }

    handleInputOpen = () => {
        if (this.state.isOpen) return;

        this.setState({
            ...this.state,
            isOpen: true
        })
    }

    handleInputClear = () => {
        this.props.handleInputClear();
        this.setState({
            ...this.state,
            isOpen: false
        })
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.props.handleInputChange(value);
    }

    handleKeyPress = (e) => {
        this.props.handleKeyPress(e);
    }

    render() {
        return (
            <div
                className='search-control'
            >
                <h2 className='search-control__title'>
                    <a href={`${_RANDOM_WIKI_PAGE_URL_}`} target='_blank'>Click here for a random article</a>
                </h2>
                <div
                    className={`search-control__input search-control__input--${this.state.isOpen ? 'open' : 'close'}`}
                    onClick={this.handleInputOpen}
                    >
                    <input
                        type='search'
                        value={this.props.value}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                    {
                        this.state.isOpen &&
                        <span  className='search-control__clear'
                            onClick={this.handleInputClear}
                        ></span>
                    }
                </div>
                {
                    !this.state.isOpen && <div className='search-control__instructions'>Click icon to search</div>
                }
            </div>
        )
    }
}
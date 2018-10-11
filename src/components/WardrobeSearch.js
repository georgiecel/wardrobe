import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class WardrobeSearch extends Component {

    // const query = event.target.value;

    // searchWardrobe(query) {
    //     // console.log(query.target.value);
    // }

    componentDidMount() {
        this.setState({
            term: query.target.value
        })
    }

    render() {
        return (
            <form className="c-form">
                <label htmlFor="search">Search wardrobe</label>
                <input
                    className="c-input"
                    id="search"
                    onKeyUp={this.props.searchByName.bind(this)}
                    type="search"
                />
            </form>
        )
    }
}

export default WardrobeSearch;
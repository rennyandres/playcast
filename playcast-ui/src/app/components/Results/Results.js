// Libraries
import React, { Component } from 'react';
import axios                from 'axios';
import queryString          from 'query-string';

// Components
import Loading             from '../Loading/Loading.js';
import Navbar              from '../Navbar/Navbar.js';
import SearchResultPodcast from '../SearchResultPodcast/SearchResultPodcast.js';

// Styles
import localStyles from './Results.css';
import grid        from '../../grid_system/grid.css';


class SearchResults extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            searchTerm: queryString.parse(this.props.location.search).term,
            data: null
        }

        this.fetchData = () => {
            const newSearchTerm = queryString.parse(this.props.location.search).term;

            axios.get( window.location.origin + '/api/podcast/search?term='
            + newSearchTerm).then((res => {
                this.setState({
                    searchTerm: newSearchTerm,
                    data: res.data
                });
            }));
        }
    }

    componentDidMount() {
        this.fetchData();
    }
    
    componentDidUpdate() {
        if(queryString.parse(this.props.location.search).term !== this.state.searchTerm) {
            this.fetchData();
        }
    }    

    render() {
        if(this.props.redirect.active) {
            this.props.redirectTo({
                active: false,
                direction: false
            });
            this.props.history.push(this.props.redirect.direction);
        }
        if(this.state.data) {
            return (
                <div>
                    <Navbar {...this.props} />
                    <ul styleName='localStyles.container'>
                        <h3 styleName='localStyles.resultTitle'>{ this.state.data.resultCount } results</h3>
                        {
                            this.state.data.results.map((result, index) => {
                                return(
                                    <SearchResultPodcast {...result} key={ index }/>
                                )
                            })
                        }
                    </ul>
                    
                </div>
            );
        } else {
            return (
                <div>
                    <Navbar />
                    <Loading />
                </div>
            );
        }

    }
}

export default SearchResults;
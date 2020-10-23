// Libraries
import React, { Component } from 'react';
import { Link }             from 'react-router-dom';

// Styles
import localStyles from "./SearchResultPodcast.css";
import grid from '../../grid_system/grid.css';


class SearchResultPodcast extends Component {
  // React methods
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return(
      <li key={ this.props.id } styleName='localStyles.resultBox'>
          <div styleName='grid.col grid.size-4of15'>
              <img src={ this.props.coverImage } styleName='localStyles.cover'/>
          </div>
          <div styleName='grid.col grid.size-11of15'>
              <h4 styleName='localStyles.low-op'>{ this.props.author }</h4>
              <Link to={ '/podcast/' + this.props.id } styleName='localStyles.title'>{ this.props.title }</Link>
              
              <h4 styleName='localStyles.cust-mrg'>{ this.props.episodeCount } episodes</h4>
              <h4 styleName='localStyles.low-op'>Latest release: { this.props.latestRelease.date }</h4>  
          </div>
      </li>
    );
  }
}

export default SearchResultPodcast;
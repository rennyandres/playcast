// Libraries 
import React, { Component } from 'react';

// Components
import Episode from '../Episode/Episode.js';

// icons
import Icons from '../Icons/Icons.js';

// Styles
import localStyles from './RecommendedPodcast.css';
import grid        from '../../grid_system/grid.css';


class RecommendedPodcast extends Component {
    // React methods
    constructor() {
        super();
        this.state = {
            player: {
                currentlyPlaying: false,
                episodeSrc: false
            }           
        }
    }

    render() {        
        return (
            <div styleName='localStyles.componentContainer'>
                <div styleName='grid.col grid.size-1of3'>
                    {/*<img src={ this.state.episode.coverImage } styleName='localStyles.cover2x'/>*/}                     
                    <h1 styleName='localStyles.title'>{ this.props.podcastTitle }</h1>
                    <p styleName='localStyles.podDescription'>{ this.props.podcastDescription }</p>                 
                </div>
                <div styleName='grid.col grid.size-2of3'>
                    <Episode 
                        playEpisode={this.playEpisodeInt.bind(this)}
                        shareEpisode={this.props.shareEpisode.bind(this)}
                        //data 
                        {...this.props}
                        podcastTitle={this.props.podcastTitle}
                        podcastID={this.props.podcastID}
                    />
                </div>
            </div>
        );
    }
    playEpisodeInt = (argSrc, argCover, argTitle, argPodcast, argAt, argPodcastUrl) => {
        // updating the url query for sharing
        //this.props.history.replace({ search: '?playing=' + base64url.encode(argTitle) });
        this.props.playEpisode(argSrc, argCover, argTitle, argPodcast, argAt, argPodcastUrl);
    }    
}

export default RecommendedPodcast;
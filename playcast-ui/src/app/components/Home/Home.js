// Libraries
import React, { Component } from 'react';
import base64url            from 'base64-url';

// Components
import Navbar from '../Navbar/Navbar.js';
import RecommendedPodcast from '../RecommendedPodcast/RecommendedPodcast.js'
import Data from './seed.js';

// Styles
import localStyles from './Home.css';
import grid        from '../../grid_system/grid.css';


class Home extends Component {
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
        if(this.props.redirect.active) {
            this.setState({
              active: false
            });     
            this.props.history.push(this.props.redirect.direction);
        }        
        return (
            <div>
                <div styleName='localStyles.head'>
                    <Navbar {...this.props} />
                    <div styleName='localStyles.titleContainer'>
                        <h1>Best</h1><br/>
                        <h1>Podcast</h1><br/>
                        <h1>Right now</h1><br/>
                    </div>
                </div>
                {
                    Data.map((episode, index) => {
                        return(
                            <RecommendedPodcast 
                                playEpisode={this.playEpisodeInt.bind(this)}
                                shareEpisode={this.props.shareEpisode.bind(this)}
                                {...episode}
                                key={ index } 
                            />
                        );
                    })
                }
            </div>

        );
    }
    playEpisodeInt = (argSrc, argCover, argTitle, argPodcast, argAt, argPodcastUrl) => {
        // updating the url query for sharing
        this.props.history.replace({ search: '?playing=' + base64url.encode(argTitle) });
        this.props.playEpisode(argSrc, argCover, argTitle, argPodcast, argAt, argPodcastUrl);
    } 
}

export default Home;
// Libraries 
import React, { Component } from 'react'; 
import axios                from 'axios';
import queryString          from 'query-string';
import base64url            from 'base64-url';

// Components
import Loading     from '../Loading/Loading.js';
import Navbar      from '../Navbar/Navbar.js';
import Episode     from '../Episode/Episode.js';

// icons
import Icons from '../Icons/Icons.js';
const IconStyles = {
    btnIcon: {
      display: 'inline-block',
      margin: '0 8px 0 0',
      cursor: 'pointer'
    }
};

// Styles
import localStyles from './Podcast.css';
import grid        from '../../grid_system/grid.css';


class Podcast extends Component {
    // React methods
    constructor(props) {
        super(props);
        this.state = {
            data: null           
        }
    }

    UNSAFE_componentWillMount() {
        this.fetchData();
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
                    <div styleName='localStyles.componentContainer'>
                        <div styleName='grid.col grid.size-1of3'>
                            <img src={ this.state.data.coverImage } styleName='localStyles.cover2x'/>
                            
                            <h3 styleName='localStyles.author'>{ this.state.data.author }</h3>
                            <h1 styleName='localStyles.title'>{ this.state.data.title }</h1>
                            {/*<a href={ this.state.data.link }>Site</a>*/}

                            <div styleName='localStyles.btn'
                                 onClick={() => this.props.shareEpisode(this.state.data.title, false, false, false, this.state.data.podcastID)}
                            >
                                <Icons icon='share' width='16' style={IconStyles.btnIcon}/>
                                <h5>SHARE PODCAST</h5>
                            </div>

                            <p styleName="localStyles.podDescription">{ this.state.data.description }</p>                 
                        </div>
                        <div styleName='grid.col grid.size-2of3'>
                            <h2 styleName='localStyles.episodes'>{ this.state.data.episodeCount + ' episodes' }</h2>
                            <ul>
                            {
                                this.state.data.episodes.map((episode, index) => {
                                    return (
                                        <Episode playEpisode={this.playEpisodeInt.bind(this)}
                                                 shareEpisode={this.props.shareEpisode.bind(this)} 
                                                 {...episode}
                                                 podcastTitle={this.state.data.title}
                                                 podcastID={this.state.data.podcastID} 
                                                 key={ index } 
                                        />
                                    );
                                })
                            }
                            </ul>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <Navbar />
                    <Loading />
                </div>
            )
        }
    }
    
    // Component methods
    fetchData = () => {
        axios.get( window.location.origin + '/api/podcast/' 
                  + this.props.match.params.id)
            .then(res => {
                this.setState({
                    data: res.data
                });
                this.findAndPlay();                
            }
        );        
    }

    playEpisodeInt = (argSrc, argCover, argTitle, argPodcast, argAt, argPodcastUrl) => {
        // updating the url query for sharing
        this.props.history.replace({ search: '?playing=' + base64url.encode(argTitle) });
        this.props.playEpisode(argSrc, argCover, argTitle, argPodcast, argAt, argPodcastUrl);
    }

    findAndPlay = () => {
        let whatToPlay = {
            title: queryString.parse(this.props.location.search).playing || false,
            at: Number(queryString.parse(this.props.location.search).at) || 0
        };

        if(whatToPlay.title) {
            let titleToPlay = base64url.decode(whatToPlay.title);
            let episodeSearchResult = 
                this.state.data.episodes.find(episode => {
                    return episode.title === titleToPlay;
                })
            ;

            if(episodeSearchResult) {
                this.props.playEpisode(episodeSearchResult.file, episodeSearchResult.coverImage, episodeSearchResult.title, this.state.data.title, whatToPlay.at, this.state.data.podcastID);
            }
            else {
                console.info('We couldn\'t find "' + whatToPlay.title + '"');
            }
        }        
    }  
}

export default Podcast;
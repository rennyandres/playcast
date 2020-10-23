// Libraries 
import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Components
import Home           from './components/Home/Home.js';
import SearchResults  from './components/Results/Results.js';
import Podcast        from './components/Podcast/Podcast.js';
import Player      from './components/Player/Player.js';
import ShareWindow from './components/ShareWindow/ShareWindow.js';


class App extends Component {
    // React methods
    constructor(props) {
        super(props);
        this.state = {
            play: {
                active: false,
                src: false,
                cover: false,
                title: false,
                podcast: false,
                at: false
            },
            share: {
                active: false,
                title: false,
                podcast: false,
                at: 0
            },
            redirect: {
                active: false,
                to: false
            }
        }
    }

    render() {
        return (
            <div>
                <ShareWindow share={ this.state.share }
                             podcastID={ this.state.share.podcastID }
                             closeWindow={ this.closeWindow.bind(this) }
                />                
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" render={
                            (props) => <Home {...props}
                                                      redirect={this.state.redirect}
                                                      playEpisode={this.playEpisode.bind(this)}
                                                      shareEpisode={this.shareEpisode.bind(this)}                                                      
                                                      redirectTo={ this.redirectTo.bind(this) }/>
                        }/>
                        <Route path="/podcast/search" render={
                            (props) => <SearchResults {...props}
                                                      redirect={this.state.redirect}
                                                      redirectTo={ this.redirectTo.bind(this) }/>
                        }/>
                        <Route path="/podcast/:id"    render={
                            (props) => <Podcast {...props}
                                                redirect={this.state.redirect} 
                                                playEpisode={this.playEpisode.bind(this)}
                                                shareEpisode={this.shareEpisode.bind(this)}
                                                redirectTo={ this.redirectTo.bind(this) } 
                                       />
                        }/>
                    </Switch>
                </BrowserRouter>
                <Player play={ this.state.play } shareEpisode={ this.shareEpisode.bind(this) } redirectTo={ this.redirectTo.bind(this) }/>
            </div>
        );
    }
    
    // Component methods
    playEpisode = (argSrc, argCover, argTitle, argPodcast, argAt, argPodcastID) => {
        this.setState({
            play: {
                active: true,
                src: argSrc,
                cover: argCover,
                title: argTitle,
                podcast: argPodcast,
                podcastID: argPodcastID,
                at: argAt || false
            }            
        });
    }

    shareEpisode = (argsPodcast, argTitle, argAt, argsPodcastUrl, argsPodcastID) => {
            this.setState({
                share: {
                  active: true,
                  title: argTitle,
                  podcast: argsPodcast,
                  podcastUrl: argsPodcastUrl,
                  at: argAt || 0,
                  podcastID: argsPodcastID
                }
            });
    }

    closeWindow = () => {
        this.setState({ share: { active: false } });
    }

    redirectTo = (argsObject) => {
        this.setState({ redirect: argsObject });
    }
}

// the first argument is the class to render to 
// the second argument is the html container where 
// is going to be render on the html index you are serving 
render(<App/>, window.document.getElementById('app'));
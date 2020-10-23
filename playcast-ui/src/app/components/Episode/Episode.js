// Libraries
import React, { Component } from 'react';

// Components
import ExpandableText from '../ExpandableText/ExpandableText.js';

// icons
import Icons from '../Icons/Icons.js';
const IconStyles = {
  playIcon: {
    fill: 'white',
    display: 'block',
    margin: '15px auto 0 18px'
  },
  btnIcon: {
    fill: 'black'
  }
};

// Styles
import localStyles from "./Episode.css";
import grid from '../../grid_system/grid.css';


class Episode extends Component {
  // React methods
  constructor(props) {
    super(props);
    this.state = {
      player: {
          currentlyPlaying: false,
          episodeSrc: false,
          cover: false
      }
    }
  }

  render() {
    return(
      <li styleName='localStyles.episodeBox'
          ref={(episodeBoxDOM) => { this.episodeBoxDOM = episodeBoxDOM }} 
          onMouseEnter={() => this.togglePlayButton(true)}
          onMouseLeave={() => this.togglePlayButton(false)}
      >
          <div>
              <ul>
                  <li styleName='grid.col grid.size-1of10 localStyles.relative'>
                      <img src={ this.props.coverImage } styleName='localStyles.cover1x'
                           ref={(coverImageDOM) => { this.coverImageDOM = coverImageDOM }} 
                      />
                      
                      <div styleName='localStyles.playButton'
                           onClick={() => this.props.playEpisode(this.props.file, this.props.coverImage, this.props.title, this.props.podcastTitle, 0, this.props.podcastID)}
                           ref={(playButtonDOM) => { this.playButtonDOM = playButtonDOM }}
                           >
                          
                          <Icons icon='play' width='14' style={IconStyles.playIcon}/>                                               
                      </div>
                  </li>
                  <li styleName='grid.col grid.size-9of10'>
                      <ul>
                        <li styleName='grid.col grid.size-5of10'>
                          <h4 styleName='localStyles.low-op'>{ this.props.released } | { this.props.podcastTitle }</h4>
                        </li>
                        <li styleName='grid.col grid.size-5of10'>
                          <div styleName='localStyles.sml-btn'
                               onClick={() => this.props.shareEpisode(this.props.podcastTitle, this.props.title, false, false, this.props.podcastID)}

                          >
                            <Icons icon='share' width='16' style={IconStyles.btnIcon}/>
                            <h5>SHARE EPISODE</h5>
                          </div>
                        </li>
                      </ul>
                      <h3 styleName='localStyles.title_small'>{ this.props.title }</h3>
                      <h4>{ this.props.duration }</h4>
                  </li>
              </ul>
          </div>
          <ExpandableText description={ this.props.description || '' }/>
      </li>    
    );
  }

  // Component methods
  togglePlayButton = (show) => {
    if(show) {
      this.coverImageDOM.style['opacity'] = '.2';
      this.playButtonDOM.style['opacity'] = '1';
      this.episodeBoxDOM.style['background'] = '#F8F8F8';
    }
    else {
      this.coverImageDOM.style['opacity'] = '1';
      this.playButtonDOM.style['opacity'] = '0';
      this.episodeBoxDOM.style['background'] = 'white';
    }
  }
}

export default Episode;
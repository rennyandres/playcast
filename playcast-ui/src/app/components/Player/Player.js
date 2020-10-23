// Libraries  
import React, { Component } from 'react';
import { Router, Link }             from 'react-router-dom';

// Icons
import Icons from '../Icons/Icons.js';
const IconStyles = {
  btnIcon: {
    display: 'block',
    margin: '20px auto 26px auto',
    fill: 'white',
    cursor: 'pointer'
  }
};

// Styles
import localStyles from './Player.css';
import grid        from '../../grid_system/grid.css';


class Player extends Component {
  // React methods
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      playing: true,
      eventToBeAdded: true,
      currentTimeRun: '00:00',
      durationTime: '00:00'
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      active: nextProps.play.active,
      eventToBeAdded: true
    });

    if(this.props.play.title !== nextProps.play.title) {
      this.setState({ playing: true })
    }  
  }

  componentDidUpdate() {
    if(this.audio && this.state.eventToBeAdded) {     
      // reset some player values
      this.runTimeBar.style['width'] = '0%';
      this.setState({
        currentTimeRun: '00:00',
        durationTime: '00:00'
      });

      // start from where the url says
      if(this.props.play.at) {
        this.audio.currentTime = this.props.play.at;
      }

      // event listener
      this.audio.addEventListener('timeupdate', () => {
        // time update
        this.setState({ 
          currentTimeRun: this.secondsToTimeFormat(this.audio.currentTime),
          durationTime: this.secondsToTimeFormat(this.audio.duration)
        });
        // time bar
        this.runTimeBar.style['width'] = ((this.audio.currentTime / this.audio.duration) * 100) + '%';
      });

      this.setState({ eventToBeAdded: false });     
    }
  }

  render() {
    if(this.state.active) {
      return(
        <div styleName='localStyles.container'>
          <ul>
            
            <li styleName='grid.col grid.size-1of15 localStyles.coverHolder'>
              <div onClick={() => this.props.redirectTo({
                active: true,
                direction: '/podcast/' + this.props.play.podcastID
              })}>
                <img src={ this.props.play.cover } styleName='localStyles.cover'/>
              </div>
            </li>
            
            <li onClick={() => this.playOrPause()} styleName='grid.col grid.size-1of15 localStyles.iconBg'>
              <Icons 
                     icon={ this.state.playing ? 'pause' : 'play' }
                     width='18' 
                     style={IconStyles.btnIcon}
              />
            </li>

            <li styleName='grid.col grid.size-11of15'>
              <iframe src='../silence.mp3' allow='autoplay' styleName='localStyles.iframeForChromeFix'>
                <audio 
                  src={ this.props.play.src } 
                  ref={(audio) => {this.audio = audio}}
                  autoPlay
                />
              </iframe>

              <h4 styleName='localStyles.episodeTitle'>{ this.props.play.title }</h4>
              <div 
                styleName='localStyles.timeline'
                ref={(timeline) => { this.timeline = timeline }}
                onClick={ this.mouseMove }
              >
                <div
                  styleName='localStyles.runTime'
                  ref={(runTimeBar) => { this.runTimeBar = runTimeBar }}
                ></div>
              </div>

              <div>
                <h4 styleName='localStyles.currentTimeRun'>{ this.state.currentTimeRun }</h4>
                <h4 styleName='localStyles.durationTime'>{ this.state.durationTime }</h4>
              </div>
            </li>

            <li onClick={() => this.shareButton() } styleName='grid.col grid.size-1of15 localStyles.iconBg'>
              <Icons
                icon='share'
                width='18' 
                style={IconStyles.btnIcon}
              />
            </li>

            <li onClick={() => this.hidePlayer()} styleName='grid.col grid.size-1of15 localStyles.iconBg'>
              <Icons
                icon='close'
                width='18' 
                style={IconStyles.btnIcon}
              />
            </li>
          </ul>
        </div>
      )
    } 
    else {
      return null;
    }
  }
  
  // Component methods
  shareButton = () => {
    this.props.shareEpisode(this.props.play.podcast, this.props.play.title, this.audio.currentTime, this.props.play.podcastUrl, this.props.play.podcastID);

    // Pause episode
    this.setState({ playing: false });
    this.audio.pause();
  }

  hidePlayer = () => {
    this.setState({
        active: false,
        playing: false
    })
  }

  playOrPause = () => {
    if(this.state.playing) {
      this.setState({ playing: false });
      this.audio.pause();
    }
    else {
      this.setState({ playing: true });
      this.audio.play();      
    }
  }

  mouseMove = (mouseEvent) => {
    // Update the audio's current time acordingly
    this.audio.currentTime = 
      ((mouseEvent.pageX - this.timeline.offsetLeft) / this.timeline.offsetWidth) * this.audio.duration
    ;
    // Change the width of the runtimeBar
    this.runTimeBar.style['width'] = ((this.audio.currentTime / this.audio.duration) * 100) + '%';  
  }

  secondsToTimeFormat = (fullSeconds) => {
    if(fullSeconds.toString() === 'NaN') {
      return '00:00';
    }
    else {
      let hours = Math.floor(fullSeconds / 3600);
      let minutes = Math.floor(fullSeconds / 60 - (hours * 60));
      let seconds = Math.floor(fullSeconds - (hours * 3600) - (minutes * 60));
      
      minutes = (minutes < 10) ? '0' + minutes : minutes;
      seconds = (seconds < 10) ? '0' + seconds : seconds;
  
      if(hours === 0) {
        return minutes + ':' + seconds;
      }
      else {
        return hours + ':' + minutes + ':' + seconds;
      }
    }
  }  
}

export default Player;
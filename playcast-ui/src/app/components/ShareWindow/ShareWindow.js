// Libraries
import React, { Component } from 'react';
import { CopyToClipboard }  from 'react-copy-to-clipboard';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon
}                           from 'react-share';
import base64url            from 'base64-url';

// icons
import Icons from '../Icons/Icons.js';
const IconStyles = {
    closeIcon: {
      display: 'block',
      margin: '3px 7.5px'
    },
    checkIcon: {
      fill: 'white',
      margin: '0'
    },
    inlineIcon: {
      fill: 'white',
      display: 'inline-block',
      margin: '0 4px 0 0',
      cursor: 'pointer'
    }
};

// Styles
import localStyles from "./ShareWindow.css";
import grid from '../../grid_system/grid.css';


/*
Currently facebook isn't working because this app is currently on localhost
and linkeding because it does not have any meta data to pull from
*/

class ShareWindow extends Component {
  // React methods
  constructor(props) {
    super(props);
    this.state = {
      withTimeCheck: true,
      urlToShare: false
    }
  }

  componentWillReceiveProps(nextProps) {
    let playingUrl = (nextProps.share.title) ? '?playing=' +  base64url.encode(nextProps.share.title) : '';
    let atUrl      = (nextProps.share.at > 0) ? '&at=' + nextProps.share.at : '';
    
    this.setState({
      active: nextProps.share.active,
      urlToShare: window.location.origin + '/podcast/' + nextProps.share.podcastID + playingUrl + atUrl
    })
  }
  
  render() {
    if(this.state.active) {
      return (
        <div styleName='localStyles.container'>
          <div styleName='localStyles.window'>
            <div styleName='localStyles.windowHeader'>
              <h4>Share</h4>
              <div onClick={ () => this.props.closeWindow() } styleName='localStyles.iconContainer'>
                <Icons icon='close' width='16' style={IconStyles.closeIcon}/>
              </div>
            </div>
            {
              (this.props.share.at) 
              ? 
              <div styleName='localStyles.checkBoxBtn' onClick={ () => this.withTimeCheck() }>
                <div style={ {background: (this.state.withTimeCheck) ? 'black' : 'white'} }>
                  <Icons icon='check' width='12' style={IconStyles.checkIcon}/>
                </div>
                <h5>On my current time</h5>
              </div>
              : 
              null
            }
            <ul styleName='localStyles.socialMediaContainer'>
              <li styleName='grid.col grid.size-1of4 localStyles.socialMediaBtn'>
                <FacebookShareButton 
                  url={ this.state.urlToShare }
                  quote={ this.props.share.title }
                  hashtag={ '#' + this.toCamelCase(this.props.share.podcast) }
                >
                  <FacebookIcon size={32} round/>
                </FacebookShareButton>
              </li>

              <li styleName='grid.col grid.size-1of4 localStyles.socialMediaBtn'>
                <TwitterShareButton 
                  url={ this.state.urlToShare }
                  title={ this.props.share.title  }
                  hashtags={ ['podcast', 'playCast', this.toCamelCase(this.props.share.podcast)] }
                >
                  <TwitterIcon size={32} round/>
                </TwitterShareButton>
              </li>

              <li styleName='grid.col grid.size-1of4 localStyles.socialMediaBtn'>
                <LinkedinShareButton 
                  url={ this.state.urlToShare }
                >
                  <LinkedinIcon size={32} round/>
                </LinkedinShareButton>
              </li>

              <li styleName='grid.col grid.size-1of4 localStyles.socialMediaBtn'>
                <RedditShareButton 
                  url={ this.state.urlToShare }
                  title={ this.props.share.title }
                >
                  <RedditIcon size={32} round/>
                </RedditShareButton>
              </li>
            </ul>

            <CopyToClipboard text={ this.state.urlToShare }
              onCopy={() => this.copyToClipboard()}>
              <div styleName='localStyles.btn-w-i'>
                <div>
                    <Icons icon='link' width='14' style={IconStyles.inlineIcon}/>
                    <h5>COPY TO LINK CLIPBOARD</h5>
                </div>
              </div>
            </CopyToClipboard>
          </div>
          
        </div>
      )
    }
    else {
      return null;
    }
  }

  // Component methods
  withTimeCheck = () => {
    if(this.state.withTimeCheck) {
      let playingUrl = (this.props.share.title) ? '?playing=' +  base64url.encode(this.props.share.title) : '';

      this.setState({
        urlToShare: window.location.origin + '/podcast/' + this.props.podcastID + playingUrl,
        withTimeCheck: false
      });
    }
    else {
      this.setState({
        urlToShare: this.state.urlToShare + '&at=' + this.props.share.at,
        withTimeCheck: true
      });
    }
  }

  toCamelCase = (str) => {
    return str.replace(/\W+(.)/g, (match, char) => {
      return char.toUpperCase();
    });
  }

  copyToClipboard = () => {
    console.info('Copied to clipboard');
    this.props.closeWindow();
  }  
}

export default ShareWindow;
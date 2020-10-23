// Libraries
import React, { Component } from 'react';

// icons
import Icons from '../Icons/Icons.js';
const IconStyles = {
  icon: {
    display: 'inline-block',
    margin: '0 4px 0 2px'
  }
};

// Styles
import localStyles from "./ExpandableText.css";


class ExpandableText extends Component {
  // React methods
  constructor(props) {
    super(props);
    this.state = {
      expandable: (props.description.length >= 320) ? true : false,
      empty: (props.description.length === 0) ? true : false,
      expanded: false
    };
  }

  render() {
    if(this.state.empty) return null

    else if(this.state.expandable) {
      return (
        <div>
          <div styleName='localStyles.epDescription'
              dangerouslySetInnerHTML={{__html: this.props.description}} 
              ref={(text) => { this.text = text }}
          />
          
          <div styleName='localStyles.sml-btn' onClick={() => this.toggleExpansion()}>
              <div>
                <Icons icon={this.state.expanded ? 'minus' : 'plus' } width='14' style={IconStyles.icon}/>
                <h5>{this.state.expanded ? 'COLLAPSE' : 'EXPAND'}</h5>
              </div>
          </div>
        </div>      
      );
    }
    else {
      return (
        <div styleName='localStyles.epDescription'
              dangerouslySetInnerHTML={{__html: this.props.description}} 
        />     
      );      
    }
  }

  // Component methods
  toggleExpansion = () => {
    if(this.state.expanded) {
      this.text.style['max-height'] = '60px';
      this.setState({ expanded: false });
    } else {
      this.text.style['max-height'] = 'none';
      this.setState({ expanded: true });      
    }
  }
}

export default ExpandableText;
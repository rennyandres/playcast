// Libraries
import React, { Component } from 'react';
import { Redirect }         from 'react-router-dom';

// Icons
import Icons from '../Icons/Icons.js';
const IconStyles = {
    btnIcon: {
      display: 'inline-block'
    }
};

// Styles
import localStyles from './SearchBar.css';


class SearchBar extends Component {
  // React methods
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      redirectToResults: false
    };
  } 

  render() {     
    if(this.state.redirectToResults) {
      this.setState({
        term: '',
        redirectToResults: false
      });     
      return <Redirect push to={ '/podcast/search?term=' + this.state.term } />
    }
    return(
      <div>
        <Icons icon='search' width='16' style={IconStyles.btnIcon}/>
        <input 
          type='text' 
          placeholder='Search for podcast...'
          onKeyPress={this.searchTerm}
          onChange={this.updateState}
          styleName='localStyles.input'
        />
      </div>
    );
  }

  // Component methods
  searchTerm = (event) => {
    if(event.charCode === 13) {
      this.setState({
        redirectToResults: true
      });
    }   
  }

  updateState = (event) => {
    this.setState({
      term: event.target.value
    });
  }  
}

export default SearchBar;
// Libraries
import React     from 'react';
import { Link }  from 'react-router-dom';

// Components
import SearchBar from '../SearchBar/SearchBar';

// Styles
import localStyles from './Navbar.css';
import grid        from '../../grid_system/grid.css';


const Navbar = (props) => {     
    return (
        <div styleName='localStyles.container'>
            <ul>
                <li styleName='localStyles.logoContainer'><Link to={ '/' }><img src="../playcast-logo.svg" alt="PlayCast Logo" styleName='localStyles.logo'/></Link></li>
                <li styleName='localStyles.searchBar'><SearchBar {...props}/></li>
            </ul>
        </div>
    );
}

export default Navbar;
// Libraries
import React from 'react';

// Styles
import localStyles from "./Loading.css";
import grid from '../../grid_system/grid.css';


const Loading = (props) => {     
    return (
        <div styleName='localStyles.container'>
            <div styleName='localStyles.circle'></div>
        </div>
    );
}

export default Loading;
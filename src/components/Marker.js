import React from 'react';

import marker from '../img/marker.png';
import './Marker.css';

export default function Marker({style, onClick}) {
    return (
        <div className="marker zhdanMap__marker" src={marker} style={style} onClick={onClick}></div>
    );
}
import React from 'react';

import './Marker.css';

export default function Marker({style, onClick}) {
    return (
        <div className="marker zhdanMap__marker" style={style} onClick={onClick}>
        </div>
    );
}
import { Banner, PanelHeader } from '@vkontakte/vkui';
import React from 'react';

import './Attractions.css';

export default function Attractions({onClick, name, location}) {
    return (
        <PanelHeader className="attractions zhdanMap__attractions" header={name} onClick={go} data-to='ListOfPlaces'/>
        <div className="location" text={{location}/>
    );
}
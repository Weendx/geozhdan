import { Banner } from '@vkontakte/vkui';
import React from 'react';

import './Attractions.css';

export default function Attractions({onClick, name, schedule}) {
    return (
        <Banner mode="image" asideMode='expand' className="attractions zhdanMap__attractions" header={name} subheader={schedule} background={<div style={{background: 'green'}}><Icon24Chevron style={{position: 'absolute', top: '50%', right: '16px', marginTop: '-12px'}}/></div>} onClick={onClick}/>    
    );
}
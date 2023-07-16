import PropTypes from 'prop-types';
import React, { useEffect } from "react";

import { Banner, Div, Panel, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui';
import { Icon24Chevron } from '@vkontakte/icons';

import './ListOfPlaces.css'

const ListOfPlaces = ({id, go}) => {
    return (
	<Panel id={id} style={{boxSizing: 'border-box'}}>
        <div className='main-panel'>
            <PanelHeader before={<PanelHeaderBack onClick={go} data-to="home"/>}>Список мест в лагере</PanelHeader>
            <Div>
                <Banner mode="image" asideMode='expand' className='banner' header="Стуловая" subheader="открыта всегда когда зовут" background={<div style={{background: 'green'}}><Icon24Chevron style={{position: 'absolute', top: '50%', right: '16px', marginTop: '-12px'}}/></div>} onClick={go} data-to='map'></Banner>
                <Banner mode="image" asideMode='expand' className='banner' header="Стуловая" subheader="открыта всегда когда зовут" background={<div style={{background: 'green'}}><Icon24Chevron style={{position: 'absolute', top: '50%', right: '16px', marginTop: '-12px'}}/></div>} onClick={go} data-to='map'></Banner>
                <Banner mode="image" asideMode='expand' className='banner' header="Стуловая" subheader="открыта всегда когда зовут" background={<div style={{background: 'green'}}><Icon24Chevron style={{position: 'absolute', top: '50%', right: '16px', marginTop: '-12px'}}/></div>} onClick={go} data-to='map'></Banner>
            </Div>
            <Div></Div>
        </div>
    </Panel>
);
}

ListOfPlaces.propTypes = {
    id: PropTypes.string.isRequired,
    go:PropTypes.func.isRequired,
};

export default ListOfPlaces;


import React from 'react';
import PropTypes from 'prop-types';

import "./StartWindow.css"

import geozhdan2 from "../img/geozhdan2.png";

import { Panel, HorizontalCell } from '@vkontakte/vkui';

const StartWindow = ({ id, go }) => (
		<Panel id={id} className="main_panel">
			<img className='main-logo' src={geozhdan2}></img>
        	<button className='button_start' onClick={go} data-to="home">Начать</button>
		</Panel>
    );

StartWindow.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};
    
export default StartWindow;
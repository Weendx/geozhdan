import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import "./StartWindow.css"

import geozhdan2 from "../img/geozhdan2.svg";

import { Panel, Div} from '@vkontakte/vkui';

const StartWindow = ({ id, go }) => {
	
	useEffect(() => {
		const div = document.querySelector('.main_div');
		div.style.height = document.body.offsetHeight + 'px';
	})
	return (
		<Panel id={id} style={{boxSizing: 'border-box'}}>
			<Div className="main_div">
				<img className='main-logo' src={geozhdan2}/>
				<button className='button_start' onClick={go} data-to="home">Начать</button>
			</Div>
		</Panel>
    );
}

StartWindow.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};
    
export default StartWindow;
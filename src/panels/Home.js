import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import "./Home.css"

import { Panel, PanelHeader, Text, Banner, Div, Title } from '@vkontakte/vkui';
import { Icon24Chevron } from '@vkontakte/icons';

const Home = ({ id, go}) => {
	useEffect(() => {
		const div = document.querySelector('.main-panel');
		div.style.height = document.body.offsetHeight + 'px';
	})
	return (
	<Panel id={id}  style={{boxSizing: 'border-box'}}>
		<div className='main-panel'>
			<PanelHeader className='name-menu'>Главная</PanelHeader>
			<Div>
			<div className='info-panel'>
				<Text className='info-name'>Открыто объектов</Text>
				<Text className='info-text'>1 объект из 0</Text>
				<Text className='info-name'>Дата последнего открытия</Text>
				<Text className='info-text'>09 февраля 2022</Text>
			</div>
			</Div>
			<div className='main__buttons'>
<<<<<<< HEAD
				<Banner mode="image" asideMode='expand' className='banner' header="Карта лагеря" subheader="Открыть карту лагеря" background={<div style={{background: 'green'}}><Icon24Chevron style={{position: 'absolute', top: '50%', right: '16px', marginTop: '-12px'}}/></div>} onClick={go} data-to='listOfPlaces'></Banner>
=======
				<Banner mode="image" asideMode='expand' className='banner' header="Карта лагеря" subheader="Открыть карту лагеря" background={<div style={{background: 'green'}}><Icon24Chevron style={{position: 'absolute', top: '50%', right: '16px', marginTop: '-12px'}}/></div>} onClick={go} data-to='map'></Banner>
>>>>>>> weendx
				<Banner mode="image" asideMode='expand' className='banner' header="Искать объекты" subheader="Открыть сканер QR-кода" background={<div style={{background: 'green'}}><Icon24Chevron style={{position: 'absolute', top: '50%', right: '16px', marginTop: '-12px'}}/></div>} onClick={go} data-to='listOfPlaces'></Banner>
				<Banner mode="image" asideMode='expand' className='banner' header="Ваши открытия" subheader="Показать открытые объекты" background={<div style={{background: 'green'}}><Icon24Chevron style={{position: 'absolute', top: '50%', right: '16px', marginTop: '-12px'}}/></div>} onClick={go} data-to='listOfPlaces'></Banner>
			</div>
		</div>
	</Panel>
);
}

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Home;

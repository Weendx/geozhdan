import React from 'react';
import PropTypes from 'prop-types';

import "./Home.css"
import qr from "../img/QR.png";

import { Panel, PanelHeader, Text,Banner,Div, Title } from '@vkontakte/vkui';
import { Icon24Chevron } from '@vkontakte/icons';

const Home = ({ id, go, fetchedUser }) => (
	<Panel id={id} className='main-panel'>
		<PanelHeader className='name-menu'>Главная</PanelHeader>
		<Div>
		<div className='info-panel'>
			<Title className='info-name'>Открыто объектов</Title>
			<Text className='info-text'>error</Text>
			<Title className='info-name'>Дата последнего открытия</Title>
			<Text className='info-text'>error</Text>
		</div>
		</Div>
		<Banner mode="image" header="Искать объекты" subheader="Открыть сканер QR-кодов" background={<div style={{background: 'green'}}><Icon24Chevron style={{position: 'absolute', top: '50%', right: '16px', marginTop: '-12px'}}/></div>}></Banner>
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Home;

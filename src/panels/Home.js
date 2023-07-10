import React from 'react';
import PropTypes from 'prop-types';

import "./Home.css"
import qr from "../img/QR.png";

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, Text } from '@vkontakte/vkui';

const Home = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
		<PanelHeader>Geozhdan</PanelHeader>

		<Text id='manual'>Для начала найдите QR-код на площади им.Адьясова</Text>
		<Group className='menuBattons'>
			<Button stretched size='1' mode="secondary" onClick={go} data-to="map"><img stc={qr} ></img>QR-сканнер</Button> {/* Добавить переход!*/}
			<Button stretched size="l" mode="secondary" onClick={go} data-to="map">Карта лагеря</Button>
		</Group>
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Home;

import React from 'react';
import PropTypes from 'prop-types';

import "./StartWindow.css"

import start from "../img/start.png";

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, Text } from '@vkontakte/vkui';

const StartWindow = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
		<PanelHeader>Geozhdan</PanelHeader>
		{fetchedUser &&
		<Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				subtitle={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
		</Group>}

        <button id='buttonStart' onClick={go} data-to="home"><img id='imgstart' width="200" src={start} alt="It's start"></img></button>
    </Panel>
    );

StartWindow.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};
    
export default StartWindow;
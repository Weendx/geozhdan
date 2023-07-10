import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

import map from '../img/map.svg';
import './InitPageMap.css';

const InitPageMap = props => (
	<Panel id={props.id}>
		<PanelHeader
			before={<PanelHeaderBack onClick={props.go} data-to="home"/>}
		>
			Map
		</PanelHeader>
		<div className="initPageMap"><img  src={map} alt="It's map"/></div>
	</Panel>
);

InitPageMap.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default InitPageMap;